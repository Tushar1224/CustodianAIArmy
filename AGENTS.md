<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

---

## Ollama MCP Integration (oll-mcp)

This project has the **`mcp_client_for_ollama`** package (oll-mcp) installed for connecting Ollama models to MCP servers.

### What is oll-mcp?

`oll-mcp` is a bridge that enables Ollama models to use MCP (Model Context Protocol) tools seamlessly. It pre-loads MCP servers at startup and integrates their tools into Ollama chat requests.

### Usage

Run Ollama with MCP server integration:

```bash
# Using a local MCP server script
ollmcp --mcp-server /path/to/weather.py --model llama3.2:3b

# Using multiple MCP servers
ollmcp --mcp-server /path/to/weather.py --mcp-server /path/to/filesystem.js

# Using MCP server URLs (SSE or Streamable HTTP)
ollmcp --mcp-server-url http://localhost:8000/sse --model qwen2.5:latest

# Using a configuration file
ollmcp --servers-json ~/.config/ollmcp/mcp-servers/config.json
```

### Configuration File Format

Create `~/.config/ollmcp/mcp-servers/config.json`:

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"],
      "type": "stdio"
    },
    "duckduckgo": {
      "command": "uvx",
      "args": ["duckduckgo-mcp-server"],
      "type": "stdio"
    }
  }
}
```

### Recommended Models for MCP Tool Use

Models configured in `.continue/config.yaml` with `tool_use` capability:

- **qwen2.5-coder:7b** — Fast, reliable tool calling (primary recommendation)
- **qwen3.5:35b** — Higher quality tool execution
- **qwen3-coder:30b** — Code-focused with tool support
- **hhao/qwen2.5-coder-tools:latest** — Optimized for tool usage

---

## MCP Servers Available

### VS Code / Continue Extension (`.mcp.json`)

The `.mcp.json` file configures MCP servers for the Continue extension:

```json
{
  "mcpServers": {
    "code-review-graph": {
      "command": "uvx",
      "args": ["code-review-graph", "serve"],
      "type": "stdio"
    },
    "kite": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.kite.trade/mcp"]
    },
    "groww": {
      "command": "npx",
      "args": ["mcp-remote@0.1.18", "https://mcp.groww.in/mcp", "52155"]
    },
    "zerodha": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.zerodha.com/mcp"]
    }
  }
}
```

### Application-Level Servers (`src/mcp/mcp_config.py`)

Servers used by CustodianAIArmy agents:

| Server | Command | Tools |
|--------|---------|-------|
| **fetch** | `uvx mcp-server-fetch` | `fetch` — Fetch web content from any URL |
| **duckduckgo** | `uvx duckduckgo-mcp-server` | `duckduckgo_web_search`, `duckduckgo_news_search` |
| **filesystem** | `npx -y @modelcontextprotocol/server-filesystem` | `read_file`, `write_file`, `list_directory`, `search_files`, `create_directory` |
| **memory** | `npx -y @modelcontextprotocol/server-memory` | Knowledge graph operations |
| **sequential_thinking** | `npx -y @modelcontextprotocol/server-sequential-thinking` | `sequentialthinking` |

### OpenCode Plugin: Firecrawl

Firecrawl provides web data capabilities via the `opencode-firecrawl` plugin (configured in `opencode.json`):

| Capability | Tools |
|------------|-------|
| **Web Search** | `firecrawl search` — discover pages by query with full-page content |
| **Web Scrape** | `firecrawl scrape` — extract clean markdown from any URL |
| **Browser Interact** | `firecrawl interact` — clicks, forms, navigation on live pages |
| **Crawl** | `firecrawl crawl` — bulk extraction across entire sites |
| **URL Discovery** | `firecrawl map` — find all URLs on a domain |
| **Diagnostics** | `firecrawl ask` — debug failing jobs with AI support |
| **Docs Search** | `firecrawl docs-search` — query Firecrawl's official docs |

---

## Agent-to-Tools Mapping

Different agent specializations have access to different MCP tools:

| Agent Type | Available Tools |
|------------|-----------------|
| **coordinator** | fetch, web search, firecrawl, memory, sequential thinking |
| **researcher** | fetch, web search, firecrawl, memory, sequential thinking |
| **fact_checker** | fetch, web search, firecrawl |
| **technical / coder / architect** | fetch, firecrawl, filesystem, sequential thinking |
| **analyst** | fetch, web search, firecrawl, sequential thinking |
| **creative / writer** | fetch, web search, firecrawl |

---

## Continue Extension Configuration

To use MCP tools in Continue:

1. Ensure your `.continue/config.yaml` has models with `capabilities: [tool_use]`
2. Place `.mcp.json` in your workspace root or home directory
3. Restart Continue to load MCP servers
4. Select a tool-use capable model (e.g., qwen2.5-coder-7b) for Agent/Plan mode

### Continue Model Configuration Example

```yaml
models:
  - name: qwen2.5-coder-7b
    provider: ollama
    model: qwen2.5-coder:7b
    capabilities:
      - tool_use
    roles:
      - chat
      - edit
      - apply
```

---

## Frontend Components & Architecture

### UI Components

The Custodian AI Army frontend uses a modular React component architecture with two distinct UI patterns:

#### **Main Application Components**
| Component | File | Purpose |
|-----------|------|---------|
| **MainLayout** | `frontend/src/components/layout/MainLayout.jsx` | Shared layout wrapper for all pages |
| **Header** | `frontend/src/components/layout/Header.jsx` | Fixed top navigation with profile |
| **Sidebar** | `frontend/src/components/layout/Sidebar.jsx` | Offcanvas menu navigation |
| **Footer** | `frontend/src/components/layout/Footer.jsx` | Footer with links and info |

#### **Specialized Components**
| Component | File | Purpose |
|-----------|------|---------|
| **NeuronBrain** | `frontend/src/components/NeuronBrain.jsx` | Interactive neuron visualization (HomePage hero section) |
| **ProfileModals** | `frontend/src/components/modals/ProfileModals.jsx` | Multi-tab modal for user settings |
| **LoadingOverlay** | `frontend/src/components/shared/LoadingOverlay.jsx` | Loading state indicator |

#### **NeuronBrain Component Details**

The `NeuronBrain.jsx` component renders an interactive, canvas-based neural network visualization on the homepage:

- **Technology**: HTML5 Canvas 2D API
- **Animation**: RequestAnimationFrame (60 FPS)
- **Physics**: Gentle drift movement with boundary collision
- **Visual Status**:
  - 🔵 **Blue neurons** = Fully implemented features
  - 🟡 **Yellow neurons** = Coming soon features
- **Interactivity**: Click neurons to navigate to feature pages
- **Responsive**: Adapts to mobile and desktop screens
- **Network**: Dynamic connections between neurons and central hub

**Props:**
```javascript
<NeuronBrain 
  features={Array}      // Feature data array
  onFeatureClick={Func} // Click handler
/>
```

**Feature Data Structure:**
```javascript
{
  id: string,           // Unique identifier
  name: string,         // Display name
  icon: string,         // Font Awesome icon class
  href: string,         // Navigation path
  status: 'working' | 'coming',  // Implementation status
  description: string,  // Feature description
  color: string,        // Hex color (#4dabf7 or #f59e0b)
}
```

---

## Best Practices

1. **Use tool-use capable models** for Agent/Plan mode in Continue
2. **Pre-configure MCP servers** in `.mcp.json` for consistent access
3. **Use `oll-mcp`** when running Ollama outside of Continue for standalone tool usage
4. **Use Firecrawl** for web search, scraping, and page interaction (replaces fetch + duckduckgo for richer web capabilities). If Firecrawl fails or returns no results, fall back to `fetch` or `duckduckgo`.
5. **Enable memory server** for persistent context across sessions

---

## Workflow Rules

### 1. AdSense Requirement
Every new page **must** include an AdSense banner. If the page uses `MainLayout`, ads are automatic (`showAd` defaults to `true`). If the page is standalone, import and render `<AdSenseAd />` directly. See `frontend/src/components/layout/AdSenseAd.jsx`.

### 2. Session Logging in AGENTS.md
- **After implementing new features**, append a `## Session: YYYY-MM-DD — Title` section at the bottom of `AGENTS.md` summarizing what was done (backend changes, frontend changes, key decisions, known issues).
- **After fixing existing work** (bug fixes, polish, refactors), update only the relevant session section rather than appending a new one.
- Keep session details concise — tables for file changes, bullet points for decisions.

### 3. Git Commits
Do NOT commit or push unless the user explicitly asks. Never create empty commits or force-push.

---

## Session: 2026-06-09 — Resume Optimizer Page + Navigation Unification

### What was done
#### Backend (`src/`)
| File | Change |
|------|--------|
| `src/core/database.py` | Added `user_resumes` table + 6 CRUD functions (`save_resume`, `get_user_resumes`, `get_resume`, `get_resume_count`, `delete_resume`) |
| `src/api/routes.py` | Added 7 endpoints: `GET /api/v1/resumes/`, `POST /api/v1/resumes/`, `GET /api/v1/resumes/{id}`, `PUT /api/v1/resumes/{id}`, `DELETE /api/v1/resumes/{id}`, `POST /api/v1/resumes/{id}/optimize`, `POST /api/v1/resumes/parse` |

#### Frontend — Resume Optimizer (`frontend/src/pages/ResumePage.jsx`)
- 3 views: **List** (card grid with ATS scores), **Editor** (split panel: 7-tab form + live preview + JD input), **Viewer** (NOVA-style white document with click-to-edit, ATS score display, chat modifications, download/print)
- Route added to `App.jsx`
- Nav item `Resume Optimizer` in `Sidebar.jsx` + HomePage neuron feature

#### Frontend — Navigation Unification
- `HomePage.jsx` rewritten to use shared `Sidebar` component and `ProfileModals` for consistent navigation across all pages (previously had inline offcanvas + simple sign-in)
- Templates panel on LHS of editor with "Modern Professional" and "Classic Academic" presets (folder icon toggle)
- Upload flow calls `POST /api/v1/resumes/parse` to extract structured data via AI
- Empty state guide shown when creating a new resume

