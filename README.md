# Custodian AI Army

A futuristic multi-agent AI orchestration system — chat with specialized AI agents (Google, Anthropic) via SSE streaming (auto-saves per-agent conversations), build full-stack products via a 5-phase MVP pipeline, learn programming with AI tutoring across 23 courses + 17 career pathways, optimize resumes with ATS-powered AI (multi-template, inline diff review, JD tailoring), search jobs across 86 platforms with background accumulation and match scoring, and manage custom agents. Chat history is available for all users (guest localStorage, authenticated server-side).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11+, FastAPI, Uvicorn |
| Frontend | React 19, Vite, React Router 7, Bootstrap 5 |
| UI Animation | HTML5 Canvas (neuron visualization), CSS animations |
| Auth | Google OAuth, GitHub OAuth, JWT |
| AI | Google (Gemini-2.5-flash/pro), Anthropic (Claude-Sonnet-4-5 via SDK) |
| Database | SQLite (dev) + PostgreSQL (prod) via `db_backend.py` |
| MCP | fetch, duckduckgo, filesystem, memory, sequential_thinking, crawl_course_pathway, jobspy |
| Agent Skills | Ollama tool-use models (qwen2.5-coder, qwen3-coder) |
| Deployment | Vercel (frontend + backend), PostgreSQL (Supabase) |

---

## Project Structure

```
CustodianAIArmy/
├── main.py                     # FastAPI entry point
├── requirements.txt            # Python dependencies
├── package.json                # Root (vercel-build script)
├── vercel.json                 # Vercel deployment config
├── .env                        # Environment variables
├── AGENTS.md                   # Agent workflow docs (graph tools, MCP, oll-mcp)
├── courses/                    # Course content (23 courses)
│   ├── frontend-html/
│   │   ├── course.json         # Course config + section list
│   │   └── knowledge/          # Markdown knowledge files
│   ├── python-beginner/
│   ├── react/
│   └── ... (23 total)
├── scripts/                    # Utility scripts
│   ├── crawl_all_courses.py    # Bulk crawl from W3Schools/GFG/TutorialsPoint
│   ├── crawl_course_pathway_mcp.py  # MCP server for agent-driven crawling
│   ├── crawl_html_w3.py        # Targeted W3Schools HTML crawl
│   ├── rebuild_course_json.py  # Regenerate course.json from disk files
│   ├── boot_courses.py         # Full course infrastructure setup
│   └── migrate_course_skills.py# Skill definitions migration
├── frontend/
│   ├── package.json            # React app + scripts
│   ├── vite.config.js          # Vite config (/api proxy to :8000)
│   ├── dist/                   # Built output (auto-generated)
│   └── src/
│       ├── main.jsx            # React entry + Bootstrap JS import
│       ├── index.css           # Global styles (CSS custom properties)
│       ├── App.jsx             # Router (7 routes via react-router-dom)
│       ├── pages/              # HomePage, DashboardPage, LearnPage,
│       │                       # PortfolioPage, BuildPage,
│       │                       # CustomAgentsPage, JobsPage, PaymentPage
│       ├── components/
│       │   ├── layout/         # Header, Sidebar, Footer, MainLayout
│       │   ├── NeuronBrain.jsx # Interactive neuron visualization
│       │   ├── NeuronBrain.css # Canvas animation styles
│       │   └── shared/         # LoadingOverlay
│       └── hooks/              # useAuth, useTheme
├── src/
│   ├── agents/                 # Agent implementations (Gemini, Claude)
│   │   ├── agent_manager.py
│   │   ├── gemini_agent.py
│   │   ├── claude_agent.py
│   │   ├── claude_code_agent.py
│   │   ├── astro_agent.py
│   │   └── prompts/            # Agent system prompts
│   ├── api/
│   │   ├── routes.py           # All API endpoints
│   │   ├── auth.py             # OAuth + JWT auth
│   │   ├── build.py            # MVP Builder endpoints
│   │   └── finance_ui.py
│   ├── core/
│   │   ├── config.py           # Settings from .env
│   │   ├── database.py         # SQLite operations
│   │   └── logging_config.py
│   └── mcp/
│       ├── mcp_client.py       # MCP client bridge
│       └── mcp_config.py       # MCP server definitions + agent tool mapping
├── static/                     # Legacy HTML/CSS/JS frontend
│   ├── js/
│   │   ├── app.v2.js           # Dashboard/chat SPA (cache-busted)
│   │   ├── build.js, learn.js, ...  # Per-page modules
│   │   └── shared.js           # Shared utilities
│   ├── pages/                  # Static HTML pages
│   │   ├── dashboard.html      # AI Dashboard (loads app.v2.js)
│   │   └── ...
│   └── css/
├── dependencies/               # Git submodules
├── tests/                     # Python test suite (6 files)
│   ├── test_all_flows.py      # End-to-end: chats, resumes, templates, jobs
│   ├── test_chat_save.py      # Chat save/retrieve
│   ├── test_claude_agents.py  # Claude agent unit tests
│   ├── test_resume_api.py     # Resume CRUD + chat history
│   ├── test_resume_save.py    # Resume save/update
│   └── test_upload.py         # Resume upload flow
├── AWS_MIGRATION_INFO           # Archived AWS CDK deployment guide
└── install.sh                  # Automated setup script
```

