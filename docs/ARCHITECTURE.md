# Architecture

The app is split into a Next.js frontend, an Express API, and shared TypeScript contracts.

## Frontend

The frontend uses server-rendered App Router routes, dynamic metadata, sitemap generation, animated client components, Zustand UI state, TanStack Query mutations, Lenis smooth scrolling, GSAP first-load animation, and React Three Fiber for a subtle fintech-style 3D hero object.

## Backend

The API follows a scalable Express structure:

- `config`: validated environment access
- `controllers`: request handling
- `services`: business logic and integrations
- `routes`: REST route composition
- `middleware`: logging, auth, rate limiting, validation, errors
- `prisma`: database schema

## Future Admin Dashboard

Admin architecture is prepared around JWT auth and future resources:

- projects
- blog posts
- contact messages
- analytics events