### Key Implementation Details
- Resume `data` stored as JSON blob for schema flexibility
- AI optimization uses `process_message` on `TechnicalAI` agent (falls back to `CustodianAI`)
- Rate limits: guests 3 req/day, free 20/day, pro 50/day; resume storage cap: free 3, pro unlimited
- Auth: cookie-based JWT, guest users get session-based email
- Templates defined as static JS objects in `ResumePage.jsx`
- Frontend: React 19, Vite, React Router 7, Bootstrap 5, dark theme via CSS vars
- Backend: Python 3.11+, FastAPI, SQLite

### What's NOT done / Known issues
- PDF/DOCX file uploads need a multipart file-upload endpoint + extraction libs (PyPDF2, python-docx); currently only text/TXT works
- No git commits; user must explicitly ask
- No automated tests for resume endpoints

---

## Session: 2026-06-09 — PDF/DOCX Upload + Bug Fixes + Workflow Docs

### Bug fixes
- **"Create New Resume" silently failing**: Added error alert for non-ok responses (was silently dropping 404/405/500)
- **Upload returning 405 Method Not Allowed**: Moved `POST /resumes/parse` route above all `/{resume_id}` parameterized routes to prevent Starlette path-conflict routing
- **File input value reset**: Fixed `e.target` reference in catch block (saved ref before try)

### New feature — PDF/DOCX document upload
| File | Change |
|------|--------|
| `src/core/document_extractor.py` | **New file** — `extract_text()` dispatches to `extract_text_from_pdf()` (PyPDF2) and `extract_text_from_docx()` (python-docx) |
| `src/api/routes.py` | Added `POST /api/v1/resumes/upload` — accepts multipart file, extracts text by type, passes to AI parser |
| `frontend/src/pages/ResumePage.jsx` | Upload flow now uses `FormData` + `POST /resumes/upload` instead of raw-text JSON |
| `requirements.txt` | Added `PyPDF2>=3.0.0`, `python-docx>=1.2.0` |

### Documentation additions
| File | Change |
|------|--------|
| `README.md` | Added "AdSense Integration" section — every new page must have an ad unit |
| `PRD.md` | Added §8.4 "AdSense Integration (Required for all pages)" |
| `AGENTS.md` | Added Workflow Rules section: AdSense requirement, session logging, no auto-commits |

### How upload works
1. Frontend sends file as `multipart/form-data` to `POST /api/v1/resumes/upload`
2. Backend detects file extension, extracts text via PyPDF2 (PDF) or python-docx (DOCX) or raw read (TXT)
3. Extracted text is sent to TechnicalAI for structured JSON extraction
4. Parsed resume is saved to DB and returned to frontend → shown in NOVA viewer

### Limitations
- Legacy `.doc` (not `.docx`) returns a clear error message asking user to resave as .docx
- No automated tests

---

## Session: 2026-06-09 — Edit Button Fix + Template Accumulation

### Bug fix
- **"Edit" button / editor not rendering**: `map((edu) => (` and `map((exp) => (` in the editor's live preview section used `key={i}` but `i` wasn't passed as the map index parameter — caused ReferenceError that crashed the editor render. Fixed by adding index param: `map((edu, i) =>` and `map((exp, i) =>`.

### New feature — Template auto-accumulation
Templates used on resumes are now automatically saved to the database, building a collection of unique templates over time.

| File | Change |
|------|--------|
| `src/core/database.py` | Added `user_templates` table (name PK, config JSON, user_email, is_system, created_at) + `save_template()`, `list_templates()`, `get_template_by_name()`; added `template_name` column to `user_resumes` + updated all CRUD |
| `src/api/routes.py` | Added `GET /resumes/templates` and `POST /resumes/templates` endpoints; added `template_name` field to `ResumeCreateRequest` / `ResumeUpdateRequest`; auto-saves template on resume create/update via `_maybe_save_template()` |
| `frontend/src/pages/ResumePage.jsx` | Added `applyTemplate()` function (saves template to backend + applies to current resume); loads templates from API on mount; shows accumulated templates in templates panel alongside built-in ones; sends `template_name` with save/create requests |

### How it works
1. When user picks a template (built-in or previously saved), `applyTemplate()` calls `POST /resumes/templates` to persist it (INSERT OR IGNORE — no-op if already exists)
2. `template_name` is tracked on the resume and sent with PUT/POST
3. Backend `_maybe_save_template()` also fires on resume create/update to catch templates from API calls
4. Templates panel shows built-in + DB-accumulated templates on page load
5. Since `POST /resumes/templates` is registered before `/{resume_id}`, no routing conflicts

### Fixed — Optimize endpoint + Templates visibility

| File | Change |
|------|--------|
| `src/api/routes.py` | **Optimize endpoint**: detect AI error messages (check `result` for error keywords) + return HTTP 502 instead of silently returning unchanged data; include `template_name` + full resume context in AI prompt; pass `template_name` in `update_data` dict on save for `_maybe_save_template()` |
| `frontend/src/pages/ResumePage.jsx` | **Template name indicator**: shows current template name in collapsed templates header; **auto-expand**: new empty resumes default to templates tab on editor entry |

### Major — Viewer layout restructured + Templates everywhere

| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | **Viewer 2-column layout**: LHS = templates mini-section + NOVA document; RHS = chat + ATS suggestions; mobile-responsive via `isMobile` state (stacks vertically below 768px) |
| `frontend/src/pages/ResumePage.jsx` | **Viewer templates section**: shows current template badge, "Switch" button to editor, and clickable template cards to apply alternate templates |
| `frontend/src/pages/ResumePage.jsx` | **Editor templates auto-expand**: always opens templates panel when entering editor (not just new resumes); shows current template name in collapsed header |
| `frontend/src/pages/ResumePage.jsx` | **Editor responsive**: `flexDirection: column` on mobile, form panel goes full width |
| `frontend/src/pages/ResumePage.jsx` | **Viewport tracking**: added `isMobile` state with resize listener for responsive layout switching |
| `src/api/routes.py` | **Create resume**: now passes `template_name` to `save_resume()` so new resumes track which template they use |
| `src/api/routes.py` | **Upload resume**: defaults to "Modern Professional" template + calls `save_template()` to ensure every uploaded resume has a template |

### How templates are now tracked
1. Every resume stores `template_name` in the database column
2. Uploaded resumes default to "Modern Professional"
3. Created resumes use whatever `template_name` is sent in the request
4. Save/optimize always include `template_name` in PUT payload
5. Templates are auto-accumulated in `user_templates` table on first use
6. Each template card in viewer/editor highlights the currently active one

### Notes
- Template endpoint order: `GET /resumes/templates` and `POST /resumes/templates` are registered before `GET /resumes`, `GET /resumes/{resume_id}` — no 405 risk
- Build passes, all routes verified

## Session: 2026-06-10 — Template Categories, Global Templates, Section Management, Multi-Page

### What was done
#### Backend — Database
| File | Change |
|------|--------|
| `src/core/database.py` | Added `category` (default `'general'`) and `section_defs` (default `[]`) columns to `user_templates` via ALTER TABLE migrations; updated `save_template()`, `list_templates()`, `get_template_by_name()` to include category + section_defs; added `list_template_categories()` function |

#### Backend — API Routes
| File | Change |
|------|--------|
| `src/api/routes.py` | `TemplateCreateRequest` now has `category` + `section_defs` fields; `GET /resumes/templates` accepts `?category=` filter; added `GET /resumes/templates/categories` endpoint; `POST /resumes/templates` passes category/section_defs to DB; `create_resume` passes `template_name` to `save_resume()`; upload defaults to `category='professional'` on `save_template()` |

#### Frontend — Template System Rework
| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | Replaced flat `RESUME_TEMPLATES[2]` with structured `BUILTIN_TEMPLATES[5]` across 5 categories (Professional, Academic, Technical, Creative, General) |
| | Each template has: `name`, `category`, `description`, `section_defs` (ordered section definitions with icons/types), `default_enabled_sections`, `pages` (multi-page layout), `styling` (font/size/color), and `data` (actual resume content) |
| | Added `ALL_SECTION_DEFS` constant with 12 section types (personal_info, summary, education, experience, skills, certs, projects, achievements, languages, publications, volunteering, references) |
| | Added `CATEGORIES` constant with icon/label for each category |
| | `applyTemplate()` now passes `category` + `section_defs` to backend; looks up builtin by index or DB template by name |
| | Template selector in both editor and viewer now has **category-tabbed UI** showing built-in + user templates filtered by selected category |
| | Each template card shows its section badges (which sections it contains) |
| | Added **section management** panel in editor: checkboxes to enable/disable any of the 12 section types per resume; toggling adds/removes section data |
| | Added **page navigation** in viewer: Prev/Next buttons + page counter, shows multi-page templates properly |
| | Added `currentPage`, `selectedCategory`, `availableCategories` state + resize listener for responsive layout |

### How the new template system works
1. **5 built-in templates** organized into categories: Modern Professional (Professional), Classic Academic (Academic), Full-Stack Developer (Technical), Executive Leader (Professional), Creative Portfolio (Creative)
2. **Category tabs** appear in both editor and viewer template selectors — click to filter templates
3. **Section definitions** per template show which sections each template supports (with icons)
4. **Section management** checkboxes let users add/remove any of 12 section types per resume on the fly
5. **Multi-page** templates (Classic Academic has 2 pages, Executive Leader has 2 pages) show page navigation
6. **User-accumulated templates** stored in DB with `category` and `section_defs` for proper global sharing

### Notes
- Templates are globally available: `user_email` can be null for system templates, and `list_templates()` returns all regardless of user
- Existing DB templates without `category`/`section_defs` default gracefully to `'general'`/`[]`
- Backwards compatible — all old migrations still run fine
- Build passes, both backend Python and frontend Vite
- `loadCategories` now checks response is JSON before parsing (handles un-restarted backend gracefully)
- Viewer template badge moved to compact dropdown in top action bar (no full template section above document)

---

## Session: 2026-06-10 — Firecrawl Web Data Integration

### What was done
| File | Change |
|------|--------|
| `opencode.json` | Added `"plugin": ["opencode-firecrawl"]` to enable Firecrawl as an opencode plugin |

