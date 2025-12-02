# Getting Started

This is a minimal, practical guide to run and understand the TRIP frontend (this repo).

## Prerequisites

- Node.js (recommended: 18+)
- npm (or compatible package manager)
- Git

## Quick Setup

1. Clone the repository:

```bash
git clone https://github.com/gian-gg/TRIP-bus.git
cd TRIP-bus
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment example (if present) and adjust as needed:

```bash
cp .env.local.example .env.local
# edit .env.local to point APIs or ports if needed
```

4. Start the dev server:

```bash
npm run dev
```

Open the app at the URL Vite prints (commonly `http://localhost:5173`).

## Build for production

```bash
npm run build
# serve with a static server or with `npm run preview`
```

## Architecture (high level)

- Frontend (this repo)
  - React + Vite app that provides Passenger, Conductor, and QR interfaces
  - Uses local connectivity and a lightweight Express server for routing/statically serving as needed
- APIs (external repos)
  - Bus API — handles stops and local bus data (see `TRIP-bus-api`)
  - Dashboard API — supports the conductor/operator backends
- Deployment model
  - Designed to be deployable locally per bus/vehicle (local network) to mitigate connectivity issues
  - Frontend communicates with the Bus API and Dashboard API; both can be run locally or within a local network

## Tech & Tools

- Build: `vite`
- Framework: `react` (v19)
- Styling: `tailwindcss`
- QR: `qrcode.react`
- HTTP: `axios`
- Notifications: `sonner`
- Local server: `express` (simple static serving in `app.js`)

(See `package.json` for full dependency list.)

## Notes & Tips

- The project includes a demo-oriented landing page with quick links to the QR interface and conductor dashboard.
- The app contains a backend connection test helper that pings a sample endpoint (`/stop/index.php?id=1`) for development.
- If you deploy this in a vehicle, prefer running the Bus API locally on the vehicle network and point the frontend to that local API URL for reliability.

## Where to go next

- Read `docs/project-overview.md` for the main features and links.
- See linked API repos for backend setup:
  - https://github.com/Ehmann37/TRIP-bus-api
  - https://github.com/gian-gg/TRIP-dashboard

---

_Minimal getting-started guide created for local dev and per-bus deployment._