---

## Available Commands

### From Project Root

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run dev:backend` | Start FastAPI backend (port 8000) |
| `npm run dev:all` | Run both concurrently (hot reload + API) |
| `npm run vercel-build` | Build React app for Vercel deployment |

### From `frontend/`

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run dev:backend` | Start FastAPI backend (port 8000) |
| `npm run dev:all` | Run both concurrently (requires `concurrently` in root) |
| `npm run build` | Build React app to `frontend/dist/` |
| `npm run preview` | Preview built app locally |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---------|-------------|
| `python main.py` | Start production server (port 8000) |
| `uvicorn main:app --reload` | Dev server with auto-reload |

### Deploy to Production

| Method | Stack | Instructions |
|--------|-------|-------------|
| Frontend + Backend (Vercel) | React SPA + FastAPI | Push to GitHub → `vercel-build` runs → auto-deploys |
| Database (PostgreSQL) | Supabase / RDS | Set `DATABASE_URL` in Vercel env vars |

### Python Environment

| Command | Description |
|---------|-------------|
| `pip install -r requirements.txt` | Install Python deps |
| `pip install --upgrade pip setuptools wheel` | Upgrade pip |
| `bash install.sh` | Automated setup (venv + deps) |

### Course Infrastructure

| Command | Description |
|---------|-------------|
| `python scripts/boot_courses.py` | Full setup: sync skills, rebuild course.json, copy to agent dirs |
| `python scripts/crawl_all_courses.py` | Bulk crawl W3Schools/GFG/TutorialsPoint for all courses |
| `python scripts/crawl_html_w3.py` | Targeted crawl of W3Schools HTML tutorial pages |
| `python scripts/rebuild_course_json.py` | Regenerate course.json from knowledge files on disk |

---

## Frontend Architecture

### Layout System

Two layout patterns are used depending on the page:

| Pattern | Pages | Components | Navigation |
|---------|-------|------------|------------|
| **Full layout** via `MainLayout` | DashboardPage, LearnPage, PortfolioPage, BuildPage, CustomAgentsPage | `<Header />` (fixed top), `<Sidebar />` (offcanvas), `<Footer />` | Client-side via `useNavigate()` + `window.bootstrap.Offcanvas` |
| **Standalone** (custom) | HomePage, PaymentPage | Inline navbar/offcanvas, `<NeuronBrain />` visualization | Same client-side pattern in HomePage; `PaymentPage` has no nav |

### Interactive Neuron Visualization (`NeuronBrain.jsx`)

The homepage hero features a full-canvas interactive neural network built with the HTML5 Canvas 2D API:

| Aspect | Detail |
|--------|--------|
| **Technology** | Canvas 2D, RequestAnimationFrame (60 FPS) |
| **Feature neurons** | 5 neurons in a ring around the center hub; blue = `working`, yellow = `coming` |
| **Dummy neurons** | 14 scattered around the feature ring, smaller gray somas with nucleus/nucleolus |
| **Center hub** | Blue energy glow + soma with dendrites extending to all features |
| **Dendrites** | 6–9 per feature neuron (4–7 per dummy), quadratic bezier curves with taper, secondary branches, Nissl bodies, ion-channel dots, spines |
| **Inter-neuron connections** | Dendrite-style tapered wobbly paths with spines and synaptic boutons; per-neuron nearest-neighbor topology (features→2 nearest, dummies→3 nearest features + 1 nearest dummy, center→all features) |
| **Space background** | 4 drifting radial-gradient nebula clouds, 80 twinkling star particles, 3 animated sine waves |
| **Interaction** | Hover → right detail panel + 3-pulse burst; click → navigate to feature page; drag-and-drop with spring-back physics |
| **Axon hillock** | Each feature soma has a visible axon hillock (cone-shaped protrusion) |
| **Myelin sheath** | Axon-style connections have a thicker semi-transparent sheath over the wobbly path |
| **Synaptic boutons** | Connection endpoints have 3-dot bouton clusters |

