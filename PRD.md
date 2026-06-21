# Custodian AI Army — Product Requirements Document

> **Version:** 1.5.0 · **Last Updated:** 2026-06-13  
> **Project:** Custodian AI Army — A futuristic multi-agent AI orchestration system

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Agent System](#4-agent-system)
5. [MVP Builder Pipeline](#5-mvp-builder-pipeline)
6. [API Reference](#6-api-reference)
7. [Authentication & Plans](#7-authentication--plans)
8. [UI Pages & Routes](#8-ui-pages--routes)
9. [MCP Tool Integration](#9-mcp-tool-integration)
10. [Local Setup (Pre-Prod)](#10-local-setup-pre-prod)
11. [Production Deployment](#11-production-deployment)
12. [Testing Guide](#12-testing-guide)
13. [Environment Variables](#13-environment-variables)
14. [Maintenance & Troubleshooting](#14-maintenance--troubleshooting)

---

## 1. Project Overview

**Custodian AI Army** is a modular, multi-agent orchestration platform that allows users to:

- Chat with specialized AI agents (powered by **Google** or **Anthropic**)
- SSE streaming responses with inline processing status ("Thinking..." → "Analyzing..." → "Synthesizing..." → "Generating...")
- Chat history for all users (guest saves to localStorage, authenticated saves to server)
- Build full-stack products via a **5-phase MVP pipeline** (Ideation → Planning → Review → Polish → Build)
- Publish generated code to **GitHub** with one click
- Learn programming through interactive courses with AI tutoring
- Manage custom AI agents with user-defined skills
- Authenticate via **Google OAuth** and **GitHub OAuth**
- Rate-limited plans: Guest (3/day), Free (20/day), Pro (50/day)

### Vision

Replace the need for multiple AI tools with a single, self-hosted or cloud-deployed system where specialized agents collaborate autonomously, coordinated by a central CommanderAI, to research, analyze, create, and build.

---

## 2. Architecture

### 2.1 System Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     End User (Browser)                     │
├──────────────────────────────────────────────────────────┤
│                    FastAPI Server (Port 8000)              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Auth    │  │  Agent   │  │  MVP     │  │  Course  │  │
│  │  Routes  │  │  Manager │  │  Builder │  │  Routes  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │              │              │              │       │
│  ┌────┴──────────────┴──────────────┴──────────────┴────┐  │
│  │                    SQLite Database                      │  │
│  │  (sessions, chats, users, progress, api_keys, plans)   │  │
│  └───────────────────────────┬──────────────────────────┘  │
│                              │                              │
│  ┌───────────────────────────┴──────────────────────────┐  │
│  │               MCP Tool Layer                          │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │  │
│  │  │  fetch   │ │duckduckgo│ │filesystem│ │ memory  │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘ │  │
│  └───────────────────────────┬──────────────────────────┘  │
│                              │                              │
│  ┌───────────────────────────┴──────────────────────────┐  │
│  │              AI Provider (Gemini / Claude)             │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
         │
         ▼
  GitHub API ────→ Publish code to repos / GitHub Pages
```

### 2.2 Data Flow (Chat Request)

```
User Message
    → POST /api/v1/chat (or /chat/stream)
    → Rate limit check (sqlite)
    → AgentManager.find_agent() (by name/specialization)
    → Agent.process_message()
        → Provider API call (Gemini or Claude)
        → Optional MCP tool execution (web search, file read, etc.)
    → Response returned to user
    → Chat history saved to sqlite
```

### 2.3 Data Flow (MVP Build)

```
User provides product idea
    → POST /api/v1/mvp/create-session
    → 5-Phase Pipeline (async, user-controlled advancement):
        1. Ideation   → CommanderAI (coordinator)
        2. Planning   → ArchitectAI (architect)
        3. Review     → TechnicalAI (technical)
        4. Polish     → DesignerAI (designer)
        5. Build      → CoderAI (coder)
    → Files generated in /tmp/mvp-workspaces/{session_id}/
    → POST /api/v1/mvp/publish → GitHub API (Contents API)
    → GitHub Pages URL returned
```

---

## 3. Tech Stack

| Component            | Technology                          |
|----------------------|-------------------------------------|
| **Backend Framework**| Python 3.8+ · FastAPI · Uvicorn     |
| **AI Providers**     | Google (`gemini-2.5-flash/pro`)     |
|                      | Anthropic (`claude-sonnet-4-5`)     |
| **Database**         | SQLite (via `sqlite3` module)        |
| **Auth**             | Google OAuth 2.0 · GitHub OAuth · JWT |
| **Frontend**         | React 19 · Vite · React Router 7 · Bootstrap 5 · marked (markdown) · highlight.js |
| **Legacy Frontend**  | Static HTML + `app.v2.js` (cache-busted SPA) |
| **MCP Tools**        | `uvx` / `npx` based servers          |
| **Revenue**          | Demo payment page → Stripe (planned)  |
| **Deployment**       | Vercel (Python runtime)              |
| **Testing**          | Jest (JS) · pytest (planned)         |

---

## 4. Agent System

### 4.1 Agent Hierarchy

```
CommanderAI (Main · Coordinator)
├── AnalystAI (Main · Analysis)
│   ├── DataAnalystAI (Sub)
│   └── MarketAnalystAI (Sub)
├── CreativeAI (Main · Creative)
│   ├── WriterAI (Sub)
│   └── DesignerAI (Sub)
├── TechnicalAI (Main · Technical)
│   ├── CoderAI (Sub)
│   └── ArchitectAI (Sub)
└── ResearchAI (Main · Research)
    ├── FactCheckerAI (Sub)
    └── TrendAnalystAI (Sub)
```

### 4.2 Agent Capabilities

Each agent has:
- **Specialization** — Determines available MCP tools
- **Model Assignment** — Per-agent per-provider model mapping (see `src/core/config.py`)
- **Sub-agent orchestration** — Main agents can delegate to their sub-agents
- **Streaming support** — SSE-based streaming responses with automatic provider fallback and inline processing status

### 4.3 Provider Switching

Users can switch between Google and Anthropic:
- Default provider: **Anthropic** — production recommended
- UI displays **Google** and **Anthropic** as provider names
- Via UI (settings panel) → calls `POST /api/v1/provider/switch`
- Via `.env` (`PRIMARY_LLM_PROVIDER=gemini` or `anthropic`)
- Automatic fallback if primary provider returns an error
- UI shows **Google** and **Anthropic** as provider labels

### 4.4 Model Assignments

| Agent            | Google Model        | Anthropic Model           |
|------------------|---------------------|------------------------|
| CustodianAI      | gemini-2.5-pro      | claude-sonnet-4-5      |
| ResearchAI       | gemini-2.5-pro      | claude-sonnet-4-5      |
| FactCheckerAI    | gemini-2.5-flash    | claude-sonnet-4-5      |
| TrendAnalystAI   | gemini-2.5-flash    | claude-sonnet-4-5      |
| AnalystAI        | gemini-2.5-flash    | claude-sonnet-4-5      |
| DataAnalystAI    | gemini-2.5-flash    | claude-sonnet-4-5      |
| MarketAnalystAI  | gemini-2.5-flash    | claude-sonnet-4-5      |
| TechnicalAI      | gemini-2.5-pro      | claude-sonnet-4-5      |
| CoderAI          | gemini-2.5-flash    | claude-sonnet-4-5      |
| ArchitectAI      | gemini-2.5-pro      | claude-sonnet-4-5      |
| CreativeAI       | gemini-2.0-flash    | claude-sonnet-4-5      |
| WriterAI         | gemini-2.0-flash    | claude-sonnet-4-5      |
| DesignerAI       | gemini-2.0-flash    | claude-sonnet-4-5      |

---

## 5. MVP Builder Pipeline

### 5.1 Phases

| Phase     | Agent            | Description                            |
|-----------|------------------|----------------------------------------|
| Ideation  | CommanderAI      | Refine product concept, target users   |
| Planning  | ArchitectAI      | Tech stack, architecture, milestones   |
| Review    | TechnicalAI      | Validate approach, identify issues     |
| Polish    | DesignerAI       | UX improvements, accessibility         |
| Build     | CoderAI          | Generate production-ready code files   |

### 5.2 Modes

- **Plan Mode** — Discuss and refine without executing changes
- **Act Mode** — Proceed with implementation, create files

### 5.3 GitHub Integration

1. Connect GitHub account (OAuth popup)
2. Create new repo (via GitHub API) or select existing
3. Publish all workspace files via Contents API (no git CLI needed)
4. GitHub Pages URL generated for live preview

### 5.4 API Endpoints

| Method | Path                                    | Description              |
|--------|-----------------------------------------|--------------------------|
| POST   | `/api/v1/mvp/create-session`             | Start new build          |
| POST   | `/api/v1/mvp/send-message`               | Chat in current phase    |
| POST   | `/api/v1/mvp/advance-phase`              | Move to next phase       |
| GET    | `/api/v1/mvp/session/{id}`               | Get session details      |
| GET    | `/api/v1/mvp/session/{id}/files`         | List workspace files     |
| GET    | `/api/v1/mvp/session/{id}/file?path=`    | Read file content        |
| POST   | `/api/v1/mvp/connect-github`             | Connect GitHub account   |
| POST   | `/api/v1/mvp/disconnect-github`          | Disconnect GitHub        |
| POST   | `/api/v1/mvp/create-repo`                | Create GitHub repo       |
| GET    | `/api/v1/mvp/session/{id}/github-repos`  | List user repos          |
| POST   | `/api/v1/mvp/publish`                    | Push to GitHub           |
| GET    | `/api/v1/mvp/session/{id}/preview`       | Live HTML preview        |

---

## 6. API Reference

### 6.1 Agent & Chat

| Method | Path                              | Auth   | Description                         |
|--------|-----------------------------------|--------|-------------------------------------|
| GET    | `/api/v1/health`                  | No     | Health check                        |
| GET    | `/api/v1/army/status`             | No     | Full army status                    |
| GET    | `/api/v1/agents`                  | No     | List all agents                     |
| GET    | `/api/v1/agents/{id}`             | No     | Agent details                       |
| GET    | `/api/v1/agents/by-name/{name}`   | No     | Agent by name                       |
| GET    | `/api/v1/agents/available`        | No     | Idle agents                         |
| GET    | `/api/v1/agents/main`             | No     | Main agents only                    |
| GET    | `/api/v1/specializations`         | No     | Available specializations           |
| POST   | `/api/v1/chat/stream`             | JWT    | **[Preferred]** Stream chat (SSE)   |
| POST   | `/api/v1/chat/stream/guest`       | No     | **[Preferred]** Guest stream        |
| POST   | `/api/v1/chat`                    | JWT    | Non-streaming chat (fallback)       |
| POST   | `/api/v1/chat/guest`              | No     | Non-streaming guest chat (fallback) |
| POST   | `/api/v1/tasks/execute`           | JWT    | Execute task                        |
| POST   | `/api/v1/messages/send`           | JWT    | Direct message to agent             |
| POST   | `/api/v1/messages/broadcast`      | JWT    | Broadcast to all agents             |
| POST   | `/api/v1/execute-code`            | No     | Execute Python code (sandboxed)     |

### 6.2 Chat & History

| Method | Path                    | Auth | Description              |
|--------|-------------------------|------|--------------------------|
| GET    | `/api/v1/chats?email=`  | JWT  | Get user chats           |
| POST   | `/api/v1/chats`         | JWT  | Save chat session        |

**Guest chat history:** Saved to `localStorage` under `custodian_chats` key when not authenticated. Merged with server-side history for authenticated users.

### 6.3 Courses & Learning

| Method | Path                                                   | Auth | Description                    |
|--------|--------------------------------------------------------|------|--------------------------------|
| GET    | `/api/v1/courses`                                      | No   | List courses (filterable)      |
| GET    | `/api/v1/courses/{id}`                                 | No   | Course details                 |
| GET    | `/api/v1/courses/{id}/slides/{lang}`                   | No   | All slides for a course        |
| GET    | `/api/v1/courses/{id}/slides/{lang}/{index}`           | No   | Single slide                   |
| POST   | `/api/v1/chat/course`                                  | No   | Course-aware chat (tutor)      |
| GET    | `/api/v1/progress`                                     | No   | Get progress (guest-friendly)  |
| GET    | `/api/v1/progress/me`                                  | JWT  | Get my progress                |
| POST   | `/api/v1/progress`                                     | No   | Update progress                |

### 6.4 User & Plans

| Method  | Path                          | Auth | Description                              |
|---------|-------------------------------|------|------------------------------------------|
| GET     | `/api/v1/user/plan`           | No   | Get plan info (incl. `plan_expiry`)      |
| POST    | `/api/v1/user/upgrade-plan`   | JWT  | Upgrade plan (sets 1-year `plan_expiry`) |
| GET     | `/api/v1/user/api-keys`       | JWT  | Get masked API keys                      |
| POST    | `/api/v1/user/api-keys`       | JWT  | Save API keys                            |
| DELETE  | `/api/v1/user/api-keys/{p}`   | JWT  | Delete provider key                      |

### 6.5 Provider Management

| Method | Path                            | Auth | Description              |
|--------|---------------------------------|------|--------------------------|
| GET    | `/api/v1/provider/active`       | No   | Current active provider  |
| POST   | `/api/v1/provider/switch`       | JWT  | Switch provider          |

### 6.6 Auth

| Method | Path                                           | Description                |
|--------|------------------------------------------------|----------------------------|
| GET    | `/api/v1/auth/google`                          | Initiate Google OAuth      |
| GET    | `/api/v1/auth/google/callback`                 | Google OAuth callback      |
| GET    | `/api/v1/auth/github/login`                    | Initiate GitHub OAuth      |
| GET    | `/api/v1/auth/github/callback`                 | GitHub OAuth callback      |
| GET    | `/api/v1/auth/status`                          | Check auth status          |
| GET    | `/api/v1/auth/me`                              | Get current user           |
| POST   | `/api/v1/auth/logout`                          | Logout                     |
| GET    | `/api/v1/auth/user/chats`                      | Get user chats             |
| POST    | `/api/v1/auth/user/chats`                      | Save user chat             |
| DELETE | `/api/v1/auth/user/chats/{id}`                 | Delete chat                |

### 6.7 Resumes

| Method  | Path                                          | Description                                       |
|---------|-----------------------------------------------|---------------------------------------------------|
| GET     | `/resumes`                                    | List user's resumes                               |
| POST    | `/resumes`                                    | Create new resume                                 |
| GET     | `/resumes/{id}`                               | Get single resume                                 |
| PUT     | `/resumes/{id}`                               | Update resume                                     |
| DELETE  | `/resumes/{id}`                               | Delete resume                                     |
| POST    | `/resumes/{id}/optimize`                      | AI-optimize with optional JD                      |
| POST    | `/resumes/{id}/compact-chat`                  | Compact chat history when > 8K chars              |
| GET     | `/resumes/{id}/chat`                          | Get resume chat history                           |
| PUT     | `/resumes/{id}/chat`                          | Save resume chat history                          |
| POST    | `/resumes/parse`                              | Parse raw text to structured JSON                 |
| POST    | `/resumes/upload`                             | Upload PDF/DOCX/TXT file (supports optional `jd` form field) |
| POST    | `/resumes/extract-text`                      | Extract text from PDF/DOCX/TXT document (used for JD file upload) |
| GET     | `/resumes/templates`                          | List templates (optional `?category=` filter)     |
| POST    | `/resumes/templates`                          | Save a template                                   |
| GET     | `/resumes/templates/categories`               | List all template categories                      |
| GET     | `/resumes/extract-templates`                  | Extract unique template structures from all resumes|

### 6.8 Webhooks

| Method | Path                             | Description           |
|--------|----------------------------------|-----------------------|
| POST   | `/api/v1/webhooks/{webhook_id}`  | Receive webhook data  |

---

## 7. Authentication & Plans

### 7.1 Auth Methods

- **Google OAuth** — Primary login. Creates session cookie + JWT (1-year expiry).
- **GitHub OAuth** — For MVP Builder GitHub integration. Used via popup window.
- **Guest** — No login. 3 requests/day, rate-limited by IP.

### 7.2 Plan Tiers

| Plan   | Daily Limit | Providers      | Auth Required | Chat History         | Pro Validity |
|--------|-------------|----------------|---------------|----------------------|--------------|
| Guest  | 3           | Google, Anthropic | No            | localStorage         | —            |
| Free   | 20          | Google, Anthropic | Google OAuth  | Server + localStorage| —            |
| Pro    | 50          | Google, Anthropic | Google OAuth + Payment | Server + localStorage | 1 year from purchase |

**Plan Expiry:** Pro plans expire after 1 year. On the next `get_user_plan()` call after expiry, the user is automatically downgraded to Free. A `plan_expiry` column in `user_plans` stores the ISO date string.

### 7.3 Payment & Upgrade Flow

1. User clicks "Upgrade to Pro" → navigates to `/payment`
2. Card form (demo sandbox) → validation → 1.8s simulated processing
3. `POST /api/v1/user/upgrade-plan` sets `plan='pro'` + `plan_expiry = now + 365 days`
4. A `payments` record is saved (id, user_email, amount, plan, valid_until)
5. User is redirected to `/` via full page reload (`window.location.href = '/'`) — ensures `useAuth` re-fetches fresh plan data; Header shows **PRO** badge, Profile shows "Valid until" date
6. Stripe integration planned (will replace demo sandbox)

### 7.4 Database Tables — Plans & Payments

```sql
-- user_plans (rate limiting + plan info)
user_email TEXT PRIMARY KEY,
plan TEXT NOT NULL DEFAULT 'guest',          -- 'guest' | 'free' | 'pro'
requests_today INTEGER NOT NULL DEFAULT 0,   -- (kept for backward compat)
last_reset_date TEXT NOT NULL,              -- (kept for backward compat)
plan_expiry TEXT                            -- ISO date (e.g. '2027-06-10T12:00:00') — NULL for guest/free

-- daily_requests (separate table for request tracking)
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_email TEXT NOT NULL,
date TEXT NOT NULL,                         -- 'YYYY-MM-DD'
request_count INTEGER NOT NULL DEFAULT 0,
last_updated TEXT NOT NULL,
UNIQUE(user_email, date),
FOREIGN KEY (user_email) REFERENCES user_plans(user_email)

-- payments (payment history)
id TEXT PRIMARY KEY,                        -- UUID
user_email TEXT NOT NULL,
amount REAL NOT NULL,
currency TEXT NOT NULL DEFAULT 'usd',
plan TEXT NOT NULL,                         -- 'pro'
status TEXT NOT NULL,                       -- 'completed'
payment_method TEXT NOT NULL DEFAULT 'demo', -- 'demo' | 'stripe' (future)
created_at TEXT NOT NULL,
valid_until TEXT NOT NULL                   -- ISO date (1 year from purchase)
```

### 7.5 Request Tracking

Request counts are stored in the `daily_requests` table (separate from `user_plans`) with a foreign key to `user_plans(user_email)`. Each row tracks `request_count` per `(user_email, date)`. The counter is reset automatically when the `date` changes.

| Function | Description |
|----------|-------------|
| `get_daily_request_count(user_email, date)` | Returns request count for a user on a given date |
| `increment_daily_request_count(user_email, date)` | Atomically increments counter (INSERT OR UPDATE) |

### 7.6 Plan Display

Plan badges are displayed dynamically across all UI components:

| Component | Location | Display |
|-----------|----------|---------|
| **Header** | Dropdown → plan label | `GUEST` (muted) / `FREE` (blue) / `PRO` (gold) — via `useAuth().plan` |
| **Sidebar** | Offcanvas header | Badge with icon + label, color-coded |
| **ProfileModals** | "My Plan" tab | Badge, progress bar, remaining count, expiry date for Pro |
| **Auth status** | `GET /api/v1/auth/status` | Returns `user.plan` and `user.plan_expiry` |

### 7.3 Database Tables

```sql
-- Core tables (auto-initialized on import):
chat_sessions       -- Chat history
user_progress       -- Course learning progress
user_profile        -- User preferences
user_api_keys       -- Per-user custom API keys
user_plans          -- Plan + plan_expiry
daily_requests      -- Daily request count tracking (FK→user_plans)
payments            -- Payment history (demo + future Stripe)
user_github_connections     -- GitHub OAuth tokens
user_github_repo_permissions -- Repo access control
custom_agent_configs        -- User-defined agents
sessions            -- Persistent auth sessions
```

---

## 8. UI Pages & Routes

| Route            | React Component                | Description                     |
|------------------|-------------------------------|----------------------------------|
| `/`              | `pages/HomePage.jsx`          | Futuristic landing with neuron visualization |
| `/dashboard`     | `pages/DashboardPage.jsx`     | AI Dashboard (fully self-contained React) |
| `/learn`         | `pages/LearnPage.jsx`         | Learn with AI (courses)         |
| `/portfolio`     | `pages/PortfolioPage.jsx`     | Portfolio Builder               |
| `/build`         | `pages/BuildPage.jsx`         | Build Your Product (MVP)        |
| `/agents`        | `pages/CustomAgentsPage.jsx`  | Custom Agent management         |
| `/resume`        | `pages/ResumePage.jsx`        | Resume Optimizer — upload, ATS-optimize, multi-template |
| `/payment`       | `pages/PaymentPage.jsx`       | Payment/upgrade page            |
| `/api/docs`      | —                             | Swagger UI (auto-generated)     |
| `/api/redoc`     | —                             | ReDoc UI (auto-generated)       |

### Shared Components

| Component              | File                              | Description                              |
|------------------------|-----------------------------------|------------------------------------------|
| **MainLayout**         | `components/layout/MainLayout.jsx`| Wraps all pages with Header + Sidebar    |
| **Header**             | `components/layout/Header.jsx`    | Fixed top nav with profile dropdown      |
| **Sidebar**            | `components/layout/Sidebar.jsx`   | Offcanvas navigation menu                |
| **NeuronBrain**        | `components/NeuronBrain.jsx`      | Interactive full-canvas neural network visualization on the homepage with biological neuron rendering (dendrites, soma, axon hillock, myelin sheaths, synaptic boutons), 14 dummy neurons, 3D rotation, drag-and-drop physics, hover detail panel, and space nebula background |
| **ProfileModals**      | `components/modals/ProfileModals.jsx` | Tabbed modal: Edit Profile, API Keys, Chat History, My Plan — shared across all pages |

### 8.1 HomePage Hero

The landing page hero is a **full-viewport section** (`height: 100vh`) containing:

- **Absolute-overlaid header**: "Powered by Claude, backed up by Gemini" badge + "Custodian AI Army" title; `pointer-events: none` so neuron glow shows behind text; badge at `top: 5rem` to clear the 60px fixed nav bar
- **NeuronBrain canvas**: Fills the entire hero; `topOffset={80}` shifts neurons below the header text
- **Fixed nav bar**: 60px tall, `rgba(10,10,15,0.92)` with backdrop blur, overlays the top of the hero
- **Legend**: "Working" (blue dot) and "Coming Soon" (yellow dot) at `bottom: 0.75rem` centered
- **Container**: No `border-radius` or `border` (removed to prevent `overflow:hidden` from clipping the legend at bottom corners); `box-shadow` preserved for depth

### 8.2 Dashboard Mobile Layout

On **mobile and tablet** (<768px viewport), the dashboard switches to a compact chat-only layout:

- The agent list sidebar (`agents-top-section`) and agent info panel are **hidden** (`d-none d-md-flex`)
- A compact **"Agent" dropdown** appears in the `chat-options-bar` (left of the incognito toggle) — tap to switch between any available AI agent
- Provider switcher, message list, and input bar remain unchanged
- **Desktop** (md+) retains the full three-panel layout (agent list sidebar + info panel + chat)

### 8.3 NeuronBrain Component (`components/NeuronBrain.jsx`)

**Rendering pipeline** (per frame):
1. Draw 4 nebula clouds (purple/blue radial gradients with slow sinusoidal drift)
2. Draw 3 animated sine waves across the canvas
3. Apply 3D rotation matrix to all neuron positions (gentle oscillating `sin/cos`)
4. Update 80 twinkling star particles with per-particle speed/alpha/twinkle offset
5. Update neuron positions with spring-physics drift + boundary collision (margin 40px)
6. Draw traveling signal pulses (spawned from center to random feature)
7. Draw center hub expanding energy wave
8. Draw per-neuron dendrite-style connecting tentacles (tapered, wobbly, spines, bouton; deduplicated via sorted key Set)
9. Draw each neuron: glow → dendrites → soma → spike ring → label

**Neuron data model:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`dummy-N` for dummies, `center` for hub) |
| `feature` | object/null | Feature data reference (null for dummies/center) |
| `z` | number | Depth (0.3–1.0), affects scale and drift amplitude |
| `baseX, baseY` | number | Initial position (ring around center) |
| `x, y` | number | Current animated position |
| `vx, vy` | number | Velocity for drift physics |
| `seed` | number | Deterministic random seed for rendering |
| `isCenter, isDummy` | boolean | Type flags |
| `spike, targetSpike` | number | Hover spike animation (0→1) |
| `dendriteAngle` | number | Slow-rotating base angle for dendrites |
| `connections` | string[] | IDs of connected neurons (per-neuron nearest-neighbor) |
| `dummySz` | number | Size override for dummy neurons (8–15) |

**Connection topology** (initialized once on mount/resize via `useCallback`):
- Feature neurons: connect to 2 nearest non-center neighbors
- Dummy neurons: connect to 3 nearest features + 1 nearest dummy
- Center hub: connects to all feature neurons
- Connections deduplicated via sorted-key Set when drawing tentacles

**Rendering functions:**

| Function | Purpose |
|----------|---------|
| `drawDendrites` | 6–9 curved dendrites per feature (4–7 per dummy) with taper, secondary branches, spines, Nissl bodies |
| `drawSoma` | Irregular 14-point soma contour with radial gradient, nucleus, nucleolus, highlight, ion-channel dots, axon hillock |
| `drawAxon` | Wobbly myelinated axon path with glow and synaptic bouton cluster |
| `drawConnectingDendrite` | Tapered dendrite-style connection between neurons (replaces tentacles) with spines and bouton |
| `drawNebula` | 4 drifting radial gradient clouds |
| `drawWaves` | 3 animated sine waves |
| `spawnPulse` | Creates a traveling signal pulse from center to feature |

**Interaction:**
- Hover over feature neuron → right detail panel slides in (icon, name, status badge, description, Explore button), 3-pulse burst fires from center
- Click feature neuron → `onFeatureClick(feature)` → `navigate(feature.href)`
- Drag-and-drop feature neurons → spring-back physics on release; dummies are not interactive
- Empty state detail panel shows brain icon + "Hover over a neuron to see details"

**Performance:** Buffered via 3 ref arrays (`nsRef`, `psRef`, `pulsesRef`); `useMemo` on `allFeatures` array to prevent re-init; DevicePixelRatio-aware canvas sizing.

### 8.4 AdSense Integration (Required for all pages)

Every page **must** include an AdSense banner. Two patterns:

1. **Via `MainLayout`** (preferred) — `<MainLayout showAd={true}>` renders `<AdSenseAd />` automatically. `showAd` defaults to `true`, so pages using `MainLayout` get ads by default.
2. **Direct `<AdSenseAd />`** — Standalone pages (`HomePage`, `PaymentPage`) must import and render the component explicitly.

**Rule:** Any new page MUST have an ad unit. If the page uses `MainLayout`, ads are automatic. If it doesn't, add `<AdSenseAd />` at the top of the content area.

Component: `frontend/src/components/layout/AdSenseAd.jsx` | Publisher: `ca-pub-6476201805386001` | Slot: `5335186375`

### 8.5 Resume Optimizer (`/resume`)

A full-featured resume builder with AI-powered ATS optimization, document parsing, multi-template support, and chat-based modifications with inline review.

#### Views
1. **List View** — Card grid of all user resumes with ATS score badges, inline title rename, upload button with loading spinner
2. **Editor View** — Split panel: LHS has collapsible template selector (category tabs + 5 built-in templates + user-accumulated) + 7-tab form (Personal, Education, Experience, Skills, Certs, Projects, Achievements) + section management checkboxes; RHS has JD input + live preview
3. **Viewer View** — 2-column: LHS = NOVA-style white document with click-to-edit all fields (`contentEditable` for personal_info, pencil-icon inline forms for arrays), inline add/delete controls for array sections, per-field accept/reject inline diff review, compact Accept All/Reject All bar at document bottom; RHS = chat modifications + ATS suggestions; compact template badge dropdown in top action bar. Page title shows "Resume Optimizer — {resume name}" consistently.

#### Inline Editing (Viewer)
- **Personal info fields** (name, title, email, phone, linkedin, github, website, summary) — `contentEditable` on click; blur or Enter saves
- **Array sections** (education, experience, certifications, projects, achievements) — click pencil icon or item to open inline multi-field form with Done button
- **Skills** — click to edit as comma-separated list, saves as `{id, value}` objects
- **Add controls** — "+ Add" link at bottom of each array section creates blank item and opens edit form (`getBlankItem()` helper returns per-section empty templates)
- **Delete controls** — trash button inside each inline edit form header
- Changes update `currentResume.data` immediately but do NOT auto-save to backend

#### Template System
- **5 built-in templates** across 5 categories (Professional, Academic, Technical, Creative, General) with section definitions, multi-page layouts, and styling
- **Non-destructive switching** — applying a new template preserves existing data; intelligent merge: template structure → overwrite with existing data per section → keep extra sections not in template
- **Only Modern Professional has demo data** — other 4 templates are structure-only; AI optimization can populate them
- **Section management** — checkboxes to enable/disable any of 12 section types per resume (personal_info, summary, education, experience, skills, certifications, projects, achievements, languages, publications, volunteering, references)
- **Template accumulation** — every unique template used is auto-saved to `user_templates` DB table with `category` and `section_defs`; globally available to all users
- **Multi-page** — templates define page layouts with section-to-page mapping; viewer shows Prev/Next navigation
- **Category-tabbed selector** — both editor and viewer show built-in + user templates filtered by selected category

#### Upload & Parsing
| File Type | Backend | Extraction |
|-----------|---------|------------|
| PDF | Claude native document blocks or PyPDF2 | Full text extraction; Claude parses as base64 `document` content block directly |
| DOCX | Claude native document blocks or python-docx | Same — SDK parses native format when Claude provider active |
| TXT | Direct read | Raw text → AI parsing |
| DOC | — | Returns clear error (legacy format) |

#### Job Description Integration
The JD (Job Description) is central to the resume optimizer — it tailors the resume for ATS matching and informs all AI interactions.

- **Paste JD**: Editable textarea in all three views (list, editor, viewer) — type or paste JD text directly
- **Upload JD document**: A dedicated file-upload button accepts PDF/DOCX/TXT; text is extracted via `POST /resumes/extract-text` (uses `extract_text()` from `document_extractor.py`) and populated into the textarea
- **Auto-expand**: When JD text is loaded, the section auto-expands to show a 6-row editable textarea; the collapsed header shows a ~180-char inline preview
- **Consistent UX**: All three views share the same JD section pattern — collapsed preview, auto-expand, file upload, clear button, character count badge
- **Upload integration**: When uploading a resume file, the current JD text is included as a form field (`jd`) and saved on the resume record from the start
- **Optimize with JD**: The viewer's "Optimize with AI" button shows "Optimize with JD" when JD is loaded; triggers `POST /resumes/{id}/optimize` with `jd` parameter
- **Chat with JD context**: `handleChatSend` passes `jd: jdText || null` to the optimize endpoint — all chat-based modifications are JD-aware
- **JD persistence**: After every optimize or chat call, the JD is saved back to the resume record via `resume.jd`; survives across sessions

#### Chat Compaction
- `POST /resumes/{resume_id}/compact-chat` endpoint compresses old messages via AI summarization when total chars > 8000
- Keeps last 4 messages as-is; stores `[{role:"system", content:"[Compacted]..."}, ...recent]`
- Frontend `saveChatHistory()` auto-triggers compaction after each save if threshold exceeded
- Optimize prompt includes last 10 chat messages for context continuity

#### AI Optimization Flow
1. User clicks Optimize or sends chat instruction
2. Backend calls `TechnicalAI` agent (falls back to `CustodianAI`) with full resume data + template context (section_defs, pages, styling) + optional JD + last 10 chat messages
3. Agent returns structured JSON: `optimized_data` (changed fields only), `ats_score`, `changes`, `suggestions`, `score_breakdown`
4. Frontend computes diffs per section/field via `computeDiffSections()` — enters **review mode** with yellow document outline
5. Each changed section shows **OLD** (red bg, strikethrough) and **AI PROPOSED** (green bg, bold) side by side
6. **Per-field accept/reject** for personal_info fields (name, title, email, phone, linkedin, github, website, summary) — individual Accept/Reject buttons next to each changed field; labels like "Accept role" for title field
7. **Per-section accept/reject** for array sections (education, experience, skills, certs, projects, achievements) — Accept/Reject at section level
8. **404 handling** — if resume deleted on server mid-session, viewer gracefully redirects to list view
9. **Compact Accept All / Reject All** bar at bottom of document below all green diffs
10. Accepted changes merge into `currentResume.data` immediately; on Accept All, saved to backend via PUT

#### Storage & Rate Limits
| Plan | Max Resumes | Optimization Rate |
|------|-------------|-------------------|
| Guest | 3 | 3/day |
| Free | 3 | 20/day |
| Pro | Unlimited | 50/day |

#### Key Files
| File | Purpose |
|------|---------|
| `frontend/src/pages/ResumePage.jsx` | 3-view React component (~2199 lines) — inline editing, add/delete controls, per-field diff review, 404 handling |
| `src/api/routes.py` | 16 resume endpoints (~2264 lines total) — CRUD, optimize, upload, parse, chat, templates, compact-chat, extract-templates |
| `src/core/database.py` | `user_resumes` + `user_templates` tables, CRUD functions, chat history compaction |
| `src/core/document_extractor.py` | PDF/DOCX/TXT text extraction (PyPDF2, python-docx) |
| `src/agents/claude_agent.py` | `parse_document()` — native Claude document content block parsing (no local extraction) |
| `check_resume.py` | Resume-specific test/helper script |
| `check_build.py` | Build verification helper |

### 8.6 Known Issues & Fixes

| Issue | Fix |
|-------|-----|
| Terser TDZ crash (`ReferenceError: Cannot access 'f' before initialization` in production build) | Renamed local `const features` in `init` callback to `const featNodes` — minifier was collapsing both closure and local `features` to same short name `f` |
| Badge hidden behind fixed nav bar | Moved badge from `top: 1.2rem` → `top: 5rem` |
| Legend clipped at container bottom corners | Removed `border-radius: 12px` and `border` from container; kept `box-shadow` |
| Neuron labels clipped by glow | Moved labels from `size + 18` → `size + 26` below soma |
| `frontend/dist/` not deploying to Vercel | Removed `dist` from `frontend/.gitignore` and added `!frontend/dist/` negation to root `.gitignore` for both `dist/` patterns |
| `ModuleNotFoundError: No module named 'anthropic'` on Vercel | Uncommented `anthropic>=0.40.0` in `requirements.txt` |

---

## 9. MCP Tool Integration

MCP (Model Context Protocol) servers provide agents with external tool access.

### 9.1 Available Servers

| Server              | Command                                      | Tools                                    |
|---------------------|----------------------------------------------|------------------------------------------|
| **fetch**           | `uvx mcp-server-fetch`                       | Fetch web content                        |
| **duckduckgo**      | `uvx duckduckgo-mcp-server`                  | Web search, news search                  |
| **filesystem**      | `npx @modelcontextprotocol/server-filesystem`| Read/write files, list/search directories|
| **memory**          | `npx @modelcontextprotocol/server-memory`    | Knowledge graph (entities, relations)    |
| **sequential_thinking** | `npx @modelcontextprotocol/server-sequential-thinking` | Multi-step reasoning |

### 9.2 Agent → Tool Mapping

| Specialization    | Available Tools                                                    |
|-------------------|-------------------------------------------------------------------|
| coordinator       | fetch, web search, memory, sequential thinking                     |
| researcher        | fetch, web search, memory, sequential thinking                     |
| fact_checker      | fetch, web search                                                  |
| trend_analyst     | fetch, web search                                                  |
| analyst           | fetch, web search, sequential thinking                             |
| data_analyst      | fetch, web search, sequential thinking                             |
| market_analyst    | fetch, web search, sequential thinking                             |
| technical         | fetch, filesystem read/write/list/search, sequential thinking      |
| coder             | fetch, filesystem read/write/list/search/create                    |
| architect         | fetch, filesystem read/write/list/search, sequential thinking      |
| creative          | fetch, web search                                                  |
| writer            | fetch, web search                                                  |
| designer          | fetch                                                              |
| general           | fetch                                                              |
| tutor             | fetch, web search, filesystem read                                 |

---

## 10. Local Setup (Pre-Prod)

### 10.1 Prerequisites

- Python 3.8+
- Node.js 18+ (for MCP tools that use `npx`)
- `uvx` installed (`pip install uvx` or via `uv tool install`)
- Google or Anthropic API key (Gemini or Claude)

### 10.2 Installation

```powershell
# 1. Clone the repository
git clone https://github.com/Tushar1224/CustodianAIArmy.git
cd CustodianAIArmy

# 2. Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Configure environment
# Edit .env with your API keys (see Section 13)
```

### 10.3 Configuration (`.env`)

```env
# Pick your primary provider:
PRIMARY_LLM_PROVIDER=anthropic    # or "gemini" (anthropic recommended for production)

# Add at least one API key:
GEMINI_API_KEY=your_gemini_key    # https://aistudio.google.com/apikey
ANTHROPIC_API_KEY=your_claude_key # https://console.anthropic.com/

# OAuth (optional for local, needed for login):
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 10.4 Running Locally

```powershell
# Terminal 1: Start the server
python main.py
# → Uvicorn running on http://127.0.0.1:8000

# Open browser → http://localhost:8000
```

### 10.5 Verifying It Works

```powershell
# Health check
curl http://localhost:8000/api/v1/health

# Chat (guest)
curl -X POST http://localhost:8000/api/v1/chat/guest \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, who are you?"}'

# Agent status
curl http://localhost:8000/api/v1/army/status
```

---

## 11. Production Deployment

### 11.1 Architecture (Vercel + AWS Free Tier)

```
┌──────────┐     /api/*     ┌──────────────┐    TCP:5432    ┌──────────┐
│  Vercel  │ ────────────▶  │  EC2 t3.micro │ ────────────▶  │ RDS (PG) │
│ (React)  │               │  FastAPI      │               │ custodian│
└──────────┘               └──────────────┘               └──────────┘
```

| Component | Service | Cost | Free Tier |
|-----------|---------|------|-----------|
| Frontend | Vercel (Hobby) | $0/mo | Always free |
| Backend | EC2 t3.micro | ~$8/mo after year 1 | 12 months |
| Database | RDS db.t3.micro | ~$17/mo after year 1 | 12 months |
| Network | VPC + subnets | $0/mo | Always free |

### 11.2 CDK Deployment (recommended)

The `infra/` directory contains AWS CDK stacks for one-command deployment:

```bash
cd infra
cdk deploy --all ^
  -c db_password=YourPassword123 ^
  -c anthropic_key=sk-ant-... ^
  -c gemini_key=AI...
```

This provisions:
- **VPC** with public + isolated subnets (0 NAT gateways = $0)
- **RDS PostgreSQL 16** on db.t3.micro in isolated subnet
- **EC2 t3.micro** with auto-setup: Python → clone repo → venv → systemd service

See `infra/README.md` for full deployment guide and lifecycle management.

### 11.3 Connecting Vercel to Backend

In `vercel.json`, proxy `/api/*` to the EC2 instance:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "http://EC2_PUBLIC_IP:8000/api/$1" }
  ]
}
```

### 11.4 Old Deployment Methods (no longer recommended)

#### Vercel-only (deprecated)
SQLite on Vercel uses `/tmp/` — data lost on cold starts. Not suitable for production.

#### Pure VPS / Docker
For custom VPS setups, see `infra/README.md` for the systemd service template. Docker instructions removed — prefer CDK for AWS or Vercel for serverless.

---

## 12. Testing Guide

### 12.1 Manual Test Flow (Chat)

```
1. Open http://localhost:8000
   → Verify landing page loads correctly
2. Click "AI Dashboard"
   → Dashboard shows agent status, all 13 agents visible
3. Send a chat message
   → Agent responds within a few seconds
4. Open browser DevTools → Network tab
   → Verify requests go to /api/v1/chat or /api/v1/chat/stream
5. Test guest mode (no login)
   → 3 requests allowed, then rate-limited
6. Sign in with Google
   → Plan upgraded to "free", 20 requests/day
```

### 12.4 Streaming Chat Flow

```
1. Open http://localhost:8000/dashboard
2. Select an agent from the list
3. Type a message and press Enter/Send
4. SSE streaming starts immediately:
   - Inline status indicator shows "Thinking..." → "Analyzing..." → "Synthesizing..." → "Generating..."
   - Tokens appear character-by-character as the AI generates
   - Status indicator disappears once first token arrives
5. Full response rendered with markdown (code highlighting, copy/run buttons)
6. Chat auto-saved (server if authenticated, localStorage if guest)
7. Chat History modal → Open, Delete, or resume any past session
```

### 12.5 Chat History (All Users)

```
Guest:
  1. Chat messages saved automatically to browser localStorage
  2. Open Chat History → all sessions visible
  3. Open any past session → messages restored
  4. Delete → removed from localStorage

Authenticated:
  1. Chat saved to server + localStorage (merged on load)
  2. Open Chat History → server chats + local chats combined
  3. Google sign-in → localStorage chats persist and merge with server
```

```
1. Open http://localhost:8000/build
   → Build page with 5-phase indicator
2. Type product idea → Send
   → Agent responds in Ideation phase
3. Switch to "Act" mode → Advance phase
   → Moves through Planning → Review → Polish → Build
4. In Build phase, click file in tree
   → File content loads in editor
5. Connect GitHub (OAuth popup)
   → GitHub connected, repos listed
6. Click "Create New Repo"
   → Repo created on GitHub
7. Click "Publish"
   → Files pushed, GitHub Pages URL generated
8. Click "Preview"
   → Opens live HTML in new tab
```

### 12.3 Running Tests

```bash
# JavaScript tests (if jest.config.js is set up)
npm test

# Python tests (if any)
python -m pytest tests/
```

---

## 13. Environment Variables

| Variable                  | Required | Default         | Description                          |
|---------------------------|----------|-----------------|--------------------------------------|
| `GEMINI_API_KEY`          | Yes*     | —               | Google Gemini API key                |
| `ANTHROPIC_API_KEY`       | Yes*     | —               | Anthropic Claude API key             |
| `PRIMARY_LLM_PROVIDER`    | No       | `anthropic`     | Primary AI provider (`anthropic` for Claude, `gemini` for Gemini) |
| `GOOGLE_CLIENT_ID`        | For OAuth| —               | Google OAuth client ID               |
| `GOOGLE_CLIENT_SECRET`    | For OAuth| —               | Google OAuth client secret           |
| `GITHUB_CLIENT_ID`        | For OAuth| —               | GitHub OAuth client ID               |
| `GITHUB_CLIENT_SECRET`    | For OAuth| —               | GitHub OAuth client secret           |
| `JWT_SECRET`              | Yes      | `your-jwt-secret-change-in-production` | JWT signing key      |
| `SECRET_KEY`              | Yes      | `your-secret-key-change-in-production`  | General secret       |
| `DEBUG`                   | No       | `True`          | Debug mode                           |
| `LOG_LEVEL`               | No       | `INFO`          | Logging level                        |
| `APP_HOST`                | No       | `localhost`     | Server bind host                     |
| `APP_PORT` / `FASTAPI_PORT`| No      | `8000`          | Server port                          |
| `DATABASE_PATH`           | No       | `custodian.db`    | SQLite database file path          |

> *At least one of GEMINI_API_KEY or ANTHROPIC_API_KEY is required.

---

## 14. Maintenance & Troubleshooting

### 14.1 Adding a New Agent

```python
# 1. Add role to AGENT_ROLES in src/agents/agent_manager.py
{"name": "NewAgentAI", "specialization": "new_spec", "type": AgentType.MAIN},

# 2. Add parent relationship (if sub-agent)
SUB_AGENT_PARENTS["NewSubAI"] = "NewAgentAI"

# 3. Add model config in src/core/config.py
AGENT_MODELS["gemini"]["NewAgentAI"] = "gemini-2.5-flash"

# 4. Add MCP tools in src/mcp/mcp_config.py
AGENT_TOOLS["new_spec"] = ["fetch", "web_search", ...]
```

### 14.2 Database Maintenance

```bash
# Database location (default):
#   Local: ./custodian.db
#   Vercel: /tmp/custodian.db

# Backup:
cp custodian.db custodian.backup.db

# Reset (start fresh):
rm custodian.db
# → auto-recreated on next import
```

### 14.3 Common Issues

| Issue                          | Solution                                           |
|--------------------------------|----------------------------------------------------|
| Provider API errors (403/404)  | Check API key in `.env`, verify provider is active |
| Agents not responding          | Check `PRIMARY_LLM_PROVIDER` matches available key |
| Database locked errors         | Delete `custodian.db` and restart                   |
| MCP tools not found            | Install `uvx`: `pip install uvx` or `uv tool install mcp-server-fetch` |
| Vercel deployment fails        | Ensure all `Optional` env vars are set in dashboard|
| Streaming not working          | Check browser supports SSE, check proxy buffering  |
| Chat history not showing       | Guest: clear `localStorage` and reload. Authed: check network tab for `/api/v1/auth/user/chats` |

### 14.4 Project Structure

```
CustodianAIArmy/
├── main.py                      # Entry point, FastAPI app + page routes (explicit + SPA catch-all)
├── requirements.txt             # Python dependencies
├── vercel.json                  # Vercel deployment config
├── PRD.md                       # This document
├── AGENTS.md                    # MCP tools guide for AI assistants
├── README.md                    # Quick-start guide
│
├── src/
│   ├── agents/
│   │   ├── agent_manager.py     # Orchestrates all agents
│   │   ├── base_agent.py        # Abstract base class
│   │   ├── gemini_agent.py      # Google Gemini implementation
│   │   ├── claude_agent.py      # Anthropic Claude implementation
│   │   └── prompts/             # Agent prompt templates
│   ├── api/
│   │   ├── auth.py              # OAuth + JWT authentication
│   │   ├── build.py             # MVP Builder (5-phase pipeline)
│   │   ├── routes.py            # All API endpoints (1774+ lines)
│   │   └── finance_ui.py        # Placeholder finance UI router
│   ├── core/
│   │   ├── config.py            # Settings + model assignments
│   │   ├── database.py          # SQLite models + CRUD
│   │   └── logging_config.py    # Logging setup
│   └── mcp/
│       ├── mcp_client.py        # MCP client for tool execution
│       └── mcp_config.py        # Server defs + agent→tool mapping
│
├── static/
│   ├── home.html                # Landing page
│   ├── index.html               # Legacy SPA (app)
│   ├── payment.html             # Payment/upgrade page
│   ├── pages/
│   │   ├── dashboard.html       # AI Dashboard (loads app.v2.js)
│   │   ├── learn.html           # Learn with AI
│   │   ├── portfolio.html       # Portfolio Builder
│   │   ├── build.html           # Build Your Product
│   │   ├── finance.html         # Finance AI (placeholder)
│   │   └── customagents.html    # Custom Agent management
│   ├── css/                     # Stylesheets
│   ├── js/
│   │   ├── app.v2.js            # Dashboard/chat SPA (cache-busted)
│   │   ├── build.js, learn.js, customagents.js  # Per-page modules
│   │   └── shared.js            # Shared utilities
│   └── data/                    # Course data (JSON + slides)
│
├── api/
│   └── index.py                 # Vercel serverless entry point
│
└── dependencies/                # Git submodules (external)
    ├── Reinforced_MVP_Developer/
    ├── Programming-Slides/
    └── python-sdk/