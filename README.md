# URL Shortener Web

React dashboard for the [URL Shortener API](../Url-Shortner). Register organizations, manage short links, and track click analytics — with multi-tenant isolation via API keys.

---

## Overview

This is the **frontend** companion to the backend API. Each organization (tenant) signs up, receives an API key, and uses the dashboard to shorten URLs, view links, and monitor clicks.

```
┌─────────────────────┐         ┌─────────────────────┐
│  Url-Shortner-Web   │  Axios  │    Url-Shortner     │
│  (React Dashboard)  │ ──────► │  (Express REST API) │
│  localhost:5173     │         │  localhost:3000     │
└─────────────────────┘         └─────────────────────┘
```

---

## Features

| Feature | Status |
|---------|--------|
| Organization registration | Done |
| API key login & session persistence | Done |
| User profile page | Done |
| Create short links | Done |
| List links with click counts | Done |
| Copy short URL | Done |
| Delete links | Done |
| Dashboard stats (total links & clicks) | Done |
| Shared header with branding | Done |
| Protected routes | Done |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 + DaisyUI |
| State | Redux Toolkit |
| HTTP client | Axios |
| Routing | React Router 7 |

---

## Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:3000` ([setup guide](../Url-Shortner/README.md))

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 3. Start the dev server

```bash
npm run dev
```

Open **http://localhost:5173**

### 4. Run with backend (two terminals)

**Terminal 1 — Backend:**
```bash
cd ../Url-Shortner
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd ../Url-Shortner-Web
npm run dev
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/register` | Public | Create organization account |
| `/login` | Public | Sign in with API key |
| `/dashboard` | Protected | Stats, create link, links table |
| `/profile` | Protected | Organization profile details |

---

## API Integration

All requests go through `src/api/axios.ts`. The API key is sent automatically as `X-API-Key` on protected routes.

| Frontend action | Backend endpoint |
|-----------------|------------------|
| Register | `POST /api/v1/tenants` |
| Login / profile | `GET /api/v1/tenants/me` |
| Create link | `POST /api/v1/links` |
| List links | `GET /api/v1/links` |
| Delete link | `DELETE /api/v1/links/:shortCode` |
| Open short URL | `GET /:shortCode` (backend redirect) |

---

## Project Structure

```
src/
├── api/
│   ├── axios.ts          # Axios client + API key interceptor
│   ├── tenants.ts        # Register & profile APIs
│   └── links.ts          # Link CRUD APIs
├── components/
│   ├── Header.tsx        # Shared navbar (logo, profile, logout)
│   ├── AuthLayout.tsx    # Split layout for sign-in / sign-up
│   ├── AppLayout.tsx     # Layout for dashboard pages
│   ├── ProtectedRoute.tsx
│   ├── StatsCards.tsx
│   ├── CreateLinkForm.tsx
│   └── LinksTable.tsx
├── pages/
│   ├── RegisterPage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── ProfilePage.tsx
├── store/
│   ├── slices/
│   │   ├── authSlice.ts  # API key, tenant, login/logout
│   │   └── linksSlice.ts # Links list, create, delete
│   ├── index.ts
│   └── hooks.ts
├── types/
│   └── api.ts            # TypeScript types for API responses
├── App.tsx               # Route definitions
└── main.tsx              # App entry + Redux Provider
```

---

## User Flow

```
Sign Up → Save API Key → Dashboard
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        Create Link    View Links     Profile
              │             │
              ▼             ▼
         Copy URL     Track Clicks
              │
              ▼
         Delete Link
```


## Theme

- **Light:** DaisyUI `corporate` (default)
- **Dark:** DaisyUI `dark`
- Toggle in the header (persisted in `localStorage`)

---


## Related Project

| Project | Description | Port |
|---------|-------------|------|
| [Url-Shortner](../Url-Shortner) | Backend REST API | 3000 |
| **Url-Shortner-Web** | Frontend dashboard (this repo) | 5173 |

---