**Labels** rendered below each feature neuron at `size + 26` with hover highlight/shadow. Legend (Working / Coming Soon) at `bottom: 0.75rem`. Badge at `top: 5rem` to clear nav bar. Container has no `border-radius` or `border` to prevent clipping at corners.

### Layout System

Two layout patterns are used depending on the page:

| Pattern | Pages | Components | Navigation |
|---------|-------|------------|------------|
| **Full layout** via `MainLayout` | DashboardPage, LearnPage, PortfolioPage, BuildPage, CustomAgentsPage | `<Header />` (fixed top), `<Sidebar />` (offcanvas), `<Footer />` | Client-side via `useNavigate()` + `window.bootstrap.Offcanvas` |
| **Standalone** (custom) | HomePage, PaymentPage | Inline navbar/offcanvas, `<NeuronBrain />` visualization | Same client-side pattern in HomePage; `PaymentPage` has no nav |

### Client-Side Navigation Pattern

All sidebar/menu links use `<a>` tags with `onClick` handlers instead of traditional `<a href>` or `<Link>`:

```
onClick → e.preventDefault()
       → close offcanvas via window.bootstrap.Offcanvas.getInstance(el).hide()
       → navigate(path) via react-router-dom
```

This avoids full page reloads (which lose React state) while still using native `<a>` elements for accessibility. The offcanvas close button (`data-bs-dismiss="offcanvas"`) continues to work natively.

**Key files:**
- `src/components/layout/Sidebar.jsx` — Sidebar offcanvas for sub-pages
- `src/pages/HomePage.jsx` — Inline offcanvas on landing page (same pattern)

### Dashboard Mobile Layout

On **mobile and tablet** (<768px), the dashboard hides the agent list sidebar and info panel. A compact **Agent dropdown** appears in the `chat-options-bar` (left of incognito toggle) for switching agents. Desktop (md+) retains the full three-panel layout.

### SPA Routing (Production)

FastAPI serves explicit page routes (`/dashboard`, `/app`, `/learn`, etc.) for the legacy static frontend. When `frontend/dist` exists, a catch-all route (`/{full_path:path}`) serves the React SPA for unmatched paths. The explicit routes are registered before the SPA catch-all so legacy pages always work. See `main.py` for the exact ordering.

**Note:** `frontend/dist/` is tracked in git (`!frontend/dist/` negated in root `.gitignore`, `dist` removed from `frontend/.gitignore`) so Vercel deploys the exact local build.

---

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Google or Anthropic API key (Gemini or Claude)

### 1. Backend Setup
```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/Mac

pip install -r requirements.txt
cp .env.example .env          # Then edit .env with your API keys
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Run (choose one)

**Development mode** (hot reload + backend):
```bash
# From root (preferred)
npm run dev:all

# Or from frontend/
cd frontend && npm run dev:all
```
- Frontend: http://localhost:5173 (proxies `/api` to backend)
- Backend: http://localhost:8000

**Production mode** (single port):
```bash
cd frontend && npm run build && cd .. && python main.py
```
- Open http://localhost:8000

---

## Frontend Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Landing, features, pricing, sign in |
| `/dashboard` | DashboardPage | Chat with AI agents — auto-saves per-agent conversation |
| `/learn` | LearnPage | Interactive programming courses (23 courses across 17 pathways) |
| `/portfolio` | PortfolioPage | Portfolio Builder (Coming Soon — 4-card feature preview) |
| `/build` | BuildPage | 5-phase MVP Builder pipeline |
| `/agents` | CustomAgentsPage | Create/manage custom agents |
| `/resume` | ResumePage | Resume Optimizer — upload, edit, ATS-optimize, multi-template, diff review |
| `/jobs` | JobsPage | Job search across 86 platforms + background accumulation + resume match scoring + applied tracker |
| `/payment` | PaymentPage | Upgrade to Pro — UPI payment (India, ₹400), guest-sign-in guard, QR/deep-link, UTR verification |

---

## API Overview

All endpoints under `/api/v1/`. Swagger docs at `/api/docs`.

### Agent Management
| Method | Path | Description |
|--------|------|-------------|
| GET | `/agents` | List all agents |
| GET | `/agents/{id}` | Agent details |
| POST | `/agents/custom` | Create custom agent |
| GET | `/agents/available` | Available (idle) agents |

### Chat
| Method | Path | Description |
|--------|------|-------------|
| POST | `/chat/stream` | SSE stream chat (authenticated, preferred) |
| POST | `/chat/stream/guest` | SSE stream chat (guest) |
| POST | `/chat` | Non-streaming chat (authenticated, fallback) |
| POST | `/chat/guest` | Non-streaming chat (guest, fallback) |

### Auth
| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/google` | Google OAuth login |
| GET | `/auth/status` | Check auth status |
| GET | `/auth/me` | Get current user |
| POST | `/auth/logout` | Logout |