### Firecrawl Install & Auth
- Installed `firecrawl-cli` globally via `npx firecrawl-cli@latest init --all`
- Authenticated with API key `fc-691c53f1820e44a1a8f9b5fbd8338fca`
- 30 skills installed across CLI, build, and workflow categories

### Available Firecrawl Tools
- **CLI**: `firecrawl search`, `firecrawl scrape`, `firecrawl interact`, `firecrawl crawl`, `firecrawl map`, `firecrawl ask`, `firecrawl docs-search`
- **CLI skills** — teach the agent which command to run and when (search → scrape → interact chain)
- **Build skills** — add Firecrawl API calls to product code with correct SDK + env setup
- **Workflow skills** — produce finished deliverables (research briefs, SEO audits, lead lists, QA reports, knowledge bases)

### Key Decisions
- Plugin added to `opencode.json` (not `.mcp.json`) since Firecrawl is an opencode plugin, not an MCP server
- API key stored in session; used for CLI and REST API access
- Firecrawl replaces `mcp-server-fetch` and `duckduckgo-mcp-server` for richer web capabilities (search + scrape + interact in one toolchain)

---

## Session: 2026-06-10 — Template Data Preservation + AI Template-Aware Optimization

### What was done

| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | **`applyTemplate` reworked**: now preserves existing resume data when switching templates — only the template's section ordering/layout changes, user's content stays intact; added intelligent merge: template structure base → overwrite with existing data per section → keep extra sections not in template |
| `frontend/src/pages/ResumePage.jsx` | **Only Modern Professional has demo data**: other 4 templates cleared to `data: {}` — they serve as pure structural options (section ordering, page layout, styling only) |
| `frontend/src/pages/ResumePage.jsx` | **`optimizeResume` fixed**: replaced hard `data: data.optimization.optimized_data` (which could wipe user content) with proper deep-merge pattern matching `handleChatSend` (`personal_info` spread, fallback arrays per section); added auto-save via `PUT` + `loadResumes()` |
| `src/api/routes.py` | **Optimize prompt enhanced**: now fetches template's `section_defs`, `pages`, and `styling` from DB; passes them as structured JSON in prompt; instructs AI to restructure resume data to match the template's section ordering, page layout, and styling; ATS target raised to 80-100 in output spec |

### Key Design Decisions
- Template switching is now non-destructive: user data maps into the new template's section structure without loss
- AI gets full template structure context (section_defs, page layout, styling) so it can reformat the resume top-to-bottom to match the template
- Only Modern Professional has demo content — other templates exist as structure-only options since full demo data for all would be redundant
- `optimizeResume` now matches `handleChatSend`'s merge pattern for consistency

### Known Issues
- 4 structural templates (Classic Academic, Full-Stack Developer, Executive Leader, Creative Portfolio) have empty data — user must fill sections manually after switching, or run AI optimization to populate them from existing Modern Professional data

## Session: 2026-06-10 — Plan System Overhaul + HomePage Profile Unification

### What was done

#### Backend — Database (`src/core/database.py`)
| Change | Detail |
|--------|--------|
| DB renamed | `chat_history.db` → `custodian.db` |
| `user_plans` table | Added `plan_expiry TEXT` column (ISO date, 1-year validity for Pro) |
| `payments` table (new) | Payment history: `id, user_email, amount, plan, status, created_at, valid_until` |
| `daily_requests` table (new) | Per-user per-day request counter with FK → `user_plans(user_email)` |
| `get_user_plan()` | Now queries `daily_requests` for counts; auto-downgrades expired Pro → Free |
| `check_and_increment_rate_limit()` | Uses `daily_requests` table via `increment_daily_request_count()` |
| `upgrade_user_plan()` | Accepts `plan_expiry` param |
| `save_payment()` | Records payment history |
| `get_daily_request_count()`, `increment_daily_request_count()` | New helpers for daily_requests table |

#### Backend — API (`src/api/routes.py`)
| Change | Detail |
|--------|--------|
| `POST /user/upgrade-plan` | Sets 1-year `plan_expiry` from now + saves payment record via `save_payment()` |
| Import | Added `save_payment` to imports |

#### Backend — Auth (`src/api/auth.py`)
| Change | Detail |
|--------|--------|
| `GET /auth/status` | Now returns `user.plan` and `user.plan_expiry` alongside user data |

#### Frontend — Shared Components
| File | Change |
|------|--------|
| `hooks/useAuth.js` | Exposes `plan` from auth status response |
| `components/layout/Header.jsx` | Dynamic plan badge (`GUEST`/`FREE`/`PRO`) instead of hardcoded `FREE`; color-coded (Pro = gold) |
| `components/layout/Sidebar.jsx` | Shows user email + plan badge in offcanvas header |
| `components/modals/ProfileModals.jsx` | Shows `plan_expiry` date for Pro users ("Valid until June 10, 2027") |

#### Frontend — Pages
| File | Change |
|------|--------|
| `pages/HomePage.jsx` | Replaced inline nav bar (hardcoded "Guest") with shared `Header` component; wired `ProfileModals` with `useAuth` user + logout |
| `pages/PaymentPage.jsx` | Redirects to `/` (home) after successful payment instead of `window.close()` |
| `static/payment.html` | Same redirect fix |

#### Docs
| File | Change |
|------|--------|
| `PRD.md` | Bumped to v1.3.0; added §7.3 Payment Flow, §7.4 DB tables DDL, §7.5 Request Tracking, §7.6 Plan Display; updated all `chat_history.db` → `custodian.db` |
| `README.md` | Added Plan Validity column, Plan Display table, DB tables for plans section |
| `.gitignore` | Added `*.db` and related journal/WAL/SHM files to prevent data file commits |

### Key Design Decisions
- Daily request counts moved to a separate `daily_requests` table (FK → `user_plans`) for cleaner tracking with atomic `INSERT ... ON CONFLICT DO UPDATE` — old `requests_today`/`last_reset_date` columns kept in `user_plans` for backward compatibility
- Pro plans have 1-year validity; auto-downgrade on `get_user_plan()` call — no cron job needed
- Payment history stored in `payments` table with `valid_until` for future Stripe integration
- `auth/status` now returns plan info so `useAuth` exposes it globally without an extra network call
- HomePage uses same `Header` + `ProfileModals` pattern as `MainLayout` — consistent across all pages

### Known Issues
- No Stripe integration yet (user to implement)
- Old `chat_history.db` data must be renamed to `custodian.db` or migrated manually
- Free/guest users have `plan_expiry: null` — only Pro has expiry tracking

### Fixes
- **Sidebar**: Replaced email display with user name (or "Guest" if not logged in); consolidated plan badge into the user info row; removed duplicate badge from offcanvas header
- **Payment redirect**: Changed `navigate('/')` → `window.location.href = '/'` (full page reload) so `useAuth` re-fetches auth/plan state after payment; SPA client-side navigation was leaving stale auth data

## Session: 2026-06-13 — Anthropic Python SDK Integration

### What was done

#### Refactored `ClaudeAgent` (`src/agents/claude_agent.py`)
| Change | Detail |
|--------|--------|
| Replaced raw `httpx` POST calls with `anthropic.AsyncAnthropic().messages.create()` | SDK handles connection pooling, automatic retries (2× with exponential backoff), and proper timeout management |
| Added shared `_get_client()` singleton | Single `AsyncAnthropic` instance per agent, reused across all calls for TCP connection reuse |
| Added typed error handling | Catches `RateLimitError`, `APIStatusError` (401→invalid key), `APIConnectionError`, `APITimeoutError` with clear user-facing messages |
| Upgraded streaming to non-blocking async | `stream_response` now uses `AsyncAnthropic` (`async with client.messages.stream()` + `async for text in stream.__stream_text__()`) instead of sync `Anthropic` inside an async function — no event loop blocking |
| Added `count_tokens()` method | Uses SDK's `client.beta.messages.count_tokens()` for future token accounting |
| Removed custom retry logic | SDK's built-in retry (2 attempts with exponential backoff) replaces the old 3-attempt custom loop with manual sleep/backoff |
| Removed unused imports | `httpx`, `asyncio`, `random` no longer imported |

#### Refactored `ClaudeCodeAgent` (`src/agents/claude_code_agent.py`)
| Change | Detail |
|--------|--------|
| `_fallback_to_api()` uses `anthropic.AsyncAnthropic` | Replaced raw httpx POST with SDK, same typed error handling as `ClaudeAgent` |
| Added `import anthropic` at module level | No more local imports |

#### Requirements
- `anthropic>=0.40.0` already in `requirements.txt`, freshly installed v0.109.1

### Key Design Decisions
- `_get_client()` lazily creates and caches `AsyncAnthropic` per agent instance — avoids creating a new `httpx.AsyncClient` per API call
- Used `AsyncAnthropic` (not sync `Anthropic`) for both non-streaming and streaming to keep the event loop non-blocking
- SDK's internal retry policy replaces manual `for attempt in range(max_retries)` with `sleep(2**attempt)` — cleaner code, same behavior
- `count_tokens()` gracefully returns 0 on failure rather than propagating errors
- Both `ClaudeAgent` and `ClaudeCodeAgent` share the same SDK patterns but have separate client instances

### Known Issues
- Only 1 built-in resume template available (Modern Professional) — user noted templates need expansion
- Gemini agent still uses raw `httpx` (not in scope for this session)

## Session: 2026-06-13 — Inline Diff Review with Per-Section Accept/Reject

### What was done

#### Shared utilities (`ResumePage.jsx`)
| Function | Purpose |
|----------|---------|
| `computeDiffSections(optimizedData, originalData)` | Compares AI-proposed data vs original to identify which sections changed (personal_info field-by-field, arrays via JSON.stringify) |
| `getChangedFields(optimizedData, originalData)` | Returns Set of personal_info field names that differ |

#### State changes (`ResumePage.jsx`)
- `pendingChanges` restructured: now stores `{ originalData, optimizedData, remainingSections (Set), optimization, changes }` instead of merged `{ data, previousData }`
- Added `remainingSections` state (Set) — tracks which sections still need review
- `optimizeResume` and `handleChatSend` no longer merge AI data into `currentResume.data` immediately — instead store original + optimized separately for diff review

