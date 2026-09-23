# CommitPT Landing Page

## Project Overview

This is the website for **CommitPT** — a Portuguese **software engineering** community. The homepage
is a single-column **VSL funnel** (video at the top) with two conversion targets:

1. **Discord** — free community, low-friction entry point
2. **Commit+** — paid membership, sold through **Whop**

They are presented as one path, not competing choices: **"Começa grátis. Sobe para o Commit+ quando
quiseres."** Every section must move visitors toward one of these two actions. If it doesn't, don't
add it.

The full redesign plan (structure, CTA strategy, phases, rationale) lives in
`docs/PLANO-REDESIGN.md`. Read it before building a new section.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode, no `allowJs`)
- **Styling**: Tailwind CSS **v4** (CSS-first config in `app/globals.css`, no `tailwind.config.js`)
- **UI kit**: `@commitpt/design-system` (Button/`buttonVariants`, Typography, Badge, FAQ, ReviewCard…)
- **Font**: Geist Sans + Geist Mono (via `geist` package)
- **Icons**: `lucide-react`
- **Package manager**: Yarn
- **Linting**: ESLint via `next lint` + `@typescript-eslint/recommended` + `prettier`
- **Formatting**: Prettier

---

## Development Workflow

```bash
yarn dev            # start dev server
yarn typecheck      # tsc --noEmit (type check without build)
yarn lint           # next lint (ESLint)
yarn format         # prettier --write . (auto-fix formatting)
yarn format:check   # prettier --check . (CI-safe check)
yarn build          # production build (also runs type check + lint)
yarn audit:ui       # local UI audit against a running server (see below)
```

`yarn audit:ui` drives a headless Chromium over `http://localhost:3000` (pass another URL as an
argument) and checks console errors, horizontal overflow at 320/768/1024/1440, axe-core (WCAG 2.1
AA), tab order, the mobile menu, that no animated element stays invisible, and that the 3D scene
loads only where it should and stops off-screen. Local only — it is not part of CI.

All four checks — `typecheck`, `lint`, `format:check`, and `build` — run in CI on every push and PR
via `.github/workflows/ci.yml`.

---

## Code Standards

### TypeScript

- All source files use `.tsx` (components) or `.ts` (pure logic). No `.js`/`.jsx` allowed.
- Strict mode is enabled (`"strict": true` in `tsconfig.json`).
- No `any` — `@typescript-eslint/no-explicit-any: warn`. If you must widen a type, use `unknown` and
  narrow it.
- Define explicit interfaces for component props and data shapes.
- Icon components from `lucide-react` are typed as `LucideIcon`.
- Custom type declarations live in `src/types/declarations.d.ts`.
- Conditional class names: use `cx()` from `src/lib/cx.ts`.

### Prettier (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "jsxSingleQuote": false
}
```

Run `yarn format` before committing. CI will reject unformatted code.

### ESLint (`.eslintrc.json`)

Extends `next/core-web-vitals` + `@typescript-eslint/recommended` + `prettier`. Key rules:

- `@typescript-eslint/no-unused-vars: error` (prefix unused params with `_` to suppress)
- `@typescript-eslint/no-explicit-any: warn`

---

## Git Hooks (Husky)

### `pre-commit` — lint-staged

| Files                                        | Actions                             |
| -------------------------------------------- | ----------------------------------- |
| `*.ts`, `*.tsx`                              | `eslint --fix` → `prettier --write` |
| `*.json`, `*.css`, `*.md`, `*.yml`, `*.yaml` | `prettier --write`                  |

### `commit-msg` — commitlint

Enforces [Conventional Commits](https://www.conventionalcommits.org/):
`<type>(<optional scope>): <description>`

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`,
`revert`

---

## CI / GitHub Actions

`.github/workflows/ci.yml` runs on push and PR to `master`/`main`: install (frozen lockfile) →
typecheck → lint → format:check → build. All steps must pass before merging.

---

## Design System

### Tokens

All tokens are defined in `app/globals.css` inside `@theme` (inlined from `@commitpt/design-system`).
Surfaces (`background`, `surface`, `elevated`, `muted`, `card`, `border`) are overridden to **neutral
greys** instead of the DS navy, because navy clashed with the amber/green background palettes.
Use the Tailwind utilities they generate — `bg-background`, `bg-surface`, `bg-elevated`,
`text-foreground`, `text-muted-foreground`, `border-border`, `text-primary` (blue),
`text-secondary` (purple), `text-success`, `text-warning`, `text-destructive`.

Do not use colors outside these tokens without adding them to `@theme` first.

### Layout: the frame

The site sits inside a **frame** (`max-w-wide`, vertical borders from `lg`); the random gradient
only shows **outside** it. Sections are separated by full-bleed horizontal lines with a `+` where
they cross the frame borders. There are no inner rails.

| Width     | Token                 | Utility         | Used for                                          |
| --------- | --------------------- | --------------- | ------------------------------------------------- |
| `content` | `--container-content` | `max-w-content` | Text-heavy sections (benefits, pricing, FAQ)      |
| `wide`    | `--container-wide`    | `max-w-wide`    | Frame, hero, grids, comparison table, testimonials |