#### OAuth Production Setup & Security

- Configure provider redirect URIs to the exact production callback URLs (scheme + domain + path). Examples:
  - `https://your-domain.com/api/v1/auth/google/callback`
  - `https://your-domain.com/api/v1/auth/github/callback`
- Set the following environment variables in production (values must exactly match provider settings):
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REDIRECT_URI`
  - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
  - `GITHUB_REDIRECT_URI`
- Never commit secrets or configuration files (e.g., `opencode.json`). `opencode.json` is added to `.gitignore`.
- If a secret was committed and pushed, rotate/revoke it immediately and consider scrubbing history with `git filter-repo` or BFG.
- Troubleshooting: a `redirect_uri_mismatch` means the redirect URI registered at the provider does not exactly match the value used by the server; verify both sides (including trailing slashes).

### MVP Builder
| Method | Path | Description |
|--------|------|-------------|
| POST | `/mvp/create-session` | Start new build |
| POST | `/mvp/send-message` | Chat in current phase |
| POST | `/mvp/advance-phase` | Next phase |
| POST | `/mvp/publish` | Push to GitHub |
| GET | `/mvp/sessions` | List user sessions |

### Jobs
| Method | Path | Description |
|--------|------|-------------|
| GET | `/jobs/accumulated` | List accumulated jobs (newest-first, 48h TTL, no AI/JobSpy) |
| POST | `/jobs/search` | Real-time search across 86 platforms via JobSpy + 3 API fetchers + AI fallback |
| POST | `/jobs/applied` | Mark job as applied |
| GET | `/jobs/applied` | List applied jobs for current user |
| DELETE | `/jobs/applied/{id}` | Remove applied job by row ID |
| POST | `/jobs/applied/sync` | Batch upsert applied jobs (deduped by title+company) |

### Courses & Learning
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/courses` | List all courses (with section counts) |
| GET | `/api/v1/courses/{id}` | Get course details (sections) |
| GET | `/api/v1/courses/{id}/slides/{lang}/{index}` | Get slide content |
| POST | `/chat/course` | Course-aware chat (AI tutor) |

---

## Course System

The learning platform provides **23 courses** organized into **17 career pathways**. Content is crawled from W3Schools, GeeksforGeeks, TutorialsPoint, and official documentation.

### Course Architecture

```
courses/
├── frontend-html/             # 73 sections
├── frontend-css/              # 43 sections
├── python-beginner/           # 57 sections
├── python-intermediate/       # 34 sections
├── python-advanced/           # 28 sections
├── react/                     # 36 sections
├── react-advanced/            # 23 sections
├── react-redux/               # 29 sections
├── javascript-es-2015/        # 15 sections
├── javascript-async/          # 14 sections
├── javascript-testing/        # 9 sections
├── node-and-npm/              # 23 sections
├── typescript/                # 12 sections
├── terminal-basics/           # 16 sections
├── git/                       # 10 sections
├── http/                      # 11 sections
├── databases-datastore/       # 27 sections
├── python-data-science-1-5/   # 4 levels (87 sections total)
└── python-in-practice/        # 23 sections
```

Each course directory contains:
- **`course.json`** — Metadata, section list, paths to knowledge files
- **`knowledge/*-en.md`** — Markdown content files crawled from tutorial sites

Courses are only available in **English** (German support removed). Pathways on the LearnPage are **collapsible** (collapsed by default) with "Coming Soon" badges for placeholder courses.

### Career Pathways

| Pathway | Courses |
|---------|---------|
| Web Development | HTML, CSS, JavaScript, React |
| App Development | React, TypeScript, Node.js |
| Data Engineering | Python DS, SQL, Pandas |
| Cloud Engineering | Terminal, Git, HTTP |
| DevOps | Git, Terminal, Node.js |
| Data Science | NumPy, Pandas, ML, Neural Networks |
| AI Engineering | Python DS, ML, Neural Networks |
| Machine Learning | Scikit-learn, Pandas, NumPy |
| Deep Learning | Neural Networks, Pandas |
| Reinforcement Learning | Coming Soon |
| Cybersecurity | Coming Soon |
| Backend Development | Python, Node, HTTP, DB |
| Frontend Development | HTML, CSS, JS, React, TS |
| System Design | Coming Soon |
| Software Testing & QA | Jest, Testing |
| MLOps | Coming Soon |