#### Actions (`ResumePage.jsx`)
| Function | Behavior |
|----------|----------|
| `acceptAllChanges()` | Merges all optimized data → saves to backend via PUT → clears review mode |
| `rejectAllChanges()` | Discards all pending changes, clears review mode, keeps original data intact |
| `acceptSection(section)` | Merges that single section's optimized data into original → removes from remaining → if all resolved, exits review mode |
| `rejectSection(section)` | Removes section from remaining without applying changes → if all resolved, exits review mode |
| `saveAcceptedData(data, optimization)` | PUTs merged data to backend, updates `currentResume`, stores optimization result |

#### Viewer diff UI (`ResumePage.jsx`)
| Element | What changed |
|---------|--------------|
| **Review bar** | Replaced old yellow "Pending Changes" banner with compact "Reviewing AI Changes — X section(s) modified" bar with Accept All / Reject All buttons |
| **NOVA document** | When `pendingChanges` exists, renders from `originalData` with a yellow outline |
| **Per-section diff** | Each changed section shows **OLD** (red bg, strikethrough) and **AI PROPOSED** (green bg, bold) side by side |
| **Personal info fields** | Individual field diffs (name, title, summary, email, etc.) — each changed field shows old → new inline |
| **Per-section actions** | Each section with changes gets Accept / Reject mini buttons at the bottom |
| **Unchanged sections** | Render normally with no diff styling |

### How the flow works
1. User clicks "Optimize with AI" or sends chat message
2. Backend returns `optimized_data` (changed fields only)
3. Frontend computes which sections/fields changed via `computeDiffSections`
4. Resume stays on original data; viewer enters "review mode" with yellow outline
5. Each changed section shows old (red) → new (green) diff with Accept/Reject buttons
6. Accepting a section merges that section into local data and removes from review list
7. Rejecting a section removes it from review list without applying changes
8. When all sections resolved, review mode exits automatically
9. User can click "Accept All" at any time to save all changes to backend
10. "Reject All" discards all pending changes

### Key Design Decisions
- `remainingSections` Set tracks un-reviewed sections; when empty, `pendingChanges` auto-clears
- Accepted sections are applied to `currentResume.data` immediately (visible in UI) but NOT saved to backend until "Accept All"
- `computeDiffSections` uses `JSON.stringify` for array comparison — detects order/content changes reliably
- Personal info uses field-level diff detection but section-level accept/reject (all personal_info fields are one unit)
- Using functional `setState(prev => ...)` ensures correct pendingChanges reference in callbacks
- No CSS classes needed — all diff styling via inline styles (red/green backgrounds, strikethrough, yellow left border)

## Session: 2026-06-13 — Anthropic Document Content Blocks for Resume Parsing + Gemini Fallback

### What was done

