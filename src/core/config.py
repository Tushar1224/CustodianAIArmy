"""
Configuration settings for Custodian AI Army.
"""

from typing import Dict, Optional, Union

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

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

    # Primary LLM Provider
    PRIMARY_LLM_PROVIDER: Optional[str] = "anthropic"  # Options: gemini, anthropic

    # MCP (Model Context Protocol) Configuration
    MCP_ENABLED: bool = True

    # Additional URLs and Ports
    FASTAPI_URL: str = "http://localhost:8000"
    FASTAPI_PORT: int = 8000

    # Database Configuration
    DATABASE_URL: str = "postgresql://custodian:custodian_secret@localhost:5432/custodian"

    # Redis Configuration
    REDIS_URL: str = "redis://localhost:6379"

    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    JWT_SECRET: str = "your-jwt-secret-change-in-production"

    # Google OAuth Configuration
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REDIRECT_URI: str = ""

    # GitHub OAuth Configuration
    GITHUB_CLIENT_ID: Optional[str] = None
    GITHUB_CLIENT_SECRET: Optional[str] = None
    GITHUB_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/github/callback"

    # Admin Dashboard
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin123"
    ADMIN_JWT_SECRET: str = "admin-jwt-secret-change-in-production"

    # Logging
    LOG_LEVEL: str = "INFO"


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
