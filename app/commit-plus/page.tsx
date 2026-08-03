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
import { selectFaqs } from '@/src/data/faqs'
import { WHOP_COMMIT_PLUS_URL, WHOP_FREE_DISCORD_URL } from '@/src/lib/links'

const DESCRIPTION =
  'Workshops e calls ao vivo exclusivas, revisões de código, projetos internos e acesso antecipado à plataforma. A comunidade gratuita no Discord continua gratuita.'

export const metadata: Metadata = {
  title: 'Commit+  O plano premium da CommitPT',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.commitpt.com/commit-plus',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.commitpt.com/commit-plus',
    title: 'Commit+ O plano premium da CommitPT',
    description: DESCRIPTION,
    siteName: 'CommitPT',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary',
    title: 'Commit+ O plano premium da CommitPT',
    description: DESCRIPTION,
    images: ['/commit_3_512w.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

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
          eyebrow="05 // Perguntas Frequentes"
          heading="Antes de decidires."
          description="As perguntas que costumam aparecer sobre o Commit+."
          items={selectFaqs(['diferenca-gratuito', 'porque-pago', 'cancelar', 'e-se-nao-gostar'])}
          // These questions are already marked up on the home page. Emitting the
          // same FAQPage schema on a second URL would just duplicate it.
          withSchema={false}
        />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

// ── Shared CTAs ───────────────────────────────────────────────────────────────
//
// Both entry points go to Whop — see src/lib/links.ts for why the free tier
// does too.

function CtaButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <a
        href={WHOP_COMMIT_PLUS_URL}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ size: 'lg', className: 'gap-2 group' })}
      >
        Adere ao Commit+
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
      <a
        href={WHOP_FREE_DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({
          variant: 'outline',
          size: 'lg',
          className: 'gap-2 text-primary-300',
        })}
      >
        <MessageCircle size={16} />
        Experimenta o Discord Grátis
      </a>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'01 // Commit+'}
        </Typography>

        <Typography variant="h1" className="mt-3 text-5xl sm:text-6xl">
          Commit
          <span className="font-mono text-primary-300">+</span>
        </Typography>

        <Typography variant="lead" color="muted" className="mt-5 max-w-2xl">
          A comunidade gratuita no Discord vai continuar a existir sempre. O Commit+ é para quem
          quer ir mais fundo.
        </Typography>

        <Typography variant="p" color="muted" className="mt-4 max-w-2xl">
          Não pagas para entrar numa comunidade, pagas para ajudar a construir algo que beneficia
          toda a gente, incluindo tu. Workshops, calls ao vivo, projetos internos e contacto direto
          com quem já passou por onde estás.
        </Typography>

        <CtaButtons className="mt-8" />
      </div>
    </section>
  )
}

// ── Benefits ──────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Video,
    title: 'Workshops e calls exclusivas',
    desc: 'Sessões ao vivo sobre temas práticos, não apresentações genéricas. Ficam gravadas para quem não puder estar presente.',
  },
  {
    icon: GitPullRequest,
    title: 'Revisões de código a sério',
    desc: 'Há hábitos de código que cultivas há meses e que ninguém te apontou. Aqui alguém aponta antes de ser numa entrevista.',
  },
  {
    icon: BookMarked,
    title: 'Recursos e materiais premium',
    desc: 'Curados por profissionais da área e mantidos atualizados. Não é uma lista de links que ninguém revê há dois anos.',
  },
  {
    icon: Users,
    title: 'Projetos internos da comunidade',
    desc: 'Colaboras em projetos reais com outros membros. A pasta de projetos a meio deixa de crescer.',
  },
  {
    icon: Trophy,
    title: 'Contacto próximo com seniores',
    desc: 'Acesso direto à equipa e a engenheiros com anos de experiência. O mercado deixa de ser uma caixa negra.',
  },
  {
    icon: Zap,
    title: 'Acesso antecipado à plataforma',
    desc: 'Entras no app.commitpt.com antes do lançamento público.',
  },
]

function BenefitsSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'02 // Benefícios'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            O que o Commit+ acrescenta.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Tudo o que está na comunidade gratuita continua lá. Isto é a camada extra.
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

// A decorative terminal. The point is the shape of a git workflow, not a
// faithful simulation — the session shows branch, diff, commit and push, and
// the prompt carries the branch so it flips to commit-plus after the checkout.
// Deliberately no diff body: it made the block long without earning it.