#### New `parse_document()` method on `ClaudeAgent` (`src/agents/claude_agent.py`)
| Change | Detail |
|--------|--------|
| Added `async parse_document(file_bytes, filename, prompt)` | Sends PDF/DOCX file to Claude as a base64-encoded `document` content block — no local text extraction needed |
| Uses `anthropic.AsyncAnthropic().messages.create()` with `type: "document"` content block | Same SDK client, same typed error handling (`RateLimitError`, `APIStatusError`, `APIConnectionError`, `APITimeoutError`) |
| Maps file extension to media type | `.pdf` → `application/pdf`, `.docx` → `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `.txt` → `text/plain` |
| Exists only on `ClaudeAgent` | Callers should check `hasattr(agent, 'parse_document')` before calling — `GeminiAgent` does not have this |

#### Updated upload endpoint (`src/api/routes.py`)
| Change | Detail |
|--------|--------|
| `/resumes/upload` now uses `parse_document` for PDF/DOCX when agent is Claude | Falls back to `extract_text` (PyPDF2/python-docx) + text prompt for Gemini or non-Claude providers |
| Duplicate `ext = Path(...)` line removed | Cleaned up redundant line 2145 |

#### Gemini provider fallback
- User set Gemini API key HTTP referrers to "None" in Google Cloud Console — Gemini calls no longer blocked
- Backend `agent_manager.switch_provider()` in optimize endpoint already retries primary provider twice, then falls back to the other provider
- Upload/parse endpoints use the fallback automatically: if `hasattr(agent, 'parse_document')` is False (Gemini provider), they fall through to `extract_text + process_message()` — the same flow that worked before

### Key Design Decisions
- `parse_document` is on `ClaudeAgent` only — not added to `GeminiAgent` since document content blocks are an Anthropic-specific API feature
- Fallback path unchanged: `extract_text()` produces raw text, then `agent.process_message()` sends it with a parsing prompt — works for both Claude and Gemini
- Upload endpoint (with document content blocks) replaces the old "extract locally, then send text to AI" pattern for Claude users, giving better accuracy on PDFs with complex layouts
- All 13 existing tests still pass, frontend builds clean

## Session: 2026-06-13 — Chat Compaction + NOVA Viewer Inline Editing + Certifications Fix

### What was done

#### Chat compaction (`src/api/routes.py` + `frontend/src/pages/ResumePage.jsx`)
| Change | Detail |
|--------|--------|
| `POST /resumes/{resume_id}/compact-chat` endpoint | Compacts old chat messages by summarizing via AI when total chars > 8000; keeps last 4 messages as-is; stores `[{role:"system", content:"[Compacted]..."}, ...recent]` |
| `CHAT_COMPACTION_CHAR_THRESHOLD = 8000` | Constant at top of routes.py; threshold triggers compaction |
| Chat history included in optimize prompt | Last 10 messages from `resume.chat_history` added as "Previous conversation context" so AI knows what was discussed |
| `saveChatHistory()` auto-compacts on frontend | After each save, checks total char count; if > 8000, calls compact endpoint and replaces local state with compacted version |

#### NOVA viewer inline editing (`frontend/src/pages/ResumePage.jsx`)
| Change | Detail |
|--------|--------|
| `handleFieldSave(value, section, field, index)` | New function that saves any field edit into `currentResume.data` and clears `editField` state |
| `isEditing(section, field, index)` | New helper to check if a given field is currently being edited |
| **full_name** | Now `contentEditable` on click — blur saves, Enter key blurs |
| **title** | Same `contentEditable` pattern |
| **email, phone, linkedin, github, website** | All now clickable `contentEditable` fields — previously not interactive at all |
| **summary** | Now clickable `contentEditable` paragraph — previously read-only |
| **Education section** | Pencil icon next to header; clicking an item opens inline form (degree, institution, dates, cgpa fields) |
| **Experience section** | Same pattern — inline form with role, company, dates, description |
| **Skills section** | Click to edit as comma-separated list in inline input; saves as array of `{id, value}` objects |
| **Certifications section** | Inline form with name, issuer, date fields |
| **Projects section** | Inline form with name, description, tech stack fields |
| **Achievements section** | Each item clickable to inline edit |

#### Certifications display fix (`frontend/src/pages/ResumePage.jsx`)
| Change | Detail |
|--------|--------|
| Added `cert.date` display | Date now shows in a smaller sub-line below certification name/issuer (was missing entirely) |
| Better spacing | Added `marginBottom` to each cert item for readability |
| Inline editing | Pencil icon + per-item inline form |

#### Edit button removed (`frontend/src/pages/ResumePage.jsx`)
| Change | Detail |
|--------|--------|
| Removed "Edit" button from viewer action bar | Template switching (which navigates to editor) + inline preview editing + chat are the intended editing flows |

### Key Design Decisions
- `contentEditable` for simple text fields (personal_info) — minimal state overhead, no extra inputs
- Inline multi-field forms for array sections (education, experience, etc.) — clicking an item opens editable inputs for all its fields, with a Done button to confirm
- Compaction is async (fires after chat save) so it doesn't block the user's flow
- Chat history context in optimize prompt uses last 10 messages (enough for continuity without blowing token budget)
- Edit button removed because: (a) clicking template cards navigates to editor, (b) inline editing on preview, (c) chat modifications — all provide edit paths

## Session: 2026-06-13 — NOVA Viewer Inline Add/Delete Controls

### What was done

| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | Added `getBlankItem()` helper — returns empty item template per section type (education, experience, skills, certifications, projects, achievements) |
| | Added `addSectionItem(section)` — creates blank item via `getBlankItem`, pushes into `currentResume.data[section]`, opens inline edit for the new item |
| | Added `removeSectionItem(section, index, e)` — filters out item at index from `currentResume.data[section]`, clears edit state |
| | **Education inline form**: Added "Editing" header bar with Delete (trash) button |
| | **Education section**: Added "+ Add Education" link below items list, before diff actions |
| | **Experience inline form**: Added "Editing" header bar with Delete button |
| | **Experience section**: Added "+ Add Experience" link below items list |
| | **Skills section**: Added "+ Add Skill" link below items list |
| | **Certifications inline form**: Added "Editing" header bar with Delete button |
| | **Certifications section**: Added "+ Add Certification" link below items list |
| | **Projects inline form**: Added "Editing" header bar with Delete button |
| | **Projects section**: Added "+ Add Project" link below items list |
| | **Achievements inline form**: Added Delete (trash) button next to input |
| | **Achievements section**: Added "+ Add Achievement" link below items list |

### Key Design Decisions
- Each array section now has a consistent add/delete pattern: "+ Add" link at the bottom of the section, Delete (trash) button inside each inline edit form
- Delete is only available inside the edit form (not on hover of the display text) to keep the viewer clean
- Skills uses a special case: clicking "+ Add Skill" opens the comma-separated input with a blank field
- All add/delete operations update `currentResume.data` in state immediately but do NOT auto-save to backend (user must trigger save elsewhere, or Accept All in review mode)
- Build passes clean (Vite, chunk size warning is cosmetic)

## Session: 2026-06-13 — Per-Field Accept/Reject + Compact Review Bar + Page Titles

### What was done

| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | **Per-field accept/reject for personal_info**: Added `personalFieldRemaining` Set to `pendingChanges` state; Added `acceptPersonalField(field)` and `rejectPersonalField(field)` — merges/rejects individual personal_info fields (full_name, title/role, email, phone, linkedin, github, website, summary) instead of whole-section accept/reject |
| | **`renderFieldAction(field)`**: New helper that shows Accept/Reject buttons per personal_info field, with label "Accept role" for the title field |
| | **Compact Accept All / Reject All**: Moved from a large floating yellow bar above the chat panel into a single compact line at the bottom of the resume document (below all sections), below the green AI PROPOSED diffs |
| | **`acceptAllChanges` fix**: Now calls `setPendingChanges(null)` + `setRemainingSections(null)` after saving, so the preview becomes editable again after accepting all |
| | **Page title consistency**: Viewer changed from "Resume Preview" to "Resume Optimizer" with resume name subtitle; Editor now shows "Resume Optimizer" breadcrumb above the resume title; List already had it |
| | `renderFieldAction`, `acceptPersonalField`, `rejectPersonalField` added to support per-field personal_info accept/reject |
| | `personalFieldRemaining` added to both `optimizeResume` and `handleChatSend` `setPendingChanges` calls |

### Key Design Decisions
- `renderFieldAction` only renders when the field is in `personalFieldRemaining` Set — once accepted/rejected, buttons disappear for that field
- When all personal_info fields are resolved, `personal_info` is automatically removed from `remainingSections`; if no sections remain, review mode exits
- `renderDiffActions` still handles non-personal_info sections (education, experience, etc.) at the section level
- Compact Accept All / Reject All bar is inside the document div (below all section diffs) so it's visually at the bottom of the review content
- Page title "Resume Optimizer" now appears consistently across list, viewer, and editor views

## Session: 2026-06-13 — 404 Graceful Handling + Upload Loading State

### What was done

| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | **404 handling in optimizeResume + saveAcceptedData**: If resume returns 404 (deleted server-side), automatically switches to list view (`setView('list')`) + clears `currentResume` |
| | **404 handling in chat optimization**: If 404 on chat send, shows user-facing warning "This resume no longer exists" in chat, then auto-redirects to list after 2s timeout |
| | **Upload button loading state**: Shows spinner + "Uploading..." text with disabled styling during file upload; disables file input to prevent double-submit |

### Key Design Decisions
- Chat 404 uses 2s `setTimeout` before navigating to list so user sees the warning message before being redirected
- Upload button uses inline loading state (no overlay) to minimize visual disruption
- `disabled` attribute on hidden file input prevents accidental double-upload even if button styling is bypassed
- All 404 paths use a single pattern: detect status → show warning → redirect to list, ensuring the viewer never shows stale data

## Session: 2026-06-13 — JD Upload & Optimize Integration

### What was done

#### Backend
| File | Change |
|------|--------|
| `src/api/routes.py` | Added `POST /resumes/extract-text` endpoint — accepts PDF/DOCX/TXT file, extracts text via `extract_text()`, returns raw text for JD population |
| | Modified `POST /resumes/upload` — added optional `jd: Optional[str] = Form(None)` parameter; saves JD on the resume record after upload |

#### Frontend
| File | Change |
|------|--------|
| `frontend/src/pages/ResumePage.jsx` | **JD section in list view**: Collapsible section below upload buttons with textarea for pasting JD + file upload button for JD documents (PDF/DOCX/TXT); uploads JD document to `/resumes/extract-text` and populates textarea |
| | **JD section in viewer**: Same collapsible section after viewer header, before two-column layout, with "Optimize with JD" button inside the JD section |
| | **`handleJdFileUpload()`**: New function that sends JD document to `/resumes/extract-text`, populates `jdText` state with extracted text |
| | **`handleFileUpload` modified**: Now includes `jdText` in FormData when uploading resume, so JD is saved from the start |
| | **Optimize button in viewer**: Changed from conditional "Re-optimize" (only when ATS < 90) to always-visible "Optimize with JD" / "Optimize with AI" button; shows JD context on hover |
| | **JD file extraction loading state**: `jdLoading` + `jdUploadStatus` states for JD document upload progress |

### Polish — JD Visibility & Inline Editability
| Change | Detail |
|--------|--------|
| Auto-expand on load | `useEffect` triggers `setShowJdInput(true)` whenever `jdText` becomes non-empty — JD section opens automatically |
| Preview in collapsed state | When JD is loaded but section is collapsed, shows first ~180 chars as inline preview below the heading |
| Larger editable textarea | Textarea grows from 3→6 rows when JD is loaded; already fully editable via `onChange` |
| Editor JD section | Upgraded from bare 4-row textarea hidden behind collapse to full pattern (auto-expand, preview, file upload, clear button) matching list/viewer |
| Consistent across all 3 views | List, Editor, and Viewer all share the same JD UX: collapsed preview + auto-expanded editable textarea + file upload + clear

### How it works
1. **Paste JD**: User can paste JD text into the textarea in either list, editor, or viewer view
2. **Upload JD document**: User clicks "Upload JD Document" button, picks a PDF/DOCX/TXT file → file sent to `/resumes/extract-text` → extracted text populated into JD textarea
3. **Auto-expand**: Once JD is loaded, the section auto-expands to show the full text in a 6-row editable textarea; a 180-char preview shows in the collapsed header
4. **Upload resume with JD**: When uploading a resume, the JD text is included as a form field → backend saves it on the resume record
5. **Optimize with JD**: "Optimize with JD" button (always visible in viewer) sends `jd: jdText` to `/resumes/{id}/optimize` → AI tailors resume to the JD
6. **Chat with JD context**: `handleChatSend` already passes `jd: jdText || null` → all chat-based modifications are JD-aware
7. **JD persistence**: After any optimize/chat call, the JD is saved back to the resume record → persists across sessions

### Key Design Decisions
- JD document upload uses a dedicated lightweight endpoint (`/resumes/extract-text`) rather than overloading the main upload flow
- JD section auto-expands on text load so the user always sees their JD content; shows preview in collapsed state
- Three-... system means the JD is carried regardless of which view the user is in
- All three views (list, editor, viewer) share identical JD UX: collapsed preview + auto-expand + file upload + clear
- Optimize button always visible (not conditional on ATS score) so users can re-optimize anytime with new JD
- No DB changes needed — `user_resumes` already had a `jd` column; `jd` form field added to upload endpoint
- JD is included in both optimize and chat requests, so all AI interactions are JD-context-aware

---

## Session: 2026-06-20 — React MCP Setup + Provider Fallback Fix

### What was done

#### Backend — Provider fallback fix
| File | Change |
|------|--------|
| `src/api/routes.py` | **`_stream_with_fallback`**: Detects `"Error:"` chunks from agent streaming (e.g., `"Error: Gemini API returned 403"`) and tries next provider instead of treating error text as successful streaming; tries active provider first instead of always Gemini first |
| `src/agents/agent_manager.py` | **`send_message`**: Broadened error detection from `startswith("Error:")` to `"Error:" in content or "API Error" in content` so non-streaming path also catches Gemini's `"API Error (Status: 403)"` |

#### Frontend — Dark/Light theme fixes
| File | Change |
|------|--------|
| `frontend/src/pages/BuildPage.css` | Replaced 60+ hardcoded `#555`, `#666`, `#0f172a`, `#f0f4ff`, `#ebf8ff`, `#d0d0d0`, `#111`, `#fff` → CSS variables (`var(--text-secondary)`, `var(--text-muted)`, `var(--text-primary)`, `var(--bg3)`, `var(--text-muted)`, `var(--text-primary)`, `var(--card)`) |
| `frontend/src/pages/BuildPage.jsx` | Replaced `#f8f8f8` → `var(--bg2)`, `#999` → `var(--text-muted)` in inline styles |
| `frontend/src/components/layout/AdSenseAd.jsx` | Fixed hardcoded near-black `rgba(10,10,15,0.95)` background → `var(--bg2)` (was a black bar in light mode) |
| `frontend/src/components/NeuronBrain.jsx` | Canvas label text now reads CSS variables via `getComputedStyle` instead of hardcoded `#0f172a` (invisible in dark mode) |

#### React MCP setup (new)
| File | Change |
|------|--------|
| `.mcp.json` | Added `react-context` (component tree inspection via Chrome) and `react-devtools` (deep React DevTools MCP integration) servers |
| `frontend/vite.config.js` | Added `@react-dev-inspector/babel-plugin` for accurate component source locations with `react-context-mcp` |
| `frontend/package.json` | Added `@react-dev-inspector/babel-plugin` dev dependency |

### Using React MCP
- **react-context**: Connect AI assistant to running app in Chrome — inspect component trees, props, state, source locations. Tools: `get_component_map`, `take_snapshot`, `get_react_component_from_backend_node_id`, `list_pages`, `navigate_page`, etc.
- **react-devtools**: Deeper React fiber tree inspection — component tree, props, state, hooks, profiler, state modification
- **Source tracking**: `@react-dev-inspector/babel-plugin` adds `data-inspector-*` DOM attributes for accurate file:line:column in component maps (React 19 removed `_debugSource`)

### Key Decisions
- Provider fallback uses error prefix detection rather than changing agent error handling to avoid breaking existing error messaging patterns
- Babel plugin runs in dev-only bundle (Vite strips during production build)
- `react-context-mcp` runs headless Chrome automatically — no manual setup needed

## Session: 2026-06-20 — Theme Fix (All Pages Dark/Light Mode)

### What was done

#### CSS theme variables (`frontend/src/index.css`)
| Change | Detail |
|--------|--------|
| Light mode `--bg` | Changed to `#ffffff` (was grey-ish) |
| Light mode `--bg2` | Changed to `#f8faff` |
| Light mode `--bg3` | Changed to `#f0f6ff` |
| Added `--primary-rgb` to both themes | Light: `77, 171, 247`; Dark: `88, 166, 255` |
| Added `--warning-rgb`, `--success-rgb`, `--danger-rgb` to both themes | Enables `rgba(var(--warning-rgb), X)` patterns |

#### Theme hook rewrite (`frontend/src/hooks/useTheme.js`)
- Rewrote as standalone hook (no context dependency) that sets `data-theme`, `data-bs-theme` on `<html>` and `theme-light`/`theme-dark` class on `<body>`
- Added inline `<script>` in `index.html` for FOUC prevention (sets theme before React mounts)

