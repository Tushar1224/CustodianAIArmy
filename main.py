"""
Custodian AI Army - Main Application Entry Point
A futuristic AI agent orchestration system inspired by Abacus.ai
"""

# Load .env BEFORE any imports so db_backend etc. see it
from dotenv import load_dotenv
load_dotenv()

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from src.api.routes import router as api_router
from src.api.auth import router as auth_router
from src.core.config import settings
from src.core.logging_config import setup_logging

# Setup logging
setup_logging()

# Create FastAPI app
app = FastAPI(
    title="Custodian AI Army",
    description="A futuristic AI agent orchestration system with multiple specialized agents",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
# All routes in api_router will be prefixed with /api/v1 (e.g., /api/v1/agents)
app.include_router(api_router, prefix="/api/v1")
app.include_router(auth_router)

from src.api.routes import get_mvp_builder_instance
import asyncio

@app.on_event("startup")
async def startup_background_tasks():
    """Start background autosave for MVP sessions."""
    autosave_interval = int(os.getenv("MVP_AUTOSAVE_INTERVAL", "60"))

    async def autosave_loop():
        builder = get_mvp_builder_instance()
        while True:
            try:
                for session in list(builder.sessions.values()):
                    try:
                        builder._persist_to_db(session)
                    except Exception as e:
                        log = get_logger("autosave")
                        log.warning(f"Autosave failed for session {getattr(session, 'session_id', 'unknown')}: {e}")
                await asyncio.sleep(autosave_interval)
            except Exception as e:
                log = get_logger("autosave")
                log.error(f"Autosave loop error: {e}")
                await asyncio.sleep(autosave_interval)

    asyncio.create_task(autosave_loop())

# Mount legacy static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# ── React SPA or legacy static pages ────────────────────────────────────────
from fastapi.responses import FileResponse

frontend_dist = "frontend/dist"
if os.path.isdir(frontend_dist):
    # Serve Vite's built JS/CSS assets
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="frontend_assets")

    # SPA catch-all: serves existing files or falls back to index.html
    # Must be the LAST route so API routes and /static mount take priority.
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if not full_path:
            full_path = "index.html"
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    # Legacy fallback when SPA is not built
    @app.get("/app")
    async def legacy_app():
        return FileResponse("static/index.html")

    @app.get("/dashboard")
    async def dashboard_page():
        return FileResponse("static/pages/dashboard.html")

    @app.get("/learn")
    async def learn_page():
        return FileResponse("static/pages/learn.html")

    @app.get("/portfolio")
    async def portfolio_page():
        return FileResponse("static/pages/portfolio.html")

    @app.get("/build")
    async def build_page():
        return FileResponse("static/pages/build.html")

    @app.get("/payment.html")
    async def payment_page():
        return FileResponse("static/payment.html")

    @app.get("/finance")
    async def finance_page():
        return FileResponse("static/pages/finance.html")

    @app.get("/agents")
    async def agents_page():
        return FileResponse("static/pages/customagents.html")

    @app.get("/")
    async def homepage():
        return FileResponse("static/home.html")


if __name__ == "__main__":
    port = int(os.getenv("APP_PORT") or os.getenv("FASTAPI_PORT") or settings.APP_PORT)
    uvicorn.run(
        "main:app",
        host=settings.APP_HOST,
        port=port,
        reload=settings.DEBUG is True,
    )

