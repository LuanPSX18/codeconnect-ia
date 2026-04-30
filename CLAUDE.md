# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo structure

pnpm workspaces with two apps under `apps/`:

- `apps/web` — React 19 + Vite 8 + TypeScript 6 (frontend)
- `apps/api` — NestJS 11 + TypeScript 5, strict mode (backend, port 3000)

Dependencies are hoisted to the root `node_modules` by pnpm. Each app has its own `package.json` with `name: "web"` and `name: "api"` — these names are what `--filter` targets.

## Commands

All commands run from the **repo root**:

```bash
# Development
pnpm web:dev        # Vite dev server
pnpm api:dev        # NestJS watch mode
pnpm dev            # both in parallel

# Build
pnpm web:build      # tsc + vite build
pnpm api:build      # nest build → dist/

# Production
pnpm web:preview    # preview vite build
pnpm api:start      # node dist/main

# Lint
pnpm web:lint       # eslint on web
pnpm api:lint       # eslint + prettier on api

# Tests (api only)
pnpm api:test                              # all unit tests (jest)
pnpm --filter api test -- --testPathPattern=app.controller  # single test file
pnpm --filter api test:e2e                 # e2e tests (test/jest-e2e.json)
pnpm --filter api test:cov                 # coverage report
```

To run any other script not exposed at the root:

```bash
pnpm --filter web <script>
pnpm --filter api <script>
```

## API architecture (NestJS)

NestJS uses a module/controller/service pattern enforced by decorators:

- **Module** (`*.module.ts`) — wires controllers and providers together via `@Module()`
- **Controller** (`*.controller.ts`) — declares HTTP routes via `@Get()`, `@Post()`, etc.
- **Service** (`*.provider.ts` / `*.service.ts`) — business logic, injected via constructor DI

`emitDecoratorMetadata` and `experimentalDecorators` are enabled — required for NestJS DI to work. The compiler target is ES2023 with `nodenext` module resolution.

New features should be organized as NestJS modules (one directory per domain) and registered in `AppModule.imports`.

## Web architecture (React + Vite)

Standard Vite + React SPA. Entry point is `apps/web/src/main.tsx`. No router or state management is installed yet — add them as needed.

TypeScript is configured with project references (`tsconfig.app.json` / `tsconfig.node.json`) — `tsc -b` is required for build (not just `tsc`).