#### PaymentPage (`frontend/src/pages/PaymentPage.jsx`)
- Replaced all hardcoded light-mode colors with CSS variables:
  - Background gradient → `var(--bg3)`/`var(--bg2)`/`var(--bg)`
  - Form inputs: removed overriding inline styles, rely on Bootstrap + `data-bs-theme`
  - Text colors: `#444`→`var(--text2)`, `#666`→`var(--text-secondary)`, `#888`→`var(--text-muted)`, `#1a2332`→`var(--text)`
  - Primary colors: `#4dabf7`→`var(--primary)`
  - Plan summary: `#f0f7ff`→`var(--bg3)`, `#d0e1f7`→`var(--border)`
- Form inputs now use Bootstrap's theme-aware styling (no more hardcoded `#f7faff` backgrounds)

#### ResumePage (`frontend/src/pages/ResumePage.jsx`)
- **NOVA document preview** (editor + viewer): `#fff`→`var(--card)`, `#222`→`var(--text)`, `#444`→`var(--text2)`, `#555`→`var(--text-secondary)`, `#999`→`var(--text3)` for section borders
- **Inline edit forms**: `#f8f9fa`→`var(--bg2)`, `#dee2e6`→`var(--border)`, `#666`→`var(--text-secondary)`
- **Pen icons**: `#999`→`var(--text3)` (all section edit buttons)
- **Primary accent**: All `color: '#4dabf7'` → `'var(--primary)'`, `'1px dashed #4dabf7'` → `'1px dashed var(--primary)'`
- **Diff/review section**: OLD red bg `rgba(239,68,68,0.08)`→`rgba(var(--danger-rgb),0.08)`, AI PROPOSED green bg `rgba(34,197,94,0.08)`→`rgba(var(--success-rgb),0.08)`; delete buttons `#ef4444`→`var(--danger)`
- **Add section buttons**: `#4dabf7`→`var(--primary)`

#### HomePage (`frontend/src/pages/HomePage.jsx`)
- Already used CSS variables for all structural elements (background, text, cards, borders)
- Brand accent colors (`#4dabf7`, `#f59e0b`) intentionally left in feature card icon backgrounds/gradients as they are brand-specific, not theme colors

#### DashboardPage (`frontend/src/pages/DashboardPage.jsx`)
- Already working correctly as the reference implementation

### Known Issues
- Resume optimizer page NOVA preview in viewer mode uses `var(--card)`/`var(--text)` which may appear different from the previous hardcoded white/black appearance; user may need to verify it looks correct in both themes
- `rgba(245,158,11,0.1)` and `rgba(245,158,11,0.3)` on HomePage "coming soon" badges are hardcoded but acceptable since `--warning-rgb` was just added and could be used if desired
- `#fbbf24` review mode borders on ResumePage could be changed to `var(--warning)` for theme awareness

## Session: 2026-06-21 — JobSpy Real Job Scraping (7 Platforms) + Apply for Jobs Page

### What was done

#### Git Submodule — JobSpy MCP Server
| File | Change |
|------|--------|
| `.gitmodules` | Added `dependencies/jobspy-mcp-server` submodule pointing to `Tushar1224/jobspy-mcp-server` |
| `dependencies/jobspy-mcp-server/src/tools/search-jobs.js` | Replaced `docker run --rm jobspy` with direct `python` subprocess call using `fileURLToPath()` for correct Windows paths; added `JOBSPY_CMD` env var support |
| `dependencies/jobspy-mcp-server/jobspy/main.py` | Removed default `google_search_term` (was triggering slow Google searches), wrapped in try/except, changed default `location` to `None` |

#### Backend — MCP Integration (`src/mcp/mcp_config.py`, `src/mcp/mcp_client.py`)
| File | Change |
|------|--------|
| `src/mcp/mcp_config.py` | Registered `jobspy` MCP server: `node dependencies/jobspy-mcp-server/src/index.js`; added `search_jobs` tool to `coordinator` and `researcher` specializations |
| `src/mcp/mcp_client.py` | Added `search_jobs` OpenAI-format tool definition with 9 parameters; fixed JS-style `false` → Python `False` that caused `NameError` |

#### Backend — Jobs API (`src/api/routes.py`)
| File | Change |
|------|--------|
| `src/api/routes.py` | Added `POST /jobs/search` with 3-tier fallback: (1) direct `jobspy.scrape_jobs()`, (2) JobSpy MCP server, (3) AI-generated listings via TechnicalAI/CustodianAI |
| | Added `_map_jobspy_results()` shared helper to normalize jobspy response fields (jobUrl, employmentType, site → source) and compute match_score from skill overlap |
| | Added `site_names` (multi-platform filter), `search_term`, `location` to `JobSearchRequest` Pydantic model |
| | Fixed `is_remote` logic: only sent to JobSpy when `only_remote = filters.remote and not filters.hybrid and not filters.on_site` |
| | Added `sys.executable` passthrough via `JOBSPY_CMD` env var; added `import sys` |
| | Added `exc_info=True` on logger.error in outer except block for full traceback debugging |

#### Frontend — JobsPage (`frontend/src/pages/JobsPage.jsx`)
| Change | Detail |
|--------|--------|
| 7 platform toggle buttons | LinkedIn, Indeed, Glassdoor, ZipRecruiter, Google Jobs, Bayt, Naukri with color-coded active states; "show more" expand for platforms beyond first 4 |
| Quick search | Title + location inputs at top of controls bar; auto-searches "software engineer, remote" on mount |
| Jobs display without resume | All results sections use `hasQuery` instead of `hasResume` so jobs render with just a search |
| Source badges | Each `JobCard` shows colored platform badge (source) and `date_posted` when available |
| Naukri icon | `fas fa-briefcase` (no Naukri brand icon in FA free) |
| "Apply with Resume" button | Added to each job card — opens mailto with pre-filled subject/body when no resume selected, or generates tailored application when resume is selected |

### Key Design Decisions
- Direct `jobspy.scrape_jobs()` is primary path (no Docker, no Node.js — fewer failure points); MCP server is secondary fallback because Node.js bridge adds Windows subprocess/PATH issues
- `_map_jobspy_results()` extracted as shared function to avoid duplication between direct and MCP paths
- `is_remote` param only sent to JobSpy when **only** remote is selected and hybrid/on-site are not
- Naukri uses generic FA `fa-briefcase` since no Naukri brand icon exists in FontAwesome free tier
- `exc_info=True` on outer handler ensures stack traces visible in server logs
- `import sys` added for `sys.executable` in MCP env vars

### Known Issues
- `pip install python-jobspy` is in user site-packages, not `.venv` — `sys.executable` passthrough ensures correct Python for subprocess
- Docker daemon not running on dev machine — all jobspy calls use direct Python, never Docker
- MCP `search_jobs` on Windows must use `fileURLToPath()` not `.pathname` (`.pathname` returns `/D:/...` which is invalid)

## Session: 2026-06-21 — Accumulated Job Board + Applied Tracker + Always-Show Jobs

### What was done

#### Backend — Background job rotation (`src/api/routes.py`)
| Change | Detail |
|--------|--------|
| Replaced one-shot pre-fetch with continuous background rotation | `_background_job_fetcher()` loops through 25 fetch groups on a 60s interval with 0.3-2s random jitter per group |
| Added `_fetch_job_group()` | Dispatches to real API fetchers (RemoteOK, Remotive, Arbeitnow), direct JobSpy, and AI fallback per group |
| Added real API fetchers | `_fetch_remoteok_jobs()`, `_fetch_remotive_jobs()`, `_fetch_arbeitnow_jobs()` — all free, no API key |
| Added `GET /jobs/accumulated` | Lightweight endpoint — reads from `job_cache_accumulated` table only, no JobSpy/AI/MCP involved |
| Added `JOB_FETCH_GROUPS` list | 25 groups covering 58 curated platforms across 4 tiers |
| Fixed AI JSON parsing | Strips ```json/``` code fences before `json.loads()` |
| Fixed NoneType crash | Initialized `jobs = []` before jobspy block |
| Fixed CareerBuilder | Removed from JobSpy (unsupported) → added to CUSTOM_PLATFORMS |
| Fixed arbeitnow URL | Added `www.` + `follow_redirects=True` |
| Updated default site_names | `remoteok,remotive,arbeitnow,linkedin,indeed,google,weworkremotely,wellfound,aijobs,dice,upwork` |

#### Backend — Applied jobs API (`src/api/routes.py`)
| Change | Detail |
|--------|--------|
| `POST /jobs/search` | Reduced `hours_old` defaults; AI fallback prompt updated with `date_posted` within 2 weeks |
| `POST /jobs/applied` | Saves applied job by `{title, company}` with source, URL, applied_at |
| `GET /jobs/applied` | Returns all applied jobs for current user (guest email or authenticated) |
| `DELETE /jobs/applied/{id}` | Removes by row ID |
| `POST /jobs/applied/sync` | Batch upsert — sends full list of applied jobs; backend dedupes by `{title, company}` |

#### Backend — Database (`src/core/database.py`)
| Change | Detail |
|--------|--------|
| `job_cache_accumulated` table | Columns: `id`, `title`, `company`, `source`, `url`, `description`, `location`, `salary`, `job_type`, `date_posted`, `logo`, `hash`, `created_at` |
| `job_fetch_state` table | Tracks per-group last-fetch timestamp for rotation continuity |
| `add_jobs_to_accumulated()` | Bulk upsert by md5 hash of `{title, company, source}` |
| `get_accumulated_jobs(limit=1000)` | Returns newest-first with 48-hour TTL |
| `applied_jobs` table | Columns: `id`, `user_email`, `title`, `company`, `source`, `url`, `applied_at` |
| `save_applied_job()`, `get_applied_jobs()`, `delete_applied_job()`, `has_applied_job()`, `sync_applied_jobs()` | Full CRUD for applied jobs |
| `get_fetch_state()`, `set_fetch_state()` | Fetch rotation state tracking |

#### Frontend — Curated platform list (`JobsPage.jsx`)
| Change | Detail |
|--------|--------|
| `PLATFORM_OPTIONS` replaced | 58 curated platforms across 4 tiers (Primary APIs, Startup, AI/ML & Tech, Remote) + Aggregators + Freelance |
| Platform icons | All use safe FontAwesome 6 Free icons (no Pro) |
| Color-coded toggle buttons | Platform buttons with brand-like colors and active highlight |

