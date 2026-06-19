# CommitPT — Landing Page

Marketing website for **CommitPT**, a programming accountability community for developers who want to stop coding alone and start shipping consistently.

---

## Tech Stack

| Layer           | Tool                                           |
| --------------- | ---------------------------------------------- |
| Framework       | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling         | [Tailwind CSS v3](https://tailwindcss.com/)    |
| Fonts           | [Geist](https://vercel.com/font) (Sans + Mono) |
| Icons           | [Lucide React](https://lucide.dev/)            |
| Package Manager | [Yarn](https://yarnpkg.com/)                   |

---

## Getting Started

```bash
# Install dependencies
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
commitpt/
├── app/
│   ├── globals.css       # Global styles + Tailwind directives
│   ├── layout.js         # Root layout (fonts, metadata, html shell)
│   └── page.js           # Home page — assembles all sections
├── src/
│   └── components/
│       ├── Header.jsx    # Sticky nav with mobile menu
│       ├── Hero.jsx      # Hero section with terminal code block
│       ├── About.jsx     # "What you get" — membership benefits
│       ├── Features.jsx  # "How it works" — 3-step CTA
│       ├── Platform.jsx  # Platform coming soon teaser
│       └── Footer.jsx    # Footer with links and socials
├── .env.example          # Environment variable template
├── .gitignore
├── jsconfig.json
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
└── package.json
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable                   | Description              |
| -------------------------- | ------------------------ |
| `NEXT_PUBLIC_WHOP_LINK`    | Whop membership page URL |
| `NEXT_PUBLIC_DISCORD_LINK` | Discord invite link      |

> `.env.local` is gitignored — never commit real values.

---

## Color Tokens (Tailwind)

| Token          | Hex       | Usage                    |
| -------------- | --------- | ------------------------ |
| `ink`          | `#0B0E14` | Main background          |
| `ink-light`    | `#151922` | Section backgrounds      |
| `graphite`     | `#1F242C` | Card backgrounds         |
| `border`       | `#30363D` | Borders                  |
| `muted`        | `#8B949E` | Secondary text           |
| `text-primary` | `#F0F4F8` | Primary text             |
| `git-add`      | `#07ecec` | Primary accent (cyan)    |
| `git-del`      | `#F85149` | Destructive / diff red   |
| `git-amber`    | `#F0883E` | Section labels / warning |

---

## Roadmap

### Phase 1 — Landing Page ✅

- [x] Hero section with terminal code block
- [x] About / membership benefits
- [x] How it works (3 steps)
- [x] Whop + Discord CTAs
- [x] Platform coming soon teaser

### Phase 2 — Platform (in development) 🚧

> Hosted at `app.commitpt.com` as a **separate Next.js project**

- [ ] Authentication (GitHub OAuth + email)
- [ ] Learning paths / roadmaps (inspired by roadmap.sh)
- [ ] Interactive courses (inspired by boot.dev, Codedex)
- [ ] Tech news feed
- [ ] Progress tracking + commit streaks
- [ ] Community challenges
- [ ] Member profiles + portfolio

---

## Links

- **Community (Whop):** https://whop.com/commitpt-709e/commit-plus/
- **Discord:** _(invite pending)_
