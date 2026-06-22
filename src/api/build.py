"""
MVP Builder — Reinforced MVP Developer Pipeline Integration

This module implements the 5-phase MVP development pipeline:
1. Ideation — Refine product concept
2. Planning — Architecture & tech stack
3. Review — Validate approach
4. Polish — UX improvements
5. Build — Generate production code

Uses existing CustodianAI agent infrastructure and MCP tools.
"""

import asyncio
import json
import os
import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional
from pathlib import Path
import tempfile

import httpx
from src.agents.agent_manager import AgentManager
from src.mcp.mcp_client import MCPToolExecutor
from src.core.logging_config import get_logger

logger = get_logger("mvp_builder")


class MVPPhase:
    """Represents a single phase in the MVP development pipeline."""

    def __init__(self, name: str, description: str, agent_specialization: str):
        self.name = name
        self.description = description
        self.agent_specialization = agent_specialization
        self.tasks: List[Dict[str, Any]] = []
        self.progress: int = 0
        self.status: str = "pending"  # pending, active, completed
        self.output: Dict[str, Any] = {}

    def to_dict(self) -> Dict[str, Any]:
        """Return phase dict with actionable guidance for UI and transition logic."""
        guidance_map = {
            "Ideation": {
                "summary": "Refine product vision and target users.",
                "expected_actions": ["Answer targeted questions", "Prioritize core features"],
                "next_steps": ["Advance to Planning when vision is stable"],
                "ui_hints": ["Show question prompts", "Provide example ideas"]
            },
            "Planning": {
                "summary": "Design architecture, tech stack, and a high-level implementation plan.",
                "expected_actions": ["Confirm tech stack", "Outline main modules and APIs"],
                "next_steps": ["Produce plan artifacts (plan.md)", "Advance to Review when plan is complete"],
                "ui_hints": ["Show checklist for architecture decisions", "Allow editing plan.md"]
            },
            "Review": {
                "summary": "Validate the plan and identify risks or missing details.",
                "expected_actions": ["Run architecture review", "Ask for clarifications on assumptions"],
                "next_steps": ["Address review comments", "Advance to Polish when issues are resolved"],
                "ui_hints": ["Show reviewed-plan.md diff", "Highlight blockers"]
            },
            "Polish": {
                "summary": "Improve UX, accessibility, and polish UI details.",
                "expected_actions": ["Suggest UI improvements", "Refine copy and accessibility"],
                "next_steps": ["Create visual assets or style guide", "Advance to Build when ready"],
                "ui_hints": ["Preview UI changes", "Provide before/after suggestions"]
            },
            "Build": {
                "summary": "Generate production-ready code according to the approved plan.",
                "expected_actions": ["Generate files", "Run basic validations/tests"],
                "next_steps": ["Switch to ACT mode to let the builder create files", "Advance to Virtual Deploy after build"],
                "ui_hints": ["Show a 'Switch to ACT' button", "Show progress bar and logs"]
            },
            "Virtual Deploy": {
                "summary": "Preview and accept deployment of the generated product.",
                "expected_actions": ["Review generated artifacts", "Accept or request changes"],
                "next_steps": ["Accept deployment or request changes back to Build"],
                "ui_hints": ["Show deploy preview and accept button", "Show publish-to-GitHub option"]
            }
        }
        guidance = guidance_map.get(self.name, {
            "summary": self.description,
            "expected_actions": [],
            "next_steps": [],
            "ui_hints": []
        })

        return {
            "name": self.name,
            "description": self.description,
            "agent_specialization": self.agent_specialization,
            "tasks": self.tasks,
            "progress": self.progress,
            "status": self.status,
            "output": self.output,
            "guidance": guidance,
        }


class MVPSession:
    """Represents an active MVP building session."""

    def __init__(self, session_id: str, user_email: str, product_idea: str):
        self.session_id = session_id
        self.user_email = user_email
        self.product_idea = product_idea
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
        self.current_phase_index: int = 0
        self.mode: str = "plan"  # plan or act
        self.github_connected: bool = False
        self.github_repo_name: Optional[str] = None
        self.github_token: Optional[str] = None  # Store token for operations
        self.github_username: Optional[str] = None
        self.workspace_path: Optional[Path] = None
        self.files: Dict[str, str] = {}
        self.chat_history: List[Dict[str, Any]] = []
        self.logs: List[Dict[str, Any]] = []
        self.deploy_accepted: bool = False
        self.deploy_github_url: Optional[str] = None

        # Initialize 6 phases (5 original + Virtual Deploy)
        self.phases: List[MVPPhase] = [
            MVPPhase("Ideation", "Refine your product concept", "coordinator"),
            MVPPhase("Planning", "Architecture & tech stack", "architect"),
            MVPPhase("Review", "Validate the approach", "technical"),
            MVPPhase("Polish", "UX improvements", "designer"),
            MVPPhase("Build", "Generate production code", "coder"),
            MVPPhase("Virtual Deploy", "Preview and accept the final product", "technical"),
        ]

    @property
    def current_phase(self) -> MVPPhase:
        if 0 <= self.current_phase_index < len(self.phases):
            return self.phases[self.current_phase_index]
        return None

    @property
    def overall_progress(self) -> int:
        if not self.phases:
            return 0
        total = sum(p.progress for p in self.phases)
        return min(100, total // len(self.phases))

    def add_log(self, message: str, level: str = "info"):
        self.logs.append(
            {
                "timestamp": datetime.utcnow().isoformat(),
                "message": message,
                "level": level,
            }
        )
        logger.info(f"[MVPSession {self.session_id}] {message}")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "session_id": self.session_id,
            "user_email": self.user_email,
            "product_idea": self.product_idea,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "current_phase_index": self.current_phase_index,
            "current_phase": self.current_phase.name if self.current_phase else None,
            "mode": self.mode,
            "github_connected": self.github_connected,
            "github_repo_name": self.github_repo_name,
            "github_username": self.github_username,
            "overall_progress": self.overall_progress,
            "phases": [p.to_dict() for p in self.phases],
            "files": list(self.files.keys()),
            "file_data": self.files,  # Full file content dict
            "chat_history": self.chat_history,  # Full chat history
            "logs": self.logs[-50:],  # Last 50 logs
            "deploy_accepted": self.deploy_accepted,
            "deploy_github_url": self.deploy_github_url,
        }


