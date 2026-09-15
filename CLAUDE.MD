# CommitPT Landing Page

## Project Overview

This is the landing page for **CommitPT** — a Portuguese Software Engineering community. The primary goal is to present the community and act as a sales funnel with two conversion targets:

1. **Discord** — free community entry point (primary CTA, appears as the filled/primary button everywhere)
2. **Commit+ (Whop)** — paid upsell layer on top of the free community (secondary CTA, outline button)

Every section and design decision should serve this funnel. If a feature or section doesn't move visitors toward one of these two actions, don't add it.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode, no `allowJs`)
- **Styling**: Tailwind CSS **v4** (CSS-first config — no `tailwind.config.js`; theme tokens live in `app/globals.css` via `@theme`)
- **Design system**: `@commitpt/design-system` — the shared component/token library published from a separate repo. Documented at [storybook.commitpt.com](https://storybook.commitpt.com). This is the source of truth for colors, `Typography`, `Button`, `Badge`, `FAQ`, `FeatureCard`, `Avatar`, etc. Don't hand-roll a component this package already exports.
- **Font**: Geist Sans + Geist Mono (via `geist` package)
- **Icons**: `lucide-react`
- **Package manager**: Yarn 1.x
- **Node**: pinned via `.nvmrc` / `package.json#engines` (currently 24.x)
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
```

All four checks — `typecheck`, `lint`, `format:check`, and `build` — run in CI on every push and PR via `.github/workflows/ci.yml`.

**Never run `yarn build` while `yarn dev` is running.** Both write to the same `.next` directory; a concurrent build corrupts it and the dev server starts serving HTML with no CSS (404 on `/_next/static/css/...`). If that happens: stop whichever process is running, `rm -rf .next`, restart `yarn dev`, then hard-refresh the browser (`Ctrl+Shift+R`) since it will have cached the broken response.

---

## Code Standards

### TypeScript

- All source files use `.tsx` (components) or `.ts` (pure logic). No `.js`/`.jsx` allowed.
- Strict mode is enabled (`"strict": true` in `tsconfig.json`).
- No `any` — use `@typescript-eslint/no-explicit-any: warn`. If you must widen a type, use `unknown` and narrow it.
- Define explicit interfaces for component props and data shapes. Example:

```typescript
interface BenefitProps {
  icon: LucideIcon
  title: string
  desc: string
}
```

- Icon components from `lucide-react` are typed as `LucideIcon`.
- Custom type declarations live in `src/types/declarations.d.ts`.

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

Two hooks run automatically on every commit:

### `pre-commit` — lint-staged

Runs on staged files only (faster than full lint):

| Files                                         | Actions                             |
| ---------------------------------------------- | ------------------------------------ |
| `*.ts`, `*.tsx`                                | `eslint --fix` → `prettier --write`  |
| `*.json`, `*.css`, `*.md`, `*.yml`, `*.yaml`   | `prettier --write`                   |

Fixed files are re-staged automatically. If ESLint finds errors it can't auto-fix, the commit is aborted.

**Windows gotcha:** lint-staged spawns `prettier`/`eslint` through `cmd.exe`, which in turn needs `C:\Windows\System32` on `PATH`. If a commit fails with `Task failed to spawn: prettier --write [ENOENT]`, check `$env:PATH -split ';' | Select-String System32` in PowerShell — if it's missing, System32 was dropped from the user's `PATH` (often by an installer that overwrote instead of appended). Fixing the registry `PATH` isn't enough on its own: **every already-open terminal and IDE window keeps the stale `PATH` in memory** until fully restarted (closing a tab isn't enough — close the whole app).

### `commit-msg` — commitlint

Enforces [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <description>

# Examples
feat: add testimonials section
fix: broken Discord link in footer
chore: update dependencies
docs: update CLAUDE.md with hook setup
style: reformat Hero component
refactor: extract countdown logic to hook
```

**Valid types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

Commits with messages that don't match this format will be rejected immediately.

---

## CI / GitHub Actions

File: `.github/workflows/ci.yml`

Runs on push and PR to `master`/`main`:

1. `yarn install --frozen-lockfile`
2. `yarn typecheck`
3. `yarn lint`
4. `yarn format:check`
5. `yarn build`

All steps must pass before merging.

---

## Design System

### Colors

Tokens are **not** defined locally — they come from `@commitpt/design-system` and are inlined as CSS custom properties (oklch) in `app/globals.css`, under `@theme`. Use the Tailwind utility classes below; don't hardcode hex/oklch values, and don't add new colors to this repo — the palette lives in the design-system package, so a new color means a change over there, not here.

| Token (`--color-*`)   | Tailwind class                          | Usage                                       |
| ---------------------- | ---------------------------------------- | -------------------------------------------- |
| `background`           | `bg-background`                          | Page background                              |
| `surface`               | `bg-surface`                             | Section/card background                      |
| `elevated`              | `bg-elevated`                            | Elevated surfaces (terminal bar, etc.)       |
| `border`                | `border-border`                          | All borders                                  |
| `muted-foreground`      | `text-muted-foreground`                  | Secondary text                               |
| `foreground`            | `text-foreground`                        | Headings, body text                          |
| `primary` (500)         | `bg-primary` / `text-primary`            | Primary brand blue — CTAs, links, accents    |
| `secondary` (purple)    | `bg-secondary` / `text-secondary`        | Secondary accent, premium/Commit+ elements   |
| `destructive`           | `text-destructive`                       | Destructive / error / red elements           |
| `warning`               | `text-warning`                           | Warnings, "in development" badges            |
| `syntax-purple/green/blue` | `text-syntax-*`                       | Code syntax highlighting (Hero terminal)     |

### Typography

Use the design-system's `<Typography variant="h1"…"h6"|"p"|"small"|"overline"|"muted"|"lead"|…>` component instead of raw Tailwind text classes wherever possible. It already encodes the Geist Sans/Mono pairing and the weight/color scale.

- **Headings**: `Typography variant="h1"…"h6"`, Geist Sans, bold, `text-foreground`
- **Section eyebrows**: `Typography variant="overline"`, Geist Mono, `color="secondary"`. See rationing rule below — most sections should **not** have one.
- **Code snippets / badges / numbers**: Geist Mono (`font-mono`)
- **Body**: Geist Sans, `Typography variant="p"` with `color="muted"`

### Visual Language

The design is **dev-native** — inspired by git diffs, terminal UIs, and code editors:

- Use `+`/`-` git diff notation for contrasts (see the Hero terminal typewriter)
- Terminal window chrome (red/amber/green dots) for code mockups
- Line numbers in code blocks
- Monospaced badges and labels
- `~/CommitPT` style logo

### Anti-AI-slop conventions (established during the 2026-09 redesign — keep these)

The landing page went through a pass to remove patterns that read as templated/AI-generated. Don't reintroduce them:

- **No numbered section eyebrows** (`01 //`, `02 //`, …). This was the single most obvious "AI slop" tell on the old page. Eyebrows are optional and rationed: **at most ~1 per 3 sections**, and never on two consecutive sections. Most sections should go straight from the section container into the `Typography variant="h2"` title.
- **Zero em-dashes (`—`) anywhere in visible copy.** Use a period, comma, colon, or restructure the sentence. This applies to headings, body copy, badges, and card descriptions — no exceptions for "it reads better with one."
- **One CTA label per intent.** "Entrar Gratuitamente" is the only label for the Discord CTA across the whole site (header, hero, community, footer, FAQ). Don't introduce a second phrasing ("Entrar na Comunidade", "Junta-te agora", etc.) for the same action.
- **Vary layout families across sections.** Don't stack two sections in a row that are both "identical 3-card grids." The current mix is intentional: `WhatHappens` is an asymmetric bento, `Projects` is a 3-card grid, `Events` is a vertical list with hairlines (not cards), `ContributorsTeaser` is a two-column split, `CommitPlusSection` is a 2-column pricing comparison, `SocialProof` is a full-bleed marquee. If you add a new section, don't default to "3 equal cards" just because it's the easiest layout — check what's already adjacent to it first.
- **Shared section header**: use `<SectionHeader eyebrow? title description? align? />` (`src/components/SectionHeader.tsx`) instead of hand-rolling the `overline` + `h2` + `p` block again. It's what keeps the eyebrow-rationing rule enforceable in one place.
- **Language is PT-PT, not PT-BR.** Watch for Brazilian spellings/vocabulary creeping in (`aprendizado` → `aprendizagem`, `gerenciar` → `gerir`, `ecosistema` → `ecossistema`, `rastrear` → `acompanhar`). See "Content Guidelines" below.

---

## Page Structure

Current sections in order (`app/page.tsx`):

1. **Header** — sticky nav with Discord CTA (`src/components/Header.tsx`, `'use client'`)
2. **Hero** — headline, CTA buttons, CSS-animated terminal typewriter (`'use client'`)
3. **WhatHappens** — "what happens here" bento grid (Comunidade, Projetos, Talks, Sessions, Career)
4. **Community** — social proof stat band + Discord CTA (`'use client'`)
5. **Projects** — community project cards, filtered to `status === 'active'` from `src/data/projects.ts` (`'use client'`)
6. **Events** — recurring event formats, vertical list
7. **ContributorsTeaser** — avatar cluster + "see all contributors" expand (`'use client'`)
8. **SocialProof** — reviews marquee, full-bleed
9. **CommitPlusSection** — free vs. Commit+ pricing comparison
10. **FAQ** — accordion, sourced from `src/data/faqs.ts`
11. **Footer** — final CTA block + nav/legal links

`CookieConsent` renders separately in `app/layout.tsx`, outside `<main>`.

Other routes that exist (this is **not** a single-page site — see "Things to Avoid" below):

- `/privacy`, `/terms` — legal pages
- `/u/[username]` — public member profile, backed by the USM service (`src/lib/usm.ts`)

### Section eyebrow convention

Eyebrows are plain text (`Typography variant="overline"`), no numbering. Rationed to roughly 1 per 3 sections — see the anti-slop conventions above.

---

## CTA Strategy

- **Primary CTA**: "Entrar Gratuitamente" → filled button (`buttonVariants({ size: 'lg' })`), links to Discord
- **Secondary CTA**: Commit+ / Whop → outline button (`buttonVariants({ variant: 'outline' })`)
- CTAs must appear in: Header, Hero, Community, CommitPlusSection, FAQ, Footer
- All CTA click handlers call `trackEvent(...)` from `src/lib/analytics.ts`

### CTA rules

- Discord: `DISCORD_URL` from `src/lib/links.ts`
- Whop (Commit+): `WHOP_COMMIT_PLUS_URL` (monthly) / `WHOP_COMMIT_PLUS_ANNUAL_URL` (annual) from `src/lib/links.ts`
- Never remove or hide the Discord CTA; it's the primary community entry point
- `target="_blank" rel="noreferrer"` on all external links

---

## Component Conventions

All components live in `src/components/`. One component per file, named with PascalCase, `.tsx` extension.

### Adding a new section

1. Create `src/components/MySectionName.tsx`
2. Import and add to `app/page.tsx` in the right order
3. Use `<SectionHeader />` for the header block — don't hand-roll eyebrow/title/description again
4. Before picking a layout, check the two adjacent sections so you're not repeating their layout family (see anti-slop conventions)

### Interactive components

Add `'use client'` when using React hooks, `onClick` handlers, or browser-only APIs. Currently client components: `Header`, `Hero`, `Community`, `Projects`, `ContributorsTeaser`, `Footer`, `CookieConsent`, `FAQ`, `ReviewScroll`, `ExpandableText`, `PricingDisplay`, `BillingToggle`, `CommitPlusCards`. Everything else (`WhatHappens`, `Events`, `SocialProof`, `CommitPlusSection`, `SectionHeader`, `Stats`) is a Server Component.

### Cards / feature blocks

Follow the existing pattern: `border border-border bg-surface p-6 rounded-xl` (or `rounded-lg`) with `hover:border-primary/50 transition-colors` for interactive hover states. Prefer the design-system's `<FeatureCard>` when the content fits its icon+title+description anatomy instead of hand-rolling the same shape.

### Badges

Use the design-system's `<Badge>` component — don't hand-roll the old `animate-ping` dot pattern locally; that's now what `<Badge>` encapsulates.

---

## Content Guidelines

- **Tone**: Direct, builder-to-builder. No fluff, no hype. Think `git commit -m "shipped."` energy.
- **Language**: **All UI copy is Portuguese (PT-PT)**, matching the community. Watch for Brazilian Portuguese spellings drifting in — `aprendizagem` not `aprendizado`, `gerir` not `gerenciar`, `ecossistema` not `ecosistema`.
- **Avoid**: motivational-poster clichés, vague promises, stock-photo language, em-dashes (see anti-slop conventions).
- **Use**: concrete outcomes (`code reviews`, `pull requests`, `sessões ao vivo`), developer vocabulary.

### Value proposition

CommitPT solves **isolamento e procrastinação** em developers através de:

- Comunidade ativa no Discord (perguntas, discussões técnicas, networking)
- Projetos reais com Git, pull requests e code review
- Eventos recorrentes (Commit Talks, Commit Sessions, Commit Career)
- Commit+ como camada paga opcional, nunca como bloqueio ao essencial

---

## File Paths

```
.github/
  workflows/
    ci.yml               # CI pipeline (typecheck, lint, format, build)

app/
  globals.css            # global styles + design-system token imports (@theme)
  layout.tsx             # root layout, metadata, fonts, CookieConsent
  page.tsx               # page composition
  privacy/page.tsx        # legal page
  terms/page.tsx           # legal page
  u/[username]/page.tsx     # public member profile (USM-backed)
  u/[username]/opengraph-image.tsx  # OG image for member profiles
  robots.ts, sitemap.ts    # SEO

src/
  components/
    Header.tsx            # sticky nav ('use client')
    Hero.tsx               # above the fold, CTAs, CSS-animated terminal ('use client')
    WhatHappens.tsx          # bento grid — "what happens here"
    Community.tsx            # stat band + CTA ('use client')
    Projects.tsx              # active project cards ('use client')
    Events.tsx                 # recurring event formats, vertical list
    ContributorsTeaser.tsx      # avatar cluster + expand ('use client')
    SocialProof.tsx              # reviews marquee (full-bleed)
    ReviewScroll.tsx              # marquee implementation ('use client')
    CommitPlusSection.tsx          # pricing section wrapper
    CommitPlusCards.tsx             # free vs. Commit+ comparison ('use client')
    PricingDisplay.tsx               # price formatting helpers ('use client')
    BillingToggle.tsx                 # monthly/annual toggle ('use client')
    FAQ.tsx                            # accordion + JSON-LD ('use client')
    SectionHeader.tsx                   # shared eyebrow/title/description block
    ContributorCard.tsx                  # expanded contributor grid item
    ExpandableText.tsx                    # truncate/expand helper ('use client')
    CookieConsent.tsx                      # cookie banner ('use client')
    Footer.tsx                              # footer with final CTA ('use client')
  data/
    faqs.ts                # FAQ content + JSON-LD helpers
    projects.ts             # project catalog (active + coming-soon)
  lib/
    links.ts                 # Discord/Whop URLs
    analytics.ts               # trackEvent()
    contributors.ts              # GitHub contributor fetch/merge
    whop.ts                        # Whop API (reviews, prices, customer count)
    usm.ts                          # USM API client (member profiles)
  types/
    declarations.d.ts          # global type declarations (e.g. CSS module types)

.eslintrc.json           # ESLint config
.prettierrc              # Prettier config
.prettierignore          # Prettier ignore list
tsconfig.json             # TypeScript config
next-env.d.ts              # Next.js type references (auto-managed)
```

---

## Projects Data (`src/data/projects.ts`)

The `Project` interface has more fields than are currently rendered anywhere:

- **Used today** (only for `status: 'active'` projects, in `Projects.tsx`): `title`, `description`, `tags`, and — behind "Ver mais" — `mission.impact`, the first 3 `features` (icon + title only), and the first 2 `impact` metrics.
- **Defined but not rendered anywhere yet**: `image`, `icon`, `link`, `storybookLink`, `fullDescription`, `tagline`, `learnings`, `workflow`. These look like they were built for a future `/projects` detail page that doesn't exist yet.

Projects with `status: 'coming-soon'` don't appear anywhere on the site — not the landing grid (filtered to `active`), not any other page (none exists yet).

---

## Things to Avoid

- Do not add sections that don't lead toward the Discord or Commit+ conversion
- Do not use light backgrounds — the site is dark-mode only, no theme toggle
- Do not hardcode colors outside the design-system tokens — see "Design System" above
- Do not use `.js` or `.jsx` files — this is a TypeScript-only project
- Do not use `any` — TypeScript strict mode is enforced
- Do not add animation libraries — use Tailwind's built-in `animate-ping`, `transition-*`, CSS `@keyframes`, etc. (the Hero terminal typewriter is a pure-CSS `steps()` animation for exactly this reason — it used to be a per-character `setState` loop and got rewritten)
- New pages under `app/` are fine when they serve a real feature (member profiles, legal pages) — this is **not** a strict single-page site. Landing-page *sections*, though, stay inside `app/page.tsx`.
- Do not install new dependencies without a strong reason
- Do not skip CI checks — all four (typecheck, lint, format, build) must pass
- Do not reintroduce the AI-slop patterns listed above (numbered eyebrows, em-dashes, duplicate CTA labels, repeated layout families)
