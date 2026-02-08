# Nodebase

Tech: Next.js | Prisma | tRPC | Inngest | React Flow

Build, wire, and launch automation workflows fast. Nodebase is a node-based builder with triggers, AI nodes, and webhooks, powered by reliable Inngest orchestration.

## Why It Feels Fast

- Visual editor that makes flows obvious at a glance
- Triggers that kick off real work (manual, Google Forms, Stripe)
- Execution nodes for HTTP, AI providers, and chat apps
- Credential vault with encryption-at-rest for API keys
- Execution history with status and error visibility
- Auth with email/password plus GitHub and Google OAuth
- Premium gating and billing via Polar

## What You Can Build

- Route Google Form responses into AI summaries and Slack
- React to Stripe events, enrich data, then send Discord alerts
- Chain HTTP calls to synchronize data between tools

## Stack

- Next.js App Router + React 19
- Prisma + PostgreSQL
- tRPC + TanStack Query
- Inngest for workflow execution
- Sentry for observability
- Tailwind CSS + shadcn/ui

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (see Environment Variables below).

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Run the app:

```bash
npm run dev
```

Open http://localhost:3000 and you will be redirected to `/workflows`.

## One-Command Dev

If you want the dev server, Inngest dev server, and ngrok in one go:

```bash
npm run dev:all
```

This uses `mprocs` and reads from `.env` via `dotenv`.

## Environment Variables

Create a `.env` file in the project root:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/nodebase

# Auth (better-auth)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Billing (Polar)
POLAR_ACCESS_TOKEN=
POLAR_SUCCESS_URL=http://localhost:3000/workflows

# Encryption
ENCRYPTION_KEY=change_me

# Optional
NGROK_URL=
VERCEL_URL=
```

Notes:

- `NEXT_PUBLIC_APP_URL` is used to build webhook URLs shown in the UI.
- `ENCRYPTION_KEY` encrypts stored credentials; changing it will make existing credentials unreadable.
- `NGROK_URL` is required only if you run `npm run ngrok:dev`.
- `VERCEL_URL` is set automatically by Vercel.

## Webhooks

Nodebase exposes webhook endpoints and surfaces the URLs in the trigger node dialogs:

- Google Forms: `/api/webhooks/google-form?workflowId=...`
- Stripe: `/api/webhooks/stripe?workflowId=...`

## Scripts

- `npm run dev` - start Next.js dev server
- `npm run dev:all` - start Next.js + Inngest + ngrok via `mprocs`
- `npm run inngest:dev` - start Inngest dev server
- `npm run ngrok:dev` - expose localhost with ngrok
- `npm run build` - build the Next.js app
- `npm run start` - run the production server
- `npm run lint` - run Biome checks
- `npm run format` - format with Biome

## Project Structure

- `src/app` - App Router routes, layouts, API handlers
- `src/features` - domain features (auth, workflows, editor, triggers)
- `src/inngest` - workflow execution functions and channels
- `src/trpc` - tRPC routers and client setup
- `prisma` - schema and migrations

## Deployment

Build and start:

```bash
npm run build
npm run start
```

Vercel is the easiest deployment target, but any Node + Postgres environment will work.

## Typical Flow

1. Create a workflow
2. Add a trigger node (manual, Google Form, or Stripe)
3. Chain execution nodes (HTTP, AI, Discord, Slack)
4. Run and watch status in real time

## Troubleshooting

- Webhooks not firing? Check `NEXT_PUBLIC_APP_URL` and your ngrok URL.
- Prisma errors? Verify `DATABASE_URL` and rerun migrations.
- AI nodes failing? Confirm credentials exist and `ENCRYPTION_KEY` is stable.
