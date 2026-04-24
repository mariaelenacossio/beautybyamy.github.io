# Beauty by Amy — v2.0

A premium, production-ready booking platform for an independent nail technician. Built as a portfolio project demonstrating modern full-stack frontend architecture, motion design, and UX engineering.

---

## Overview

This project was completely rebuilt from a basic 4-page vanilla HTML/CSS college project into a modern React application with a full booking system, admin dashboard, dark mode, and a comprehensive animation system.

---

## Features

### Public Site
| Feature | Details |
|---|---|
| **Hero section** | Full-viewport video background with animated copy and CTAs |
| **Services page** | Service cards with live pricing, gallery grid, and Instagram integration |
| **About page** | Split layout with floating profile photo, credentials, and values |
| **Contact page** | Real-time form with map embed and contact preference toggles |
| **Newsletter** | Inline email capture in the footer |

### Booking System (5-step wizard)
1. **Service selection** — categorized list with pricing and duration
2. **Date picker** — interactive calendar with blocked-day awareness
3. **Time slot picker** — availability-aware 9-slot grid
4. **Client details** — validated form (name, email, phone, notes)
5. **Confirmation** — animated success state with appointment summary

Bookings persist to `localStorage` and appear immediately in the admin dashboard.

### Admin Dashboard
Protected by session-based password (demo: **`amy2024`**). Navigate to `/admin`.

| Tab | Functionality |
|---|---|
| **Overview** | Live stats: today's count, pending, revenue, confirmation rate |
| **Appointments** | Full CRUD — filter by status, update status inline, toggle paid/unpaid, delete |
| **Clients** | Auto-built from bookings — visit history, total spent, last service |
| **Availability** | Calendar to block/unblock dates; blocked dates hidden from public booking |

### Design & Motion
- **Dark / light mode** — system-preference detection, animated toggle, persisted
- **Fully responsive** — mobile-first, all breakpoints covered
- **Accessible** — semantic HTML, ARIA labels, visible focus rings, WCAG AA contrast

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Animation | Framer Motion 11 |
| Routing | React Router 6 |
| State | React Context + `localStorage` |
| Date handling | date-fns 3 |
| Icons | Lucide React |
| Fonts | Cormorant Garamond (display) + Inter (body) |

---

## Design System

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `brand-200` | `#FFB3C1` | Soft accents, borders |
| `brand-300` | `#FF8FA3` | Hover states |
| `brand-500` | `#E63262` | Primary interactive |
| `brand-600` | `#C9184A` | Buttons, CTAs |
| `brand-700` | `#A4133C` | Hover on primary |

### Animation Principles
- Page transitions: slide-up fade, 400ms, easing `[0.22, 1, 0.36, 1]`
- Scroll reveals: `useInView` + staggered `AnimatedSection` wrappers
- Buttons: spring physics — scale + y-lift on hover, compress on tap
- Cards: y-lift + shadow intensify on hover
- Booking steps: directional slide transitions, 250ms
- Success confirmation: SVG path-draw animation + spring-scale checkmark
- All micro-interactions ≤ 300ms; scroll reveals ≤ 600ms

---

## Project Structure

```
src/
├── components/
│   ├── booking/         # 5 step components + BookingModal
│   ├── layout/          # Navbar, Footer, Layout (Outlet wrapper)
│   └── ui/              # Button, Card, Badge, Modal, AnimatedSection, ThemeToggle
├── context/
│   ├── BookingContext.jsx  # Appointments, service catalog, availability
│   └── ThemeContext.jsx    # Dark/light with system-preference detection
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── admin/
│       ├── AdminLogin.jsx
│       └── AdminDashboard.jsx
├── utils/
│   └── dateUtils.js     # Calendar grid builder, date formatters
├── styles/
│   └── globals.css      # Tailwind layers + custom utilities
├── App.jsx              # Route tree
└── main.jsx
public/
└── images/              # Original site assets (videos, photos, logo)
```

---

## Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run
```bash
git clone https://github.com/mariaelenacossio/beautybyamy.github.io
cd beautybyamy.github.io
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## Deployment (GitHub Pages)

The repo name (`beautybyamy.github.io`) is a GitHub Pages root-domain repo, so no `base` path is needed. Deploy the `dist/` folder:

```bash
# Install deploy helper (one-time)
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

Or use GitHub Actions with `actions/deploy-pages` to auto-deploy on push to `main`.

---

## Admin Access

Go to `/admin` — demo password: **`amy2024`**

Auth is `sessionStorage`-based. In production, replace with Supabase Auth, Auth.js, or a backend session.

---

## What Changed (v1 → v2)

| Area | v1 (original) | v2 (this rebuild) |
|---|---|---|
| Tech stack | Vanilla HTML/CSS, zero JS | React 18, Vite, Tailwind, Framer Motion |
| Routing | Multi-page `.html` files | React Router SPA with animated transitions |
| Booking | Static form → school endpoint | 5-step wizard with calendar + confirmation |
| Admin | None | Full dashboard: appointments, clients, availability, revenue |
| Dark mode | None | System detection + animated toggle + persistence |
| Animations | CSS hover box-shadow only | Page transitions, scroll reveals, spring interactions, SVG draw |
| Responsive | Single breakpoint at 400px | Mobile-first, all breakpoints |
| Hamburger menu | Broken (linked to index.html) | Animated drawer with smooth open/close |
| Accessibility | No ARIA, no focus styles | Semantic HTML, ARIA labels, focus rings |
| Design system | Flat CSS, no variables | Tailwind tokens: colors, fonts, spacing, shadows, glow |

---

## Notes

Educational portfolio project. The business (Beauty by Amy) is real; this site was built as an independent design + development exercise and was not approved for commercial use by the business owner.

*Built with React, Tailwind CSS & Framer Motion — 2026*
