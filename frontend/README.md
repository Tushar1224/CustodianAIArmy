# Custodian AI Army — Frontend

React 19 SPA for the Custodian AI Army multi-agent platform.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 |
| UI | Bootstrap 5, CSS custom properties |
| Animation | HTML5 Canvas 2D (NeuronBrain) |
| Icons | Font Awesome 6 |

## Key Components

| Component | File | Description |
|-----------|------|-------------|
| **NeuronBrain** | `src/components/NeuronBrain.jsx` | Full-canvas interactive neural network — biological dendrites, somas, axon hillocks, 14 dummy neurons, space nebula background, drag-and-drop physics, hover detail panel |
| **HomePage** | `src/pages/HomePage.jsx` | Landing page with full-viewport hero, feature cards, pricing, "Coming Soon" roadmap |
| **DashboardPage** | `src/pages/DashboardPage.jsx` | Chat with specialized AI agents (SSE streaming) |
| **LearnPage** | `src/pages/LearnPage.jsx` | 23 programming courses with AI tutoring |
| **CustomAgentsPage** | `src/pages/CustomAgentsPage.jsx` | Create/manage custom AI agents |
| **BuildPage** | `src/pages/BuildPage.jsx` | 5-phase MVP Builder pipeline |

## NeuronBrain Details

- **5 feature neurons** in a ring around a glowing center hub
- **14 dummy neurons** scattered around the ring with smaller gray somas
- **All connections** are dendrite-style (tapered, wobbly, with spines and bouton clusters)
- **Center hub** has dendrites extending to every feature neuron
- **Space background**: drifting nebula clouds, 80 twinkling stars, animated sine waves
- **Right panel** slides in on hover with feature details and an "Explore" button
- **Build warning**: The Terser minifier has a variable-shadowing bug — avoid naming a local `const features` in the same scope as a prop/closure `features`. The local was renamed to `featNodes` to prevent TDZ crashes in production.

## Build & Run

```bash
npm run dev          # Vite dev server (port 5173, proxies /api to :8000)
npm run build        # Production build → dist/
npm run preview      # Preview built app
npm run lint         # ESLint
```

## Routes

| Path | Page | Status |
|------|------|--------|
| `/` | HomePage | Working |
| `/dashboard` | DashboardPage | Working |
| `/learn` | LearnPage | Working |
| `/portfolio` | PortfolioPage | Coming Soon |
| `/build` | BuildPage | Working |
| `/agents` | CustomAgentsPage | Working |
| `/payment` | PaymentPage | Working |
