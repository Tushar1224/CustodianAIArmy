"""
API Routes for Custodian AI Army
"""
import json
import asyncio
from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Request, WebSocket, WebSocketDisconnect, Query, UploadFile, File, Form
from fastapi.responses import JSONResponse, StreamingResponse
import subprocess
import random
import json
import os
import sqlite3
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
import uuid
from datetime import datetime

from src.agents.agent_manager import AgentManager
from src.core.database import (
    get_chats_for_user, save_chat_session, DB_PATH,
    get_user_api_keys, get_user_api_keys_raw, save_user_api_keys, delete_user_api_key, get_user_github_token, save_custom_agent_config, get_custom_agent_config,
    get_user_plan, check_and_increment_rate_limit, upgrade_user_plan, save_payment,
    save_resume, get_user_resumes, get_resume, get_resume_count, delete_resume, save_resume_chat_history,
    save_template, list_templates, get_template_by_name,
    delete_mvp_session, list_mvp_sessions
)
from src.agents.astro_agent import AstroAgent # Import AstroAgent
from src.agents.base_agent import AgentMessage, AgentCapability, BaseAgent
from src.core.logging_config import get_logger
from src.api.auth import get_current_user_from_cookies, User
from src.api.build import get_mvp_builder, MVPBuilder
from src.core.document_extractor import extract_text

# Initialize router and logger
router = APIRouter()
logger = get_logger("api")

# Global agent manager instance
agent_manager = AgentManager()

# Chat compaction: when total message characters exceed this, compact old messages
CHAT_COMPACTION_CHAR_THRESHOLD = 8000
CHAT_COMPACTION_KEEP_RECENT = 4  # keep last N messages as-is


# Global MVP Builder instance (initialized on first use)
_mvp_builder: Optional[MVPBuilder] = None


def get_mvp_builder_instance() -> MVPBuilder:
    """Get or create the MVP Builder instance."""
    global _mvp_builder
    if _mvp_builder is None:
        _mvp_builder = get_mvp_builder(agent_manager)
    return _mvp_builder


async def get_owned_mvp_session(
    session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
) -> "MVPSession":
    """
    Dependency to get an MVP session and verify ownership.
    """
    mvp_builder = get_mvp_builder_instance()
    session = mvp_builder.get_session(session_id)

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Verify ownership
    if session.user_email != current_user.email:
        raise HTTPException(status_code=403, detail="Not authorized")

    return session


# Pydantic models for MVP Builder API
class MVPCreateSessionRequest(BaseModel):
    product_idea: str


class MVPSessionResponse(BaseModel):
    session_id: str
    product_idea: str
    current_phase: str
    overall_progress: int
    mode: str
    github_connected: bool


class MVPMessageRequest(BaseModel):
    session_id: str
    message: str
    agent_name: Optional[str] = None
    mode: str = "plan"


class MVPAdvancePhaseRequest(BaseModel):
    session_id: str

class MVPPublishRequest(BaseModel):
    session_id: str
    repo_name: str

class MVPConnectGitHubRequest(BaseModel):
    session_id: str
    github_token: str
    repo_name: Optional[str] = None

class MVPDisconnectGitHubRequest(BaseModel):
    session_id: str

class MVPCreateRepoRequest(BaseModel):
    session_id: str
    repo_name: str
    description: str = ""
    private: bool = False

class MVPSelectGitHubRepoRequest(BaseModel):
    session_id: str

class MVPRequestChangesRequest(BaseModel):
    session_id: str
    feedback: str

class MVPAcceptDeployRequest(BaseModel):
    session_id: str
    publish_to_github: bool = False
    repo_name: Optional[str] = None

class CustomAgentConfigRequest(BaseModel):
    agent_id: Optional[str] = None
    name: str
    description: str
    skills: List[str]

# Pydantic models for API requests/responses
class TaskRequest(BaseModel):
    description: str
    task_type: str = "general"
    parameters: Dict[str, Any] = {}
    preferred_agent: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    agent_name: Optional[str] = None
    agent_id: Optional[str] = None
    history: Optional[List[Dict[str, Any]]] = []

class ChatSessionSaveRequest(BaseModel):
    id: Optional[str] = None
    user_email: str
    title: str
    start_time: Optional[str] = None
    messages: List[Dict[str, Any]]

class CodeExecutionRequest(BaseModel):
    code: str
    language: str

class MessageRequest(BaseModel):
    content: str
    receiver_id: str
    message_type: str = "text"
    metadata: Dict[str, Any] = {}

class AgentStatusResponse(BaseModel):
    agent_id: str
    name: str
    type: str
    status: str
    specialization: Optional[str] = None
    capabilities: List[Dict[str, Any]]
    sub_agents: List[str]
    parent_agent: Optional[str]
    created_at: str
    last_activity: str

class ArmyStatusResponse(BaseModel):
    total_agents: int
    main_agents: int
    sub_agents: int
    status_distribution: Dict[str, int]
    agents: List[AgentStatusResponse]
    last_updated: str

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@router.get("/army/status", response_model=ArmyStatusResponse)
async def get_army_status():
    """Get the status of the entire agent army"""
    try:
        status = agent_manager.get_army_status()
        return status
    except Exception as e:
        logger.error(f"Error getting army status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/agents")
async def list_agents():
    """List all agents"""
    try:
        agents = []
        for agent in agent_manager.agents.values():
            agent_info = {
                "agent_id": agent.agent_id,
                "name": agent.name,
                "type": agent.agent_type.value,
                "status": agent.status.value,
                "specialization": getattr(agent, 'specialization', None),
                "capabilities": [cap.dict() for cap in agent.capabilities],
                "sub_agents_count": len(agent.sub_agents),
                "parent_agent": agent.parent_agent.agent_id if agent.parent_agent else None
            }
            agents.append(agent_info)
        
        return {"agents": agents, "total": len(agents)}
    except Exception as e:
        logger.error(f"Error listing agents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/agents/{agent_id}")
