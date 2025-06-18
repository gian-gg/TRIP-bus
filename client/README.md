# TIPR - Transit Integrated Payment & Routing

Quick setup guide for the application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Run with PM2 (and persist):

```bash
npx pm2 start app.js --name tipr
npx pm2 save
```

---
