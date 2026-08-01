import type { Metadata } from 'next'
import {
  ArrowRight,
  BookMarked,
  GitPullRequest,
  MessageCircle,
  Trophy,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import { FeatureCard, Typography, buttonVariants } from '@commitpt/design-system'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import FAQ from '@/src/components/FAQ'

export const metadata: Metadata = {
  title: 'Commit+ — O plano premium da CommitPT',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  alternates: {
    canonical: 'https://www.commitpt.com/commit-plus',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.commitpt.com/commit-plus',
    title: 'Commit+ — O plano premium da CommitPT',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    siteName: 'CommitPT',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary',
    title: 'Commit+ — O plano premium da CommitPT',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    images: ['/commit_3_512w.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// ── Placeholder copy ──────────────────────────────────────────────────────────

const LOREM = {
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  heading: 'Lorem ipsum dolor sit amet, consectetur.',
  short:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
}

// ── Diff signature data ───────────────────────────────────────────────────────

type DiffLineType = 'meta' | 'context' | 'add'

interface DiffLine {
  type: DiffLineType
  text: string
}

const DIFF_LINES: DiffLine[] = [
  { type: 'meta', text: 'diff --git a/free.md b/commit-plus.md' },
  { type: 'meta', text: 'index 0000000..1ea7ff1 100644' },
  { type: 'meta', text: '--- a/free.md' },
  { type: 'meta', text: '+++ b/commit-plus.md' },
  { type: 'meta', text: '@@ -1,4 +1,12 @@' },
  { type: 'context', text: ' Lorem ipsum dolor sit amet,' },
  { type: 'context', text: ' consectetur adipiscing elit,' },
  { type: 'context', text: ' sed do eiusmod tempor incididunt' },
  { type: 'context', text: ' ut labore et dolore magna aliqua.' },
  { type: 'add', text: 'Ut enim ad minim veniam,' },
  { type: 'add', text: 'quis nostrud exercitation ullamco' },
  { type: 'add', text: 'laboris nisi ut aliquip ex ea' },
  { type: 'add', text: 'commodo consequat. Duis aute' },
  { type: 'add', text: 'irure dolor in reprehenderit' },
  { type: 'add', text: 'in voluptate velit esse cillum' },
  { type: 'add', text: 'dolore eu fugiat nulla pariatur.' },
  { type: 'add', text: 'Excepteur sint occaecat cupidatat.' },
]

// ── FAQ data ──────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer: (
      <div className="space-y-3">
        <p>{LOREM.body}</p>
        <p>{LOREM.short}</p>
      </div>
    ),
  },
  {
    question: 'Ut enim ad minim veniam, quis nostrud exercitation?',
    answer: (
      <div className="space-y-3">
        <p>{LOREM.body}</p>
        <p>{LOREM.short}</p>
      </div>
    ),
  },
  {
    question: 'Duis aute irure dolor in reprehenderit in voluptate?',
    answer: (
      <div className="space-y-3">
        <p>{LOREM.body}</p>
        <p>{LOREM.short}</p>
      </div>
    ),
  },
  {
    question: 'Excepteur sint occaecat cupidatat non proident?',
    answer: (
      <div className="space-y-3">
        <p>{LOREM.body}</p>
        <p>{LOREM.short}</p>
      </div>
    ),
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommitPlusPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <HeroSection />
        <BenefitsSection />
        <DiffSection />
        <PricingSection />
        <FAQ
          eyebrow="// FAQ"
          heading={LOREM.heading}
          description={LOREM.body}
          items={faqItems}
          withSchema={false}
        />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// Commit+'}
        </Typography>

        <h1 className="mt-3 text-5xl font-bold tracking-[-0.02em] text-foreground sm:text-6xl">
          Commit
          <span className="font-mono text-success">+</span>
        </h1>

        <Typography variant="lead" color="muted" className="mt-5 max-w-2xl">
          {LOREM.lead}
        </Typography>

        <Typography variant="p" color="muted" className="mt-4 max-w-2xl">
          {LOREM.body}
        </Typography>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://whop.com/commitpt-709e/commit-plus"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'lg', className: 'gap-2' })}
          >
            Adere ao Commit+
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://discord.gg/yGAbprCBrT"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2' })}
            style={{ color: 'oklch(0.8 0.1 240)' }}
          >
            <MessageCircle size={16} />
            Experimenta o Discord Grátis
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Benefits ──────────────────────────────────────────────────────────────────

const BENEFITS = [
  { icon: Users, title: 'Lorem Ipsum Dolor', desc: LOREM.short },
  { icon: Video, title: 'Sit Amet Consectetur', desc: LOREM.short },
  { icon: GitPullRequest, title: 'Adipiscing Elit', desc: LOREM.short },
  { icon: Zap, title: 'Sed Do Eiusmod', desc: LOREM.short },
  { icon: BookMarked, title: 'Tempor Incididunt', desc: LOREM.short },
  { icon: Trophy, title: 'Ut Labore Et Dolore', desc: LOREM.short },
]

function BenefitsSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'// Benefícios'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            {LOREM.heading}
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            {LOREM.body}
          </Typography>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={<benefit.icon className="icon" aria-hidden="true" />}
              title={benefit.title}
              description={benefit.desc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Diff signature ────────────────────────────────────────────────────────────

function DiffSection() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'// A diferença'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            {LOREM.heading}
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            {LOREM.body}
          </Typography>
        </div>

        <UpgradeDiff />

        <Typography variant="caption" color="muted" className="mt-6 block font-mono">
          {'// Lorem ipsum dolor sit amet — consectetur adipiscing elit.'}
        </Typography>
      </div>
    </section>
  )
}

function UpgradeDiff() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-warning" />
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="ml-2 font-mono text-xs font-semibold text-muted-foreground">
          ~ commit-plus.diff
        </span>
      </div>

      <div
        className="overflow-x-auto p-4 sm:p-6"
        style={{ fontFamily: 'Consolas, monospace' }}
        role="img"
        aria-label="Diff entre o plano gratuito e o Commit+: as linhas adicionadas aparecem a verde."
      >
        {DIFF_LINES.map((line, i) => {
          const cls =
            line.type === 'meta'
              ? 'text-muted-foreground/70'
              : line.type === 'context'
                ? 'text-muted-foreground'
                : 'text-success'
          const bg = line.type === 'add' ? 'bg-success/[0.06]' : ''
          return (
            <div key={i} className={`whitespace-pre font-mono text-sm leading-6 ${cls} ${bg}`}>
              {line.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function PricingSection() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'// Planos'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            {LOREM.heading}
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            {LOREM.body}
          </Typography>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-surface p-8 lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground"></span>
              Gratuito
            </span>

            <Typography variant="h3" className="mt-6">
              Discord Grátis
            </Typography>

            <Typography variant="p" color="muted" className="mt-4">
              {LOREM.body}
            </Typography>

            <div className="my-8 border-t border-border" />

            <ul className="flex-grow space-y-3">
              {['lorem ipsum', 'dolor sit amet', 'consectetur adipiscing', 'sed do eiusmod'].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="font-mono text-muted-foreground">·</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>

            <a
              href="https://whop.com/commitpt-709e/"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'mt-8 w-full gap-2',
              })}
            >
              adere ao commit+
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-col rounded-2xl border border-primary/40 bg-surface p-8 lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-xs text-success">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              Commit+
            </span>

            <Typography variant="h3" className="mt-6">
              Commit+
            </Typography>

            <Typography variant="p" color="muted" className="mt-4">
              {LOREM.body}
            </Typography>

            <div className="my-8 border-t border-border" />

            <ul className="flex-grow space-y-3">
              {['lorem ipsum', 'dolor sit amet', 'consectetur adipiscing', 'sed do eiusmod'].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="font-mono text-success">+</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>

            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'lg', className: 'mt-8 w-full gap-2' })}
            >
              Adere ao Commit+
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// Junta-te a nós'}
        </Typography>
        <Typography variant="h2" className="mt-3 sm:text-4xl">
          Junta-te ao Commit+.
        </Typography>
        <Typography variant="p" color="muted" className="mx-auto mt-4 max-w-xl">
          {LOREM.body}
        </Typography>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://whop.com/commitpt-709e/commit-plus"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'lg', className: 'gap-2' })}
          >
            Adere ao Commit+
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://discord.gg/yGAbprCBrT"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2' })}
            style={{ color: 'oklch(0.8 0.1 240)' }}
          >
            <MessageCircle size={16} />
            Experimenta o Discord Grátis
          </a>
        </div>
      </div>
    </section>
  )
}