async def get_agent_details(agent_id: str):
    """Get detailed information about a specific agent"""
    try:
        agent = agent_manager.get_agent(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        return agent.get_status()
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting agent details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/agents/by-name/{agent_name}")
async def get_agent_by_name(agent_name: str):
    """Get agent information by name"""
    try:
        agent = agent_manager.get_agent_by_name(agent_name)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        return agent.get_status()
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting agent by name: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/agents/specialization/{specialization}")
async def get_agents_by_specialization(specialization: str):
    """Get all agents with a specific specialization"""
    try:
        agents = agent_manager.get_agents_by_specialization(specialization)
        agent_list = [agent.get_status() for agent in agents]
        
        return {
            "specialization": specialization,
            "agents": agent_list,
            "count": len(agent_list)
        }
    except Exception as e:
        logger.error(f"Error getting agents by specialization: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# This endpoint is accessible at /api/v1/agents/custom
@router.get("/agents/custom")
async def get_custom_agents_page(
    current_user: User = Depends(get_current_user_from_cookies)
):
    """
    Placeholder endpoint for the custom agents management page.
    This will return a list of custom agents configured by the user.
    """
    try:
        # In a real implementation, you would fetch custom agent configurations
        # from a database associated with the current_user.
        # For now, we'll return a placeholder or any saved configs.
        custom_agent_configs = get_custom_agent_config(current_user.email)
        return {
            "message": "Welcome to your Custom Agents management page!",
            "user_email": current_user.email,
            "custom_agents": custom_agent_configs
        }
    except Exception as e:
        logger.error(f"Error accessing custom agents page: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/agents/custom")
async def create_or_update_custom_agent(
    request: CustomAgentConfigRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """
    Create or update a custom agent configuration for the user.
    This allows users to define skills and prompts for their agents.
    """
    try:
        # Save the custom agent configuration to the database
        config_data = request.dict()
        config_data["user_email"] = current_user.email
        agent_id = save_custom_agent_config(config_data)

        return {
            "success": True,
            "message": f"Custom agent '{request.name}' saved successfully.",
            "agent_id": agent_id
        }
    except Exception as e:
        logger.error(f"Error creating/updating custom agent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tasks/execute")
async def execute_task(task_request: TaskRequest, background_tasks: BackgroundTasks):
    """Execute a task using the most appropriate agent"""
    try:
        task = {
            "id": str(uuid.uuid4()),
            "type": task_request.task_type,
            "description": task_request.description,
            "parameters": task_request.parameters,
            "created_at": datetime.utcnow().isoformat()
        }
        
        logger.info(f"Executing task: {task['id']}")
        
        result = await agent_manager.execute_task(task, task_request.preferred_agent)
        
        return {
            "task_id": task["id"],
            "status": "completed",
            "result": result,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error executing task: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/messages/send")
async def send_message(message_request: MessageRequest):
    """Send a message to a specific agent"""
    try:
        message = AgentMessage(
            sender_id="user",
            receiver_id=message_request.receiver_id,
            content=message_request.content,
            message_type=message_request.message_type,
            metadata=message_request.metadata
        )
        
        response = await agent_manager.send_message(message)
        
        return {
            "message_id": message.id,
            "response": {
                "id": response.id,
                "content": response.content,
                "sender_id": response.sender_id,
                "message_type": response.message_type,
                "timestamp": response.timestamp.isoformat(),
                "metadata": response.metadata
            }
        }
        
    except Exception as e:
        logger.error(f"Error sending message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/messages/broadcast")
async def broadcast_message(content: str):
    """Broadcast a message to all agents"""
    try:
        responses = await agent_manager.broadcast_message(content)
        
        response_data = []
        for response in responses:
            response_data.append({
                "id": response.id,
                "content": response.content,
                "sender_id": response.sender_id,
                "message_type": response.message_type,
                "timestamp": response.timestamp.isoformat(),
                "metadata": response.metadata
            })
        
        return {
            "broadcast_message": content,
            "responses": response_data,
            "response_count": len(response_data),
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error broadcasting message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/agents/available")
async def get_available_agents():
    """Get all currently available (idle) agents"""
    try:
        available_agents = agent_manager.get_available_agents()
        agent_list = [agent.get_status() for agent in available_agents]
        
        return {
            "available_agents": agent_list,
            "count": len(agent_list),
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error getting available agents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/agents/main")
async def get_main_agents():
    """Get all main agents"""
    # Use the same logic as /agents but filter for main agents
    agents = []
    for agent in agent_manager.agents.values():
        if agent.agent_type.value == "main":
            agent_info = {
                "agent_id": agent.agent_id,
                "name": agent.name,
                "type": agent.agent_type.value,
                "status": agent.status.value,
                "specialization": getattr(agent, 'specialization', 'general'),
                "capabilities": [cap.dict() for cap in agent.capabilities],
                "sub_agents_count": len(agent.sub_agents),
                "parent_agent": agent.parent_agent.agent_id if agent.parent_agent else None
            }
            agents.append(agent_info)
    
    return {
        "main_agents": agents,
        "count": len(agents),
        "timestamp": datetime.utcnow().isoformat()
    }

@router.post("/chat/guest")
async def guest_chat(chat_request: ChatRequest, request: Request):
    """Guest chat, 3 requests/day, no auth required."""
    try:
        # Use per-IP identifier so each device gets its own 3-request counter
        # Check X-Forwarded-For first (for reverse proxies / Vercel), fall back to direct client IP
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()
        else:
            client_ip = request.client.host if request.client else "unknown"
        guest_identifier = f"guest_{client_ip}"
        rate = check_and_increment_rate_limit(guest_identifier)
        if not rate["allowed"]:
            return {
                "agent_response": {
                    "content": (
                        "🔒 **You've used all 3 free daily requests as a guest.**\n\n"
                        "**Sign in with Google** to unlock:\n"
                        "- ✅ 20 requests per day\n"
                        "- ✅ Access to Gemini, Claude providers\n"
                        "- ✅ Chat history saved\n\n"
                        "[Sign in with Google →](/api/v1/auth/google)"
                    ),
                    "agent_name": "System",
                    "agent_id": "system",
                    "timestamp": datetime.utcnow().isoformat(),
                    "metadata": {"rate_limited": True}
                },
                "plan_info": rate
            }
        agent_name = chat_request.agent_name or "CustodianAI"
        target = agent_manager.get_agent_by_name(agent_name)
        if not target and chat_request.agent_id:
            target = agent_manager.get_agent(chat_request.agent_id)
        if not target:
            target = next(iter(agent_manager.main_agents.values()), None)
        if not target:
            raise HTTPException(status_code=404, detail="No agent available")
        msg = AgentMessage(
            sender_id="guest",
            receiver_id=target.agent_id,
            content=chat_request.message,
            message_type="chat"
        )
        response = await agent_manager.send_message(msg)
        return {
            "agent_response": {
                "content": response.content,
                "agent_name": target.name,
                "agent_id": target.agent_id,
                "specialization": getattr(target, "specialization", None),
                "timestamp": response.timestamp.isoformat(),
                "metadata": response.metadata
            },
            "plan_info": rate
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in guest chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user/plan")
async def get_user_plan_endpoint(request: Request):
    """Get plan info — guest-friendly (no auth required)"""
    from src.api.auth import get_user_from_session, decode_jwt_token
    email = "guest@custodian.ai"
    try:
        # Try session cookie
        session_id = request.cookies.get("session_id")
        if session_id:
            user = get_user_from_session(session_id)
            if user:
                email = user.email
        # Try JWT access_token cookie
        if email == "guest@custodian.ai":
            access_token = request.cookies.get("access_token")
            if access_token:
                payload = decode_jwt_token(access_token)
                if payload and payload.get("email"):
                    email = payload["email"]
    except Exception:
        pass
    plan_info = get_user_plan(email)
    return plan_info


@router.post("/chat")
async def chat_with_agent(
    request: ChatRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Chat with a specific agent or let the system choose the best one"""
    try:
        # Log security event - user is authenticated
        logger.info(f"Authenticated chat request from user: {current_user.email} (ID: {current_user.id})")

        # ── Rate limiting for free/pro users ──────────────────────────────────
        rate = check_and_increment_rate_limit(current_user.email)
        if not rate["allowed"]:
            return {
                "agent_response": {
                    "content": (
                        "⚠️ **Daily request limit reached.**\n\n"
                        "You have used all your free requests for today. "
                        "Your limit resets at midnight UTC.\n\n"
                        "Upgrade to **Pro** for 50 requests/day and priority access."
                    ),
                    "agent_name": "System",
                    "agent_id": "system",
                    "timestamp": datetime.utcnow().isoformat(),
                    "metadata": {"rate_limited": True}
                },
                "plan_info": rate
            }

        # Find the target agent
        target_agent = None
        
        if request.agent_id:
            target_agent = agent_manager.get_agent(request.agent_id)
        elif request.agent_name:
            target_agent = agent_manager.get_agent_by_name(request.agent_name)
        else:
            # Use CustodianAI as default
            target_agent = agent_manager.get_agent_by_name("CustodianAI")
        
        if not target_agent:
            # Last resort: any available main agent
            main_agents = agent_manager.get_main_agents()
            target_agent = main_agents[0] if main_agents else None
        
        if not target_agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        # Build conversation history (cap at last 20 messages to avoid token limits)
        history = request.history[-20:] if request.history else []

        # Create and send message
        chat_message = AgentMessage(
            sender_id="user",
            receiver_id=target_agent.agent_id,
            content=request.message,
            message_type="chat",
            metadata={"history": history}
        )
        
        response = await agent_manager.send_message(chat_message)
        
        return {
            "user_message": request.message,
            "agent_response": {
                "content": response.content,
                "agent_name": target_agent.name,
                "agent_id": target_agent.agent_id,
                "specialization": getattr(target_agent, 'specialization', None),
                "timestamp": response.timestamp.isoformat(),
                "metadata": response.metadata
            },
            "user_info": {
                "user_id": current_user.id,
                "user_email": current_user.email,
                "user_name": current_user.name
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


async def _stream_with_fallback(
    agent_message: AgentMessage,
    target_agent: Optional[BaseAgent] = None
):
    """
    Stream response from agent with automatic fallback.
    
    Tries providers in order: Gemini → Claude
    Falls back to next provider if current one fails.
    
    Args:
        agent_message: The message to process
        target_agent: The target agent to use
        
    Yields:
        Text chunks from the response
    """
    if not target_agent:
        raise ValueError("target_agent is required")
    
    # Try active provider first, then fallbacks
    original_provider = agent_manager.active_provider
    all_providers = ["gemini", "anthropic"]
    providers_to_try = [original_provider] + [p for p in all_providers if p != original_provider]
    
    for provider in providers_to_try:
        try:
            # Only switch provider if not already using the current one
            if agent_manager.active_provider != provider:
                logger.info(f"Switching to provider: {provider}")
                if not agent_manager.switch_provider(provider):
                    logger.warning(f"Failed to switch to provider {provider}")
                    continue
            
            # Get the updated agent after potential provider switch
            current_agent = agent_manager.get_agent(target_agent.agent_id)
            if not current_agent:
                current_agent = agent_manager.get_agent_by_name(target_agent.name)
            if not current_agent:
                current_agent = target_agent
            
            logger.info(f"Attempting to stream with {provider} provider")
            
            # Try to stream response
            has_streamed = False
            got_error = False
            try:
                async for chunk in current_agent.stream_message(agent_message):
                    if chunk:
                        # Detect error chunks (agents yield "Error: ..." instead of raising)
                        if chunk.startswith("Error:"):
                            got_error = True
                            logger.warning(f"Provider {provider} returned error: {chunk[:100]}")
                            break
                        has_streamed = True
                        yield chunk
                
                if got_error:
                    logger.warning(f"Provider {provider} failed with error, trying next provider")
                    continue
                if has_streamed:
                    logger.info(f"Successfully streamed with {provider} provider")
                    return
            except AttributeError:
                # Agent doesn't have stream_message method
                logger.warning(f"Agent doesn't support streaming with {provider}, trying next provider")
                continue
            except Exception as e:
                logger.warning(f"Error streaming with {provider}: {str(e)}, trying next provider")
                continue
                
        except Exception as e:
            logger.warning(f"Unexpected error with {provider}: {str(e)}, trying next provider")
            continue
    
    # If all fallbacks failed, try to restore original provider and yield error
    try:
        agent_manager.switch_provider(original_provider)
    except:
        pass
    
    yield "I'm sorry, I couldn't process your request. Both the Google and Anthropic AI services are currently unavailable. Please try again later."



@router.post("/chat/stream")
async def chat_stream(
    request: ChatRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """
    Stream chat response with automatic fallback.
    
    Primary provider: Gemini (Google Cloud)
    Fallback: Claude (Anthropic)
    """
    try:
        # Rate limiting
        rate = check_and_increment_rate_limit(current_user.email)
        if not rate["allowed"]:
            error_message = (
                "data: " + json.dumps({
                    "type": "error",
                    "content": "⚠️ Daily request limit reached"
                }) + "\n\n"
            )
            return StreamingResponse(
                iter([error_message]),
                media_type="text/event-stream"
            )

        # Find target agent
        target_agent = None
        if request.agent_id:
            target_agent = agent_manager.get_agent(request.agent_id)
        if not target_agent and request.agent_name:
            target_agent = agent_manager.get_agent_by_name(request.agent_name)
        if not target_agent:
            target_agent = agent_manager.get_agent_by_name("CustodianAI")
        if not target_agent:
            # Last resort: any available main agent
            main_agents = agent_manager.get_main_agents()
            target_agent = main_agents[0] if main_agents else None
        
        if not target_agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        # Build message
        history = request.history[-20:] if request.history else []
        chat_message = AgentMessage(
            sender_id="user",
            receiver_id=target_agent.agent_id,
            content=request.message,
            message_type="chat",
            metadata={"history": history}
        )
        
        async def generate():
            """Generator for streaming response with SSE format"""
            try:
                chunk_buffer = ""
                async for chunk in _stream_with_fallback(chat_message, target_agent):
                    if chunk:
                        chunk_buffer += chunk
                        # Yield chunks as server-sent events
                        yield f"data: {json.dumps({'type': 'message', 'content': chunk})}\n\n"
                
                # Send final event
                yield f"data: {json.dumps({'type': 'done'})}\n\n"
            except Exception as e:
                logger.error(f"Error in stream generation: {str(e)}")
                yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat stream: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/stream/guest")
async def chat_stream_guest(chat_request: ChatRequest, request: Request):
    """
    Stream chat response for guests with fallback.
    Guest limited to 3 requests per day.
    """
    try:
        # Rate limiting by IP
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()
        else:
            client_ip = request.client.host if request.client else "unknown"
        guest_identifier = f"guest_{client_ip}"
        
        rate = check_and_increment_rate_limit(guest_identifier)
        if not rate["allowed"]:
            error_message = (
                "data: " + json.dumps({
                    "type": "error",
                    "content": "🔒 You've used all 3 free daily requests. Sign in to get more!"
                }) + "\n\n"
            )
            return StreamingResponse(
                iter([error_message]),
                media_type="text/event-stream"
            )

        # Find target agent
        agent_name = chat_request.agent_name or "CustodianAI"
        target = agent_manager.get_agent_by_name(agent_name)
        if not target and chat_request.agent_id:
            target = agent_manager.get_agent(chat_request.agent_id)
        if not target:
            target = next(iter(agent_manager.main_agents.values()), None)
        if not target:
            raise HTTPException(status_code=404, detail="No agent available")
        
        # Build message
        chat_message = AgentMessage(
            sender_id="guest",
            receiver_id=target.agent_id,
            content=chat_request.message,
            message_type="chat"
        )
        
        async def generate():
            """Generator for streaming response"""
            try:
                async for chunk in _stream_with_fallback(chat_message, target):
                    if chunk:
                        yield f"data: {json.dumps({'type': 'message', 'content': chunk})}\n\n"
                
                yield f"data: {json.dumps({'type': 'done'})}\n\n"
            except Exception as e:
                logger.error(f"Error in guest stream: {str(e)}")
                yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in guest stream: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/agents/{agent_id}/stream")
async def stream_to_agent(
    agent_id: str,
    message_request: MessageRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """
    Stream message directly to a specific agent.
    """
    try:
        # Rate limiting
        rate = check_and_increment_rate_limit(current_user.email)
        if not rate["allowed"]:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")

        # Get agent
        agent = agent_manager.get_agent(agent_id)
        if not agent:
            agent = agent_manager.get_agent_by_name(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        # Build message
        message = AgentMessage(
            sender_id=current_user.email,
            receiver_id=agent_id,
            content=message_request.content,
            message_type=message_request.message_type,
            metadata=message_request.metadata
        )
        
        async def generate():
            """Generator for streaming response"""
            try:
                async for chunk in _stream_with_fallback(message, agent):
                    if chunk:
                        yield f"data: {json.dumps({'type': 'message', 'content': chunk})}\n\n"
                
                yield f"data: {json.dumps({'type': 'done'})}\n\n"
            except Exception as e:
                logger.error(f"Error streaming to agent {agent_id}: {str(e)}")
                yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error streaming to agent: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/specializations")
async def get_available_specializations():
    """Get all available agent specializations"""
    try:
        specializations = set()
        for agent in agent_manager.agents.values():
            if hasattr(agent, 'specialization'):
                specializations.add(agent.specialization)
        
        return {
            "specializations": list(specializations),
            "count": len(specializations)
        }
        
    except Exception as e:
        logger.error(f"Error getting specializations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/execute-code")
async def execute_code(request: CodeExecutionRequest):
    """Execute code and return output"""
    try:
        if request.language.lower() in ["python", "py", "python3"]:
            # Basic python execution
            process = subprocess.Popen(
                ["python3", "-c", request.code],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            stdout, stderr = process.communicate(timeout=10)
            
            return {
                "output": stdout if stdout else "",
                "error": stderr if stderr else "",
                "exit_code": process.returncode
            }
        else:
            return {"error": f"Language '{request.language}' execution is not supported yet. Only Python is supported.", "output": "", "exit_code": 1}
    except subprocess.TimeoutExpired:
        process.kill()
        return {"error": "Execution timed out", "output": "", "exit_code": -1}
    except Exception as e:
        logger.error(f"Error executing code: {str(e)}")
        return {"error": str(e), "output": "", "exit_code": -1}

@router.get("/chats")
async def get_chats(email: str):
    """Get all chat sessions for a user"""
    try:
        chats = get_chats_for_user(email)
        return {"chats": chats}
    except Exception as e:
        logger.error(f"Error getting chats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chats")
async def save_chat(request: ChatSessionSaveRequest):
    """Save or update a chat session"""
    try:
        chat_id = save_chat_session(request.dict())
        return {"status": "success", "id": chat_id}
    except Exception as e:
        logger.error(f"Error saving chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Debug endpoint to check agent manager state
@router.get("/debug/agents")
async def debug_agents():
    """Debug endpoint to check agent manager state"""
    return {
        "agent_manager_exists": agent_manager is not None,
        "agents_dict_exists": hasattr(agent_manager, 'agents'),
        "agents_count": len(agent_manager.agents) if hasattr(agent_manager, 'agents') else 0,
        "main_agents_dict_exists": hasattr(agent_manager, 'main_agents'),
        "main_agents_count": len(agent_manager.main_agents) if hasattr(agent_manager, 'main_agents') else 0,
        "agent_names": [agent.name for agent in agent_manager.agents.values()] if hasattr(agent_manager, 'agents') else []
    }

# ─────────────────────────────────────────────────────────────────────────────
# COURSE ENDPOINTS
# ─────────────────────────────────────────────────────────────────────────────

# Path to course content data
COURSES_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "courses")


def _load_all_courses() -> List[Dict[str, Any]]:
    """Load all course metadata from courses/ directories"""
    courses = []
    if not os.path.isdir(COURSES_PATH):
        logger.error(f"Courses directory not found: {COURSES_PATH}")
        return courses
    for cid in sorted(os.listdir(COURSES_PATH)):
        course_json_path = os.path.join(COURSES_PATH, cid, "course.json")
        if os.path.isfile(course_json_path):
            try:
                with open(course_json_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                langs = data.get("langs", {})
                for lang_code, lang_data in langs.items():
                    sections = lang_data.get("sections", [])
                    courses.append({
                        "id": data["id"],
                        "lang": lang_code,
                        "title": lang_data.get("title", cid),
                        "category": data.get("category", "General"),
                        "description": lang_data.get("description", ""),
                        "icon": data.get("icon", "fas fa-book"),
                        "slide_count": sum(s.get("slide_count", 0) for s in sections),
                        "section_count": len(sections),
                        "sections": sections,
                    })
            except Exception as e:
                logger.error(f"Error loading course {cid}: {str(e)}")
    return courses


def _get_course_data(course_id: str, lang: str) -> Optional[Dict[str, Any]]:
    """Get a single course by ID and language"""
    courses = _load_all_courses()
    course = next((c for c in courses if c["id"] == course_id and c["lang"] == lang), None)
    if not course:
        course = next((c for c in courses if c["id"] == course_id), None)
    return course


@router.get("/courses")
async def list_courses(lang: Optional[str] = None, category: Optional[str] = None):
    """List all available courses, optionally filtered by language and/or category"""
    try:
        courses = _load_all_courses()
        if lang:
            courses = [c for c in courses if c.get("lang") == lang]
        if category:
            courses = [c for c in courses if c.get("category", "").lower() == category.lower()]
        summary = []
        for c in courses:
            summary.append({
                "id": c["id"],
                "lang": c["lang"],
                "title": c["title"],
                "category": c.get("category", "General"),
                "description": c.get("description", ""),
                "icon": c.get("icon", "fas fa-book"),
                "slide_count": c.get("slide_count", 0),
                "section_count": c.get("section_count", 0)
            })
        return {"courses": summary, "total": len(summary)}
    except Exception as e:
        logger.error(f"Error listing courses: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/courses/{course_id}")
async def get_course(course_id: str, lang: str = "en"):
    """Get full course details including sections"""
    try:
        course = _get_course_data(course_id, lang)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting course: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/courses/{course_id}/slides/{lang}")
async def get_course_slides(course_id: str, lang: str):
    """Get all slide content for a course as a list of sections with markdown content"""
    try:
        course = _get_course_data(course_id, lang)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")

        knowledge_dir = os.path.join(COURSES_PATH, course_id, "knowledge")
        slides = []
        for i, section in enumerate(course.get("sections", [])):
            file_name = section["file"]
            file_path = os.path.join(knowledge_dir, file_name)
            content = ""
            if os.path.isfile(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            slides.append({
                "index": i,
                "title": section["title"],
                "file": file_name,
                "content": content
            })
        return {"course_id": course_id, "lang": lang, "slides": slides}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting course slides: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/courses/{course_id}/slides/{lang}/{section_index}")
async def get_single_slide(course_id: str, lang: str, section_index: int):
    """Get a single slide's content by index"""
    try:
        course = _get_course_data(course_id, lang)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")

        sections = course.get("sections", [])
        if section_index < 0 or section_index >= len(sections):
            raise HTTPException(status_code=404, detail="Section index out of range")

        section = sections[section_index]
        knowledge_dir = os.path.join(COURSES_PATH, course_id, "knowledge")
        file_path = os.path.join(knowledge_dir, section["file"])
        content = ""
        if os.path.isfile(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

        return {
            "course_id": course_id,
            "lang": lang,
            "index": section_index,
            "title": section["title"],
            "file": section["file"],
            "content": content,
            "total_sections": len(sections)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting slide: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# PROGRESS ENDPOINTS
# ─────────────────────────────────────────────────────────────────────────────

class ProgressUpdateRequest(BaseModel):
    course_id: str
    lang: str = "en"
    section_index: int = 0
    completed_sections: List[int] = []


@router.get("/progress")
async def get_user_progress(
    session_id: Optional[str] = None,
    access_token: Optional[str] = None
):
    """Get all course progress for the authenticated user (guest-friendly: returns empty if not authed)"""
    from fastapi import Cookie
    from src.api.auth import get_user_from_session, decode_jwt_token
    # Try to get user from cookies manually (guest-friendly)
    user = None
    try:
        from starlette.requests import Request
    except Exception:
        pass
    # Return empty progress for guests
    return {"progress": []}


@router.get("/progress/me")
async def get_my_progress(
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get all course progress for the authenticated user"""
    try:
        conn = sqlite3.connect(DB_PATH, timeout=20)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT course_id, lang, section_index, completed_sections, last_updated
            FROM user_progress
            WHERE user_email = ?
            ORDER BY last_updated DESC
        ''', (current_user.email,))
        rows = cursor.fetchall()
        conn.close()

        progress = []
        for row in rows:
            progress.append({
                "course_id": row[0],
                "lang": row[1],
                "section_index": row[2],
                "completed_sections": json.loads(row[3]),
                "last_updated": row[4]
            })
        return {"progress": progress}
    except Exception as e:
        logger.error(f"Error getting progress: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/progress")
async def update_user_progress(
    request: ProgressUpdateRequest,
    session_id: Optional[str] = None,
    access_token: Optional[str] = None
):
    """Update course progress - silently ignores if user not authenticated (guest mode)"""
    from src.api.auth import get_user_from_session, decode_jwt_token
    user = None
    if session_id:
        user = get_user_from_session(session_id)
    if not user and access_token:
        payload = decode_jwt_token(access_token)
        if payload:
            from src.api.auth import User as AuthUser
            user = AuthUser(id=payload["sub"], email=payload["email"], name=payload["name"], picture=payload.get("picture"))
    if not user:
        # Guest mode: silently ignore progress saves
        return {"status": "guest", "message": "Progress not saved (not authenticated)"}
    try:
        now = datetime.utcnow().isoformat()
        completed_str = json.dumps(request.completed_sections)
        conn = sqlite3.connect(DB_PATH, timeout=20)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO user_progress (user_email, course_id, lang, section_index, completed_sections, last_updated)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_email, course_id, lang) DO UPDATE SET
                section_index=excluded.section_index,
                completed_sections=excluded.completed_sections,
                last_updated=excluded.last_updated
        ''', (user.email, request.course_id, request.lang, request.section_index, completed_str, now))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "Progress updated"}
    except Exception as e:
        logger.error(f"Error updating progress: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# COURSE-AWARE CHAT ENDPOINT
# ─────────────────────────────────────────────────────────────────────────────

class CourseChatRequest(BaseModel):
    message: str
    course_id: Optional[str] = None
    lang: str = "en"
    section_index: int = 0
    code: Optional[str] = None


@router.post("/chat/course")
async def course_chat(
    request: CourseChatRequest
):
    """Chat with the AI tutor with course context awareness (no auth required - open to all users)"""
    try:
        # Build course context if course_id provided
        course_context = {}
        if request.course_id:
            courses = _load_course_data()
            course = next((c for c in courses if c["id"] == request.course_id and c["lang"] == request.lang), None)
            if course:
                sections = course.get("sections", [])
                current_section = sections[request.section_index] if request.section_index < len(sections) else {}
                # Load slide content
                section_dir = os.path.join(SLIDES_SECTIONS_PATH, request.course_id)
                slide_content = ""
                if current_section.get("file"):
                    file_path = os.path.join(section_dir, current_section["file"])
                    if os.path.isfile(file_path):
                        with open(file_path, "r", encoding="utf-8") as f:
                            slide_content = f.read()[:2000]  # Limit context size
                course_context = {
                    "course_title": course["title"],
                    "section_title": current_section.get("title", ""),
                    "slide_content": slide_content,
                    "user_code": request.code or ""
                }

        # Get or create tutor agent
        tutor_agent = agent_manager.get_agent_by_name("TechnicalAI")
        if not tutor_agent:
            tutor_agent = agent_manager.get_agent_by_name("CustodianAI")
        if not tutor_agent:
            raise HTTPException(status_code=404, detail="No suitable agent found")

        # Build enriched message with course context
        enriched_message = request.message
        if course_context:
            user_code_section = ""
            if course_context.get('user_code'):
                user_code_section = f"\nUser's Code:\n```\n{course_context.get('user_code')}\n```\n"
            enriched_message = f"""[Course Context]
Course: {course_context.get('course_title', '')}
Topic: {course_context.get('section_title', '')}
Slide Content:
{course_context.get('slide_content', '')}{user_code_section}[Student Question]
{request.message}"""

        chat_message = AgentMessage(
            sender_id="user",
            receiver_id=tutor_agent.agent_id,
            content=enriched_message,
            message_type="chat",
            metadata={"course_context": course_context, "is_tutor_mode": True}
        )

        response = await agent_manager.send_message(chat_message)

        return {
            "user_message": request.message,
            "agent_response": {
                "content": response.content,
                "agent_name": tutor_agent.name,
                "agent_id": tutor_agent.agent_id,
                "timestamp": response.timestamp.isoformat(),
            },
            "course_context": {
                "course_id": request.course_id,
                "section_index": request.section_index,
                "section_title": course_context.get("section_title", "")
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in course chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# STARTUP / SHUTDOWN
# ─────────────────────────────────────────────────────────────────────────────

# ─────────────────────────────────────────────────────────────────────────────
# USER API KEYS ENDPOINTS
# ─────────────────────────────────────────────────────────────────────────────

class UserApiKeysRequest(BaseModel):
    gemini_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None

class SwitchProviderRequest(BaseModel):
    provider: str  # 'gemini' | 'anthropic'


@router.get("/user/api-keys")
async def get_my_api_keys(
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get the current user's saved API keys (masked for security)"""
    try:
        keys = get_user_api_keys(current_user.email)
        return {
            "status": "success",
            "user_email": current_user.email,
            "keys": keys
        }
    except Exception as e:
        logger.error(f"Error getting API keys: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/user/api-keys")
async def save_my_api_keys(
    request: UserApiKeysRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Save or update the current user's API keys"""
    try:
        keys_dict = {
            "gemini_api_key": request.gemini_api_key,
            "anthropic_api_key": request.anthropic_api_key,
        }
        success = save_user_api_keys(current_user.email, keys_dict)
        if success:
            return {"status": "success", "message": "API keys saved successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to save API keys")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error saving API keys: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/provider/switch")
async def switch_provider(
    request: SwitchProviderRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Switch the active AI provider for all agents globally."""
    valid_providers = ["gemini", "anthropic"]
    if request.provider not in valid_providers:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid provider. Must be one of: {', '.join(valid_providers)}"
        )
    try:
        # Load user's API keys to inject into the new agents
        user_keys = get_user_api_keys_raw(current_user.email)
        success = agent_manager.switch_provider(request.provider, user_keys)
        if success:
            return {
                "status": "success",
                "active_provider": agent_manager.active_provider,
                "message": f"All agents switched to {request.provider}"
            }
        else:
            raise HTTPException(status_code=400, detail=f"Unknown provider: {request.provider}")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error switching provider: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/provider/active")
async def get_active_provider():
    """Get the currently active AI provider."""
    return {
        "active_provider": agent_manager.active_provider,
        "available_providers": ["gemini", "anthropic"]
    }


class UpgradePlanRequest(BaseModel):
    plan: str  # 'pro' | 'free'


@router.post("/user/upgrade-plan")
async def upgrade_plan(
    request: UpgradePlanRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Upgrade the current user's plan (called after payment confirmation)."""
    valid_plans = ["free", "pro"]
    if request.plan not in valid_plans:
        raise HTTPException(status_code=400, detail=f"Invalid plan. Must be one of: {', '.join(valid_plans)}")
    try:
        from datetime import timedelta
        expiry_date = (datetime.utcnow() + timedelta(days=365)).isoformat()
        success = upgrade_user_plan(current_user.email, request.plan, plan_expiry=expiry_date)
        if success:
            save_payment(
                user_email=current_user.email,
                amount=9.99,
                plan=request.plan,
                valid_until=expiry_date
            )
            plan_info = get_user_plan(current_user.email)
            return {
                "status": "success",
                "message": f"Plan upgraded to {request.plan}",
                "plan": request.plan,
                "plan_info": plan_info
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to upgrade plan")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error upgrading plan: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/user/api-keys/{provider}")
async def delete_my_api_key(
    provider: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Delete a specific provider's API key for the current user"""
    valid_providers = ["gemini", "anthropic"]
    if provider not in valid_providers:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid provider. Must be one of: {', '.join(valid_providers)}"
        )
    try:
        success = delete_user_api_key(current_user.email, provider)
        if success:
            return {"status": "success", "message": f"{provider} API key removed"}
        else:
            raise HTTPException(status_code=500, detail="Failed to delete API key")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting API key: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# STARTUP / SHUTDOWN
# ─────────────────────────────────────────────────────────────────────────────

# Startup and shutdown events
@router.on_event("startup")
async def startup_event():
    """Initialize the agent manager on startup"""
    logger.info("API startup - Agent Manager initialized")

@router.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("API shutdown - Cleaning up Agent Manager")
    await agent_manager.shutdown()



# ─────────────────────────────────────────────────────────────────────────────
# MVP Builder API Endpoints
# ─────────────────────────────────────────────────────────────────────────────

@router.post("/mvp/create-session")
async def mvp_create_session(
    request: MVPCreateSessionRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Create a new MVP building session."""
    try:
        mvp_builder = get_mvp_builder_instance()
        session = await mvp_builder.create_session(current_user.email, request.product_idea)

        return {
            "success": True,
            "session": session.to_dict()
        }
    except Exception as e:
        logger.error(f"Error creating MVP session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/sessions")
async def mvp_get_all_sessions(
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get all MVP sessions for the current user."""
    try:
        mvp_builder = get_mvp_builder_instance()
        user_sessions = [
            s.to_dict() for s in mvp_builder.sessions.values()
            if s.user_email == current_user.email
        ]
        return {
            "success": True,
            "sessions": user_sessions,
            "count": len(user_sessions)
        }
    except Exception as e:
        logger.error(f"Error getting user MVP sessions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/session/{mvp_session_id}")
async def mvp_get_session(
    mvp_session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get an existing MVP session."""
    try:
        session = await get_owned_mvp_session(mvp_session_id, current_user)
        return {"success": True, "session": session.to_dict()}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting MVP session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/send-message")
async def mvp_send_message(
    request: MVPMessageRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Send a message to the MVP builder."""
    try:
        mvp_builder = get_mvp_builder_instance()
        session = await get_owned_mvp_session(request.session_id, current_user)
        result = await mvp_builder.send_message(request.session_id, request.message, request.mode, request.agent_name)
        return {
            "success": True,
            "result": result,
            "session": session.to_dict()
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending MVP message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/advance-phase")
async def mvp_advance_phase(
    request: MVPAdvancePhaseRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Advance to the next MVP phase."""
    try:
        mvp_builder = get_mvp_builder_instance()
        result = await mvp_builder.advance_phase(request.session_id)
        session = await get_owned_mvp_session(request.session_id, current_user)
        return {
            "success": result.get("success", False),
            "result": result,
            "session": session.to_dict()
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error advancing MVP phase: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/session/{mvp_session_id}/files")
async def mvp_list_files(
    mvp_session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """List all files in the MVP workspace."""
    try:
        mvp_builder = get_mvp_builder_instance()
        session = await get_owned_mvp_session(mvp_session_id, current_user)
        file_tree = mvp_builder.get_workspace_files_tree(mvp_session_id)

        return {
            "success": True,
            "files": file_tree,
            "file_count": len(session.files)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error listing MVP files: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/session/{mvp_session_id}/file")
async def mvp_read_file(
    mvp_session_id: str,
    path: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Read a specific file from the MVP workspace."""
    try:
        mvp_builder = get_mvp_builder_instance()
        await get_owned_mvp_session(mvp_session_id, current_user)
        content = await mvp_builder.read_file(mvp_session_id, path)

        if content is None:
            raise HTTPException(status_code=404, detail="File not found")

        return {
            "success": True,
            "path": path,
            "content": content
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error reading MVP file: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/connect-github")
async def mvp_connect_github(
    request: MVPConnectGitHubRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Connect GitHub account for publishing.""" # This line was correctly indented.
    github_token_to_use = request.github_token
    try:
        # If no token provided in request, try to get it from user's saved keys
        if not github_token_to_use:
            # Assuming get_user_github_token exists and retrieves the token
            github_token_to_use = get_user_github_token(current_user.email)

        if not github_token_to_use:
            raise HTTPException(status_code=400, detail="GitHub token is required to connect. Please provide one or connect via profile settings.")
        mvp_builder = get_mvp_builder_instance()
        await get_owned_mvp_session(request.session_id, current_user)
        result = await mvp_builder.connect_github(request.session_id, github_token_to_use, request.repo_name)
        return {
            "success": result.get("success", False),
            "message": result.get("message", "GitHub connected"),
            "github_username": result.get("github_username")
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error connecting GitHub: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/disconnect-github")
async def mvp_disconnect_github(
    request: MVPDisconnectGitHubRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Disconnect GitHub account for a session."""
    try:
        session = await get_owned_mvp_session(request.session_id, current_user)
        session.github_connected = False
        session.github_token = None
        session.github_username = None
        session.github_repo_name = None
        session.add_log("GitHub account disconnected.")
        return {
            "success": True,
            "message": "GitHub account disconnected successfully."
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error disconnecting GitHub: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/session/{mvp_session_id}/github-repos")
async def mvp_get_github_repos(
    mvp_session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get a list of repositories for the connected GitHub account."""
    try:
        mvp_builder = get_mvp_builder_instance()
        await get_owned_mvp_session(mvp_session_id, current_user)
        repos = await mvp_builder.get_github_repos(mvp_session_id)
        return {"success": True, "repos": repos}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting GitHub repos: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/mvp/publish")
async def mvp_publish_to_github(
    request: MVPPublishRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Publish the MVP to GitHub."""
    try:
        mvp_builder = get_mvp_builder_instance()
        result = await mvp_builder.publish_to_github(request.session_id, request.repo_name)
        await get_owned_mvp_session(request.session_id, current_user)
        return {
            "success": result.get("success", False),
            "repo_url": result.get("repo_url"),
            "pages_url": result.get("pages_url"),
            "files_pushed": result.get("files_pushed", []),
            "message": result.get("message")
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error publishing to GitHub: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/create-repo")
async def mvp_create_repo(
    request: MVPCreateRepoRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Create a new GitHub repository for the session."""
    try:
        mvp_builder = get_mvp_builder_instance()
        await get_owned_mvp_session(request.session_id, current_user)
        result = await mvp_builder.create_github_repo(
            request.session_id, request.repo_name, request.description, request.private
        )
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating GitHub repo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/session/{mvp_session_id}/preview")
async def mvp_preview(
    mvp_session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Serve the preview HTML for an MVP session."""
    try:
        mvp_builder = get_mvp_builder_instance()
        session = await get_owned_mvp_session(mvp_session_id, current_user)
        content = await mvp_builder.read_file(mvp_session_id, "index.html")
        if content is None:
            for fname in sorted(session.files.keys()):
                if fname.endswith(".html"):
                    content = await mvp_builder.read_file(mvp_session_id, fname)
                    break
        if content is None:
            content = mvp_builder._generate_placeholder_html(session)
        from fastapi.responses import HTMLResponse
        return HTMLResponse(content=content)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error serving preview: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/virtual-deploy")
async def mvp_virtual_deploy(
    request: MVPAcceptDeployRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Accept the virtual deployment and finalize the MVP."""
    try:
        mvp_builder = get_mvp_builder_instance()
        result = await mvp_builder.accept_deploy(
            request.session_id,
            publish_to_github=request.publish_to_github,
            repo_name=request.repo_name,
        )
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error accepting virtual deploy: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/request-changes")
async def mvp_request_changes(
    request: MVPRequestChangesRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Request changes to go back to Build phase."""
    try:
        mvp_builder = get_mvp_builder_instance()
        result = await mvp_builder.request_changes(
            request.session_id,
            request.feedback,
        )
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error requesting changes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/compact-chat/{mvp_session_id}")
async def mvp_compact_chat(
    mvp_session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Compress chat history by summarizing older messages to save tokens."""
    try:
        mvp_builder = get_mvp_builder_instance()
        session = await get_owned_mvp_session(mvp_session_id, current_user)
        result = await mvp_builder.compact_chat_history(mvp_session_id)
        return {
            "success": True,
            "result": result,
            "session": session.to_dict()
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error compacting MVP chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mvp/upload-file/{mvp_session_id}")
async def mvp_upload_file(
    mvp_session_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Upload a file attachment to the MVP session workspace."""
    try:
        mvp_builder = get_mvp_builder_instance()
        session = await get_owned_mvp_session(mvp_session_id, current_user)
        content = await file.read()
        try:
            text_content = content.decode("utf-8")
        except UnicodeDecodeError:
            text_content = f"[Binary file: {file.filename}, {len(content)} bytes]"
        await mvp_builder.write_file(mvp_session_id, file.filename, text_content)
        return {"success": True, "filename": file.filename, "size": len(content)}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading MVP file: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/mvp/session/{mvp_session_id}")
async def mvp_delete_session(
    mvp_session_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Delete an MVP session."""
    try:
        deleted = delete_mvp_session(mvp_session_id, current_user.email)
        if not deleted:
            raise HTTPException(status_code=404, detail="Session not found")
        # Also remove from in-memory builder
        mvp_builder = get_mvp_builder_instance()
        mvp_builder.sessions.pop(mvp_session_id, None)
        return {"success": True, "message": "Session deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting MVP session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mvp/sessions/db")
async def mvp_get_db_sessions(
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get all MVP sessions from the database for the current user."""
    try:
        sessions = list_mvp_sessions(current_user.email)
        return {"success": True, "sessions": sessions, "count": len(sessions)}
    except Exception as e:
        logger.error(f"Error listing DB sessions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# Resume Optimizer Endpoints
# ─────────────────────────────────────────────────────────────────────────────

class ResumeCreateRequest(BaseModel):
    title: str = "Untitled Resume"
    data: Dict[str, Any] = {}
    jd: Optional[str] = None
    template_name: Optional[str] = None


class ResumeUpdateRequest(BaseModel):
    title: Optional[str] = None
    data: Optional[Dict[str, Any]] = None
    jd: Optional[str] = None
    template_name: Optional[str] = None


class TemplateCreateRequest(BaseModel):
    name: str
    config: Dict[str, Any]
    category: str = 'general'
    section_defs: List[Dict[str, Any]] = []


class ResumeOptimizeRequest(BaseModel):
    resume_id: str
    jd: Optional[str] = None
    instructions: Optional[str] = None


class ResumeParseRequest(BaseModel):
    raw_text: str
    title: str = "Imported Resume"


class SaveChatHistoryRequest(BaseModel):
    chat_history: List[Dict[str, Any]]


@router.get("/resumes/{resume_id}/chat")
async def get_resume_chat(
    resume_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get chat history for a resume."""
    resume = get_resume(resume_id, current_user.email)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"chat_history": resume.get("chat_history", [])}


@router.put("/resumes/{resume_id}/chat")
async def update_resume_chat(
    resume_id: str,
    req: SaveChatHistoryRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Save chat history for a resume."""
    resume = get_resume(resume_id, current_user.email)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    saved = save_resume_chat_history(resume_id, current_user.email, req.chat_history)
    if not saved:
        raise HTTPException(status_code=500, detail="Failed to save chat history")
    return {"message": "Chat history saved"}


@router.post("/resumes/{resume_id}/compact-chat")
async def compact_resume_chat(
    resume_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Compact chat history by summarizing older messages to save tokens."""
    resume = get_resume(resume_id, current_user.email)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    chat_history_raw = resume.get("chat_history") or []
    if isinstance(chat_history_raw, str):
        chat_history_raw = json.loads(chat_history_raw) if chat_history_raw.strip() else []

    if not chat_history_raw:
        return {"chat_history": [], "compacted": False}

    total_chars = sum(len(m.get("content", "")) for m in chat_history_raw)
    if total_chars < CHAT_COMPACTION_CHAR_THRESHOLD:
        return {"chat_history": chat_history_raw, "compacted": False}

    # Compact older messages, keep recent ones as-is
    to_compact = chat_history_raw[:-CHAT_COMPACTION_KEEP_RECENT] if len(chat_history_raw) > CHAT_COMPACTION_KEEP_RECENT else []
    recent = chat_history_raw[-CHAT_COMPACTION_KEEP_RECENT:] if len(chat_history_raw) > CHAT_COMPACTION_KEEP_RECENT else chat_history_raw

    if not to_compact:
        return {"chat_history": chat_history_raw, "compacted": False}

    try:
        agent = agent_manager.get_agent_by_name("TechnicalAI")
        if not agent:
            agent = agent_manager.get_agent_by_name("CustodianAI")

        compact_text = "\n".join(
            f"{m.get('role', 'unknown')}: {m.get('content', '')}" for m in to_compact
        )

        summary_prompt = (
            "Summarize the following resume modification conversation. "
            "Preserve: what changes were made to the resume, user preferences, "
            "what suggestions were given, and the current state of the resume. "
            "Be concise (2-4 sentences)."
            f"\n\nConversation to summarize:\n{compact_text}"
        )

        msg = AgentMessage(sender_id="api", receiver_id=agent.agent_id, content=summary_prompt)
        result_msg = await agent.process_message(msg)
        summary = result_msg.content.strip()

        compacted = [{"role": "system", "content": f"[Compacted] {summary}"}, *recent]
        save_resume_chat_history(resume_id, current_user.email, compacted)
        return {"chat_history": compacted, "compacted": True}
    except Exception as e:
        logger.error(f"Compaction failed: {e}")
        return {"chat_history": chat_history_raw, "compacted": False, "error": str(e)}


@router.get("/resumes/extract-templates")
async def extract_resume_templates(
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Analyze all resumes and extract unique template structures grouped by category."""
    from collections import defaultdict
    resumes = get_user_resumes(current_user.email)
    templates_by_structure = defaultdict(list)

    for r in resumes:
        data = r.get("data", {})
        sections_present = [k for k, v in data.items() if isinstance(v, (list, dict)) and v]
        has_summary = bool(data.get("personal_info", {}).get("summary"))
        has_projects = bool(data.get("projects"))
        has_certs = bool(data.get("certifications"))
        has_publications = bool(data.get("publications"))
        has_volunteering = bool(data.get("volunteering"))

        tpl_name = r.get("template_name") or "Untitled"
        tpl_category = r.get("template_name", "")

        if has_publications or len(sections_present) > 7:
            category = "academic"
        elif has_projects and not has_certs:
            category = "student"
        elif len(sections_present) <= 4:
            category = "minimal"
        elif has_certs and not has_projects:
            category = "professional"
        else:
            category = "general"

        key = tuple(sorted(sections_present))
        templates_by_structure[key].append({
            "id": r["id"],
            "title": r["title"],
            "template_name": tpl_name,
            "category": category,
            "sections_present": sections_present,
        })

    extracted = []
    for key, members in templates_by_structure.items():
        cat = members[0]["category"]
        extracted.append({
            "category": cat,
            "structure_signature": list(key),
            "count": len(members),
            "examples": [m["title"] for m in members[:3]],
            "section_count": len(key),
        })

    grouped = defaultdict(list)
    for t in extracted:
        grouped[t["category"]].append(t)

    return {"templates": extracted, "grouped": dict(grouped), "total": len(resumes)}


def _get_resume_limit(user_email: str) -> int:
    """Get resume storage limit based on user plan."""
    from src.core.database import get_user_plan as _get_plan
    plan_info = _get_plan(user_email)
    if plan_info["plan"] == "pro":
        return 999999  # unlimited for pro
    return 3  # free/guest get 3


@router.get("/resumes/templates/categories")
async def get_template_categories(current_user: User = Depends(get_current_user_from_cookies)):
    """List all distinct template categories."""
    from src.core.database import list_template_categories
    categories = list_template_categories()
    return {"categories": categories}


@router.get("/resumes/templates")
async def get_templates(
    category: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user_from_cookies)
):
    """List all resume templates, optionally filtered by category."""
    templates = list_templates(category=category)
    return {"templates": templates}


@router.post("/resumes/templates")
async def create_template(
    req: TemplateCreateRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Save a new resume template (no-op if already exists)."""
    inserted = save_template(req.name, req.config, current_user.email, req.category, req.section_defs)
    return {"inserted": inserted, "message": "Template saved" if inserted else "Template already exists"}


@router.get("/resumes")
async def list_resumes(current_user: User = Depends(get_current_user_from_cookies)):
    """List all resumes for the current user."""
    resumes = get_user_resumes(current_user.email)
    return {"resumes": resumes, "count": len(resumes)}


def _maybe_save_template(req, user_email: str):
    """If the request has a template_name and the data includes a matching template, auto-save it."""
    try:
        template_name = getattr(req, 'template_name', None)
        if template_name:
            existing = get_template_by_name(template_name)
            data = getattr(req, 'data', None)
            if not existing and data:
                save_template(template_name, data, user_email)
    except Exception as e:
        logger.warning(f"Failed to auto-save template: {e}")


@router.post("/resumes")
async def create_resume(
    req: ResumeCreateRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Create a new resume."""
    limit = _get_resume_limit(current_user.email)
    current_count = get_resume_count(current_user.email)
    if current_count >= limit:
        raise HTTPException(
            status_code=403,
            detail=f"Resume limit reached ({limit}). Upgrade to Pro for unlimited resumes."
        )

    _maybe_save_template(req, current_user.email)

    resume_id = save_resume({
        "user_email": current_user.email,
        "title": req.title,
        "data": req.data,
        "jd": req.jd,
        "template_name": req.template_name,
    })
    resume = get_resume(resume_id, current_user.email)
    return {"resume": resume, "message": "Resume created successfully"}


@router.post("/resumes/parse")
async def parse_resume_document(
    req: ResumeParseRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Parse uploaded resume document text and extract structured data using AI."""
    try:
        agent = agent_manager.get_agent_by_name("TechnicalAI")
        if not agent:
            agent = agent_manager.get_agent_by_name("CustodianAI")

        temperature = 0.7
        prompt = f"""You are an expert resume parser. Analyze the following raw resume text and extract all information into a structured JSON object. Be thorough — capture every detail you find.

Raw resume text:
{req.raw_text}

Return ONLY valid JSON with this exact structure (use empty arrays/strings for missing fields):
{{
  "personal_info": {{
    "full_name": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "title": "",
    "summary": ""
  }},
  "education": [
    {{"id": 1, "degree": "", "institution": "", "field_of_study": "", "start_date": "", "end_date": "", "cgpa": "", "achievements": ""}}
  ],
  "experience": [
    {{"id": 1, "company": "", "role": "", "location": "", "start_date": "", "end_date": "", "current": false, "description": "", "tech_stack": [], "achievements": []}}
  ],
  "certifications": [
    {{"id": 1, "name": "", "issuer": "", "date": "", "url": ""}}
  ],
  "skills": [
    {{"id": 1, "value": ""}}
  ],
  "projects": [
    {{"id": 1, "name": "", "description": "", "tech_stack": [], "url": ""}}
  ],
  "achievements": [
    {{"id": 1, "value": ""}}
  ]
}}"""

        msg = AgentMessage(sender_id="api", receiver_id=agent.agent_id, content=prompt)
        result_msg = await agent.process_message(msg)
        result = result_msg.content

        import re
        start = result.find('{')
        if start == -1:
            raise HTTPException(status_code=502, detail="AI response contains no JSON object")
        depth = 0
        end = start
        for i in range(start, len(result)):
            if result[i] == '{': depth += 1
            elif result[i] == '}': depth -= 1
            if depth == 0: end = i + 1; break
        if depth != 0:
            raise HTTPException(status_code=502, detail=f"AI response has unclosed JSON object: {result[:500]}")
        parsed_data = json.loads(result[start:end])

        now = datetime.utcnow().isoformat()
        resume_id = save_resume({
            "user_email": current_user.email,
            "title": req.title,
            "data": parsed_data,
            "created_at": now,
        })
        resume = get_resume(resume_id, current_user.email)

        return {
            "resume": resume,
            "message": "Resume parsed successfully"
        }

    except Exception as e:
        logger.error(f"Error parsing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(e)}")


import tempfile
from pathlib import Path


@router.post("/resumes/extract-text")
async def extract_text_from_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Extract text from an uploaded document (PDF, DOCX, TXT). Used for JD file upload."""
    try:
        ext = Path(file.filename).suffix.lower() if file.filename else '.txt'
        if ext not in {'.pdf', '.docx', '.txt'}:
            raise HTTPException(status_code=400, detail=f"Unsupported file type '{ext}'. Use PDF, DOCX, or TXT.")
        contents = await file.read()
        text = extract_text(contents, file.filename or 'document.txt')
        return {"text": text}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error extracting text: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")


@router.post("/resumes/upload")
async def upload_resume_document(
    file: UploadFile = File(...),
    jd: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user_from_cookies)
):
    try:
        ext = Path(file.filename).suffix.lower() if file.filename else '.txt'
        if ext not in {'.pdf', '.docx', '.txt'}:
            raise HTTPException(status_code=400, detail=f"Unsupported file type '{ext}'. Use PDF, DOCX, or TXT.")

        contents = await file.read()

        agent = agent_manager.get_agent_by_name("TechnicalAI")
        if not agent:
            agent = agent_manager.get_agent_by_name("CustodianAI")

        # Use Claude's native document parsing (base64 content block) when available,
        # which provides better accuracy than local PyPDF2/python-docx extraction.
        # Falls back to local extract_text + text prompt for non-Claude providers.
        prompt = """You are an expert resume parser and template classifier. Analyze the uploaded resume document and extract all information into a structured JSON object. Be thorough — capture every detail you find.

Also classify the resume into one of these template categories based on its layout and content: 'professional', 'academic', 'technical', 'creative', 'general'.

Return ONLY valid JSON with this exact structure (use empty arrays/strings for missing fields):
{{
  "personal_info": {{
    "full_name": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "title": "",
    "summary": ""
  }},
  "education": [
    {{"id": 1, "degree": "", "institution": "", "field_of_study": "", "start_date": "", "end_date": "", "cgpa": "", "achievements": ""}}
  ],
  "experience": [
    {{"id": 1, "company": "", "role": "", "location": "", "start_date": "", "end_date": "", "current": false, "description": "", "tech_stack": [], "achievements": []}}
  ],
  "certifications": [
    {{"id": 1, "name": "", "issuer": "", "date": "", "url": ""}}
  ],
  "skills": [
    {{"id": 1, "value": ""}}
  ],
  "projects": [
    {{"id": 1, "name": "", "description": "", "tech_stack": [], "url": ""}}
  ],
  "achievements": [
    {{"id": 1, "value": ""}}
  ],
  "template_category": ""
}}"""

        if hasattr(agent, 'parse_document') and ext in {'.pdf', '.docx'}:
            try:
                result = await agent.parse_document(contents, file.filename or 'resume.pdf', prompt)
            except ValueError as e:
                raise HTTPException(status_code=502, detail=str(e))
        else:
            text = extract_text(contents, file.filename or 'resume.txt')
            prompt_with_text = prompt + f'\n\nRaw resume text:\n{text}'
            msg = AgentMessage(sender_id='api', receiver_id=agent.agent_id, content=prompt_with_text)
            result_msg = await agent.process_message(msg)
            result = result_msg.content

        start = result.find('{')
        if start == -1:
            raise HTTPException(status_code=502, detail="AI response contains no JSON object")
        depth = 0
        end = start
        for i in range(start, len(result)):
            if result[i] == '{': depth += 1
            elif result[i] == '}': depth -= 1
            if depth == 0: end = i + 1; break
        if depth != 0:
            raise HTTPException(status_code=502, detail=f"AI response has unclosed JSON object: {result[:500]}")
        parsed_data = json.loads(result[start:end])

        now = datetime.utcnow().isoformat()
        title = Path(file.filename).stem if file.filename else "Imported Resume"

        detected_category = parsed_data.pop('template_category', 'professional') if isinstance(parsed_data, dict) else 'professional'
        template_map = {
            'academic': 'Classic Academic',
            'technical': 'Full-Stack Developer',
            'creative': 'Creative Portfolio',
            'general': 'Modern Professional',
        }
        template_name = template_map.get(detected_category, 'Modern Professional')
        if detected_category not in template_map:
            detected_category = 'professional'

        resume_id = save_resume({
            "user_email": current_user.email,
            "title": title,
            "data": parsed_data,
            "template_name": template_name,
            "jd": jd.strip() if jd else None,
            "created_at": now,
        })
        save_template(template_name, parsed_data, current_user.email, category=detected_category)
        resume = get_resume(resume_id, current_user.email)

        return {"resume": resume, "message": f"Resume extracted from {Path(file.filename).suffix if file.filename else 'file'} and parsed successfully"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.get("/resumes/{resume_id}")
async def get_resume_endpoint(
    resume_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Get a single resume."""
    resume = get_resume(resume_id, current_user.email)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"resume": resume}


@router.put("/resumes/{resume_id}")
async def update_resume(
    resume_id: str,
    req: ResumeUpdateRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Update an existing resume."""
    existing = get_resume(resume_id, current_user.email)
    if not existing:
        raise HTTPException(status_code=404, detail="Resume not found")

    _maybe_save_template(req, current_user.email)

    update_data = {
        "id": resume_id,
        "user_email": current_user.email,
        "title": req.title if req.title is not None else existing["title"],
        "data": req.data if req.data is not None else existing["data"],
        "jd": req.jd if req.jd is not None else existing["jd"],
        "ats_score": existing.get("ats_score"),
        "created_at": existing["created_at"],
        "template_name": req.template_name if req.template_name is not None else existing.get("template_name"),
    }
    save_resume(update_data)
    updated = get_resume(resume_id, current_user.email)
    return {"resume": updated, "message": "Resume updated successfully"}


@router.delete("/resumes/{resume_id}")
async def delete_resume_endpoint(
    resume_id: str,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Delete a resume."""
    deleted = delete_resume(resume_id, current_user.email)
    if not deleted:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"message": "Resume deleted successfully"}


@router.post("/resumes/{resume_id}/optimize")
async def optimize_resume(
    resume_id: str,
    req: ResumeOptimizeRequest,
    current_user: User = Depends(get_current_user_from_cookies)
):
    """Optimize a resume using AI. Optionally with JD tailoring."""
    resume = get_resume(resume_id, current_user.email)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    jd_text = req.jd or resume.get("jd") or ""

    # Fetch template structure for proper formatting
    template_section_defs = []
    template_pages = []
    template_styling = {}
    if resume.get("template_name"):
        try:
            from src.core.database import get_template_by_name
            tpl = get_template_by_name(resume["template_name"])
            if tpl:
                template_section_defs = tpl.get("section_defs", [])
                template_pages = tpl.get("config", {}).get("pages", [])
                template_styling = tpl.get("config", {}).get("styling", {})
        except Exception:
            pass

    try:
        agent = agent_manager.get_agent_by_name("TechnicalAI")
        if not agent:
            agent = agent_manager.get_agent_by_name("CustodianAI")
        if not agent:
            raise HTTPException(status_code=503, detail="No AI agent available for optimization")

        original_provider = agent_manager.active_provider
        providers_to_try = [agent_manager.active_provider, agent_manager.active_provider]
        fallback = "gemini" if agent_manager.active_provider == "anthropic" else "anthropic"
        providers_to_try.append(fallback)

        prompt_parts = [
            "You are an expert ATS resume optimizer and career coach.",
            "Analyze the following resume data and optimize it for maximum ATS score (>90).",
            "Read through every section carefully — personal info, education, experience, skills, certifications, projects, achievements.",
            f"Current resume data:\n{json.dumps(resume['data'], separators=(',', ':'))}",
        ]

        if resume.get("template_name") and template_section_defs:
            prompt_parts.append(f"This resume uses the '{resume['template_name']}' template.")
            prompt_parts.append(f"The template defines these sections in this exact order:\n{json.dumps(template_section_defs, indent=2)}")

        # Include previous chat conversation as context so AI knows what was discussed
        chat_history_raw = resume.get("chat_history") or []
        if isinstance(chat_history_raw, str):
            chat_history_raw = json.loads(chat_history_raw) if chat_history_raw.strip() else []
        if chat_history_raw:
            chat_context_parts = []
            for m in chat_history_raw[-10:]:  # last 10 messages
                role = m.get("role", "")
                content = m.get("content", "")
                if role and content and role != "system":
                    chat_context_parts.append(f"{role}: {content[:500]}")
            if chat_context_parts:
                prompt_parts.append("Previous conversation context (what the user has already asked/suggested):")
                prompt_parts.append("\n".join(chat_context_parts))

        if jd_text:
            prompt_parts.append(f"Job Description to tailor to:\n{jd_text}")
            prompt_parts.append("Tailor the resume to match this job description while keeping it truthful.")

        if req.instructions:
            prompt_parts.append(f"Additional instructions:\n{req.instructions}")

        prompt_parts.append("""
Return ONLY a compact JSON object with ONLY the sections/fields that CHANGED — NO other text. Sections you omit from optimized_data will remain unchanged.

IMPORTANT: Keep your output SMALL. Only include data that actually changed from the current resume data. This keeps the response within token limits.

{
  "optimized_data": {
    "personal_info": { "title": "...", "summary": "...", ...ONLY changed fields... },
    "education": [ ...ONLY if changed, include ALL entries... ],
    "experience": [ ...ONLY if changed, include ALL entries... ],
    "skills": [ ...ONLY if changed... ]
  },
  "ats_score": <number 80-100>,
  "changes": ["change1", "change2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...],
  "score_breakdown": {
    "keywords": <number>,
    "format": <number>,
    "experience": <number>,
    "education": <number>,
    "skills": <number>
  }
}""")

        prompt = "\n\n".join(prompt_parts)
        optimization = None
        last_error = None

        for provider in providers_to_try:
            try:
                if agent_manager.active_provider != provider:
                    agent_manager.switch_provider(provider)
                    agent = agent_manager.get_agent_by_name("TechnicalAI")
                    if not agent:
                        agent = agent_manager.get_agent_by_name("CustodianAI")

                msg = AgentMessage(sender_id="api", receiver_id=agent.agent_id, content=prompt)
                result_msg = await agent.process_message(msg)
                result = result_msg.content.strip()

                if not result:
                    last_error = "AI agent returned empty response"
                    continue

                error_prefixes = ("error:", "i encountered", "sorry,", "unable to", "i cannot", "i'm unable", "api error")
                if result.lower().startswith(error_prefixes):
                    last_error = result[:500]
                    logger.warning(f"Provider {provider} returned error: {result[:200]}")
                    continue

            except Exception as e:
                last_error = str(e)
                logger.warning(f"Provider {provider} failed: {str(e)}")
                continue

            # Parse JSON from the result
            try:
                start = result.find('{')
                if start == -1:
                    last_error = "AI response contains no JSON object"
                    continue
                depth = 0
                end = start
                for i in range(start, len(result)):
                    if result[i] == '{': depth += 1
                    elif result[i] == '}': depth -= 1
                    if depth == 0: end = i + 1; break
                if depth != 0:
                    last_error = f"AI response has unclosed JSON object"
                    continue
                optimization = json.loads(result[start:end])
                break
            except (json.JSONDecodeError, AttributeError) as e:
                last_error = f"AI returned invalid JSON: {result[:200]}"
                continue

        if optimization is None:
            logger.error(f"All providers failed for resume optimize. Last error: {last_error}")
            if "API_KEY_HTTP_REFERRER_BLOCKED" in (last_error or ""):
                detail = ("Resume optimization failed. Claude had a temporary error, and Gemini is unavailable "
                          "because its API key has HTTP referrer restrictions that block local requests. "
                          "Please try again (Claude issue is likely transient), or configure the Gemini API key "
                          "to allow requests from any referrer.")
            else:
                detail = last_error or "All AI providers failed"
            raise HTTPException(status_code=502, detail=detail)

        # Restore original provider if we switched
        if agent_manager.active_provider != original_provider:
            agent_manager.switch_provider(original_provider)

        try:
            import re
            start = result.find('{')
            if start == -1:
                raise HTTPException(status_code=502, detail="AI response contains no JSON object")
            depth = 0
            end = start
            for i in range(start, len(result)):
                if result[i] == '{': depth += 1
                elif result[i] == '}': depth -= 1
                if depth == 0: end = i + 1; break
            if depth != 0:
                raise HTTPException(status_code=502, detail=f"AI response has unclosed JSON object: {result[:500]}")
            optimization = json.loads(result[start:end])
        except (json.JSONDecodeError, AttributeError) as e:
            raise HTTPException(status_code=502, detail=f"AI returned invalid JSON: {result[:500]}")

        # Validate optimized_data exists
        if not optimization.get("optimized_data"):
            raise HTTPException(status_code=502, detail="AI response missing optimized_data")

        # Deep-merge optimized_data into existing resume data (AI returns only changed fields)
        existing_data = resume.get("data", {})
        changed_data = optimization["optimized_data"]
        merged_data = dict(existing_data)
        for key, value in changed_data.items():
            if isinstance(value, dict) and isinstance(existing_data.get(key), dict):
                merged_data[key] = {**existing_data[key], **value}
            else:
                merged_data[key] = value

        update_data = {
            "id": resume_id,
            "user_email": current_user.email,
            "title": resume["title"],
            "data": merged_data,
            "jd": jd_text or resume.get("jd"),
            "ats_score": optimization.get("ats_score", resume.get("ats_score")),
            "created_at": resume["created_at"],
            "template_name": resume.get("template_name"),
        }
        save_resume(update_data)

        return {
            "optimization": optimization,
            "message": "Resume optimized successfully"
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error optimizing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Optimization failed: {str(e)}")


# ─────────────────────────────────────────────────────────────────────────────
# Webhook Endpoints
# ─────────────────────────────────────────────────────────────────────────────

@router.post("/webhooks/{webhook_id}")
async def receive_webhook(webhook_id: str, request: Request):
    """
    Generic webhook endpoint to receive data from external services.
    Agents can register for specific webhook_ids.
    """
    try:
        payload = await request.json()
        logger.info(f"Received webhook for ID '{webhook_id}': {json.dumps(payload)}")

        return {"status": "success", "message": f"Webhook '{webhook_id}' received."}
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload.")
    except Exception as e:
        logger.error(f"Error receiving webhook: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