---

## Agent System

### Agent Hierarchy
```
CommanderAI (Coordinator)
├── AnalystAI
│   ├── DataAnalystAI
│   └── MarketAnalystAI
├── CreativeAI
│   ├── WriterAI
│   └── DesignerAI
├── TechnicalAI
│   ├── CoderAI
│   └── ArchitectAI
├── ResearchAI
│   ├── FactCheckerAI
│   └── TrendAnalystAI
└── TutorAI
    └── Course-aware tutoring using `crawl_course_pathway` MCP tool
```

All agents use either **Google** (`gemini-2.5-flash`) or **Anthropic** (`claude-sonnet-4-5`), switchable via the UI.

### MCP Tools Available to Agents

| Server | Tools | Assigned To |
|--------|-------|-------------|
| **fetch** | `fetch` | All agents |
| **duckduckgo** | `duckduckgo_web_search`, `duckduckgo_news_search` | All research/analyst agents |
| **filesystem** | `read_file`, `write_file`, `list_directory`, `search_files`, `create_directory` | Coder, architect, technical |
| **memory** | Knowledge graph (entities, relations, observations) | Coordinator, researcher |
| **sequential_thinking** | `sequentialthinking` | Coordinator, analyst, technical, researcher |
| **crawl_course_pathway** | `crawl_course_pathway` — crawl tutorial sites into markdown pathways | Tutor, researcher, coder |
| **jobspy** | `search_jobs` — real job scraping from 7 major platforms + AI fallback for 86 total | Coordinator, researcher, job_finder |

### Agent-to-Tools Mapping

Each agent specialization has a curated set of tools. See `src/mcp/mcp_config.py` for the full mapping. Custom agents created via the UI default to general-purpose tool access.

---

## Authentication & Chat History

### Plans

| Plan | Daily Limit | Features | Validity |
|------|-------------|----------|----------|
| Guest | 3 requests | Try without signup, chat history saved to browser localStorage | — |
| Free | 20 requests | Google sign-in, all agents, server-side chat history | — |
| Pro | 50 requests (₹400/mo INR / ~$10 USD) | Priority, all providers, all features | 1 year from purchase |

**Plan Expiry:** Pro auto-downgrades to Free after 1 year. Payment history stored in `payments` table.

### Plan Display

Plan badges are shown dynamically across all pages:

| Component | Location | What it shows |
|-----------|----------|---------------|
| **Header** | Top-right dropdown | `GUEST` (muted) / `FREE` (blue) / `PRO` (gold) — from `useAuth().plan` |
| **Sidebar** | Offcanvas header | Plan badge + user email |
| **ProfileModals** | "My Plan" tab | Plan badge, usage progress bar, remaining count, expiry date |

### Database Tables for Plans

| Table | Purpose |
|-------|---------|
| `user_plans` | Plan type (`guest`/`free`/`pro`) + `plan_expiry` column |
| `daily_requests` | Per-user per-day request count (FK → `user_plans`) |
| `payments` | Payment history (UPI intent with UTR verification, UPI ref stored) |

### Chat History

- **Guest users**: Chat sessions saved to `localStorage` under `custodian_chats`. Visible in Chat History modal, persist between browser sessions.
- **Authenticated users**: Chats synced to server (`/api/v1/auth/user/chats`). On load, localStorage chats are merged with server data for a unified view.
- **Delete**: Removes from localStorage first, then attempts server deletion.
- **Agent name tracking**: Each chat session stores the agent name (e.g., "CustodianAI") — Chat History list shows agent badges.

### Chat Auto-Save & Per-Agent Resume

Chats auto-save after every streamed response via a `finally` block in the SSE generator:

1. User sends message → `/chat/stream` (or `/chat/stream/guest`)
2. Backend streams AI response, then calls `save_chat_session()` with UUID, email, agent name, full history
3. Chat appears in ProfileModals "Chat History" under the correct agent badge
4. When switching agents, `selectAgent()` calls `GET /chats/last/{agent_name}` — loads the last conversation for that agent
5. If no prior chat, the welcome/onboarding message is shown

