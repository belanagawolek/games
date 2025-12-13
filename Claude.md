You are not allowed to execute any commands. 
And not push or pull anything without permission.

Use best practices in typescript. 

Project Goals
Use Next.js App Router conventions (Server Components by default, route segments, layouts, loading/error boundaries).
Keep a clear separation of concerns between UI, data access, and domain logic.
Maintain type safety end-to-end with TypeScript.
Favor performance, accessibility, and maintainability over cleverness.

Core Principles (Rules of the Repo)
1) App Router Mental Model
   Server Components are the default. Only add "use client" when the component truly requires client-only features (state, effects, browser APIs, event handlers).
   Prefer data fetching on the server (in Server Components / Route Handlers) when possible.
   Use Layouts for shared UI and data that should persist between navigations.
   Use loading.tsx / error.tsx at the segment level for user-friendly async and failure states.
2) TypeScript Standards
   Treat TypeScript errors as build-blocking.
   Avoid any. If you must, document why and constrain it (e.g., unknown + validation).
   Prefer explicit types at module boundaries:
   public functions, exported hooks, route handler responses, component props.
   Use narrow types and discriminated unions for domain states instead of boolean flags.
3) Data Validation & Trust Boundaries
   Validate all untrusted input:
   Route params, query strings, request bodies, external service responses.
   Parse/validate at the edge of the system (Route Handlers / server actions) and pass typed objects inward.
4) Server vs Client Responsibilities
   Server:
   authentication/authorization decisions
   secrets and privileged API calls
   database access / server-side caching
   Client:
   interactive UI state
   optimistic updates (when appropriate)
   purely presentational concerns
   Never expose secrets to the client. Keep sensitive operations on the server.
5) Routing & Structure Conventions
   Keep route segments small and cohesive.
   Co-locate route-specific UI inside the relevant app/ segment.
   Use shared UI/components via a dedicated directory (commonly components/), and shared utilities via lib/ or utils/.
   Prefer feature-based grouping over “type-based” sprawl when the app grows.
6) Styling & UI Consistency
   Prefer reusable primitives (buttons, inputs, dialogs) rather than one-off UI.
   Keep accessibility in mind:
   semantic HTML first
   keyboard navigation
   proper labels/aria attributes when needed
   Avoid layout shift and unnecessary reflows; be mindful of client JS weight.
7) Performance Expectations
   Minimize client-side JavaScript:
   avoid "use client" by default
   split interactive areas into smaller Client Components
   Use caching intentionally:
   understand fetch caching behavior in Next.js
   revalidate where appropriate
   Avoid expensive computations on the client; do them server-side when possible.
8) Error Handling & Observability
   Fail gracefully:
   segment-level error.tsx for UI recovery
   meaningful error messages (no leaking sensitive details)
   Log server-side errors with enough context to debug.
   Avoid swallowing errors in the client—surface actionable states to users.
9) Security Basics
   Validate and sanitize inputs.
   Enforce authorization checks server-side.
   Avoid sending internal error details to clients.
   Keep dependencies updated and avoid introducing unreviewed packages.
   App Router Tips (Quick Reminders)
   Use layout.tsx to define persistent shell UI.
   Use page.tsx for route entry.
   Use loading.tsx for suspenseful loading UX.
   Use error.tsx for segment-level error boundaries.
   Use Route Handlers (route.ts) for API endpoints and server-side integrations.