const CMD = 'text-syntax-purple' // git itself
const SUB = 'text-syntax-blue' // subcommand
const FLAG = 'text-foreground' // flags and plain args
const REF = 'text-syntax-green' // refs, paths, quoted strings

type Tone = 'meta' | 'info'

interface Segment {
  text: string
  className: string
}

type TerminalLine =
  | { kind: 'blank' }
  | { kind: 'command'; branch: string; segments: Segment[] }
  | { kind: 'output'; tone: Tone; text: string }

const SESSION: TerminalLine[] = [
  {
    kind: 'command',
    branch: 'master',
    segments: [
      { text: 'git', className: CMD },
      { text: ' checkout', className: SUB },
      { text: ' -b', className: FLAG },
      { text: ' commit-plus', className: REF },
    ],
  },
  { kind: 'output', tone: 'info', text: "Switched to a new branch 'commit-plus'" },
  { kind: 'blank' },

  {
    kind: 'command',
    branch: 'commit-plus',
    segments: [
      { text: 'git', className: CMD },
      { text: ' diff', className: SUB },
      { text: ' --no-index', className: FLAG },
      { text: ' gratuito.md commit-plus.md', className: REF },
    ],
  },
  { kind: 'blank' },

  {
    kind: 'command',
    branch: 'commit-plus',
    segments: [
      { text: 'git', className: CMD },
      { text: ' commit', className: SUB },
      { text: ' -am', className: FLAG },
      { text: ' "feat: investir na carreira"', className: REF },
    ],
  },
  { kind: 'output', tone: 'info', text: '[commit-plus 9e21b0c] feat: investir na carreira' },
  { kind: 'output', tone: 'info', text: ' 1 file changed, 6 insertions(+)' },
  { kind: 'blank' },

  {
    kind: 'command',
    branch: 'commit-plus',
    segments: [
      { text: 'git', className: CMD },
      { text: ' push', className: SUB },
      { text: ' origin', className: FLAG },
      { text: ' commit-plus', className: REF },
    ],
  },
  { kind: 'output', tone: 'meta', text: 'To github.com:commitpt/carreira.git' },
  { kind: 'output', tone: 'info', text: '   7c4a1f2..9e21b0c  commit-plus -> commit-plus' },
]

const TONE_STYLES: Record<Tone, string> = {
  meta: 'text-muted-foreground/50',
  info: 'text-muted-foreground/80',
}

function DiffSection() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'03 // A diferença'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            A diferença, em diff.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Um branch, um commit, um push. É assim que se passa do plano gratuito para o Commit+ sem
            perder nada do que já tinhas.
          </Typography>
        </div>

        <UpgradeTerminal />

        {/* The CTA lands right where the metaphor closes, on the push. */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={WHOP_COMMIT_PLUS_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'lg', className: 'gap-2 group' })}
          >
            Faz o teu push para o Commit+
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          <Typography variant="caption" color="muted" className="font-mono">
            {'// A comunidade gratuita não perde nada. O Commit+ só adiciona.'}
          </Typography>
        </div>
      </div>
    </section>
  )
}

function Prompt({ branch }: { branch: string }) {
  return (
    <span className="select-none">
      <span className="text-primary-300">~/commitpt</span>{' '}
      <span className="text-muted-foreground/50">git:(</span>
      <span className="text-warning">{branch}</span>
      <span className="text-muted-foreground/50">)</span>{' '}
      <span className="text-success">$</span>{' '}
    </span>
  )
}

function TerminalRow({ line }: { line: TerminalLine }) {
  if (line.kind === 'blank') return <div className="h-3" />

  if (line.kind === 'command') {
    return (
      <div className="whitespace-pre px-4 sm:px-6">
        <Prompt branch={line.branch} />
        {line.segments.map((segment, i) => (
          <span key={i} className={segment.className}>
            {segment.text}
          </span>
        ))}
      </div>
    )
  }

  return <div className={`whitespace-pre px-4 sm:px-6 ${TONE_STYLES[line.tone]}`}>{line.text}</div>
}

