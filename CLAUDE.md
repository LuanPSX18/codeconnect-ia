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

### REST conventions

Every endpoint must follow these rules without exception:

- **Nouns in URLs, never verbs** — `/users`, `/users/:id/posts`, not `/getUsers` or `/createPost`
- **HTTP verbs carry the action** — `GET` (read), `POST` (create), `PUT` (full replace), `PATCH` (partial update), `DELETE` (remove)
- **Status codes must be precise** — `200 OK`, `201 Created` (POST), `204 No Content` (DELETE), `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity` (validation), `500 Internal Server Error`
- **Collection vs. resource** — `GET /users` returns an array; `GET /users/:id` returns a single object
- **Plural resource names** — `/users`, `/posts`, `/comments`
- **Nested routes only for ownership** — `/users/:id/posts` is valid; avoid nesting beyond two levels
- **`POST` must return the created resource** with `201` and the entity in the body
- **Pagination via query params** — `?page=1&limit=20`, never in the URL path
- **Filtering and sorting via query params** — `?status=active&sort=createdAt:desc`
- **Never expose internal IDs or implementation details** in error messages

Use NestJS built-ins to enforce this: `@HttpCode()`, `@HttpException`, `ValidationPipe` with `class-validator`, and DTOs for all request/response shapes.

## Web architecture (React + Vite)

Standard Vite + React SPA. Entry point is `apps/web/src/main.tsx`. No router or state management is installed yet — add them as needed.

TypeScript is configured with project references (`tsconfig.app.json` / `tsconfig.node.json`) — `tsc -b` is required for build (not just `tsc`).

### Atomic Design

Components live in `apps/web/src/components/` organized by atomic layer:

```
components/
  atoms/        # smallest units: Button, Input, Label, Icon, Badge
  molecules/    # atoms composed together: FormField, SearchBar, Card
  organisms/    # complex UI sections: Header, Sidebar, CommentList
  templates/    # page layouts (slot-based, no data fetching)
```

Pages live in `apps/web/src/pages/` and are the only layer that fetches data and composes templates.

Rules:
- An atom must not import from molecules, organisms, or templates
- A molecule may import atoms only
- An organism may import atoms and molecules
- A template may import atoms, molecules, and organisms — but no pages
- Pages import templates and wire in real data

### Tailwind

All styling is done with Tailwind utility classes. No separate CSS files per component. Global styles and Tailwind directives go in `apps/web/src/index.css`.

### Component tests

Every component must have a co-located test file (`ComponentName.test.tsx`) covering its essential usage. Tests use the component's public interface (props), not implementation internals.

```
components/atoms/Button/
  Button.tsx
  Button.test.tsx
```

Run web tests:

```bash
pnpm --filter web test                        # all tests
pnpm --filter web test Button                 # single component
```

## Git — Conventional Commits

All commits in this repo must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
<type>(<scope>): <short description>

[optional body]
```

| Type | When to use |
|---|---|
| `feat` | new feature |
| `fix` | bug fix |
| `refactor` | code change that is neither fix nor feature |
| `test` | adding or updating tests |
| `chore` | build, deps, tooling, config |
| `docs` | documentation only |
| `style` | formatting, no logic change |
| `perf` | performance improvement |

Scopes: `web`, `api`, `repo` (monorepo-level changes).

Examples:
```
feat(web): add Button atom with variant prop
fix(api): return 404 when user is not found
chore(repo): add eslint rule for import order
test(api): cover UsersService.findOne with missing id case
```

Breaking changes: append `!` after the type/scope and add a `BREAKING CHANGE:` footer.
