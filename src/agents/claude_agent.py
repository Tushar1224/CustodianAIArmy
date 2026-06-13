"""
Claude Agent implementation using Anthropic's API.
Supports Claude Opus 4, Claude Sonnet 4.5, Claude Haiku, and other Anthropic models.
Get your API key at: https://console.anthropic.com

MCP Tool Calling:
  Each agent specialization has a set of MCP tools available (web search,
  filesystem, memory, etc.). When the model requests a tool call, this agent
  executes it via the MCPToolExecutor and feeds the result back to the model.
"""

import os
import json
import base64
from pathlib import Path
from typing import Dict, Any, List, AsyncGenerator
from datetime import datetime

import anthropic

from src.agents.base_agent import BaseAgent, AgentMessage, AgentStatus, AgentType, AgentCapability
from src.core.config import settings
from src.core.logging_config import get_logger

# Directory where prompt .md files are stored
PROMPTS_DIR = os.path.join(os.path.dirname(__file__), "prompts")

CLAUDE_DEFAULT_MODEL = "claude-sonnet-4-5"

# Maximum tool-calling iterations to prevent infinite loops
MAX_TOOL_ITERATIONS = 5


def _load_prompt(filename: str) -> str:
    """Load a prompt from a .md file in the prompts directory."""
    filepath = os.path.join(PROMPTS_DIR, filename)
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read().strip()
        lines = content.splitlines()
        if lines and lines[0].startswith("#"):
            content = "\n".join(lines[1:]).strip()
        return content
    except FileNotFoundError:
        return ""