function UpgradeTerminal() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-warning" />
        <div className="h-3 w-3 rounded-full bg-success" />
        <span className="ml-2 font-mono text-xs font-semibold text-muted-foreground">
          ~/commitpt — git
        </span>
      </div>

      {/*
        role="img" + aria-label: read out line by line this is punctuation soup,
        and every benefit in it is already announced by the cards above and the
        plan list below. tabIndex so keyboard users can still scroll the
        overflow on narrow viewports.
      */}
      <div
        className="overflow-x-auto py-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:outline-none"
        tabIndex={0}
        role="img"
        aria-label="Sessão de terminal: cria o branch commit-plus, corre git diff entre o plano gratuito e o Commit+ — as seis linhas que o Commit+ acrescenta aparecem a verde — e depois faz commit e push."
      >
        {/* min-w-max so the highlighted rows keep their background across the
            full scroll width, not just the visible box. */}
        <div className="min-w-max font-mono text-sm leading-6">
          {SESSION.map((line, i) => (
            <TerminalRow key={i} line={line} />
          ))}

          <div className="h-3" />

          {/* Idle prompt, waiting for the next command */}
          <div className="flex items-center px-4 sm:px-6">
            <Prompt branch="commit-plus" />
            <span className="inline-block h-4 w-[2px] animate-pulse bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
//
// No prices here on purpose. The price lives on Whop so the click is measured.

interface Plan {
  badge: string
  title: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured: boolean
}

const PLANS: Plan[] = [
  {
    badge: 'Gratuito',
    title: 'Discord Grátis',
    description:
      'Entra, faz perguntas, conhece pessoas e participa nas discussões. Sem pagar nada, para sempre.',
    features: [
      'perguntas sem julgamentos',
      'discussões técnicas e de arquitetura',
      'contacto com a comunidade',
      'anúncios e eventos abertos',
    ],
    ctaLabel: 'Entrar no Discord',
    ctaHref: WHOP_FREE_DISCORD_URL,
    featured: false,
  },
  {
    badge: 'Commit+',
    title: 'Commit+',
    description:
      'A camada extra para quem quer ir mais fundo. Subscrição mensal, cancelas quando quiseres.',
    features: [
      'workshops e calls ao vivo exclusivas',
      'revisões de código em projetos reais',
      'recursos e materiais premium',
      'projetos internos da comunidade',
      'contacto próximo com seniores',
      'acesso antecipado à plataforma',
    ],
    ctaLabel: 'Adere ao Commit+',
    ctaHref: WHOP_COMMIT_PLUS_URL,
    featured: true,
  },
]

function PricingCard({ plan }: { plan: Plan }) {
  const { featured } = plan

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-surface p-8 lg:p-10 ${
        featured ? 'border-primary/40' : 'border-border'
      }`}
    >
      <span
        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs ${
          featured
            ? 'border-primary-300/30 bg-primary-300/10 text-primary-300'
            : 'border-border bg-surface text-muted-foreground'
        }`}
      >
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            featured ? 'bg-success' : 'bg-muted-foreground'
          }`}
        />
        {plan.badge}
      </span>

      <Typography variant="h3" className="mt-6">
        {plan.title}
      </Typography>

      <Typography variant="p" color="muted" className="mt-4">
        {plan.description}
      </Typography>

      <div className="my-8 border-t border-border" />

      <ul className="flex-grow space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
            <span
              className={`font-mono ${featured ? 'text-primary-300' : 'text-muted-foreground'}`}
            >
              {featured ? '+' : '·'}
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaHref}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({
          ...(featured ? {} : { variant: 'outline' }),
          size: 'lg',
          className: 'mt-8 w-full gap-2 group',
        })}
      >
        {plan.ctaLabel}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  )
}

function PricingSection() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'04 // Planos'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Escolhe por onde entras.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Podes começar pelo Discord gratuito e subir quando fizer sentido. Sem contratos cancelas
            quando quiseres.
          </Typography>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <PricingCard key={plan.badge} plan={plan} />
          ))}
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
          {'06 // Junta-te a nós'}
        </Typography>
        <Typography variant="h2" className="mt-3 sm:text-4xl">
          Prova a ti próprio que vale a pena.
        </Typography>
        <Typography variant="p" color="muted" className="mx-auto mt-4 max-w-xl">
          Se entras, participas durante um mês e decides que não é para ti, cancelas e pronto. Não
          te pedimos justificações nem tentamos convencer-te a ficar.
        </Typography>
        <CtaButtons className="mt-8 items-center justify-center" />
      </div>
    </section>
  )
}