class MVPBuilder:
    """
    Main MVP Builder class that orchestrates the 5-phase pipeline.

    Integrates with:
    - Existing AgentManager for AI agent orchestration
    - MCP tools for file operations, web search, etc.
    - Container-based isolated workspaces (optional)
    """

    def __init__(self, agent_manager: AgentManager):
        self.agent_manager = agent_manager
        self.sessions: Dict[str, MVPSession] = {}
        self.workspace_base = Path(tempfile.gettempdir()) / "mvp-workspaces"
        self.workspace_base.mkdir(parents=True, exist_ok=True)
        logger.info("MVP Builder initialized")

    def _persist_to_db(self, session: MVPSession) -> bool:
        """Persist the session state to the database."""
        try:
            from src.core.database import save_mvp_session
            data = {
                "id": session.session_id,
                "user_email": session.user_email,
                "product_idea": session.product_idea,
                "current_phase_index": session.current_phase_index,
                "mode": session.mode,
                "phases": [p.to_dict() for p in session.phases],
                "chat_history": session.chat_history,
                "files": session.files,
                "github_connected": session.github_connected,
                "github_repo_name": session.github_repo_name,
                "github_username": session.github_username,
                "logs": session.logs,
                "created_at": session.created_at.isoformat(),
            }
            return save_mvp_session(data)
        except Exception as e:
            logger.warning(f"Failed to persist session to DB: {e}")
            return False

    def _reconstruct_session(self, data: dict) -> MVPSession:
        """Reconstruct an MVPSession from a DB dict."""
        session = MVPSession(data["id"], data["user_email"], data["product_idea"])
        session.current_phase_index = data.get("current_phase_index", 0)
        session.mode = data.get("mode", "plan")
        session.github_connected = data.get("github_connected", False)
        session.github_repo_name = data.get("github_repo_name")
        session.github_username = data.get("github_username")

        # Restore chat history
        for msg in data.get("chat_history", []):
            session.chat_history.append(msg)

        # Restore files
        for path, content in data.get("files", {}).items():
            session.files[path] = content

        # Restore logs
        for log in data.get("logs", []):
            session.logs.append(log)

        # Restore phases
        phase_data_list = data.get("phases", [])
        if phase_data_list:
            session.phases = []
            for pd in phase_data_list:
                phase = MVPPhase(pd["name"], pd["description"], pd["agent_specialization"])
                phase.tasks = pd.get("tasks", [])
                phase.progress = pd.get("progress", 0)
                phase.status = pd.get("status", "pending")
                phase.output = pd.get("output", {})
                session.phases.append(phase)

        # Restore timestamps
        if data.get("created_at"):
            try:
                session.created_at = datetime.fromisoformat(data["created_at"])
            except (ValueError, TypeError):
                pass
        if data.get("updated_at"):
            try:
                session.updated_at = datetime.fromisoformat(data["updated_at"])
            except (ValueError, TypeError):
                pass

        session.updated_at = datetime.utcnow()
        return session

    async def create_session(self, user_email: str, product_idea: str) -> MVPSession:
        """Create a new MVP building session."""
        session_id = str(uuid.uuid4())
        session = MVPSession(session_id, user_email, product_idea)

        # Create isolated workspace
        workspace_path = self.workspace_base / session_id
        workspace_path.mkdir(parents=True, exist_ok=True)
        session.workspace_path = workspace_path

        # Seed initial AI response so the chat is not empty on first load
        user_msg = {
            "role": "user",
            "content": f"I want to build: {product_idea}",
            "timestamp": datetime.utcnow().isoformat(),
            "mode": "plan",
        }
        session.chat_history.append(user_msg)
        try:
            agent = self._get_agent_for_specialization("coordinator")
            if not agent:
                agent = self.agent_manager.get_agent_by_name("CustodianAI")
            if agent:
                from src.agents.base_agent import AgentMessage
                seed_prompt = (
                    f"The user wants to build: {product_idea}\n\n"
                    f"Phase: Ideation — Refine your product concept.\n"
                    f"Your role is to help the user brainstorm and refine their product idea. "
                    f"Start by acknowledging their idea and asking thought-provoking questions "
                    f"about target audience, core features, and value proposition."
                )
                msg = AgentMessage(
                    sender_id="mvp_builder",
                    receiver_id=agent.agent_id,
                    content=seed_prompt,
                    message_type="chat",
                    metadata={"phase": "Ideation", "mode": "plan", "initial_seed": True},
                )
                response = await self.agent_manager.send_message(msg)
                session.chat_history.append({
                    "role": "assistant",
                    "content": response.content,
                    "timestamp": datetime.utcnow().isoformat(),
                    "agent_name": agent.name,
                    "phase": "Ideation",
                })
                session.add_log(f"Initial AI response generated via {agent.name}")
        except Exception as e:
            logger.warning(f"Failed to generate initial AI response: {e}")
            session.chat_history.append({
                "role": "assistant",
                "content": (
                    f"Great, let's refine your idea: **{product_idea}**\n\n"
                    f"Here are some questions to get us started:\n"
                    f"1. Who is the target audience for this product?\n"
                    f"2. What core problem does it solve?\n"
                    f"3. What are the top 3 features you want to prioritize?\n\n"
                    f"Tell me your thoughts on any of these and we'll build from there."
                ),
                "timestamp": datetime.utcnow().isoformat(),
                "agent_name": "MVP Builder",
                "phase": "Ideation",
                "fallback": True,
            })

        session.add_log(f"Session created for product: {product_idea[:50]}...", "info")
        self.sessions[session_id] = session
        self._persist_to_db(session)

        return session

    def get_session(self, session_id: str) -> Optional[MVPSession]:
        """Get an existing session by ID. Loads from DB if not in memory."""
        session = self.sessions.get(session_id)
        if session:
            return session

        # Try loading from database
        try:
            from src.core.database import get_mvp_session as _get_mvp_session
            data = _get_mvp_session(session_id)
            if data:
                session = self._reconstruct_session(data)
                # Restore workspace path
                workspace_path = self.workspace_base / session_id
                workspace_path.mkdir(parents=True, exist_ok=True)
                session.workspace_path = workspace_path
                self.sessions[session_id] = session
                return session
        except Exception as e:
            logger.warning(f"Failed to load session from DB: {e}")

        return None

    async def send_message(
        self, session_id: str, message: str, mode: str = "plan", agent_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send a message to the MVP builder for a session.

        In 'plan' mode: Discuss and refine ideas
        In 'act' mode: Execute tasks and generate code
        """
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        session.mode = mode
        session.chat_history.append(
            {
                "role": "user",
                "content": message,
                "timestamp": datetime.utcnow().isoformat(),
                "mode": mode,
            }
        )

        # Get appropriate agent for current phase
        current_phase = session.current_phase
        if not current_phase:
            return {"error": "No active phase"}

        # Find agent
        if agent_name:
            agent = self.agent_manager.get_agent_by_name(agent_name)
        else:
            # Find agent with matching specialization
            agent = self._get_agent_for_specialization(current_phase.agent_specialization)
            if not agent:
                agent = self.agent_manager.get_agent_by_name("CustodianAI")

        # Build context-aware prompt
        prompt = self._build_phase_prompt(session, message, mode)

        # Execute agent call
        try:
            from src.agents.base_agent import AgentMessage

            msg = AgentMessage(
                sender_id="mvp_builder",
                receiver_id=agent.agent_id,
                content=prompt,
                message_type="chat",
                metadata={"phase": current_phase.name, "mode": mode},
            )

            response = await self.agent_manager.send_message(msg)

            # Process response
            session.chat_history.append(
                {
                    "role": "assistant",
                    "content": response.content,
                    "timestamp": datetime.utcnow().isoformat(),
                    "agent_name": agent.name,
                    "phase": current_phase.name,
                }
            )

            session.add_log(f"Agent {agent.name} responded in {current_phase.name} phase")

            # Update phase progress
            if mode == "act":
                current_phase.progress = min(100, current_phase.progress + 20)

            session.updated_at = datetime.utcnow()
            self._persist_to_db(session)

            return {
                "response": response.content,
                "agent_name": agent.name,
                "phase": current_phase.name,
                "progress": session.overall_progress,
            }

        except Exception as e:
            logger.error(f"Error in MVP message processing: {e}")
            session.add_log(f"Error: {str(e)}", "error")
            return {"error": str(e)}

    def _get_agent_for_specialization(self, specialization: str):
        """Get an agent with the specified specialization."""
        agents = self.agent_manager.get_agents_by_specialization(specialization)
        if agents:
            return agents[0]

        # Fallback mappings
        fallback_map = {
            "coordinator": "CustodianAI",
            "architect": "ArchitectAI",
            "technical": "TechnicalAI",
            "designer": "DesignerAI",
            "coder": "CoderAI",
        }

        agent_name = fallback_map.get(specialization, "CustodianAI")
        return self.agent_manager.get_agent_by_name(agent_name)

    def _get_full_chat_as_text(self, session: MVPSession) -> str:
        """Get full chat history as readable text for inclusion in prompts."""
        parts = []
        for msg in session.chat_history:
            role = msg.get("role", "unknown")
            content = msg.get("content", "")
            if role == "system" and content.startswith("[Compacted]"):
                parts.append(f"[Previous conversation summary]\n{content}")
            elif role == "user":
                parts.append(f"User: {content}")
            elif role == "assistant":
                agent = msg.get("agent_name", "AI")
                phase = msg.get("phase", "")
                header = f"AI ({agent}){' [' + phase + ']' if phase else ''}:"
                parts.append(f"{header} {content[:2000]}")
        return "\n\n".join(parts)

    def _get_plan_artifacts(self, session: MVPSession) -> str:
        """Extract plan artifacts saved as session files."""
        artifacts = []
        for fname in ["plan.md", "reviewed-plan.md", "prd.md"]:
            if fname in session.files:
                artifacts.append(f"--- {fname} ---\n{session.files[fname]}")
        return "\n\n".join(artifacts)

    def _build_phase_prompt(self, session: MVPSession, user_message: str, mode: str) -> str:
        """Build a context-aware prompt for the current phase."""
        current_phase = session.current_phase
        plan_artifacts = self._get_plan_artifacts(session)

        phase_prompts = {
            "Ideation": (
                f"You are helping refine a product idea in the Ideation phase.\n"
                f"Product concept: {session.product_idea}\n"
                f"User message: {user_message}\n"
                f"Mode: {mode.upper()}\n\n"
                f"Help the user clarify their product vision, target users, and core features."
            ),
            "Planning": (
                f"You are an architect planning the technical implementation.\n"
                f"Product: {session.product_idea}\n"
                f"User message: {user_message}\n"
                f"Mode: {mode.upper()}\n\n"
                f"Design the architecture, suggest tech stack, and outline the implementation plan.\n"
                f"At the end of each response, include a section '---PLAN DOC---' with the updated plan in markdown."
            ),
            "Review": (
                f"You are reviewing the planned approach.\n"
                f"Product: {session.product_idea}\n"
                f"User message: {user_message}\n"
                f"Mode: {mode.upper()}\n\n"
                f"Review and validate the architecture plan. Identify potential issues, edge cases, "
                f"and suggest improvements. At the end of each response, include a section "
                f"'---REVIEWED PLAN---' with the updated review notes in markdown."
            ),
            "Polish": (
                f"You are improving the UX and design.\n"
                f"Product: {session.product_idea}\n"
                f"User message: {user_message}\n"
                f"Mode: {mode.upper()}\n\n"
                f"Suggest UX improvements, layout changes, visual design refinements, and accessibility "
                f"enhancements. Be specific — mention exact UI elements, spacing, colors, components, "
                f"and user flows to change. At the end of each response, include a section "
                f"'---UX CHANGES---' listing each change as a bullet."
            ),
            "Build": (
                f"You are generating production-ready code.\n"
                f"Product: {session.product_idea}\n"
                f"User message: {user_message}\n"
                f"Mode: {mode.upper()}\n\n"
                f"Write clean, well-documented code that implements the EXACT product described in "
                f"the plans below. Use MCP filesystem tools to create files in the workspace. "
                f"Create a complete, working application. Generate an index.html as the entry point."
            ),
            "Virtual Deploy": (
                f"You are reviewing the final product for deployment.\n"
                f"Product: {session.product_idea}\n"
                f"User message: {user_message}\n"
                f"Mode: {mode.upper()}\n\n"
                f"Review the generated files, suggest any final tweaks, and guide the user through "
                f"accepting or requesting changes."
            ),
        }

        base_prompt = phase_prompts.get(current_phase.name, user_message)

        # For Review, Polish, Build — inject the full plan artifacts
        if plan_artifacts and current_phase.name in ("Review", "Polish", "Build"):
            base_prompt += f"\n\n=== PLAN AND PREVIOUS WORK ===\n{plan_artifacts}\n=== END PLAN ==="

        # For Build and Virtual Deploy — inject full chat history as context
        if current_phase.name in ("Build", "Virtual Deploy"):
            full_history = self._get_full_chat_as_text(session)
            if full_history:
                base_prompt += f"\n\n=== FULL CONVERSATION HISTORY ===\n{full_history}\n=== END HISTORY ==="

        # Add recent conversation history context (last 6 messages)
        recent_history = session.chat_history[-7:-1]
        if recent_history:
            history_context = "\n\nHere is the recent conversation history for context:\n"
            for msg in recent_history:
                role = msg.get("role", "unknown")
                display_role = "User" if role == "user" else "Assistant"
                content = msg.get("content", "")
                history_context += f"--- {display_role} ---\n{content}\n\n"

            if "User message:" in base_prompt:
                base_prompt = base_prompt.replace("User message:", f"{history_context}\nUser message:")
            else:
                base_prompt += history_context

        if mode == "act":
            base_prompt += "\n\nACTION MODE: Proceed with implementation. Use available tools to create files and execute tasks."
        else:
            base_prompt += "\n\nPLAN MODE: Discuss and plan without executing changes."

        return base_prompt

    async def advance_phase(self, session_id: str) -> Dict[str, Any]:
        """Advance to the next phase."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        if session.current_phase:
            session.current_phase.status = "completed"
            session.current_phase.progress = 100

        if session.current_phase_index < len(session.phases) - 1:
            session.current_phase_index += 1
            next_phase = session.current_phase
            next_phase.status = "active"

            # Save plan artifacts from completed phase chat
            await self._save_phase_artifacts(session)

            # Generate a phase-specific transition AI message
            transition_text = None
            try:
                agent = self._get_agent_for_specialization(next_phase.agent_specialization)
                if not agent:
                    agent = self.agent_manager.get_agent_by_name("CustodianAI")
                if agent:
                    from src.agents.base_agent import AgentMessage

                    full_chat = self._get_full_chat_as_text(session)
                    plan_artifacts = self._get_plan_artifacts(session)

                    if next_phase.name == "Review":
                        transition_prompt = (
                            f"The user has advanced to the Review phase for their product: {session.product_idea}\n\n"
                            f"Your role: Review the complete architecture plan created in the Planning phase.\n\n"
                            f"=== PLAN FROM PLANNING PHASE ===\n"
                            f"{plan_artifacts or full_chat}\n"
                            f"=== END PLAN ===\n\n"
                            f"Start reviewing the plan immediately. Do NOT ask what was planned or designed — "
                            f"it is provided above. Validate the architecture, identify potential issues, "
                            f"edge cases, and suggest concrete improvements. Be thorough and specific. "
                            f"At the end, include a section '---REVIEWED PLAN---' with your review summary in markdown."
                        )
                    elif next_phase.name == "Polish":
                        transition_prompt = (
                            f"The user has advanced to the Polish phase for their product: {session.product_idea}\n\n"
                            f"Your role: Suggest UX and design improvements for the reviewed plan.\n\n"
                            f"=== REVIEWED PLAN ===\n"
                            f"{plan_artifacts or full_chat}\n"
                            f"=== END PLAN ===\n\n"
                            f"Start by summarizing the product vision, then immediately suggest specific UX "
                            f"improvements: layout changes, color schemes, component placement, user flows, "
                            f"and visual design details. Be specific — mention exact elements. "
                            f"At the end, include a section '---UX CHANGES---' listing each change as a bullet."
                        )
                    elif next_phase.name == "Build":
                        transition_prompt = (
                            f"The user has advanced to the Build phase for their product: {session.product_idea}\n\n"
                            f"Your role: Generate production-ready code based on the complete plan below.\n\n"
                            f"=== COMPLETE PLAN AND REVIEW ===\n"
                            f"{plan_artifacts or full_chat}\n"
                            f"=== END PLAN ===\n\n"
                            f"Start building immediately. Do NOT ask what to build — the full plan is above. "
                            f"Generate the complete application code. Create index.html as the entry point "
                            f"with full working functionality. Use MCP filesystem tools to create all files. "
                            f"Include all HTML, CSS, and JavaScript inline in the first file for simplicity. "
                            f"The user is currently in PLAN mode — explain what you're about to build, "
                            f"then tell them to switch to ACT mode when ready."
                        )
                    elif next_phase.name == "Virtual Deploy":
                        transition_prompt = (
                            f"The user has advanced to the Virtual Deploy phase for their product: {session.product_idea}\n\n"
                            f"Your role: Review the final generated product for deployment.\n\n"
                            f"=== GENERATED PRODUCT ===\n"
                            f"{plan_artifacts or full_chat}\n"
                            f"=== END ===\n\n"
                            f"Greet the user in the deploy phase. Summarize what was built, "
                            f"and guide them to either accept the deployment or request changes."
                        )
                    else:
                        transition_prompt = (
                            f"The user has just advanced to the {next_phase.name} phase for their product: {session.product_idea}\n\n"
                            f"{next_phase.description}\n\n"
                            f"Your role: {next_phase.agent_specialization}\n\n"
                            f"Greet the user in this new phase. Explain what this phase focuses on, "
                            f"what they should expect, and ask a single open-ended question to start the conversation. "
                            f"Keep it concise — 3-4 sentences max."
                        )

                    msg = AgentMessage(
                        sender_id="mvp_builder",
                        receiver_id=agent.agent_id,
                        content=transition_prompt,
                        message_type="chat",
                        metadata={"phase": next_phase.name, "mode": "plan", "transition": True},
                    )
                    response = await self.agent_manager.send_message(msg)
                    # Capture the transition message text to return to the client for richer UI guidance
                    transition_text = None
                    if response is not None:
                        # agent_manager may return an object or dict
                        transition_text = getattr(response, 'content', None) if hasattr(response, 'content') else (response.get('content') if isinstance(response, dict) else None)
                    # Sanitize AI response: strip code fences and trim
                    def _clean_text(t: str) -> str:
                        if not t:
                            return ''
                        import re
                        # Remove triple-backtick code fences
                        cleaned = re.sub(r'```[\s\S]*?```', '', t)
                        # Remove single-line fences
                        cleaned = re.sub(r'```', '', cleaned)
                        cleaned = cleaned.strip()
                        # Limit length
                        if len(cleaned) > 3000:
                            cleaned = cleaned[:3000] + '\n\n...(truncated)'
                        return cleaned
                    transition_text = _clean_text(transition_text or '')

                    # Also create a short UI prompt based on phase guidance if available
                    guidance = next_phase.to_dict().get('guidance', {})
                    ui_prompt_parts = [guidance.get('summary', next_phase.description)]
                    expected = guidance.get('expected_actions') or []
                    if expected:
                        ui_prompt_parts.append('Expected actions: ' + '; '.join(expected[:3]))
                    next_steps = guidance.get('next_steps') or []
                    if next_steps:
                        ui_prompt_parts.append('Next steps: ' + '; '.join(next_steps[:2]))
                    ui_prompt = '\n'.join(ui_prompt_parts)

                    session.chat_history.append({
                        "role": "assistant",
                        "content": transition_text or ui_prompt,
                        "timestamp": datetime.utcnow().isoformat(),
                        "agent_name": agent.name,
                        "phase": next_phase.name,
                        "transition": True,
                    })
                    session.add_log(f"Transition message generated for {next_phase.name} via {agent.name}")
            except Exception as e:
                logger.warning(f"Failed to generate transition message: {e}")

            session.add_log(f"Advanced to {next_phase.name} phase")
            self._persist_to_db(session)

            return {
                "success": True,
                "new_phase": next_phase.name,
                "progress": session.overall_progress,
                "transition_message": transition_text,
                "ui_prompt": ui_prompt,
                "phase_details": next_phase.to_dict(),
            }

        return {"success": False, "message": "Already at final phase"}

    async def accept_deploy(self, session_id: str, publish_to_github: bool = False, repo_name: Optional[str] = None) -> Dict[str, Any]:
        """Accept the virtual deployment and finalize the MVP."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        if session.current_phase_index < len(session.phases) - 1:
            return {"success": False, "message": "Must be in Virtual Deploy phase to accept deployment"}

        session.deploy_accepted = True
        session.current_phase.status = "completed"
        session.current_phase.progress = 100
        overall_progress = 100

        deploy_url = None
        if publish_to_github and session.github_connected:
            try:
                result = await self.publish_to_github(session_id, repo_name)
                if result.get("success"):
                    deploy_url = result.get("repo_url")
                    session.deploy_github_url = deploy_url
                    session.add_log(f"Deployment accepted and published to GitHub: {deploy_url}")
            except Exception as e:
                session.add_log(f"GitHub publish failed (deploy still accepted): {e}", "error")

        session.add_log("Virtual deployment accepted — project finalized")
        self._persist_to_db(session)

        return {
            "success": True,
            "message": "Deployment accepted and project finalized",
            "overall_progress": overall_progress,
            "deploy_url": deploy_url or session.deploy_github_url,
        }

    async def request_changes(self, session_id: str, feedback: str) -> Dict[str, Any]:
        """Request changes by going back to the Build phase."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        # Go back to Build phase (index 4)
        session.current_phase_index = 4
        session.current_phase.status = "active"
        session.current_phase.progress = 50

        # Add feedback as a user message in chat history
        session.chat_history.append({
            "role": "user",
            "content": f"[Change Request] {feedback}",
            "timestamp": datetime.utcnow().isoformat(),
            "mode": "plan",
        })

        session.add_log(f"Changes requested: back to Build phase. Feedback: {feedback[:100]}...")
        self._persist_to_db(session)

        return {
            "success": True,
            "message": "Returned to Build phase for changes",
            "new_phase": "Build",
            "feedback": feedback,
        }

    async def connect_github(self, session_id: str, github_token: str, repo_name: Optional[str] = None) -> Dict[str, Any]:
        """Connect GitHub account, get user info, and optionally clone a repo."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        if not github_token:
            raise ValueError("GitHub token is required to connect.")

        session.github_token = github_token

        try:
            async with httpx.AsyncClient() as client:
                headers = {"Authorization": f"token {github_token}"}
                user_response = await client.get("https://api.github.com/user", headers=headers)
                user_response.raise_for_status()
                user_data = user_response.json()
                login = user_data.get("login")
                if not login:
                    raise ValueError("Could not retrieve GitHub username.")

                session.github_username = login
                session.github_connected = True

                # Save GitHub connection to database for the user
                try:
                    from ..core.database import save_user_github_connection

                    save_user_github_connection(session.user_email, github_token, login)
                except Exception as db_err:
                    logger.warning(f"Could not save GitHub connection to DB: {db_err}")

                # 2. If repo_name is provided, clone it
                if repo_name:
                    # Ensure the repo_name is in the format 'owner/repo'
                    if "/" not in repo_name:
                        full_repo_name = f"{login}/{repo_name}"
                    else:
                        full_repo_name = repo_name

                    if not session.workspace_path:
                        raise ValueError("Workspace path is not set for this session.")

                    session.github_repo_name = full_repo_name
                    clone_url = f"https://{login}:{github_token}@github.com/{full_repo_name}.git"
                    session.add_log(f"Cloning repository {full_repo_name} into workspace...")

                    # Clone into a temporary directory and move contents to avoid "directory not empty" error
                    temp_clone_dir = session.workspace_path.parent / f"{session.session_id}_temp_clone"
                    if temp_clone_dir.exists():
                        import shutil

                        shutil.rmtree(temp_clone_dir)
                    temp_clone_dir.mkdir()

                    process = await asyncio.create_subprocess_exec(
                        "git",
                        "clone",
                        clone_url,
                        ".",
                        cwd=str(temp_clone_dir),
                        stdout=asyncio.subprocess.PIPE,
                        stderr=asyncio.subprocess.PIPE,
                    )
                    stdout, stderr = await process.communicate()

                    if process.returncode != 0:
                        raise Exception(f"Git clone failed: {stderr.decode().strip()}")

                    # Move cloned files to the actual workspace
                    for item in temp_clone_dir.iterdir():
                        if item.name != ".git":
                            import shutil

                            shutil.move(str(item), str(session.workspace_path / item.name))

                    # Move .git directory separately
                    git_dir = temp_clone_dir / ".git"
                    if git_dir.exists():
                        import shutil

                        shutil.move(str(git_dir), str(session.workspace_path / ".git"))

                    import shutil

                    shutil.rmtree(temp_clone_dir)

                    session.add_log(f"Successfully cloned repository {full_repo_name}.")

                session.add_log(f"GitHub account connected for user: {session.github_username}")

            return {
                "success": True,
                "message": f"GitHub connected as {session.github_username}",
                "github_username": session.github_username,
            }
        except Exception as e:
            logger.error(f"Error connecting to GitHub: {e}")
            session.add_log(f"Failed to connect GitHub: {str(e)}", "error")
            session.github_connected = False
            return {"success": False, "message": str(e)}

    async def get_github_repos(self, session_id: str, user_email: Optional[str] = None) -> List[Dict[str, Any]]:
        """Fetch list of repositories for the connected GitHub user, filtered by permissions."""
        session = self.get_session(session_id)
        if not session or not session.github_token:
            raise ValueError("GitHub not connected for this session.")

        # Get user's saved repo permissions
        allowed_repos = set()
        if user_email:
            try:
                from ..core.database import get_user_github_repo_permissions

                perms = get_user_github_repo_permissions(user_email)
                allowed_repos = {p["repo_name"] for p in perms if p.get("permission_granted", True)}
            except Exception as e:
                logger.warning(f"Could not fetch repo permissions: {e}")

        repos: List[Dict[str, Any]] = []
        page = 1
        try:
            async with httpx.AsyncClient() as client:
                while True:
                    headers = {"Authorization": f"token {session.github_token}"}
                    repos_url = f"https://api.github.com/user/repos?type=all&per_page=100&page={page}"
                    response = await client.get(repos_url, headers=headers)
                    response.raise_for_status()
                    current_page_repos = response.json()

                    if not current_page_repos:
                        break

                    if allowed_repos:
                        current_page_repos = [r for r in current_page_repos if r["full_name"] in allowed_repos]

                    repos.extend(current_page_repos)
                    page += 1

            session.add_log(f"Fetched {len(repos)} repositories from GitHub.")
            return repos
        except Exception as e:
            logger.error(f"Error fetching GitHub repos: {e}")
            session.add_log(f"Error fetching GitHub repos: {str(e)}", "error")
            return []

    async def create_github_repo(
        self, session_id: str, repo_name: str, description: str = "", private: bool = False
    ) -> Dict[str, Any]:
        """Create a new GitHub repository for the session."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")
        if not session.github_token:
            raise ValueError("GitHub not connected for this session.")

        # Sanitize repo name
        safe_name = repo_name.strip().lower().replace(" ", "-").replace("_", "-")
        import re as _re
        safe_name = _re.sub(r"[^a-z0-9\-]", "", safe_name) or "my-project"

        try:
            async with httpx.AsyncClient() as client:
                headers = {
                    "Authorization": f"token {session.github_token}",
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json",
                }
                payload = {
                    "name": safe_name,
                    "description": description or f"Built with Custodian AI – {session.product_idea[:80]}",
                    "private": private,
                    "auto_init": True,  # creates initial commit with README
                }
                response = await client.post(
                    "https://api.github.com/user/repos",
                    headers=headers,
                    json=payload,
                )
                if response.status_code == 422:
                    # Repo already exists — just use it
                    repo_data = {"full_name": f"{session.github_username}/{safe_name}", "html_url": f"https://github.com/{session.github_username}/{safe_name}"}
                elif response.status_code not in (200, 201):
                    raise Exception(f"GitHub API error {response.status_code}: {response.text}")
                else:
                    repo_data = response.json()

                full_name = repo_data.get("full_name", f"{session.github_username}/{safe_name}")
                html_url = repo_data.get("html_url", f"https://github.com/{full_name}")

                session.github_repo_name = full_name
                session.add_log(f"GitHub repository created: {html_url}")

                return {
                    "success": True,
                    "repo_name": full_name,
                    "repo_url": html_url,
                    "message": f"Repository '{full_name}' created successfully",
                }
        except Exception as e:
            logger.error(f"Error creating GitHub repo: {e}")
            session.add_log(f"Failed to create repo: {str(e)}", "error")
            return {"success": False, "message": str(e)}

    async def publish_to_github(
        self, session_id: str, repo_name: Optional[str] = None, commit_message: str = "Build by Custodian AI"
    ) -> Dict[str, Any]:
        """
        Publish all workspace files to GitHub via the Contents API.
        Creates/updates each file individually — no git CLI required.
        If repo_name is provided and no repo is connected, creates it first.
        """
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")
        if not session.github_token:
            raise ValueError("GitHub not connected. Please connect GitHub first.")

        # Determine target repo
        target_repo = session.github_repo_name or repo_name
        if not target_repo:
            # Auto-create repo from product idea
            idea_slug = (session.product_idea or "my-project")[:40]
            create_result = await self.create_github_repo(session_id, idea_slug)
            if not create_result.get("success"):
                return create_result
            target_repo = create_result["repo_name"]

        if not session.files:
            # Generate a basic index.html if no files exist
            await self.write_file(session_id, "index.html", self._generate_placeholder_html(session))
            await self.write_file(session_id, "README.md", f"# {session.product_idea}\n\nBuilt with [Custodian AI](https://github.com/Tushar1224/CustodianAIArmy).\n")

        import base64 as _b64
        pushed = []
        failed = []

        async with httpx.AsyncClient(timeout=30.0) as client:
            headers = {
                "Authorization": f"token {session.github_token}",
                "Accept": "application/vnd.github.v3+json",
            }
            owner, repo = (target_repo.split("/", 1) if "/" in target_repo else (session.github_username, target_repo))

            for file_path, content in session.files.items():
                try:
                    encoded = _b64.b64encode(content.encode("utf-8")).decode("ascii")
                    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"

                    # Check if file already exists (need its SHA to update)
                    sha = None
                    check_resp = await client.get(api_url, headers=headers)
                    if check_resp.status_code == 200:
                        sha = check_resp.json().get("sha")

                    put_payload: Dict[str, Any] = {
                        "message": commit_message,
                        "content": encoded,
                    }
                    if sha:
                        put_payload["sha"] = sha

                    put_resp = await client.put(api_url, headers=headers, json=put_payload)
                    if put_resp.status_code in (200, 201):
                        pushed.append(file_path)
                        session.add_log(f"Pushed: {file_path}", "success")
                    else:
                        failed.append(file_path)
                        session.add_log(f"Failed to push {file_path}: {put_resp.text}", "error")
                except Exception as e:
                    failed.append(file_path)
                    session.add_log(f"Error pushing {file_path}: {str(e)}", "error")

        repo_url = f"https://github.com/{owner}/{repo}"
        pages_url = f"https://{owner}.github.io/{repo}"
        session.add_log(f"Published {len(pushed)} files to {repo_url}")
        # Persist publishing result
        self._persist_to_db(session)

        return {
            "success": len(pushed) > 0,
            "repo_url": repo_url,
            "pages_url": pages_url,
            "files_pushed": pushed,
            "files_failed": failed,
            "message": f"Published {len(pushed)} files to {repo_url}",
        }

    def _generate_placeholder_html(self, session) -> str:
        """Generate a basic placeholder HTML when no files exist yet."""
        idea = session.product_idea or "My Product"
        return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{idea}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }}
        .hero {{ text-align: center; padding: 2rem; }}
        h1 {{ font-size: 3rem; font-weight: 900; background: linear-gradient(135deg, #06b6d4, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        p {{ margin-top: 1rem; color: #94a3b8; font-size: 1.1rem; }}
        .badge {{ margin-top: 2rem; display: inline-block; padding: 0.5rem 1.25rem; border: 1px solid #334155; border-radius: 9999px; font-size: 0.875rem; color: #64748b; }}
    </style>
</head>
<body>
    <div class="hero">
        <h1>{idea}</h1>
        <p>Built with Custodian AI Army</p>
        <div class="badge">🚀 Phase: {session.current_phase.name if session.current_phase else "Building"}</div>
    </div>
</body>
</html>"""

    async def _save_phase_artifacts(self, session: MVPSession):
        """Save plan artifacts from completed phase chat as session files."""
        try:
            current_phase_name = session.phases[session.current_phase_index - 1].name if session.current_phase_index > 0 else None
            if not current_phase_name:
                return

            # Get all assistant messages from this phase
            phase_msgs = [m for m in session.chat_history if m.get("phase") == current_phase_name and m.get("role") == "assistant"]
            if not phase_msgs:
                return

            # Extract content after marker tags
            all_content = "\n\n".join(m.get("content", "") for m in phase_msgs)

            if current_phase_name == "Planning":
                # Try to extract plan doc section
                if "---PLAN DOC---" in all_content:
                    plan_content = all_content.split("---PLAN DOC---")[-1].strip()
                else:
                    plan_content = all_content
                session.files["plan.md"] = f"# {session.product_idea} — Plan\n\n{plan_content}"
                session.add_log("Saved plan.md artifact")

            elif current_phase_name == "Review":
                if "---REVIEWED PLAN---" in all_content:
                    reviewed = all_content.split("---REVIEWED PLAN---")[-1].strip()
                else:
                    reviewed = all_content
                # If plan.md exists, merge
                existing_plan = session.files.get("plan.md", "")
                plan_header = f"## Original Plan\n{existing_plan}\n\n" if existing_plan else ""
                session.files["reviewed-plan.md"] = (
                    f"# {session.product_idea} — Reviewed Plan\n\n"
                    f"{plan_header}"
                    f"## Review Notes\n{reviewed}"
                )
                session.add_log("Saved reviewed-plan.md artifact")

            elif current_phase_name == "Polish":
                if "---UX CHANGES---" in all_content:
                    ux_changes = all_content.split("---UX CHANGES---")[-1].strip()
                else:
                    ux_changes = all_content
                reviewed = session.files.get("reviewed-plan.md", "")
                arch_header = f"## Reviewed Architecture\n{reviewed}\n\n" if reviewed else ""
                session.files["prd.md"] = (
                    f"# {session.product_idea} — Product Requirements Document\n\n"
                    f"{arch_header}"
                    f"## UX & UI Design Decisions\n{ux_changes}"
                )
                session.add_log("Saved prd.md artifact")

            # Persist artifacts to DB
            self._persist_to_db(session)

        except Exception as e:
            logger.warning(f"Failed to save phase artifacts: {e}")

    def get_chat_total_chars(self, session_id: str) -> int:
        """Get total character count of all messages in chat history."""
        session = self.get_session(session_id)
        if not session:
            return 0
        return sum(len(m.get("content", "")) for m in session.chat_history)

    async def compact_chat_history(
        self, session_id: str, threshold: int = 8000, keep_recent: int = 4
    ) -> Dict[str, Any]:
        """Compact old chat messages by summarizing them via AI."""
        session = self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        total_chars = sum(len(m.get("content", "")) for m in session.chat_history)
        if total_chars < threshold:
            return {"compacted": False, "chat_history": session.chat_history, "message": "Under threshold"}

        to_compact = session.chat_history[:-keep_recent] if len(session.chat_history) > keep_recent else []
        recent = session.chat_history[-keep_recent:] if len(session.chat_history) > keep_recent else session.chat_history

        if not to_compact:
            return {"compacted": False, "chat_history": session.chat_history, "message": "Nothing to compact"}

        try:
            agent = self._get_agent_for_specialization("coordinator")
            if not agent:
                agent = self.agent_manager.get_agent_by_name("CustodianAI")

            compact_text = "\n".join(
                f"{m.get('role', 'unknown')}: {m.get('content', '')}" for m in to_compact
            )

            current_phase = session.current_phase
            phase_context = current_phase.name if current_phase else "building"
            summary_prompt = (
                f"Summarize the following MVP building conversation for the {phase_context} phase. "
                f"Product idea: {session.product_idea}\n\n"
                f"Preserve: what decisions were made, user preferences, what was built so far, "
                f"and the current state of the project. Be concise (2-4 sentences)."
                f"\n\nConversation to summarize:\n{compact_text}"
            )

            from src.agents.base_agent import AgentMessage
            msg = AgentMessage(sender_id="mvp_builder", receiver_id=agent.agent_id, content=summary_prompt)
            response = await self.agent_manager.send_message(msg)
            summary = response.content.strip()

            compacted = [{"role": "system", "content": f"[Compacted] {summary}", "timestamp": datetime.utcnow().isoformat()}, *recent]
            session.chat_history = compacted
            self._persist_to_db(session)
            session.add_log(f"Chat compacted: {len(to_compact)} messages summarized")
            return {"compacted": True, "chat_history": compacted, "message": f"Compacted {len(to_compact)} messages"}
        except Exception as e:
            logger.warning(f"Chat compaction failed: {e}")
            return {"compacted": False, "chat_history": session.chat_history, "error": str(e)}

    async def write_file(self, session_id: str, path: str, content: str) -> bool:
        """Write a file to the session workspace."""
        session = self.get_session(session_id)
        if not session:
            return False

        if session.workspace_path:
            full_path = session.workspace_path / path
            full_path.parent.mkdir(parents=True, exist_ok=True)
            full_path.write_text(content)
            session.files[path] = content
            session.add_log(f"Created file: {path}")
            session.updated_at = datetime.utcnow()
            self._persist_to_db(session)
            return True

        return False

    async def read_file(self, session_id: str, path: str) -> Optional[str]:
        """Read a file from the session workspace."""
        session = self.get_session(session_id)
        if not session or not session.workspace_path:
            return None

        full_path = session.workspace_path / path
        if full_path.exists():
            return full_path.read_text()
        return None

    def list_files(self, session_id: str) -> List[str]:
        """List all files in the session workspace."""
        session = self.get_session(session_id)
        if not session:
            return []
        return list(session.files.keys())

    def get_workspace_files_tree(self, session_id: str) -> List[Dict[str, Any]]:
        """Get file tree structure for the workspace."""
        session = self.get_session(session_id)
        if not session:
            return []

        tree: List[Dict[str, Any]] = []
        for file_path in sorted(session.files.keys()):
            parts = file_path.split("/")
            current_level = tree

            for i, part in enumerate(parts):
                if i == len(parts) - 1:
                    current_level.append(
                        {
                            "type": "file",
                            "name": part,
                            "path": file_path,
                        }
                    )
                else:
                    existing = next((x for x in current_level if x.get("name") == part), None)
                    if not existing:
                        dir_node = {"type": "directory", "name": part, "children": []}
                        current_level.append(dir_node)
                        current_level = dir_node["children"]
                    else:
                        current_level = existing.get("children", [])

        return tree


# Global MVP Builder instance
_mvp_builder: Optional[MVPBuilder] = None


def get_mvp_builder(agent_manager: AgentManager) -> MVPBuilder:
    """Get or create the global MVP Builder instance."""
    global _mvp_builder
    if _mvp_builder is None:
        _mvp_builder = MVPBuilder(agent_manager)
    return _mvp_builder