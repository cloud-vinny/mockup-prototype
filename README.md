# FishAI mockup prototype (deploy repo)

Standalone Next.js app used for **Vercel deployment** and demos. The UI is kept in sync with the main capstone repo’s `web/` app (`Capstone-FishAI/web`). If branch deploys on the main repo are awkward, point Vercel at **this repository** and set the project root to the repo root (default).

## Prototype overview

- Login, home, analyse, results, about, profile (mock flows)
- Results page: sample detections, filters, water-quality indicator
- **Floating results chatbot** (bottom-right): suggestion prompts + mock replies derived from the **currently filtered** table data (not a real model yet)

## Tech stack

- Next.js (App Router)
- React + TypeScript
- CSS Modules
- ESLint

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel

- Import this Git repo in Vercel
- Framework: **Next.js**
- Root directory: **.** (repository root)
- Build: `npm run build`, Output: Next default

## Notes for team

- Detection data is **mock** for UX/demo
- Keep `src/lib/routes.ts` and header/nav links aligned when adding routes