#### Frontend — Applied tracker (`JobsPage.jsx`)
| Change | Detail |
|--------|--------|
| "Did you apply?" modal | On return to tab, checks `localStorage('custodian_pending_apply')` for timestamped job → shows Yes/Not Yet modal |
| Applied Jobs section | Collapsible accordion in sidebar, shows count, list with remove button |
| `hiddenJobKeys` Set | Seeded from both `custodian_hidden_jobs` and backend applied jobs on mount; persisted to localStorage; hides applied cards instantly |
| `onApply` prop on JobCard | Stores job in localStorage for pending-apply flow |
| Applied job sync on mount | `POST /jobs/applied/sync` sends full localStorage list to backend |

#### Frontend — Always-show jobs + local filtering (`JobsPage.jsx`)
| Change | Detail |
|--------|--------|
| Accumulated poll unconditional | Polls `GET /jobs/accumulated` every 5 min regardless of search/resume state |
| Initial page load | Silently fetches accumulated cache — no skeleton, no loading |
| `searching` removed from empty state | Jobs always visible; search box becomes a client-side keyword filter |
| `hasQuery` variable removed | No gate on results rendering |
| Visibilitychange handler | When tab regains focus, re-fetches accumulated jobs to check for fresh postings |
| Type filters (remote/hybrid/on-site) | Removed from search debounce — toggle filters locally only, no backend call |
| Platform toggle filters | Same — client-side filtering only |
| Keyword filter input | Client-side filter on accumulated jobs |
| Pagination | 9 per page, always visible when filteredJobs > 0 |
| Refresh message | "New postings appear every ~15s" updated to match background rotation pace |

### Key Design Decisions
- Background rotation over one-shot pre-fetch: 25 groups × 60s = full cycle every 25 minutes, each group scrapes 3-5 platforms with `results_wanted=30`, random jitter prevents rate-limit blocks
- Applied jobs in both localStorage (instant UI hide) and backend DB (permanent storage) with auto-sync on mount
- Applied cards removed from results via `hiddenJobKeys` — hidden before render, not just visually
- `hasQuery` removed entirely — jobs page always shows accumulated jobs; search box is a convenience filter, not a gate
- 5-minute frontend poll matches user's explicit preference; no loading spinners during poll
- Real API fetchers (RemoteOK, Remotive, Arbeitnow) preferred over AI generation — they return real jobs with valid apply URLs
- Type filter changes are client-side only — no backend call, instant UI feedback

### Known Issues
- MCP jobspy server still fails on Windows (`MCP server closed connection`) — primary direct-JobSpy path works without it

## Session: 2026-06-21 — Firecrawl Removal + Job Recency Fix + JobFinderAI Prompt

### What was done

#### Backend — MCP Config (`src/mcp/mcp_config.py`)
| Change | Detail |
|--------|--------|
| Removed `firecrawl` server | `npx` not available in backend process — server was failing to start. Removed entire server definition and all `firecrawl_*` tool references from coordinator, researcher, fact_checker, trend_analyst, job_finder specializations |
| Removed `job_automator` server | `job_application_automator` package not installed. Removed server definition and `simple_form_*` / `create_cover_letter` / `get_applied_jobs` tools from job_finder specialization |
| Simplified `job_finder` tools | Now only has: `fetch`, `duckduckgo_web_search`, `search_jobs` |

#### New — `job_finder.md` prompt (`src/agents/prompts/job_finder.md`)
- **Current date awareness**: Prompt explicitly states "Current date: June 2026" so AI generates correct dates in search queries and output
- **No year in search queries**: Instructs AI to NOT include a year in web search queries (sites return current results automatically)
- **Fresh results**: Tells AI to search for jobs posted within the last 2 weeks
- **Tool context**: Lists available tools and their usage

#### Backend — Agent prompt maps
| File | Change |
|------|--------|
| `src/agents/claude_agent.py` | Added `"job_finder": "job_finder.md"` to `prompt_file_map` |
| `src/agents/gemini_agent.py` | Added `"job_finder": "job_finder.md"` to `prompt_file_map` |

Previously `job_finder` had no entry and silently fell back to the generic "general" prompt — now it gets dedicated job search instructions.

#### Backend — Job search recency (`src/api/routes.py`)
| Change | Detail |
|--------|--------|
| Default `hours_old` reduced | Unfiltered: 168→72 (7 days → 3 days); Filtered: 72→48 (3 days → 2 days) |
| Pre-fetch `hours_old` reduced | 168→72 |
| AI fallback prompt updated | Added "RECENT job listings posted within the last 2 weeks" + `date_posted` field constraint (ISO date within last 14 days) |

### Caching & DB Plans (noted for future)
User plans:
1. **Job cache TTL**: Lower to 5 min (currently 900s/15min default in `get_global_job_cache`)
2. **Cache merge strategy**: Add new results alongside cached ones rather than replacing; keep freshest in memory cache, push older to DB table
3. **DB initialization**: Already done on startup via `database.py` — all tables created
4. **RDS migration**: SQLite → PostgreSQL/MySQL for persistent storage across server restarts

## Session: 2026-06-21 — AWS CDK Infrastructure Scaffolding

### What was done

#### New — `infra/` directory with CDK stacks
| File | Purpose |
|------|---------|
| `infra/app.py` | Entry point wiring VPC → RDS → Backend stacks |
| `infra/cdk.json` | CDK configuration |
| `infra/requirements.txt` | CDK Python dependencies |
| `infra/README.md` | Full deployment guide + lifecycle management |
| `infra/stacks/vpc_stack.py` | VPC + public/isolated subnets, 0 NAT gateways ($0) |
| `infra/stacks/rds_stack.py` | RDS PostgreSQL 16 on db.t3.micro (free tier eligible) |
| `infra/stacks/backend_stack.py` | EC2 t3.micro with FastAPI, systemd service, auto-setup UserData |

#### Architecture (Vercel + AWS)
```
Vercel (React) ──proxies /api/*──> EC2 (FastAPI) ──> RDS (PostgreSQL)
```
- **Frontend**: Vercel (unchanged, already working)
- **Backend**: EC2 t3.micro running uvicorn via systemd
- **Database**: RDS PostgreSQL (replaces local SQLite)
- **Auth**: SSM Session Manager for EC2 shell (free, no SSH key needed)
- **No paid services**: No NAT gateway, no Secrets Manager, no ALB

#### Key Design Decisions
- `CfnInstance` used instead of `ec2.Instance` to allow `Fn::Sub` in UserData — injects RDS endpoint token at deploy time
- DB password passed via `cdk deploy -c db_password=...` — no Secrets Manager ($0)
- API keys (Anthropic, Gemini, JWT) also passed via CDK context
- IAM role: least privilege — only SSM ManagedInstanceCore + rds:DescribeDBInstances
- 8 GB gp3 root volume (encrypted), RDS in isolated subnet (no public internet)
- EC2 user data: installs Python → clones GitHub repo → venv + pip install → writes .env → systemd service
- Cross-stack references: `rds_stack.db_endpoint` passed directly (same CDK app)

#### Lifecycle Rules
| Change | How | Downtime | Data risk |
|--------|-----|----------|-----------|
| Frontend code | Push → Vercel auto-deploys | None | None |
| Backend code | SSH → `git pull` → `systemctl restart` | ~3s | None |
| API keys | Edit `.env` → restart | ~3s | None |
| EC2 type/storage | Edit CDK → `cdk deploy` | ~2min (replace) | EBS preserved |
| RDS storage | Edit CDK → `cdk deploy` | None | None |
| Destroy all | `cdk destroy CustodianBackend` → `CustodianRds` → `CustodianVpc` | Permanent | **All data lost** |

### Files changed/created
| File | Type |
|------|------|
| `infra/README.md` | Created — full guide |
| `infra/app.py` | Created |
| `infra/cdk.json` | Created |
| `infra/requirements.txt` | Created |
| `infra/stacks/__init__.py` | Created |
| `infra/stacks/vpc_stack.py` | Created |
| `infra/stacks/rds_stack.py` | Created |
| `infra/stacks/backend_stack.py` | Created |

### Noted for future
- Add CodePipeline + CodeDeploy for automated backend deployments from GitHub
- Add CloudFront for CDN + HTTPS on backend API
- Switch to ECS Fargate when leaving free tier
- Add ElastiCache Redis for job cache + sessions
- Add Route53 + ACM for custom domain with HTTPS

## Session: 2026-06-21 — Match Scoring Fixes + Sliding Window Pagination

### Frontend — Match scoring fixes (`JobsPage.jsx`)
| Change | Detail |
|--------|--------|
| **COMMON_WORDS trimmed** | Removed ~50 technical/role words (`software`, `engineer`, `developer`, `python`, `react`, etc.) — was filtering out critical matching signal; now only truly generic words (`the`, `and`, `for`, etc.) remain |
| **`computeSemanticScores` removed** | Was overwriting keyword scores with broken backend response (no `match_score` returned), nuking all matches to zero |
| **Word-boundary matching → `includes()`** | Switched from `\bkw\b` to `includes()` — more lenient (sql→sqlalchemy false positives OK) but dramatically higher match rates; fewer missed matches from non-standard delimiters |
| **Normalization** | `c#` → `csharp`, `node.js` → `nodejs`, `react.js` → `react` |

### Frontend — Sliding window pagination (`JobsPage.jsx`)
| Change | Detail |
|--------|--------|
| **`getPageNumbers(current, total, range=5)`** | New helper — returns page numbers ±5 around current, clamped to 1..total |
| **High match pagination removed** | Dead code — `highMatchJobs` is always capped at 9 (`PAGE_SIZE`), so the `> PAGE_SIZE` conditional never triggered |
| **Low match pagination** | Replaced `Array.from({length: Math.min(lowPageCount, 15)})` with `getPageNumbers(lowMatchPage, lowPageCount, 5)` — shows 5 pages before and after current |
| **<< / >> jump buttons** | << appears when current > 6 (jumps to page 1), >> appears when current < total-5 (jumps to last page) |
| **Current page highlight** | 2px `var(--primary)` border, primary background, white text, bold |

