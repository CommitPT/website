# CommitPT Landing Page

## Project Overview

This is the landing page for **CommitPT** — a Portuguese programming community. The primary goal is to present the community and act as a sales funnel with two conversion targets:

1. **Whop** — paid membership platform (primary CTA)
2. **Discord** — free community entry point (secondary CTA)

Every section and design decision should serve this funnel. If a feature or section doesn't move visitors toward one of these two actions, don't add it.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode, no `allowJs`)
- **Styling**: Tailwind CSS v3
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
```

All four checks — `typecheck`, `lint`, `format:check`, and `build` — run in CI on every push and PR via `.github/workflows/ci.yml`.

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

| Files | Actions |
|---|---|
| `*.ts`, `*.tsx` | `eslint --fix` → `prettier --write` |
| `*.json`, `*.css`, `*.md`, `*.yml`, `*.yaml` | `prettier --write` |

Fixed files are re-staged automatically. If ESLint finds errors it can't auto-fix, the commit is aborted.

### `commit-msg` — commitlint

Enforces [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <description>

# Examples
feat: add testimonials section
fix: broken Discord link in footer
chore: update dependencies
docs: update CLAUDE.MD with hook setup
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

### Colors (defined in `tailwind.config.js`)

| Token           | Hex       | Usage                                             |
| --------------- | --------- | ------------------------------------------------- |
| `ink`           | `#0B0E14` | Page background                                   |
| `ink-light`     | `#151922` | Section/card background                           |
| `graphite`      | `#1F242C` | Elevated surfaces (terminal bars)                 |
| `border`        | `#30363D` | All borders                                       |
| `muted`         | `#8B949E` | Secondary text                                    |
| `text-primary`  | `#F0F4F8` | Headings, body text                               |
| `git-add`       | `#07ecec` | Primary brand color, CTAs, accents                |
| `git-del`       | `#F85149` | Destructive / red elements                        |
| `git-amber`     | `#F0883E` | Section labels, warnings, "in development" badges |
| `syntax-purple` | `#D2A8FF` | Code syntax                                       |
| `syntax-green`  | `#7EE787` | Code syntax                                       |
| `syntax-blue`   | `#79C0FF` | Code syntax                                       |

### Typography

- **Headings**: Geist Sans, bold, `text-text-primary`
- **Section labels**: Geist Mono, small, `text-git-amber`, format `01 // Label Name`
- **Code snippets / badges / numbers**: Geist Mono (`font-mono`)
- **Body**: Geist Sans, `text-muted`

### Visual Language

The design is **dev-native** — inspired by git diffs, terminal UIs, and code editors:

- Use `+`/`-` git diff notation for contrasts
- Terminal window chrome (red/amber/green dots) for code mockups
- Line numbers in code blocks
- Monospaced badges and labels
- `~/CommitPT` style logo

---

## Page Structure

Current sections in order (`app/page.tsx`):

1. **Header** — sticky nav with Whop + Discord CTAs
2. **Hero** — headline, primary CTA buttons, terminal code mockup
3. **About** — "What You Get" benefit cards
4. **Features** — "How It Works" 3-step flow
5. **Platform** — upcoming `app.commitpt.com` teaser with countdown
6. **Footer**

### Section numbering convention

Sections use `01 //`, `02 //`, etc. as monospaced labels above the heading.

---

## CTA Strategy

- **Primary CTA**: "Join on Whop" → green button (`bg-git-add text-ink`)
- **Secondary CTA**: "Join Discord" → outlined button (`border-border`)
- CTAs must appear in: Hero, Features (join block), Footer
- The header's "Join Now" button also links to the `#join` anchor

### CTA rules

- Whop link placeholder: `https://whop.com/` — replace when real URL is known
- Discord link placeholder: `https://discord.gg/your-invite` — replace when real invite is known
- Never remove or hide Whop as the primary CTA; it's the revenue conversion point
- `target="_blank" rel="noreferrer"` on all external links

---

## Component Conventions

All components live in `src/components/`. One component per file, named with PascalCase, `.tsx` extension.

### Adding a new section

1. Create `src/components/MySectionName.tsx`
2. Import and add to `app/page.tsx` in the right order
3. Assign the next section number in the `01 //` label

### Interactive components

Add `'use client'` directive when using React hooks (`useState`, `useEffect`). Currently: `Header.tsx`, `Platform.tsx`.

### Cards / feature blocks

Follow the existing pattern: `border border-border bg-ink p-6 rounded-lg` with `hover:border-git-add transition-colors` for interactive hover states.

### Badge / pill style

```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-border bg-ink-light px-3 py-1 font-mono text-xs text-git-add">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-git-add opacity-75"></span>
    <span className="relative inline-flex h-2 w-2 rounded-full bg-git-add"></span>
  </span>
  label text
</div>
```

Use `text-git-amber` + `bg-git-amber/10 border-git-amber/30` variant for "coming soon / in development" badges.

---

## Content Guidelines

- **Tone**: Direct, builder-to-builder. No fluff, no hype. Think `git commit -m "shipped."` energy.
- **Language**: Portuguese community but English UI — keep all copy in English unless explicitly told otherwise.
- **Avoid**: motivational-poster clichés, vague promises, stock-photo language.
- **Use**: concrete outcomes (`weekly ships`, `code reviews`, `accountability threads`), developer vocabulary.

### Value proposition

CommitPT solves **isolation and procrastination** in solo developers through:

- Weekly accountability groups
- Build-in-public sessions
- Peer code reviews
- Commit streaks and challenges

---

## File Paths

```
.github/
  workflows/
    ci.yml               # CI pipeline (typecheck, lint, format, build)

app/
  globals.css            # global styles
  layout.tsx             # root layout, metadata, fonts
  page.tsx               # page composition

src/
  components/
    Header.tsx           # sticky nav ('use client')
    Hero.tsx             # above the fold, primary CTAs
    About.tsx            # benefit cards — "What You Get"
    Features.tsx         # 3-step how-it-works + join CTA block
    Platform.tsx         # app.commitpt.com teaser + countdown ('use client')
    Footer.tsx           # footer with links
  types/
    declarations.d.ts    # global type declarations (e.g. CSS module types)

.eslintrc.json           # ESLint config
.prettierrc              # Prettier config
.prettierignore          # Prettier ignore list
tsconfig.json            # TypeScript config
tailwind.config.js       # design tokens
next-env.d.ts            # Next.js type references (auto-managed)
```

---

## Platform Section — `app.commitpt.com`

A dedicated learning platform is in development with a launch target of **2026-08-20**. The `Platform.tsx` component shows a live countdown to this date. Do not remove or change the launch date without confirming with the team.

---

## Things to Avoid

- Do not add sections that don't lead toward a Whop or Discord conversion
- Do not use light backgrounds — the site is dark-mode only
- Do not use colors outside the design token palette without adding them to `tailwind.config.js`
- Do not use `.js` or `.jsx` files — this is a TypeScript-only project
- Do not use `any` — TypeScript strict mode is enforced
- Do not add animation libraries — use Tailwind's built-in `animate-ping`, `transition-*`, etc.
- Do not create new pages — this is a single-page landing site
- Do not install new dependencies without a strong reason
- Do not skip CI checks — all four (typecheck, lint, format, build) must pass
