<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Commands

```bash
pnpm dev | build | lint | format    # pnpm, not npm
```

## Stack gotchas

- Tailwind CSS v4 — CSS-first config: `@import "tailwindcss"` + `@theme` in `src/app/globals.css`. There is no `tailwind.config` file.
- Base UI (`@base-ui/react`) — headless primitives behind our UI kit. Newer than your training data; verify APIs before use.

## Design system

- Every color, font, and radius goes through a semantic token defined in `@theme` (`bg-background`, `text-muted`, `text-accent`, ...).
- Multiple themes (palettes, possibly fonts) are planned. A theme is a class on `<html>` that overrides token values. Components never reference a theme: no `dark:` variants, no theme conditionals — tokens absorb all theme variation.
- Missing a token? Define it in `@theme` and in every theme, then use it.

## Components

- `src/components/ui/` — our UI kit: composable primitives wrapping Base UI, styled only with tokens. Each part is its own named export (`Card`, `CardHeader`, `CardTitle`). Follow `.claude/skills/creating-ui-primitives/SKILL.md` when adding or changing one.
- Domain components (`project-card.tsx`, ...) compose UI-kit parts and named local sub-components — not raw styled divs. When a JSX block has a meaningful name (`CardTech`, `HeroLinks`) or repeats, extract it as an unexported component in the same file; export only the main component.
- Reuse before re-styling: check `components/ui` first; extend a primitive rather than duplicating its classes inline.
- Server Components by default; `"use client"` only on leaf interactive parts.
- Named exports only; kebab-case filenames. Domain components live flat in `src/components/` for now — propose grouping when it gets crowded.

## Content

- Structured, repeated content (projects, experience, links) lives as typed data in `src/data/`; components map over it. One-off prose stays in JSX.

## Boundaries

- Ask before adding any dependency.