**Key files:** `src/api/routes.py` (generator `finally` block), `src/core/database.py` (`save_chat_session`, `get_last_chat_for_agent`), `src/core/db_backend.py` (`agent_name` column, `_sql()` PG/SQLite dialect translation), `frontend/src/pages/DashboardPage.jsx` (`selectAgent`)

Auth providers: Google OAuth, GitHub OAuth

---

## MCP Ecosystem

This project uses the Model Context Protocol extensively. Two configuration files manage MCP servers:

### Editor/IDE Servers (`.mcp.json`)
Servers for VS Code / Continue extension:
- **code-review-graph** — Graph-based code analysis for reviews
- **kite**, **groww**, **zerodha** — Financial data APIs

### Application Servers (`src/mcp/mcp_config.py`)
Servers used by CustodianAIArmy agents at runtime (see table above).

### Ollama MCP Bridge (`oll-mcp`)
The `mcp_client_for_ollama` package bridges Ollama models to MCP servers:
```bash
ollmcp --mcp-server scripts/crawl_course_pathway_mcp.py --model qwen2.5-coder:7b
```

Recommended tool-use capable models: `qwen2.5-coder:7b`, `qwen3.5:35b`, `qwen3-coder:30b`

---

## Content Crawling Pipeline

Course content is sourced from live tutorial websites via a modular crawling system:

| Script | Description |
|--------|-------------|
| `scripts/crawl_all_courses.py` | Bulk crawl all 23 courses from W3Schools/GFG/TutorialsPoint |
| `scripts/crawl_all_sources.py` | Multi-source crawl targeting TutorialsPoint primarily |
| `scripts/crawl_html_w3.py` | Targeted crawl of W3Schools HTML tutorial (46 pages) |
| `scripts/crawl_course_pathway_mcp.py` | MCP server — agents can call this tool to crawl on demand |
| `scripts/crawl_courses_multi.py` | Multi-threaded crawl with parallel sources |
| `scripts/rebuild_course_json.py` | Rebuild course.json to match actual knowledge files on disk |

### `crawl_course_pathway` MCP Tool

Registered in `.opencode.json` and `src/mcp/mcp_config.py`, this tool lets AI agents (tutor, researcher, coder) crawl tutorial websites (W3Schools, GeeksforGeeks, Javatpoint) directly, extracting learning pathways as clean Markdown saved into the `courses/` directory.

---

## Deployment (Vercel)

The project auto-deploys to Vercel via GitHub. During build:
1. `vercel-build` runs (`cd frontend && npm ci && npm run build`)
2. Built React app is placed at `frontend/dist/`
3. `main.py` serves both API and the SPA

Zero config needed — just push to GitHub.

> **Note:** `anthropic>=0.40.0` in `requirements.txt` must be uncommented (not `#`-prefixed) for Claude streaming to work on Vercel. The `frontend/dist/` directory must also be tracked in git (not gitignored) so the build output is deployed.

### Environment Variables for Production
Set these in Vercel dashboard:
```
GEMINI_API_KEY, ANTHROPIC_API_KEY
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
JWT_SECRET, SECRET_KEY
DATABASE_PATH=/tmp/custodian.db
```

---

## Environment Variables (.env)

```
GEMINI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
PRIMARY_LLM_PROVIDER=anthropic          # "anthropic" (default) or "gemini"
GOOGLE_CLIENT_ID=your_oauth_client_id
GOOGLE_CLIENT_SECRET=your_oauth_secret
GITHUB_CLIENT_ID=your_github_oauth_id
GITHUB_CLIENT_SECRET=your_github_oauth_secret
JWT_SECRET=your_jwt_secret
SECRET_KEY=your_secret_key
DEBUG=True|False
LOG_LEVEL=INFO|DEBUG
FASTAPI_PORT=8000
UPI_ID=your_upi_vpa@bank          # UPI VPA for receiving Pro payments (e.g., 9424740106@yescred)
PRICE_INR=400                     # Pro plan price in INR
PRICE_USD=10                      # Pro plan price in USD (display only)
```

---

## MVP Builder Pipeline

The 5-phase product development pipeline:
1. **Ideation** — Brainstorm features, audience, positioning
2. **Planning** — Architecture, tech stack, route design
3. **Review** — Code review, optimization
4. **Polish** — UI/UX improvements, edge cases
5. **Build** — Generate and publish to GitHub

---
## AdSense Integration

Every page must display an AdSense banner. Two integration patterns exist:

### Pattern A: Via `MainLayout` (recommended)

Most pages wrap content in `<MainLayout>` which renders `<AdSenseAd />` automatically between the header and content area. `showAd` defaults to `true` — pass `showAd={false}` to suppress (not recommended).

