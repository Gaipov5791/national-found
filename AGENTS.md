<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Cursor Cloud specific instructions

This is a frontend-only TanStack Start + React 19 (SSR) site — a static content
site for a Kyrgyz investment fund. There is no backend, database, or required
environment variables to run it locally.

- Package manager is **bun** (`bun.lock` + `bunfig.toml`); prefer it over npm.
  `bun` is installed on the default PATH (symlinked at `/usr/local/bin/bun`).
  The startup update script runs `bun install`.
- Scripts live in `package.json`. Common commands:
  - Dev server: `bun run dev` → Vite on **port 8080** (Lovable config pins the
    host/port with `strictPort`, so the port does not auto-increment).
  - Lint: `bun run lint`. NOTE: the committed source currently produces many
    `prettier/prettier` formatting errors under `eslint` — this is the repo's
    existing state, not caused by your changes. Type-checking is clean via
    `bunx tsc --noEmit`.
  - Build: `bun run build` (SSR build via nitro, output in `.output/`).
- Do NOT manually add the `tanstackStart`, `viteReact`, `tailwindcss`,
  `tsConfigPaths`, or `nitro` Vite plugins — `@lovable.dev/vite-tanstack-config`
  already includes them (see the comment in `vite.config.ts`).
- The financing form (`/finance`) submits to the external `formsubmit.co`
  service and requires network egress plus a one-time mailbox confirmation, so
  it is not reliable for local end-to-end testing. Prefer testing navigation and
  the RU/KG/EN/CN language switcher instead.
