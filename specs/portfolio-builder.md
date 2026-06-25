# AI Portfolio Showcase — Feature Spec

## Overview
The portfolio builder transforms products built on the platform (via *Build Your Product*) or any GitHub repository into a polished, AI-powered developer portfolio. Resume data personalizes the tone, skill emphasis, and narrative.

## Core Flow

```
                     ┌──────────────────────┐
                     │  User's GitHub Repos  │
                     │  or Platform Projects │
                     └────────┬─────────────┘
                              │
          ┌───────────────────v───────────────────┐
          │         Portfolio Generator            │
          │  (AI-powered, resume-aware)             │
          └───────┬───────────────────┬───────────┘
                  │                   │
          ┌───────v───────┐   ┌──────v────────┐
          │  Live Preview  │   │  Deploy/Host  │
          │  (multi-theme) │   │  (subdomain)  │
          └───────────────┘   └──────────────┘
```

## Entry Points
1. **Build Your Product → "Create Portfolio"** — after a product is built, one-click to generate a portfolio page for it.
2. **GitHub Connect** — paste a repo URL, AI analyzes README, code, and commits to generate a project showcase.
3. **Manual Add** — fill title, description, tech stack, screenshots manually if no GitHub/product link.

## Portfolio Structure (per project card)

| Section | Source | AI Role |
|---------|--------|---------|
| Project title + tagline | User / GitHub | Extracts from README or user input |
| Tech stack badges | User / GitHub | Detects from package.json, requirements.txt, etc. |
| Description | AI-generated | Reads README, code comments, and writes narrative |
| Key features (bullet list) | AI-generated | Extracts from code structure, PRs, or user input |
| Screenshots / demo GIF | User upload | — |
| Live demo URL | User input | — |
| Impact / metrics | User input | Prompts user for numbers (stars, users, performance) |

## Resume Personalization
- User uploads a resume (reuse existing resume parser from `POST /resumes/upload`)
- AI adjusts portfolio tone to match resume style (professional, technical, creative)
- Skills section of portfolio prioritizes skills listed on the resume
- Work experience timeline can be merged into portfolio "About" section
- If resume lists specific industries (fintech, healthcare, etc.), AI frames project descriptions toward those domains

## Themes (reuse template system from resume page)

| Theme | Style | Best for |
|-------|-------|----------|
| Minimal | Clean, white, single column | Enterprise devs |
| Terminal | Dark, monospace, green accents | Backend/infra engineers |
| Creative | Gradient headers, cards, animations | Frontend/design engineers |
| Technical | Sidebar nav, detailed project sections | Full-stack / multi-project |

## AI Prompt Strategy
```
System: You are a portfolio writer. Given a GitHub repo (README + file list)
and the user's resume data, write a compelling project showcase page.
Highlight technical decisions, impact, and the user's specific role.
Tone should match the resume's voice.
```

## Data Model (future DB table)

```json
{
  "id": "uuid",
  "user_email": "user@example.com",
  "type": "platform_product | github_repo | manual",
  "source_project_id": "uuid or null",
  "github_url": "https://github.com/user/repo",
  "resume_id": "uuid or null",
  "title": "My Project",
  "tagline": "AI-powered widget",
  "description": "AI-generated narrative...",
  "features": ["Feature 1", "Feature 2"],
  "tech_stack": ["React", "Python", "PostgreSQL"],
  "screenshots": ["url1", "url2"],
  "demo_url": "https://myapp.dev",
  "theme": "minimal | terminal | creative | technical",
  "published": true,
  "created_at": "ISO timestamp"
}
```

## API Endpoints (future)

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/portfolio` | List user's portfolio projects |
| `POST` | `/api/v1/portfolio` | Add a portfolio entry (manual / from repo) |
| `POST` | `/api/v1/portfolio/from-github` | Import GitHub repo → AI generates portfolio entry |
| `PUT` | `/api/v1/portfolio/{id}` | Update entry |
| `DELETE` | `/api/v1/portfolio/{id}` | Remove entry |
| `POST` | `/api/v1/portfolio/{id}/regenerate` | Re-run AI description generation |
| `GET` | `/portfolio/{username}` | Public portfolio view |
| `GET` | `/api/v1/portfolio/themes` | List available themes |

## Frontend Routes

| Route | View |
|-------|------|
| `/portfolio` | List view (all user's portfolio projects) |
| `/portfolio/new` | Create flow (pick source: GitHub / platform product / manual) |
| `/portfolio/:id` | Single portfolio editor (edit content, regenerate, change theme) |
| `/portfolio/:id/preview` | Live preview with theme selector |
| `/showcase/:username` | Public-facing portfolio page |

## Phased Implementation

### Phase 1 — Foundation
- Portfolio DB table + CRUD endpoints
- Manual add form (title, desc, tech stack, demo URL, screenshots)
- Basic public view page
- Reuse existing resume upload/parser

### Phase 2 — GitHub Integration
- `POST /portfolio/from-github` — clone repo, read README, detect tech stack
- AI description generation from repo content
- Screenshot auto-capture (via Puppeteer / Playwright) of the deployed product

### Phase 3 — Platform Product Integration
- "Create Portfolio" button on Build Your Product completion
- Auto-fill from product data (tech stack, description, demo URL)
- Screenshot of the product page auto-captured

### Phase 4 — Polish
- Multi-theme system (reuse resume template infrastructure)
- Resume personalization (tone matching, skill prioritization)
- One-click deploy to subdomain (Vercel / GitHub Pages)
- Shareable public URL with SEO meta tags

## Key Design Decisions
- Portfolio is project-card based, not a single "about me" page — users can have multiple project entries
- AI generates text but does NOT generate UI — themes are hand-crafted templates
- Resume personalization is additive (adjusts tone/skills weighting) not prescriptive (no locked sections)
- GitHub import runs async (cloning + AI generation may take 10-30s)
- Public portfolio URL is separate from the platform (e.g., `portfolio.custodian.tech/{username}`)
