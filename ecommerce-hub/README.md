# Ecommerce Hub — Frontend

A modern **omnichannel commerce platform** built **frontend-first** with Next.js. The project ships as **one product with two clearly separated experiences**:

1. **Public marketing website** (`MarketingLayout`) — home, product, pricing, about, contact, blog, solutions.
2. **Authenticated product / dashboard application** (`DashboardLayout`) — the SaaS commerce operations app.

Every screen is fully usable today on realistic **dummy/static data**, and the data layer is architected so the dummy source can be swapped for a real FastAPI backend **without touching any UI component**.

> **Phase scope:** Frontend only. There is intentionally **no** FastAPI, Supabase, database, real authentication, payments, or real integrations. Auth and the contact form are frontend-only stubs. All backend concerns plug in later behind the existing data-adapter seam.

**Brand direction:** black / white / **blue**. Blue (`blue-600`) is the primary action color; black/white/slate provide the structure. Marketing is a forced-light premium surface; the dashboard additionally supports a light/dark toggle.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS** (design tokens + light/dark themes)
- **lucide-react** icons
- Hand-rolled, dependency-free **SVG charts** (no heavy charting lib)

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000  (public marketing home at "/")

npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint (optional)
```

Key routes to try: `/` (marketing home), `/product`, `/pricing`, `/blog`, `/solutions/**/*` (public calculator), `/login`, `/signup`, and `/dashboard` (the product). The Product mega-menu → **Hub** links straight into `/dashboard`.

No environment variables are required to run on dummy data. Copy `.env.example` to `.env.local` to customize the data source.

---

## Route architecture (two experiences, two layouts)

Routes are split with Next.js **route groups** so the marketing and application navigation systems never mix:

```
src/app/
├── layout.tsx                 # Root layout: <Providers> only (theme + toasts), global SEO metadata
│
├── (marketing)/               # PUBLIC WEBSITE — MarketingLayout (header mega-menus + footer)
│   ├── layout.tsx
│   ├── page.tsx               # Home (hero → channels → problem → solution → capabilities →
│   │                          #   omnichannel flow → dashboard preview → benefits → use cases →
│   │                          #   how it works → pricing CTA → FAQ → final CTA)
│   ├── product/               # Public product overview
│   ├── pricing/               # Free-during-early-access pricing (UI only, no billing)
│   ├── about/  contact/       # Company + frontend-only contact form
│   ├── blog/  blog/[slug]/    # Blog listing (search/filter/pagination) + article pages
│   ├── solutions/  solutions/[slug]/   # Marketing solution pages (placeholders)
│   └── legal/[slug]/          # Privacy / Terms placeholders
│
├── (auth)/                    # Standalone auth screens (frontend-only)
│   ├── layout.tsx             # Split-screen brand + form
│   ├── login/  signup/        # Submit → routes to /dashboard (no real auth)
│
└── (app)/                     # AUTHENTICATED APP — DashboardLayout (AppShell: sidebar + header)
    └── dashboard/
        ├── page.tsx
        ├── products/  products/[id]/
        ├── orders/    orders/[id]/
        ├── customers/ customers/[id]/
        ├── inventory/
        ├── integrations/  channels/
        ├── analytics/overview/  analytics/reports/
        ├── automation/
        └── settings/
```

Every application route is namespaced under `/dashboard`, so new commerce modules are added without redesigning the shell.

---

## The API-ready architecture (the important part)

The UI **never** imports dummy data and **never** knows where data comes from. Data flows through one seam:

```
Component  ->  feature api.ts  ->  DataAdapter  ->  (DummyAdapter today | ApiAdapter later)
```

- A feature function such as **`getProducts()`** is all a component ever calls.
- Today it resolves to in-memory dummy data (`DummyAdapter`).
- Tomorrow it resolves to `GET /api/v1/products` on FastAPI (`ApiAdapter`) — **the component is unchanged.**

Switching is a single environment variable:

```bash
NEXT_PUBLIC_DATA_SOURCE=dummy   # this phase
NEXT_PUBLIC_DATA_SOURCE=api     # once FastAPI exists
NEXT_PUBLIC_API_BASE_URL=https://your-fastapi.example/api/v1
```

`src/data/adapters/index.ts` reads that flag and returns the right adapter. Both adapters implement the **same `DataAdapter` interface** (`src/data/adapters/types.ts`), so the compiler keeps them in lockstep. The future `ApiAdapter` (`src/data/adapters/api.ts`) is already written — each method maps 1:1 to a REST endpoint.

### Where future FastAPI APIs replace dummy data

| Frontend source (today) | Future backend (FastAPI) |
|---|---|
| `src/data/dummy/*` via `DummyAdapter` | `ApiAdapter` → `GET/POST /api/v1/*` |
| `src/data/marketing/blog.ts` | CMS / `GET /api/v1/blog` |
| `src/data/marketing/pricing.ts` | Plans / billing service |
| `contact-form.tsx` (local success state) | `POST /api/v1/contact` |
| `auth-form.tsx` (routes to `/dashboard`) | Supabase Auth / `POST /api/v1/auth/*` |

Steps: stand up FastAPI with endpoints matching `ApiAdapter`, set `NEXT_PUBLIC_DATA_SOURCE=api` and `NEXT_PUBLIC_API_BASE_URL`, and the app runs on live data with **zero component changes**.

---

## Design system

Reusable, token-driven components live in `src/components/ui` (Button, Input, Select, Dropdown, Card, KPI card, Table, Badge/Status badge, Tabs, Modal, Drawer, Alert, Toast, Pagination, Search input, Switch, Skeleton, Empty/Loading/Error states, Page header, Confirm dialog). Marketing-specific primitives (Container, SectionHeading, LinkButton, mega-menu header, footer, product mock, FAQ accordion, blog index, forms) live in `src/components/marketing`. Everything uses the same design tokens defined in `src/app/globals.css` and `tailwind.config.ts`.

## State handling

Every major dashboard screen supports **loading** (skeletons), **empty** (call-to-action), **error** (retry), and **normal** states via the shared `useAsyncData` hook. The dummy adapter simulates network latency so these states are real and testable.

## Responsive & accessible

Desktop-first, with laptop/tablet/mobile support. The marketing header collapses into an accordion mobile menu; the app sidebar collapses into an overlay drawer; tables scroll horizontally and grids reflow. Components use semantic markup, focus-visible rings, `aria` labels, and keyboard-dismissible overlays.

## SEO

Marketing pages set per-page `title`/`description` and Open Graph metadata, with a global template and `metadataBase` in the root layout. Blog and solution pages generate static params for SEO-friendly URLs.


## Public Profit Margin Calculator

- Route: `/solutions/profit-margin-calculator` (inside the public marketing route group).
- Feature component: `src/features/solutions/profit-margin-calculator/components/profit-margin-calculator.tsx`.
- Route metadata/page: `src/app/(marketing)/solutions/profit-margin-calculator/page.tsx`.
- Uses existing shared UI components (`Button`, `Input`, `Card`) and existing Tailwind design tokens.
- Client-side only; no backend endpoint, database migration, or additional dependency is required. Currency selection formats values but does not exchange currencies.
# to trigger build