class ClaudeAgent(BaseAgent):
    """Agent powered by Anthropic's Claude models"""

    def __init__(
        self,
        agent_id: str = None,
        name: str = "ClaudeAgent",
        agent_type: AgentType = AgentType.MAIN,
        specialization: str = "general",
        capabilities: List[AgentCapability] = None,
        api_key: str = None,
        model: str = None
    ):
        default_capabilities = [
            AgentCapability(
                name="text_generation",
                description="Generate high-quality text responses using Claude models",
                parameters={"max_tokens": 4096, "temperature": 0.7}
            ),
            AgentCapability(
                name="conversation",
                description="Engage in nuanced, context-aware conversations",
                parameters={"context_window": 200000}
            ),
            AgentCapability(
                name="code_generation",
                description="Generate, review, and explain code with high accuracy",
                parameters={"timeout": 60}
            ),
            AgentCapability(
                name="reasoning",
                description="Advanced reasoning and analysis capabilities",
                parameters={"extended_thinking": True}
            ),
            AgentCapability(
                name="tool_use",
                description="Use MCP tools (web search, filesystem, memory) to augment responses",
                parameters={"max_iterations": MAX_TOOL_ITERATIONS}
            ),
        ]
        if capabilities:
            default_capabilities.extend(capabilities)
        super().__init__(
            agent_id=agent_id,
            name=name,
            agent_type=agent_type,
            capabilities=default_capabilities
        )
        self.specialization = specialization
        self._api_key_override = api_key
        self._model_override = model

        # Lazy-initialized SDK client and MCP tool executor
        self._client: anthropic.AsyncAnthropic | None = None
        self._mcp_executor = None

        self.logger.info(f"ClaudeAgent {self.name} initialized with specialization: {specialization}")

    def _get_client(self) -> anthropic.AsyncAnthropic:
        """Get or create the shared SDK client (reused for connection pooling)."""
        if self._client is None:
            api_key = self._get_api_key()
            if not api_key:
                raise ValueError(
                    "ANTHROPIC_API_KEY not configured. Get your key at https://console.anthropic.com"
                )
            self._client = anthropic.AsyncAnthropic(
                api_key=api_key,
                max_retries=2,
            )
        return self._client

    def _get_api_key(self) -> str:
        """Get the effective API key (user override > server default)"""
        return self._api_key_override or settings.ANTHROPIC_API_KEY or ""

    def _get_model(self) -> str:
        """Get the effective model name"""
        return self._model_override or settings.CLAUDE_MODEL or CLAUDE_DEFAULT_MODEL

    async def count_tokens(self, messages: List[dict], system: str | None = None) -> int:
        """Count tokens using the SDK's token counting API."""
        try:
            client = self._get_client()
            response = await client.beta.messages.count_tokens(
                model=self._get_model(),
                messages=messages,
                system=system,
            )
            return response.input_tokens
        except Exception as e:
            self.logger.warning(f"Token counting failed: {e}")
            return 0

    def _get_mcp_executor(self):
        """Get or create the MCP tool executor for this agent's specialization."""
        if not settings.MCP_ENABLED:
            return None
        if self._mcp_executor is None:
            try:
                from src.mcp.mcp_client import MCPToolExecutor
                self._mcp_executor = MCPToolExecutor(self.specialization)
            except Exception as e:
                self.logger.warning(f"Could not initialize MCP executor: {e}")
                return None
        return self._mcp_executor

    async def process_message(self, message: AgentMessage) -> AgentMessage:
        """Process an incoming message using Claude"""
        try:
            self.update_status(AgentStatus.BUSY)

            if self.specialization == "coordinator":
                task = {
                    "id": f"task_{message.id}",
                    "type": "delegated_task",
                    "description": message.content,
                    "parameters": message.metadata
                }
                task_result = await self.execute_task(task)
                response_content = task_result.get("result", "Task completed, but no result was returned.")
                if task_result.get("status") == "failed":
                    response_content = f"Sorry, the task failed. Error: {task_result.get('error')}"

                return AgentMessage(
                    sender_id=self.agent_id,
                    receiver_id=message.sender_id,
                    content=response_content,
                    message_type="text",
                    metadata={"original_message_id": message.id, "delegated_task": True, "provider": "anthropic_claude"}
                )

            system_prompt = self._get_system_prompt()
            response = await self._call_claude_api(
                system_prompt=system_prompt,
                user_message=message.content,
                context=message.metadata.get("context", {}),
                history=message.metadata.get("history", [])
            )
            formatted_response = self._format_code_blocks(response)
            response_message = AgentMessage(
                sender_id=self.agent_id,
                receiver_id=message.sender_id,
                content=formatted_response,
                message_type="text",
                metadata={
                    "original_message_id": message.id,
                    "agent_specialization": self.specialization,
                    "provider": "anthropic_claude",
                    "model": self._get_model(),
                    "processing_time": (datetime.utcnow() - message.timestamp).total_seconds()
                }
            )
            self.update_status(AgentStatus.IDLE)
            return response_message
        except Exception as e:
            self.logger.error(f"Error processing message: {str(e)}")
            self.update_status(AgentStatus.ERROR)
            return AgentMessage(
                sender_id=self.agent_id,
                receiver_id=message.sender_id,
                content=f"Error processing your request: {str(e)}",
                message_type="error",
                metadata={"error": str(e), "original_message_id": message.id}
            )

    async def execute_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a specific task using Claude"""
        try:
            self.update_status(AgentStatus.BUSY)
            task_type = task.get("type", "general")
            task_description = task.get("description", "")
            task_parameters = task.get("parameters", {})

            system_prompt = self._get_task_prompt(task_type)
            response = await self._call_claude_api(
                system_prompt=system_prompt,
                user_message=task_description,
                context=task_parameters,
            )
            result = {
                "task_id": task.get("id", "unknown"),
                "status": "completed",
                "result": response,
                "agent_id": self.agent_id,
                "agent_name": self.name,
                "execution_time": datetime.utcnow().isoformat(),
                "specialization": self.specialization,
                "provider": "anthropic_claude",
                "model": self._get_model()
            }
            self.update_status(AgentStatus.IDLE)
            return result
        except Exception as e:
            self.logger.error(f"Error executing task: {str(e)}")
            self.update_status(AgentStatus.ERROR)
            return {
                "task_id": task.get("id", "unknown"),
                "status": "failed",
                "error": str(e),
                "agent_id": self.agent_id,
                "agent_name": self.name
            }

    async def stream_response(
        self,
        system_prompt: str,
        user_message: str,
        context: Dict[str, Any] = None,
        history: list = None,
        max_tokens: int = 4096,
        temperature: float = 0.7
    ) -> AsyncGenerator[str, None]:
        """
        Stream responses from Claude API in real-time.
        
        Args:
            system_prompt: System prompt to guide the model
            user_message: User's message
            context: Additional context
            history: Conversation history
            max_tokens: Maximum tokens to generate
            temperature: Temperature for sampling
            
        Yields:
            Text chunks from the model
        """
        try:
            model = self._model_override or settings.CLAUDE_MODEL or CLAUDE_DEFAULT_MODEL

            # Build messages
            messages = []
            if history:
                for msg in history:
                    sender = msg.get("sender", "")
                    content = msg.get("content", "")
                    if not content:
                        continue
                    role = "user" if sender == "You" else "assistant"
                    messages.append({"role": role, "content": content})

            messages.append({"role": "user", "content": user_message})

            client = self._get_client()

            self.logger.info(f"Starting Claude stream with model: {model}")

            async with client.messages.stream(
                model=model,
                max_tokens=max_tokens,
                temperature=temperature,
                system=system_prompt if system_prompt else None,
                messages=messages
            ) as stream:
                chunk_count = 0
                async for text in stream.__stream_text__():
                    if text:
                        chunk_count += 1
                        yield text

                self.logger.info(f"Claude stream completed ({chunk_count} chunks)")

        except Exception as e:
            self.logger.error(f"Claude stream failed: {str(e)}")
            yield f"Error streaming from Claude: {str(e)}"

    async def stream_message(self, message: AgentMessage) -> AsyncGenerator[str, None]:
        """
        Stream a response to an incoming message using Claude.
        
        Args:
            message: The incoming agent message
            
        Yields:
            Text chunks from the response
        """
        self.update_status(AgentStatus.BUSY)
        
        try:
            system_prompt = self._get_system_prompt()
            history = message.metadata.get("history", [])
            context = message.metadata.get("context", {})
            
            async for chunk in self.stream_response(
                system_prompt=system_prompt,
                user_message=message.content,
                context=context,
                history=history
            ):
                yield chunk
            
            self.update_status(AgentStatus.IDLE)
            
        except Exception as e:
            self.logger.error(f"Error streaming message: {str(e)}")
            self.update_status(AgentStatus.ERROR)
            raise

    async def parse_document(self, file_bytes: bytes, filename: str, prompt: str) -> str:
        """Send a document file (PDF/DOCX) to Claude for AI-based parsing.

        Uses Claude's ``document`` content block (base64-encoded) which provides
        better accuracy than local text extraction, especially for PDFs with
        complex layouts or DOCX files with rich formatting.

        Falls back gracefully: if the agent uses a non-Claude provider, callers
        should check ``hasattr(agent, 'parse_document')`` before calling.
        """
        client = self._get_client()
        model = self._get_model()

        ext = Path(filename).suffix.lower()
        media_type_map = {
            '.pdf':  'application/pdf',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.txt':  'text/plain',
        }
        media_type = media_type_map.get(ext, 'application/octet-stream')

        encoded = base64.b64encode(file_bytes).decode('utf-8')

        try:
            response = await client.messages.create(
                model=model,
                max_tokens=8192,
                messages=[{
                    "role": "user",
                    "content": [
                        {
                            "type": "document",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": encoded,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt,
                        },
                    ],
                }],
            )

            for block in response.content:
                if block.type == "text":
                    return block.text
            return ""
        except anthropic.RateLimitError as e:
            self.logger.error(f"Claude rate limit during document parse: {e}")
            raise ValueError("Claude API rate limit exceeded. Please wait and try again.")
        except anthropic.APIStatusError as e:
            self.logger.error(f"Claude API status {e.status_code} during document parse: {e.body}")
            if e.status_code == 401:
                raise ValueError("Invalid Anthropic API key. Please check your API key in profile settings.")
            if e.status_code == 413:
                raise ValueError("File too large for Claude document parsing. Please try a smaller file.")
            raise ValueError(f"Claude API error (Status: {e.status_code}): {e.body}")
        except anthropic.APIConnectionError as e:
            self.logger.error(f"Claude connection error during document parse: {e}")
            raise ValueError("Could not connect to Claude API. Please check your network.")
        except anthropic.APITimeoutError as e:
            self.logger.error(f"Claude timeout during document parse: {e}")
            raise ValueError("Request timed out while parsing document. Please try again.")
        except Exception as e:
            self.logger.error(f"Unexpected error during document parse: {e}")
            raise ValueError(f"Failed to parse document: {str(e)}")

    def _get_system_prompt(self) -> str:
        """Get system prompt based on agent specialization."""
        prompt_file_map = {
            "general": "general.md",
            "analyst": "analyst.md",
            "data_analyst": "data_analyst.md",
            "market_analyst": "market_analyst.md",
            "creative": "creative.md",
            "writer": "writer.md",
            "designer": "designer.md",
            "technical": "technical.md",
            "coder": "coder.md",
            "architect": "architect.md",
            "researcher": "researcher.md",
            "fact_checker": "fact_checker.md",
            "trend_analyst": "trend_analyst.md",
            "tutor": "tutor.md",
            "coordinator": "coordinator.md",
        }
        filename = prompt_file_map.get(self.specialization)
        if filename:
            loaded = _load_prompt(filename)
            if loaded:
                return loaded
        fallbacks = {
            "general": "You are a helpful AI assistant powered by Anthropic Claude. Provide accurate, thoughtful, and engaging responses.",
            "analyst": "You are a data analyst AI powered by Claude. Focus on analytical thinking, data interpretation, and actionable insights.",
            "creative": "You are a creative AI assistant powered by Claude. Focus on creative writing, brainstorming, and innovative solutions.",
            "technical": "You are a technical AI assistant powered by Claude. Focus on technical accuracy, problem-solving, and detailed explanations.",
            "researcher": "You are a research AI assistant powered by Claude. Focus on thorough research, fact-checking, and comprehensive analysis.",
            "tutor": "You are an expert, encouraging programming tutor powered by Claude. Help students learn programming concepts clearly and effectively.",
            "coordinator": "You are Custodian AI — an intelligent orchestrator powered by Anthropic Claude. Adopt the persona of the best expert and answer the user's question directly.",
        }
        return fallbacks.get(self.specialization, fallbacks["general"])

    def _get_task_prompt(self, task_type: str) -> str:
        """Get task-specific system prompt."""
        task_file_map = {
            "analysis": "task_analysis.md",
            "writing": "task_writing.md",
            "coding": "task_coding.md",
            "research": "task_research.md",
            "planning": "task_planning.md",
        }
        filename = task_file_map.get(task_type)
        if filename:
            loaded = _load_prompt(filename)
            if loaded:
                return loaded
        fallbacks = {
            "analysis": "You are an expert analyst. Provide thorough analysis with clear insights and recommendations.",
            "writing": "You are an expert writer. Create well-structured, engaging, and high-quality content.",
            "coding": "You are an expert programmer. Provide clean, efficient, and well-documented code solutions.",
            "research": "You are an expert researcher. Provide comprehensive, accurate, and well-sourced information.",
            "planning": "You are an expert planner. Create detailed, actionable, and realistic plans.",
        }
        return fallbacks.get(task_type, self._get_system_prompt())

    async def _call_claude_api(
        self,
        system_prompt: str,
        user_message: str,
        context: Dict[str, Any] = None,
        history: list = None
    ) -> str:
        """
        Call the Anthropic Claude API via the official Python SDK with MCP
        tool-calling support.

        The SDK handles automatic retries (2× with exponential backoff),
        connection pooling, and typed error responses.

        Agentic loop:
        1. Send message to Claude with available tool definitions
        2. If model returns tool_use blocks → execute via MCP → feed results back
        3. Repeat until model returns a final text response (or max iterations)
        """
        model = self._get_model()

        # Build multi-turn conversation from history
        messages: list = []
        if history:
            for msg in history:
                sender = msg.get("sender", "")
                content = msg.get("content", "")
                if not content:
                    continue
                role = "user" if sender == "You" else "assistant"
                messages.append({"role": role, "content": content})
        messages.append({"role": "user", "content": user_message})

        # Get MCP tool definitions for this agent (Anthropic format)
        mcp_executor = self._get_mcp_executor()
        tool_definitions: list = []
        if mcp_executor:
            tool_definitions = mcp_executor.get_tool_definitions_anthropic()

        # Determine if this message is simple/conversational (skip tools for those)
        _simple_msg = user_message.strip()
        _is_simple = (
            len(_simple_msg) < 20 and
            not any(kw in _simple_msg.lower() for kw in [
                "search", "find", "look up", "fetch", "get", "what is", "who is",
                "news", "latest", "current", "today", "weather", "price", "stock",
                "read", "write", "file", "code", "calculate", "analyze", "research"
            ])
        )

        client = self._get_client()

        for iteration in range(MAX_TOOL_ITERATIONS):
            try:
                response = await client.messages.create(
                    model=model,
                    max_tokens=4096,
                    system=system_prompt,
                    messages=messages,
                    tools=tool_definitions if (tool_definitions and not _is_simple) else None,
                )
            except anthropic.RateLimitError as e:
                self.logger.error(f"Claude rate limit: {e}")
                return "Claude API Error: Rate limit exceeded. Please wait a moment and try again."
            except anthropic.APIStatusError as e:
                self.logger.error(f"Claude API status {e.status_code}: {e.body}")
                if e.status_code == 401:
                    return "Claude API Error: Invalid API key. Please check your Anthropic API key in your profile settings."
                return f"Claude API Error (Status: {e.status_code}): {e.body}"
            except anthropic.APIConnectionError as e:
                self.logger.error(f"Claude connection error: {e}")
                return "Claude API Error: Could not connect. Please check your network and try again."
            except anthropic.APITimeoutError as e:
                self.logger.error(f"Claude timeout: {e}")
                return "Claude API Error: Request timed out. Please try again."
            except Exception as e:
                self.logger.error(f"Unexpected Claude API error: {e}")
                return f"I encountered an unexpected error when communicating with Claude: {str(e)}"

            stop_reason = response.stop_reason

            # ── Tool use requested by the model ────────────────────────
            if stop_reason == "tool_use":
                messages.append({"role": "assistant", "content": response.content})

                tool_results = []
                for block in response.content:
                    if block.type == "tool_use":
                        tool_name = block.name
                        tool_args = block.input
                        tool_use_id = block.id

                        self.logger.info(f"[MCP] {self.name} calling tool: {tool_name}({tool_args})")

                        if mcp_executor:
                            tool_result = await mcp_executor.execute_tool(tool_name, tool_args)
                            tool_content = tool_result.content
                            is_error = tool_result.is_error
                        else:
                            tool_content = f"MCP tools are disabled. Cannot execute '{tool_name}'."
                            is_error = True

                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": tool_use_id,
                            "content": tool_content,
                            "is_error": is_error,
                        })

                messages.append({"role": "user", "content": tool_results})
                continue

            # ── Final text response ────────────────────────────────────
            for block in response.content:
                if block.type == "text":
                    return block.text

            if stop_reason:
                return f"Claude didn't return text. Stop reason: {stop_reason}"

            return f"Unexpected API response format: {response.model_dump()}"

        # Exceeded max iterations
        self.logger.warning(f"[MCP] {self.name} exceeded max tool iterations ({MAX_TOOL_ITERATIONS})")
        return "I reached the maximum number of tool-calling steps. Please try rephrasing your request."

    def _format_code_blocks(self, text: str) -> str:
        from src.agents.output_validator import format_code_blocks, validate_and_format_output
        return validate_and_format_output(format_code_blocks(text))