Layout primitives in `src/components/layout/`:

- `Frame` — outer frame (mounted once in `app/layout.tsx`)
- `SiteBackground` — fixed gradient + grain behind the frame, plus `BACKGROUND_SCRIPT`
- `Section` — `<Section width="content" | "wide" id=… bleed?>`; draws the `+` marks and the
  full-bleed bottom line. `bleed` removes padding (hero, final CTA).
- `SectionHeading` — centered pill + title (+ subtitle) for each section
- `SectionLabel` — mono pill above each section heading
- `FrameRule`, `CrossMark` — used by the above

Always build new homepage sections on top of `Section`. Don't hand-roll borders or max-widths.

### Random background palettes

`BACKGROUND_SCRIPT` runs in `<head>` before first paint and sets `<html data-bg="0-3">` (never the
same palette twice in a row per session). Palettes live in `globals.css` as `html[data-bg='N']` and
expose `--bg-from`, `--bg-to`, `--bg-accent`. Use `bg-(--bg-accent)` / `text-(--bg-accent)` for
small accents that should follow the current palette. The primary CTA (`CtaLink variant="accent"`)
also follows it. `.gradient-panel` puts the same animated gradient + grain inside the frame (hero
video panel, founder photo, final CTA); its children need `relative z-10`. When adding a palette, update
`PALETTE_COUNT` in `SiteBackground.tsx`.

Never pick the palette in a React component (`Math.random()` would be frozen at build time and cause
hydration mismatches).

### Typography & visual language

- Headings: Geist Sans, bold, tight tracking. Body: `text-muted-foreground`.
- Geist Mono only for metadata: labels, numbers, stacks, badges.
- Dev-native details are welcome (git `+`/`-` diff notation in pricing, mono pills), but sparingly.
- **Avoid the generic look**: no gradient text, no emoji, no identical icon-card grids with glows,
  no stock photos, no clichés ("desbloqueia o teu potencial"). Prefer cells divided by lines over
  floating cards. One accent color at a time.

---

## Page Structure (homepage)

1. **AnnouncementBar + Header** — next event bar (scrolls away); sticky header with logo, in-page
   anchor nav (scroll-spy active pill), "Entrar grátis" (Discord) + "Juntar-me" (→ `/#precos`)
2. **Hero** — split: text + CTAs + stats left, gradient panel with VSL (YouTube, click-to-load) +
   social proof right; stacks on mobile
3. **Para quem é** — 4 profiles
4. **O que ganhas** — 4 benefits, each tagged `Grátis` or `Commit+`
5. **Quem está por trás** — founder + contributors
6. **Compara as alternativas** — `wide` comparison table (stacked cards on mobile)
7. **Testemunhos**
8. **Gratuito vs Commit+** — `id="precos"`
9. **FAQ**
10. **Final CTA** + Footer

Build status per phase: see `docs/PLANO-REDESIGN.md`.

---

## CTA Strategy

| Place          | CTA                                                                  |
| -------------- | -------------------------------------------------------------------- |
| Header         | "Entrar grátis" (ghost, Discord) + "Juntar-me" → `/#precos`          |
| Under the VSL  | **"Entrar grátis no Discord"** (primary) + "Ver o Commit+" (outline) |
| Benefits       | `Grátis` / `Commit+` tags per benefit                                |
| After table    | Commit+ nudge strip                                                  |
| Pricing        | Free + **Commit+ highlighted**, annual plan by default               |
| Final CTA      | Both                                                                 |
| Mobile         | Sticky bottom bar with both, after the hero                          |

### Links & tracking

- All conversion URLs live in `src/lib/links.ts` — never hard-code them.
- Use `CtaLink` (`src/components/ui/CtaLink.tsx`) for every CTA link, and `ctaClassName()` +
  `CtaContent` (`src/components/ui/ctaStyles.tsx`) for `<button>`s. CtaLink handles `target`/`rel`,
  tracking and the button styles. Don't use the DS `Button`/`buttonVariants` for CTAs.
  - `accent` — **keycap**: palette color with a darker bottom edge (`btn-key` utility in
    `globals.css`); lifts on hover, presses down on click. One per block — the main action.
  - `outline` — plain rounded outline; the border turns palette-colored on hover. Secondary action.
    (No `+` corner marks on buttons — those belong to the frame only.)
  - `ghost` — text link with an underline that grows on hover (e.g. "Entrar grátis" in the header).
  - CTAs are `inline-flex` in the base class, so a plain `hidden` does **not** hide them (same
    specificity, `inline-flex` wins). Hide with a variant instead: `max-sm:hidden`, not
    `hidden sm:inline-flex`.
- `target="_blank" rel="noreferrer"` on all external links.
- Every CTA calls `trackEvent()` (`src/lib/analytics.ts`) with a `location` param:
  `community_join_click` (Discord), `commit_plus_checkout` (Whop), `pricing_anchor_click`,
  `vsl_play`.
- Never remove either conversion path.

---