### Pattern B: Direct `<AdSenseAd />`

Pages that don't use `MainLayout` (e.g., `HomePage`, `PaymentPage`) must import and render `<AdSenseAd />` directly.

**When creating a new page, you MUST ensure an ad unit is rendered.** If the page uses `MainLayout`, ads are automatic. If standalone, add `<AdSenseAd />` explicitly.

See `frontend/src/components/layout/AdSenseAd.jsx` for the component. Publisher ID: `ca-pub-6476201805386001`.

---

## Resume Optimizer

A full-featured resume builder with AI-powered ATS optimization, document upload, multi-template support, and chat-based modifications.

### Features
| Feature | Description |
|---------|-------------|
| **3-View Layout** | List (card grid with ATS scores, upload spinner), Editor (form + templates + live preview), Viewer (NOVA-style document with inline edit, add/delete controls) |
| **Inline Editing** | `contentEditable` personal_info fields (click to edit, blur saves); pencil-icon inline forms for array sections (education, experience, certs, projects, achievements); comma-separated skills editing |
| **Add/Delete Controls** | "+ Add" link at bottom of each array section creates blank item and opens edit form; trash button inside inline edit header |
| **Document Upload** | PDF, DOCX, TXT — Claude native document content blocks (no local extraction) or PyPDF2/python-docx fallback; AI parses to structured JSON |
| **AI Optimization** | Tailor resume to a job description, improve ATS score above 90, template-aware output formatting |
| **JD Integration** | Paste JD text or upload PDF/DOCX/TXT document in all three views — auto-expands on load, 6-row editable textarea, collapsed preview; JD persists on the resume and informs all AI optimization and chat modifications |
| **Chat Modifications** | Type instructions like "Add more Python keywords" → AI updates resume + auto-saves |
| **Chat Compaction** | Auto-compresses chat history when >8K chars via AI summarization; keeps last 4 messages; includes last 10 in optimize prompt context |
| **Template System** | 5 built-in templates across categories (Professional, Academic, Technical, Creative, General) with non-destructive switching (preserves user data) |
| **Section Management** | Enable/disable any of 12 section types per resume |
| **Multi-Page Support** | Templates can define multiple pages (e.g., Academic has 2 pages); Prev/Next navigation in viewer |
| **Template Accumulation** | Every unique template used is auto-saved to DB and globally available |
| **Inline Diff Review** | Per-field accept/reject for personal_info fields, per-section accept/reject for array sections, red/green OLD vs AI PROPOSED display, compact Accept All/Reject All bar at document bottom |
| **Graceful 404 Handling** | If resume deleted server-side mid-session, viewer/chat gracefully redirects to list with user notification |
| **Responsive** | Desktop two-column layout, stacks vertically on mobile (<768px) |

### Built-in Templates
| Template | Category | Pages | Best For |
|----------|----------|-------|----------|
| Modern Professional | Professional | 1 | Corporate & tech roles |
| Classic Academic | Academic | 2 | Research & academia |
| Full-Stack Developer | Technical | 1 | Engineering roles |
| Executive Leader | Professional | 2 | Senior leadership |
| Creative Portfolio | Creative | 1 | Design & creative |

### Resume API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/resumes` | List user's resumes |
| POST | `/resumes` | Create new resume |
| GET | `/resumes/{id}` | Get single resume |
| PUT | `/resumes/{id}` | Update resume |
| DELETE | `/resumes/{id}` | Delete resume |
| POST | `/resumes/{id}/optimize` | AI-optimize with optional JD |
| POST | `/resumes/{id}/compact-chat` | Compact chat history when > 8K chars |
| POST | `/resumes/parse` | Parse raw text to structured JSON |
| POST | `/resumes/upload` | Upload PDF/DOCX/TXT file (optional `jd` form field) |
| POST | `/resumes/extract-text` | Extract text from PDF/DOCX/TXT document (used for JD file upload) |
| GET | `/resumes/templates` | List templates (optional `?category=` filter) |
| POST | `/resumes/templates` | Save a template |
| GET | `/resumes/templates/categories` | List all template categories |

### Storage Limits
| Plan | Resumes | Rate Limit |
|------|---------|------------|
| Guest | 3 | 3 optimizations/day |
| Free | 3 | 20/day |
| Pro | Unlimited | 50/day |

---

## Jobs Board

A real-time job aggregator that accumulates listings from 86 platforms in the background, with resume-based match scoring, applied job tracking, and client-side filtering.

