"""
Tests for ClaudeAgent and ClaudeCodeAgent using mocked Anthropic SDK.

Pattern:
  - Mock anthropic.AsyncAnthropic at the module level so no real API calls occur.
  - For each test, configure the mock's return values for .messages.create() etc.
  - Assert the agent properly processes the mock response or error.
"""

import sys
import json
import pytest
from unittest.mock import AsyncMock, MagicMock, patch, PropertyMock

sys.path.insert(0, "D:/CustodianAIArmy")

from src.agents.base_agent import AgentMessage, AgentType, AgentCapability


# ---------------------------------------------------------------------------
# Fixtures – shared mock objects
# ---------------------------------------------------------------------------

@pytest.fixture
def mock_anthropic_client():
    """Return a (patcher, mock_client) pair that replaces
    anthropic.AsyncAnthropic so no real HTTP calls are made."""

    # The Message object returned by client.messages.create()
    mock_message = MagicMock()
    mock_message.stop_reason = "end_turn"
    mock_message.content = [MagicMock()]
    mock_message.content[0].type = "text"
    mock_message.content[0].text = "Hello from mocked Claude!"

    # The stream / async-context-manager chain
    mock_stream = MagicMock()
    mock_stream.__aenter__ = AsyncMock(return_value=mock_stream)
    mock_stream.__aexit__ = AsyncMock()

    async def _async_text_iter():
        for t in ["chunk1 ", "chunk2 ", "chunk3"]:
            yield t

    mock_stream.__stream_text__ = MagicMock(return_value=_async_text_iter())

    # The top-level client
    mock_client = MagicMock(spec_set=["messages", "beta"])
    mock_client.messages = MagicMock()
    mock_client.messages.create = AsyncMock(return_value=mock_message)
    mock_client.messages.stream = MagicMock(return_value=mock_stream)

    # beta.messages.count_tokens
    mock_count = MagicMock()
    mock_count.input_tokens = 42
    mock_client.beta.messages.count_tokens = AsyncMock(return_value=mock_count)

    patcher = patch("src.agents.claude_agent.anthropic.AsyncAnthropic", return_value=mock_client)
    patcher.start()
    yield mock_client
    patcher.stop()


@pytest.fixture
def mock_anthropic_client_for_code():
    """Same pattern, but patches claude_code_agent instead."""
    mock_message = MagicMock()
    mock_message.stop_reason = "end_turn"
    mock_message.content = [MagicMock()]
    mock_message.content[0].type = "text"
    mock_message.content[0].text = "Code agent reply"

    mock_client = MagicMock()
    mock_client.messages.create = AsyncMock(return_value=mock_message)

    patcher = patch(
        "src.agents.claude_code_agent.anthropic.AsyncAnthropic", return_value=mock_client
    )
    patcher.start()
    yield mock_client
    patcher.stop()


# =========================================================================
# ClaudeAgent tests
# =========================================================================

