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