### Features
| Feature | Description |
|---------|-------------|
| **86 Platforms** | Curated across 12 categories (Primary APIs, Startup, AI/ML & Tech, Remote, Aggregators, Freelance, etc.) with color-coded toggle buttons and category tab bar |
| **Background Accumulation** | 28 fetch groups rotating every 60s with random jitter (0.3–2s); full cycle every ~28 min; real API fetchers (RemoteOK, Remotive, Arbeitnow) + JobSpy + AI fallback |
| **Resume Match Scoring** | Client-side keyword extraction with `includes()` matching, capped denominator (max 8 keywords), minimum score floor of 1; green "Match scores active" badge when resume selected |
| **Two-Section Results** | **Top Matches** (top 9 jobs with `match_score > 0`, sorted descending) and **Improvement Required** (remaining); "All Jobs" when no resume (sorted by `date_posted`) |
| **English-Only Filter** | `isEnglish()` strips CJK/Arabic/Cyrillic job listings by title and description |
| **Client-Side Filtering** | Keyword search box, type toggles (remote/hybrid/on-site), platform toggles — all local, no backend calls |
| **Sliding Window Pagination** | ±5 pages around current with `<<`/`>>` jump buttons and highlighted current page |
| **Applied Tracker** | Collapsible compact section (title @ company rows, deduped); localStorage instant hide + backend DB persistence with auto-sync on mount; "Did you apply?" modal on tab return |
| **Job Card Details** | Colored source badge, relative date (`2d ago`), HTML/markdown-stripped description truncated to 220 chars, "Apply with Resume" button |
| **Description Formatting** | Strips HTML tags + markdown `**bold**`/`*italic*`/`__underline__` + truncates to 220 chars |
| **5-Minute Poll** | Lightweight `/jobs/accumulated` poll every 5 min, no loading spinners; re-fetches on `visibilitychange` |

### API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/jobs/accumulated` | Lightweight — reads from `job_cache_accumulated` only, no JobSpy/AI/MCP |
| POST | `/jobs/search` | 3-tier fallback: direct JobSpy → MCP JobSpy → AI-generated (TechnicalAI/CustodianAI) |
| POST | `/jobs/applied` | Save applied job `{title, company, source, url}` |
| GET | `/jobs/applied` | All applied jobs for current user (guest email or authenticated) |
| DELETE | `/jobs/applied/{id}` | Remove by row ID |
| POST | `/jobs/applied/sync` | Batch upsert — dedupes by `{title, company}` |

### Background Fetch Architecture
- 28 fetch groups × 60s interval = full rotation every ~28 minutes
- Each group scrapes 3–5 platforms with `results_wanted=30`
- Random jitter (0.3–2s) prevents rate-limit blocks
- Real API fetchers: RemoteOK (free), Remotive (free), Arbeitnow (free)
- JobSpy: Python library scraping LinkedIn, Indeed, Glassdoor, Google, etc.
- AI fallback: TechnicalAI or CustodianAI generates listings when real APIs fail

### Database Tables
| Table | Purpose |
|-------|---------|
| `job_cache_accumulated` | All accumulated jobs (hash-deduped by title+company+source) |
| `job_fetch_state` | Per-group last-fetch timestamp for rotation continuity |
| `applied_jobs` | Per-user applied jobs with source and URL |

### Key Files
| File | Purpose |
|------|---------|
| `frontend/src/pages/JobsPage.jsx` | Main jobs page — match scoring, platform toggles, applied tracker, pagination |
| `src/api/routes.py` | Jobs endpoints — search, accumulate, applied CRUD, background fetcher |
| `src/core/database.py` | Job DB tables and CRUD functions |

---

## What's Not Done / Pending

| Feature | Status | Details |
|---------|--------|---------|
| **Portfolio Builder (`/portfolio`)** | Coming Soon placeholder | 4-card feature preview — no backend functionality |
| **Stripe Payment Gateway** | Not integrated | UPI direct payment works (₹400, UTR-verified); Stripe for international cards is not set up |
| **Backend Automated Tests** | Manual only | 6 test files exist, no CI pipeline |
| **CDK Infrastructure** | Removed from git | `infra/` directory created June 21, later removed |
| **MCP JobSpy on Windows** | Broken | Direct Python JobSpy works as fallback |
| **Semantic Match Score Endpoint** | Not implemented | Keyword-only scoring on frontend |
| **Gemini SDK Upgrade** | Not done | Gemini agent uses raw `httpx` (Claude uses `anthropic` SDK) |

---

## License
MIT
