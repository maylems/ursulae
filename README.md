<h1 align="center">Ursulae</h1>

<div align="center">Real-time cost control for your OpenAI and Anthropic API spend</div>

<br />

<div align="center">
  <img src="/public/screenshots/dashboard-overview.jpeg" alt="Ursulae usage and cost dashboard" style="max-width: 100%; border-radius: 8px;" />
</div>

<br />

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8" alt="Tailwind CSS v4" />
</p>

## Overview

Ursulae meters every OpenAI and Anthropic request as it happens, attributes the cost to the team or feature behind it, and enforces spending limits before they turn into an unexpected bill.

Provider dashboards show what was spent, after the fact, at the account level. Ursulae sits as a lightweight proxy in your application's own request path (`/proxy/:provider/*`), so it can record usage the instant a request completes and block the next one once a budget is hit, without storing your provider key or the request/response bodies.

This repo is the frontend: the marketing site and the Next.js dashboard where a team connects their proxy key, watches usage and cost, sets budgets, and reviews failed requests. It talks to a separate API + usage-ingestion backend, [`ai-financial-control-backend`](../ai-financial-control-backend), which is the only service that touches Postgres.

## Tech Stack

- Framework - [Next.js 16](https://nextjs.org/16) (App Router), [React 19](https://react.dev)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Better Auth](https://www.better-auth.com) (bearer + organization plugins), served by the backend repo
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com) primitives
- Data fetching - [TanStack React Query](https://tanstack.com/query) (server prefetch + `HydrationBoundary` + `useSuspenseQuery`)
- Forms - [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev)
- Tables - [TanStack Table](https://ui.shadcn.com/docs/components/data-table)
- Charts - [Recharts](https://recharts.org)
- Code highlighting - [Shiki](https://shiki.style) (integration snippets on the landing page)
- Search param state - [nuqs](https://nuqs.47ng.com/)
- State management - [Zustand](https://zustand-demo.pmnd.rs)
- Command+K interface - [kbar](https://kbar.vercel.app/)
- Error tracking - [Sentry](https://sentry.io/for/nextjs/)
- Linter / Formatter - [OxLint](https://oxc.rs/docs/guide/usage/linter) • [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)

## Pages

| Page                    | Route                     | Notes                                                                                          |
| :---------------------- | :------------------------ | :---------------------------------------------------------------------------------------------- |
| Landing                 | `/`                       | Marketing site: positioning, integration snippet, security & privacy, how it works.             |
| Sign in / Sign up       | `/auth/sign-in`, `/auth/sign-up` | Better Auth email/password, with Google and Microsoft OAuth where configured on the backend. |
| Usage & Cost            | `/dashboard/overview`     | Cost and token totals, spend by provider and model, and a full usage-events log.                |
| Budgets & Alerts        | `/dashboard/budgets`      | Set daily or monthly spending limits and get notified before they're hit.                       |
| Errors                  | `/dashboard/errors`       | Failed requests, rate limits, and policy actions (e.g. budget-blocked requests).                 |
| Settings                | `/dashboard/settings`     | Connect provider Admin API keys, organization details, notification preferences.                |
| Workspaces              | `/dashboard/workspaces`   | Manage and switch between organizations; team management under `/workspaces/team`.               |
| Billing & Plans         | `/dashboard/billing`      | Manage subscription and usage limits.                                                           |
| Profile                 | `/dashboard/profile`      | Account profile and security settings.                                                          |

## Folder Structure

```plaintext
src/
├── app/                           # Next.js App Router directory
│   ├── auth/                      # Sign-in, sign-up, email verification
│   ├── dashboard/                 # Dashboard route group
│   │   ├── overview/              # Usage & Cost
│   │   ├── budgets/               # Budgets & Alerts
│   │   ├── errors/                # Failed requests / rate limits log
│   │   ├── settings/              # API keys, organization, notifications
│   │   ├── workspaces/            # Organization management & teams
│   │   ├── billing/               # Billing & plans
│   │   ├── profile/               # User profile
│   │   └── notifications/         # Notification center
│   └── api/                       # API routes
│
├── components/                    # Shared components
│   ├── ui/                        # UI primitives (buttons, inputs, dialogs, etc.)
│   ├── layout/                    # Layout components (header, sidebar, etc.)
│   ├── themes/                    # Theme system (selector, mode toggle, config)
│   └── kbar/                      # Command+K interface
│
├── features/                      # Feature-based modules
│   ├── landing/                   # Marketing site sections
│   ├── overview/                  # Usage & Cost dashboard page shell
│   ├── usage-cost/                # Cost/token cards, charts, usage-events table
│   ├── budgets/                   # Budget CRUD
│   ├── error-log/                 # Failed-request log
│   ├── settings/                  # API key connect, org tab
│   ├── proxy/                     # Shared proxy integration snippets (OpenAI/Anthropic)
│   ├── notifications/             # Notification center & store
│   ├── auth/                      # Auth components
│   └── profile/                   # Profile form schemas
│
├── lib/                           # Core utilities (query-client, searchparams, etc.)
├── hooks/                         # Custom hooks
├── config/                        # Navigation, infobar, data table config
├── styles/                        # Global CSS & theme files
│   └── themes/                    # Individual theme CSS files
└── types/                         # TypeScript types
```

## Getting Started

> [!NOTE]
> This app needs the [`ai-financial-control-backend`](../ai-financial-control-backend) API running (it owns auth, Postgres, and the usage-ingestion worker). Start that repo first, or point `NEXT_PUBLIC_API_URL` at a deployed instance.

```bash
bun install
cp env.example.txt .env.local
# fill in NEXT_PUBLIC_API_URL (defaults to http://localhost:4000) and, optionally, Sentry
bun run dev
```

The app runs at http://localhost:3000.

##### Environment variables

See `env.example.txt` for the full list. The only required variable for local development is `NEXT_PUBLIC_API_URL`, pointing at the backend. Sentry variables are optional.

## Deploy

Deploy to Vercel out of the box, or use the included Bun Dockerfile (`Dockerfile.bun`) with Next.js standalone output mode. The production Docker setup shares the `afc-net` network with the backend's `docker-compose.yaml`. Full guide: [docs/deployment.md](./docs/deployment.md).

---

Built on top of the open-source [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter) (MIT licensed).
