"""
Configuration settings for Custodian AI Army.
"""

from typing import Dict, Optional, Union

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""

    # Application Configuration
    APP_HOST: str = "localhost"
    APP_PORT: int = 8000
    DEBUG: Union[bool, str] = True

    # Google Gemini API Configuration
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_API_URL: str = "https://generativelanguage.googleapis.com/v1beta"
    GEMINI_MODEL: str = "gemini-2.5-flash"

    # Anthropic Claude API Configuration
    ANTHROPIC_API_KEY: Optional[str] = None
    CLAUDE_MODEL: str = "claude-sonnet-4-5"

    # Retained so existing .env files do not fail validation; not exposed as selectable providers.
    GROQ_API_KEY: Optional[str] = None
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    NIM_API_KEY: Optional[str] = None
    NIM_MODEL: str = "meta/llama-3.3-70b-instruct"

    # Primary LLM Provider
    PRIMARY_LLM_PROVIDER: Optional[str] = "gemini"  # Options: gemini, anthropic

    # MCP (Model Context Protocol) Configuration
    MCP_ENABLED: bool = True

    # Additional URLs and Ports
    FASTAPI_URL: str = "http://localhost:8000"
    FASTAPI_PORT: int = 8000

    # Database Configuration
    DATABASE_URL: str = "sqlite:///./custodian_ai.db"

    # Redis Configuration
    REDIS_URL: str = "redis://localhost:6379"

    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    JWT_SECRET: str = "your-jwt-secret-change-in-production"

    # Google OAuth Configuration
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/google/callback"

    # GitHub OAuth Configuration
    GITHUB_CLIENT_ID: Optional[str] = None
    GITHUB_CLIENT_SECRET: Optional[str] = None
    GITHUB_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/github/callback"

    # Logging
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()


AGENT_MODELS: Dict[str, Dict[str, str]] = {
    "anthropic": {
        "CustodianAI": "claude-sonnet-4-5",
        "ResearchAI": "claude-sonnet-4-5",
        "FactCheckerAI": "claude-sonnet-4-5",
        "TrendAnalystAI": "claude-sonnet-4-5",
        "AnalystAI": "claude-sonnet-4-5",
        "DataAnalystAI": "claude-sonnet-4-5",
        "MarketAnalystAI": "claude-sonnet-4-5",
        "TechnicalAI": "claude-sonnet-4-5",
        "CoderAI": "claude-sonnet-4-5",
        "ArchitectAI": "claude-sonnet-4-5",
        "CreativeAI": "claude-sonnet-4-5",
        "WriterAI": "claude-sonnet-4-5",
        "DesignerAI": "claude-sonnet-4-5",
    },
    "gemini": {
        "CustodianAI": "gemini-2.5-pro",
        "ResearchAI": "gemini-2.5-pro",
        "FactCheckerAI": "gemini-2.5-flash",
        "TrendAnalystAI": "gemini-2.5-flash",
        "AnalystAI": "gemini-2.5-flash",
        "DataAnalystAI": "gemini-2.5-flash",
        "MarketAnalystAI": "gemini-2.5-flash",
        "TechnicalAI": "gemini-2.5-pro",
        "CoderAI": "gemini-2.5-flash",
        "ArchitectAI": "gemini-2.5-pro",
        "CreativeAI": "gemini-2.0-flash",
        "WriterAI": "gemini-2.0-flash",
        "DesignerAI": "gemini-2.0-flash",
    },

}


def get_model_for_agent(provider: str, agent_name: str) -> Optional[str]:
    """
    Get the recommended model for a specific agent and provider.

    Falls back to the global provider model if no specific assignment exists.
    """
    provider_models = AGENT_MODELS.get(provider, {})
    return provider_models.get(agent_name)