## Session: 2026-06-21 — HomePage Update + English-Only Filter + Sidebar Close Fix

### What was done
| File | Change |
|------|--------|
| `frontend/src/pages/HomePage.jsx` | Changed **Apply for Jobs** from `status: 'coming'` → `status: 'working'` with primary-blue theme; added green "NEW" badge on card + "HOT" ribbon on top-right; removed from "Coming Next" section |
| `frontend/src/pages/JobsPage.jsx` | Added `isEnglish()` filter — strips CJK/Arabic/Cyrillic job listings from results |
| `frontend/src/pages/JobsPage.jsx` | Scoring capped denominator at 8 (`Math.min(kwArray.length, 8)`) so match scores are higher (1 keyword match = 12.5% instead of 5%) |
| `frontend/src/pages/JobsPage.jsx` | Scoring floor of `Math.max(1, score)` — every accumulated job gets `match_score >= 1`, guaranteeing Top Matches always populated |
| `frontend/src/pages/JobsPage.jsx` | Applied jobs section: deduplicated (title+company), compact collapsible rows, removed full JobCards |
| `frontend/src/pages/JobsPage.jsx` | Description formatting: strips HTML tags + markdown `**bold**`/`*italic*` + truncates to 220 chars |
| `frontend/src/components/layout/Sidebar.jsx` + `index.css` | Close button: removed `btn-close-white`, uses CSS `filter: invert(1)` in dark mode via `[data-theme="dark"]` |
| `src/agents/agent_manager.py` | `send_message()` signature unchanged (no `agent_override` param — prod needed restart after git pull) |

## Session: 2026-06-21 — Documentation Sync (README + PRD)

### What was done
| File | Change |
|------|--------|
| `README.md` | Updated `/jobs` route description to "86 platforms + background accumulation + resume match scoring"; expanded Jobs API table with 6 endpoints (accumulated, search, applied CRUD, sync); added full **Jobs Board** section with features table, API endpoints, background fetch architecture, DB tables, and key files |
| `PRD.md` | Added `/jobs` route to UI routes table; added **§8.6 Jobs Board** section with views, match scoring, applied tracking, background fetch architecture, client-side filtering, pagination, English-only filter, description formatting, API endpoints, DB tables, key files, and known limitations; bumped version 1.5.0 → 1.6.0 |
| `AGENTS.md` | Updated `\b` → `includes()` in Match Scoring session; added scoring floor of 1 to HomePage session; appended this session log |

### Key Details
- README Jobs Board section includes: 86 platforms, features table, 6 API endpoints, 28-group background architecture, 3 DB tables
- PRD §8.6 covers: match scoring internals (`includes()`, `normalizeWord()`, capped denominator, floor of 1), applied tracking flow (localStorage + backend sync, pending-apply modal), sliding window pagination, English filter regex, description formatting pipeline
- Updated word-boundary session to reflect the `\bkw\b` → `includes()` change (was logged inaccurately before)
- MCP tools table updated to mention "7 major platforms + AI fallback for 86 total" |

## Session: 2026-06-25 — Guest Payment Guard + Redirect-After-Login

### What was done

| File | Change |
|------|--------|
| `frontend/src/pages/PaymentPage.jsx` | Added `useAuth` + guest guard: if `user` is null or `plan === 'guest'`, shows a "Sign In Required" card with Google sign-in button instead of the payment form; stores `redirect_after_payment_login` in localStorage so user lands back on `/payment` after auth; shows spinner during loading state |
| `frontend/src/App.jsx` | Added `useEffect` that checks `localStorage.getItem('redirect_after_payment_login')` after auth loads — if set, removes the key and redirects via `window.location.href` to the stored path |

### Flow
1. Guest navigates to `/payment` → sees "Sign In Required" card (not payment form)
2. Clicks "Sign in with Google" → `/api/v1/auth/google` → Google OAuth → callback → redirect to `/`
3. `App.jsx` detects authenticated user + redirect intent → `window.location.href = '/payment'`
4. Payment page re-mounts with auth → payment form renders normally

### Key Design Decisions
- localStorage flag (`redirect_after_payment_login`) bridges the gap between Google OAuth's hard redirect to `/` and the user's intended destination — no backend changes needed
- Full page reload (`window.location.href`) used for redirect-after-login so `useAuth` re-fetches auth state fresh from cookies set by the OAuth callback
- Guest notice card matches the existing payment page visual style (card, gradient background, AdSense)

---

## Session: 2026-06-26 — Chat Auto-Save + Per-Agent Conversation Resume

### What was done

#### Bug fix — Chat sessions never persisted
| File | Change |
|------|--------|
| `src/api/routes.py` | Both `/chat/stream` and `/chat/stream/guest` now auto-save the chat session after streaming completes via a `finally` block in the generator; stores UUID chat_id, user email, message history, and agent name |

#### New — `agent_name` column on `chat_sessions`
| File | Change |
|------|--------|
| `src/core/database.py` | `save_chat_session()` now accepts and stores `agent_name`; `get_chats_for_user()` returns `agent_name` in each row; added `get_last_chat_for_agent()` — returns most recent chat for a given user+agent |
| `src/core/db_backend.py` | `chat_sessions` table now includes `agent_name TEXT` in both SQLite and PostgreSQL schemas; backward-compatible ALTER TABLE migrations for existing databases |
| `src/api/routes.py` | Added `GET /chats/last/{agent_name}` endpoint for per-agent last-chat lookup; imported `get_last_chat_for_agent` |

#### Frontend — Per-agent conversation resume
| File | Change |
|------|--------|
| `frontend/src/pages/DashboardPage.jsx` | `selectAgent()` now fetches last chat for the selected agent via `GET /chats/last/{name}?email=...` and loads those messages (with chat_id) instead of showing welcome; falls back to welcome if no prior chat exists |
| `frontend/src/pages/DashboardPage.jsx` | `handleLoadChat()` now uses `chat.agent_name` (if present) to directly select the correct agent when loading a chat from history; falls back to message-sender heuristic |
| `frontend/src/components/modals/ProfileModals.jsx` | Chat history list now shows agent name badge (e.g., "CustodianAI") on each chat entry |

#### Test suite
| File | Change |
|------|--------|
| `tests/test_all_flows.py` | Comprehensive end-to-end test covering all 6 DB flows (chats with agent_name, resume CRUD, resume chat history, templates, jobs, last-chat-per-agent) |
| `tests/test_chat_save.py` | Dedicated chat save/retrieve test |
| `tests/test_resume_save.py` | Dedicated resume save/update test |
| `tests/test_resume_api.py` | Full resume API flow test (create, update, list, chat history) |

### How chat saving works now
1. User sends a message via the dashboard → `/chat/stream` (or `/chat/stream/guest`)
2. Backend streams the AI response to the frontend
3. After streaming completes (`finally` block), backend calls `save_chat_session()` with:
   - UUID chat_id, user email (or guest identifier), message[:80] as title
   - Full message history (previous history + user msg + assistant response)
   - Agent name (e.g., "CustodianAI", "TechnicalAI")
4. Chat appears in ProfileModals "Chat History" tab under the correct agent badge

### How per-agent resume works
1. User clicks an agent in the sidebar → `selectAgent()` fires
2. Frontend calls `GET /chats/last/{agent_name}?email={user_email}`
3. If a prior chat exists, it loads those messages into the chat window with the saved `chat_id`
4. If no prior chat, the welcome/onboarding message is shown as before
5. When switching agents, the current chat is auto-saved (via stream completion) before loading the new agent's last conversation

### Key Design Decisions
- `agent_name` stored on chat_sessions rather than parsed from messages on every query — simpler queries and O(1) lookup
- `get_last_chat_for_agent()` uses `LIMIT 1` — only the most recent conversation is resumed; older ones remain accessible via chat history
- Backend-side auto-save (in generator `finally` block) chosen over frontend-side `POST /chats` call — ensures persistence even if frontend crashes or network drops after stream
- `COALESCE(excluded.agent_name, chat_sessions.agent_name)` in upsert preserves existing agent_name on update if none provided
- All test files consolidated under `tests/` directory with proper `sys.path` setup for running from project root

---

## Session: 2026-06-26 — Docs Update + Pending Features Inventory

### What was done
| File | Change |
|------|--------|
| `README.md` | Complete rewrite: added dual DB backend (SQLite + PostgreSQL), Supabase support, portfolio page status, all session features, chat auto-save, per-agent resume, 23 courses, 6 test files, no infra/ directory, pending features table |
| `PRD.md` | Bumped to v1.7.0; added §8.7 Guest Payment Guard, §8.8 Chat Auto-Save & Per-Agent Resume; updated project structure, tech stack, route list, env vars, testing guide; removed infra/ from structure |
| `AGENTS.md` | Added this session log + comprehensive Pending Items section |

### What's NOT Done — Pending Features Inventory

| Feature | Status | Details |
|---------|--------|---------|
| **Portfolio Builder (`/portfolio`)** | Coming Soon placeholder | Shows feature preview grid (4 cards) with AI storytelling, GitHub portfolio, resume-powered content — no backend or real functionality |
| **Stripe Payment Integration** | Demo sandbox only | `/payment` page has a mock card form with 1.8s simulated processing; no real Stripe SDK or webhook handling |
| **Backend Automated Tests** | Manual only | 6 test files exist (`tests/`) but no CI pipeline or comprehensive test coverage |
| **CDK Infrastructure** | Removed from git | `infra/` directory was created (June 21) and later removed; no AWS deployment stack currently available |
| **MCP JobSpy on Windows** | Broken | `MCP server closed connection` on Windows — primary direct-JobSpy Python path works as fallback |
| **Semantic Match Score Endpoint** | Not implemented | Backend `POST /match-scores` endpoint doesn't return updated `match_score` — keyword-only scoring on frontend |
| **Guest Account Merge** | Not implemented | Applied jobs/per-user data is per-session only when not authenticated |
| **Gemini Agent SDK Upgrade** | Not done | Gemini agent still uses raw `httpx` instead of `google-genai` SDK (unlike Claude which uses `anthropic` SDK) |