## Content Guidelines

- **Language**: all copy in **Portuguese (pt-PT)**.
- **Tone**: direct, builder-to-builder. No hype.
- **Copy lives in `src/content/home.ts`**, not inside JSX. Placeholders are marked `// TODO(copy)`.
- **Honesty**: real numbers, names, photos and testimonials only. Inspiration sites provide
  structure, never content — don't copy their text or claims.
- Current facts: 550+ members, 90 000+ messages, 4+ sessions/month, 14+ contributors.
  Commit+: €19.99/month or €119.88/year.

---

## Animations

Three layers, all optional extras — the page must be complete and usable without any of them.

### 1. CSS/Tailwind

`transition-*`, `animate-ping`, and the `bg-drift` keyframes on the background gradients. Disabled
under `prefers-reduced-motion`.

### 2. anime.js — `HomeMotion`

`MOTION_SCRIPT` (`src/lib/motion.ts`, runs in `<head>`) sets `<html data-motion>` when
`prefers-reduced-motion` is **not** set. Only then does the CSS hide the elements that animate, so
there is never a flash, and without JS everything is visible.

`HomeMotion` (`src/components/motion/HomeMotion.tsx`, mounted once in `app/page.tsx`) is the **only
client component** involved. Sections stay Server Components and declare what animates with
attributes:

| Attribute | Effect |
| --- | --- |
| `data-reveal-group` | its `[data-reveal]` children rise and fade in, staggered |
| `data-reveal` | rises and fades in when it enters the viewport (alone or inside a group) |
| `data-count-group` | its `[data-count]` children count up to the number already in the HTML |
| `data-diff-group` | its `[data-diff-line]` children enter one by one with a green flash, like an applied diff |
| `data-hero-title` | moves only — never starts invisible, because it is the LCP element |

**To add an animation**, put one of these attributes on the markup. Only add a new effect to
`runEffect` when none of the above fits, and add its hidden state to the `[data-motion] …` rules in
`globals.css`.

Rules that keep it safe: a CSS fallback reveals everything after 2.5s; `HomeMotion` checks whether
that fallback already ran (never a clock — in `yarn dev` the compile alone beats any deadline) and
turns motion off if so; anchor jumps reveal skipped sections instantly; anime.js is loaded with
`import()` so it stays out of the first load.

### 3. three.js — the commit graph

`HeroScene` (`src/components/three/`) mounts `CommitGraph` in the hero panel: a git history built in
`commitGraphData.ts` (main, branches, merges), drawn as points and lines in the visit's palette
(`cssVarToRgb` converts `oklch`, which `THREE.Color` cannot parse).

It only loads when the device can afford it — motion allowed, ≥ 768px, WebGL, no `saveData`, more
than 4 cores — and only once the panel is visible and the browser is idle. Everywhere else the CSS
gradient stays. It pauses off-screen and on a hidden tab, caps DPR at 1.5, and disposes everything
on unmount. Use `performance.now()`, not `THREE.Clock` (deprecated in three 0.186).

Budget: First Load JS for `/` must stay within **132 kB ± 3 kB**; both libraries live in lazy chunks.
No other animation libraries.

---

## File Paths

```
app/
  globals.css            # Tailwind v4 @theme tokens, background palettes, base styles
  layout.tsx             # root layout, metadata, fonts, Frame + SiteBackground
  page.tsx               # homepage composition
  privacy/ terms/        # legal pages
  u/[username]/          # public member profiles

src/
  components/
    layout/              # Frame, Section, SectionHeading, SectionLabel, SiteBackground, FrameRule, CrossMark
    sections/            # Hero, ForWho, Benefits, Founder, Comparison, Testimonials, Pricing, Faq, FinalCta
    ui/                  # CtaLink, VideoPlayer ('use client')
    AnnouncementBar.tsx  # next-event bar above the header
    Header.tsx           # sticky nav + CTAs ('use client': scroll spy, mobile menu)
    Footer.tsx           # brand + legal links
    CookieConsent.tsx
  content/
    home.ts              # all homepage copy, typed
    motion/HomeMotion.tsx  # the only client component behind the anime.js animations
    three/               # HeroScene + CommitGraph (the 3D commit graph)
  lib/
    links.ts             # Discord / Whop URLs
    analytics.ts         # trackEvent + event names
    cx.ts                # class name helper
    motion.ts            # MOTION_SCRIPT + motionEnabled()
    cssColor.ts          # oklch -> RGB for three.js
  types/declarations.d.ts

scripts/
  ui-audit.mjs           # local UI audit (yarn audit:ui)

tasks/
  plan.md, todo.md       # current work plan and task list

docs/
  PLANO-REDESIGN.md      # redesign plan (shared with leadership)
  ONBOARDING.md
```

---

## Things to Avoid

- Sections that don't lead to Discord or Commit+
- Light backgrounds — dark only
- Colors outside the tokens in `globals.css`
- `.js`/`.jsx` files, `any`
- Animation libraries other than anime.js / three.js (and those only per the rules above)
- New dependencies without a strong reason
- Skipping CI checks