class TestClaudeAgent:
    """ClaudeAgent – SDK integration & message processing."""

    def test_init_defaults(self):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent(agent_id="test-01", name="TestAgent")
        assert agent.agent_id == "test-01"
        assert agent.name == "TestAgent"
        assert agent.specialization == "general"
        assert agent._client is None

    def test_get_client_creates_and_caches(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent()
        client_1 = agent._get_client()
        client_2 = agent._get_client()
        assert client_1 is not None
        assert client_1 is client_2  # same instance

    @patch("src.agents.claude_agent.settings.ANTHROPIC_API_KEY", "")
    def test_get_client_raises_when_no_key(self):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent()
        with pytest.raises(ValueError, match="ANTHROPIC_API_KEY not configured"):
            agent._get_client()

    @pytest.mark.asyncio
    async def test_process_message_returns_text(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent(specialization="general")
        msg = AgentMessage(
            sender_id="user",
            receiver_id=agent.agent_id,
            content="Hello Claude!",
        )
        result = await agent.process_message(msg)
        assert result.message_type == "text"
        assert "mocked Claude" in result.content

    @pytest.mark.asyncio
    async def test_process_message_propagates_metadata(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent(specialization="general")
        msg = AgentMessage(
            sender_id="user",
            receiver_id=agent.agent_id,
            content="Hi",
            metadata={"context": {"extra": "data"}, "history": []},
        )
        result = await agent.process_message(msg)
        assert result.metadata["original_message_id"] == msg.id
        assert result.metadata["provider"] == "anthropic_claude"

    @pytest.mark.asyncio
    async def test_process_message_handles_api_error(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent
        import anthropic

        # Make create() raise RateLimitError on first call
        mock_anthropic_client.messages.create = AsyncMock(
            side_effect=anthropic.RateLimitError(
                message="rate limited",
                response=MagicMock(status_code=429),
                body={},
            )
        )

        agent = ClaudeAgent(specialization="general")
        msg = AgentMessage(sender_id="user", receiver_id=agent.agent_id, content="test")
        result = await agent.process_message(msg)
        assert "Rate limit" in result.content
        assert result.message_type == "text"

    @pytest.mark.asyncio
    async def test_process_message_handles_bad_key(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent
        import anthropic

        mock_anthropic_client.messages.create = AsyncMock(
            side_effect=anthropic.APIStatusError(
                message="invalid key",
                response=MagicMock(status_code=401),
                body={},
            )
        )

        agent = ClaudeAgent(specialization="general")
        msg = AgentMessage(sender_id="user", receiver_id=agent.agent_id, content="test")
        result = await agent.process_message(msg)
        assert "Invalid API key" in result.content

    @pytest.mark.asyncio
    async def test_count_tokens(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent()
        count = await agent.count_tokens(
            messages=[{"role": "user", "content": "hello"}]
        )
        assert count == 42

    @pytest.mark.asyncio
    async def test_stream_response_yields_chunks(self, mock_anthropic_client):
        from src.agents.claude_agent import ClaudeAgent

        agent = ClaudeAgent()
        chunks = []
        async for chunk in agent.stream_response(
            system_prompt="system", user_message="hello"
        ):
            chunks.append(chunk)
        assert len(chunks) == 3
        assert chunks == ["chunk1 ", "chunk2 ", "chunk3"]


# =========================================================================
# ClaudeCodeAgent tests
# =========================================================================

class TestClaudeCodeAgent:
    """ClaudeCodeAgent – SDK fallback code path."""

    @pytest.mark.asyncio
    async def test_fallback_to_api_returns_text(self, mock_anthropic_client_for_code):
        from src.agents.claude_code_agent import ClaudeCodeAgent

        agent = ClaudeCodeAgent()
        result = await agent._fallback_to_api("write code please")
        assert "Code agent reply" in result

    @pytest.mark.asyncio
    async def test_fallback_to_api_rate_limit(self, mock_anthropic_client_for_code):
        from src.agents.claude_code_agent import ClaudeCodeAgent
        import anthropic

        mock_anthropic_client_for_code.messages.create = AsyncMock(
            side_effect=anthropic.RateLimitError(
                message="",
                response=MagicMock(status_code=429),
                body={},
            )
        )
        agent = ClaudeCodeAgent()
        result = await agent._fallback_to_api("test")
        assert "Rate limit" in result

    @pytest.mark.asyncio
    async def test_fallback_to_api_bad_key(self, mock_anthropic_client_for_code):
        from src.agents.claude_code_agent import ClaudeCodeAgent
        import anthropic

        mock_anthropic_client_for_code.messages.create = AsyncMock(
            side_effect=anthropic.APIStatusError(
                message="",
                response=MagicMock(status_code=401),
                body={},
            )
        )
        agent = ClaudeCodeAgent()
        result = await agent._fallback_to_api("test")
        assert "Invalid API key" in result

    @pytest.mark.asyncio
    async def test_fallback_to_api_no_key(self):
        from src.agents.claude_code_agent import ClaudeCodeAgent

        with patch(
            "src.agents.claude_code_agent.ClaudeCodeAgent._get_api_key",
            return_value="",
        ):
            agent = ClaudeCodeAgent()
            result = await agent._fallback_to_api("test")
            assert "Claude Code CLI is not installed" in result
