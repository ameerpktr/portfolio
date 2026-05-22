# Ameer M Portfolio Suite

A premium full-stack personal portfolio web application for Ameer M, a fintech operations professional specializing in fraud monitoring and risk management.

## Stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, Zustand, TanStack Query, Lenis, shadcn-style UI primitives
- Backend: Node.js, Express, Prisma, PostgreSQL, JWT-ready auth, validation, rate limiting, logging, centralized errors, contact API
- DevOps: Docker Compose, Vercel-ready frontend, CI-friendly scripts, environment examples

## Quick Start

```bash
npm install
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
npm run db:generate
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:4000

If you only want to preview the website, run:

```bash
npm --prefix frontend run dev
```

## Production Notes

- Configure `DATABASE_URL`, `JWT_SECRET`, and SMTP credentials in `backend/.env`.
- The contact endpoint stores messages in PostgreSQL and can send email when SMTP settings are available.
- The admin routes are scaffolded for future dashboards covering projects, blog, messages, and analytics.

## Structure

```text
frontend/  Next.js application
backend/   Express API, Prisma schema, middleware
shared/    Shared TypeScript contracts
docs/      Architecture and deployment notes
```
