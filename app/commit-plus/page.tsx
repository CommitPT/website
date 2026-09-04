import ContributorsTeaser from '@/src/components/ContributorsTeaser'
import FAQ from '@/src/components/FAQ'
import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import { selectFaqs } from '@/src/data/faqs'
import { getContributors } from '@/src/lib/contributors'
import { DISCORD_URL, WHOP_COMMIT_PLUS_URL } from '@/src/lib/links'
import {
  getWhopCustomerCount,
  getWhopMonthlyPrice,
  getWhopReviews,
  type WhopReview,
} from '@/src/lib/whop'
import {
  Avatar,
  AvatarFallback,
  buttonVariants,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@commitpt/design-system'
import {
  ArrowRight,
  Briefcase,
  Check,
  GitBranch,
  GitPullRequest,
  Mic,
  MessageSquare,
  Presentation,
  type LucideIcon,
} from 'lucide-react'
import type { Metadata } from 'next'

const BASE_URL = 'https://www.commitpt.com'

// Preço de fallback caso a API do Whop esteja indisponível — manter alinhado com o plano em
// https://whop.com/checkout/plan_LcwR053laq0aV
const FALLBACK_MONTHLY_PRICE = 9.99

const DESCRIPTION =
  'Aprende diretamente com profissionais da indústria, participa em sessões técnicas, recebe feedback e constrói projetos com outras pessoas. A comunidade gratuita no Discord continua gratuita.'

export const metadata: Metadata = {
  title: 'Commit+ — O plano premium da CommitPT',
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/commit-plus`,
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/commit-plus`,
    title: 'Commit+ — O plano premium da CommitPT',
    description: DESCRIPTION,
    siteName: 'CommitPT',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary',
    title: 'Commit+ — O plano premium da CommitPT',
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

export default async function CommitPlusPage() {
  const [whopPrice, customerCount, contributors, reviews] = await Promise.all([
    getWhopMonthlyPrice(),
    getWhopCustomerCount(),
    getContributors(),
    getWhopReviews(),
  ])

  const monthlyPrice = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(whopPrice ?? FALLBACK_MONTHLY_PRICE)

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <HeroSection monthlyPrice={monthlyPrice} />
        <ProofSection contributorsCount={contributors.length} reviews={reviews} />
        <TransformationSection />
        <ExperiencesSection />
        <MonthSection />
        <ContributorsTeaser eyebrow="06 // Comunidade em ação" />
        <ComparisonSection />
        <FitSection />
        <PricingSection monthlyPrice={monthlyPrice} customerCount={customerCount} />
        <FAQ
          eyebrow="10 // Perguntas Frequentes"
          heading="Antes de decidires."
          description="As perguntas que costumam aparecer sobre o Commit+."
          items={selectFaqs([
            'passou-a-ser-paga',
            'pago-discord',
            'garante-emprego',
            'acompanhamento-individual',
            'cancelar',
            'diferenca-gratuito',
            'porque-pago',
            'e-se-nao-gostar',
          ])}
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

function CtaButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${className}`}>
      <a
        href={WHOP_COMMIT_PLUS_URL}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ size: 'lg', className: 'gap-2 group' })}
      >
        Experimentar Commit+
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({
          variant: 'outline',
          size: 'lg',
          className: 'gap-2 text-primary-300',
        })}
      >
        <MessageSquare size={16} />
        Conhecer a comunidade gratuita
      </a>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection({ monthlyPrice }: { monthlyPrice: string }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'01 // Commit+'}
        </Typography>

        <Typography variant="h1" className="mt-3 max-w-3xl text-5xl sm:text-6xl">
          Vai mais longe na tua carreira em Engenharia de Software.
        </Typography>

        <Typography variant="lead" color="muted" className="mt-5 max-w-2xl">
          Aprende diretamente com profissionais da indústria, participa em sessões técnicas, recebe
          feedback e constrói projetos com outras pessoas.
        </Typography>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Typography variant="h2" className="font-mono text-primary-300">
            {monthlyPrice}
            <span className="text-2xl text-muted-foreground">/mês</span>
          </Typography>
          <Typography variant="p" color="muted">
            Cancela quando quiseres.
          </Typography>
        </div>

        <CtaButtons className="mt-8" />

        <Typography variant="small" color="muted" className="mt-6 block">
          A comunidade CommitPT continua gratuita.
        </Typography>
      </div>
    </section>
  )
}

// ── Prova imediata ────────────────────────────────────────────────────────────

const COMMUNITY_STATS = [
  { value: '550+', label: 'membros na comunidade' },
  { value: '90 mil+', label: 'mensagens enviadas' },
]

function ProofSection({
  contributorsCount,
  reviews,
}: {
  contributorsCount: number
  reviews: WhopReview[]
}) {
  const topReviews = reviews.filter((r) => r.description).slice(0, 2)

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-3 divide-x divide-border border-y border-border">
          {[...COMMUNITY_STATS, { value: `${contributorsCount}+`, label: 'contribuidores' }].map(
            (stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <Typography variant="h3" className="font-mono" color="primary" as="p">
                  {stat.value}
                </Typography>
                <Typography variant="small" color="muted" className="mt-1">
                  {stat.label}
                </Typography>
              </div>
            )
          )}
        </div>

        {topReviews.length > 0 && (
          <>
            <Typography variant="small" color="muted" className="mt-10 block font-mono">
              Avaliações recolhidas via{' '}
              <a
                href={WHOP_COMMIT_PLUS_URL}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Whop
              </a>
              .
            </Typography>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {topReviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="pt-6">
                    <Typography variant="p" className="leading-relaxed">
                      &ldquo;{r.description}&rdquo;
                    </Typography>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar variant="secondary">
                        <AvatarFallback>{r.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Typography variant="small" className="font-semibold">
                          {r.user.name}
                        </Typography>
                        <Typography variant="small" color="muted" className="font-mono">
                          @{r.user.username}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ── O que muda ────────────────────────────────────────────────────────────────

const TRANSFORMATIONS = [
  { from: 'Consumir conteúdo sozinho', to: 'Discutir diretamente com profissionais da indústria' },
  { from: 'Projetos individuais', to: 'Colaborar com outras pessoas em projetos reais' },
  { from: 'Dúvidas de carreira sem resposta', to: 'Falar com quem conhece o mercado por dentro' },
  { from: 'Aprender sozinho', to: 'Ter feedback técnico e accountability' },
]

function TransformationSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'02 // O Que Muda'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            O que muda com o Commit+.
          </Typography>
        </div>

        <div className="space-y-3">
          {TRANSFORMATIONS.map((t) => (
            <div
              key={t.from}
              className="grid gap-2 rounded-lg border border-border bg-surface p-5 font-mono text-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:text-base"
            >
              <span className="text-destructive">- {t.from}</span>
              <ArrowRight size={16} className="hidden text-muted-foreground sm:block" />
              <span className="text-primary">+ {t.to}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Experiências ──────────────────────────────────────────────────────────────

interface Experience {
  icon: LucideIcon
  title: string
  desc: string
}

const EXPERIENCES: Experience[] = [
  {
    icon: Mic,
    title: 'Commit Talks',
    desc: 'Conversas e Q&A com pessoas da indústria — recrutadores técnicos, engenheiros e especialistas de diferentes áreas. A oportunidade de perguntar diretamente a quem conhece o mercado por dentro.',
  },
  {
    icon: Presentation,
    title: 'Commit Sessions',
    desc: 'Sessões técnicas conduzidas por pessoas com experiência numa área específica — frontend, backend, cloud, cybersecurity, AI, system design, entre outras. A programação varia consoante quem está disponível e o que a comunidade precisa.',
  },
  {
    icon: Briefcase,
    title: 'Commit Career',
    desc: 'Conteúdo e iniciativas sobre desenvolvimento profissional — CV, mercado, progressão de carreira — com perspetivas de pessoas que já passaram pelo processo. Sem promessas de emprego ou resultados garantidos.',
  },
  {
    icon: GitBranch,
    title: 'Projetos',
    desc: 'Colabora em projetos internos da comunidade com outros membros: issues, pull requests, code reviews e discussão de soluções. Experiência prática de trabalho em equipa, não experiência profissional certificada.',
  },
  {
    icon: GitPullRequest,
    title: 'Feedback técnico',
    desc: 'Discute código, arquitetura e decisões técnicas com outros membros e profissionais mais experientes. Nem todo o código submetido tem garantia de revisão individual, mas há espaço regular para pedir e dar feedback.',
  },
]

function ExperiencesSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'03 // Experiências Commit+'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            O que acontece dentro do Commit+.
          </Typography>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((exp) => (
            <Card key={exp.title}>
              <CardHeader>
                <exp.icon size={22} className="mb-2 text-primary-300" aria-hidden="true" />
                <Typography variant="h3" className="text-lg">
                  {exp.title}
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="p" color="muted">
                  {exp.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Como é um mês ─────────────────────────────────────────────────────────────

const MONTH_EXAMPLES = [
  'Tipicamente encontras pelo menos uma Commit Session sobre um tema técnico específico',
  'Podes participar num Commit Talk com alguém da indústria',
  'Há espaço para colaborar num projeto interno em curso — abrir uma issue, submeter um pull request',
  'Podes pedir feedback sobre o teu código ou arquitetura e discuti-lo com outros membros',
  'Surgem discussões e iniciativas pontuais consoante o que a comunidade está a construir naquele momento',
]

function MonthSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <div className="mb-8 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'04 // Um Mês No Commit+'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Como é um mês no Commit+?
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Um exemplo realista — não uma agenda fixa. A frequência e os temas variam de mês para
            mês, consoante a disponibilidade de quem participa.
          </Typography>
        </div>

        <ul className="space-y-3">
          {MONTH_EXAMPLES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-primary-300" aria-hidden="true" />
              <Typography variant="p" color="muted">
                {item}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Gratuito vs Commit+ ───────────────────────────────────────────────────────

const FREE_FEATURES = [
  'Comunidade no Discord',
  'Perguntas e discussões técnicas',
  'Networking com outros membros',
  'Ajuda entre membros',
  'Eventos e iniciativas abertas',
]

const PLUS_FEATURES = [
  'Commit Talks',
  'Commit Sessions',
  'Commit Career',
  'Participação em projetos internos',
  'Feedback técnico e revisões de código',
  'Iniciativas exclusivas para membros Commit+',
]

function ComparisonSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'07 // Gratuito vs Commit+'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Não tornámos a comunidade paga.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Adicionámos uma camada extra para quem quer ir mais fundo. Tudo o que já existia
            continua gratuito.
          </Typography>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Typography variant="h3">Gratuito</Typography>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check
                      size={16}
                      className="shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/40">
            <CardHeader>
              <Typography variant="h3">Commit+</Typography>
              <Typography variant="small" color="muted">
                Tudo do gratuito, mais:
              </Typography>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {PLUS_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check size={16} className="shrink-0 text-primary-300" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// ── Para quem é / não é ───────────────────────────────────────────────────────

const FIT_FOR = [
  'Queres participar ativamente, não só observar',
  'Queres aprender com outras pessoas, não sozinho',
  'Queres receber feedback sobre o teu trabalho',
  'Queres conhecer profissionais da indústria',
  'Queres colaborar em projetos com outras pessoas',
  'Estás disposto a contribuir também, não só a receber',
]

const FIT_AGAINST = [
  'Esperas uma garantia de emprego',
  'Procuras acompanhamento individual permanente',
  'Não tens intenção de participar ativamente',
]

function FitSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            {'08 // Para Quem É'}
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            É para ti se... e não é se...
          </Typography>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <Typography variant="h3" className="text-lg text-primary-300">
              É para ti se:
            </Typography>
            <ul className="mt-4 space-y-3 font-mono text-sm">
              {FIT_FOR.map((f) => (
                <li key={f} className="flex items-start gap-2 text-foreground">
                  <span className="text-primary-300">+</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <Typography variant="h3" className="text-lg text-destructive">
              Não é para ti se:
            </Typography>
            <ul className="mt-4 space-y-3 font-mono text-sm">
              {FIT_AGAINST.map((f) => (
                <li key={f} className="flex items-start gap-2 text-foreground">
                  <span className="text-destructive">-</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Preço ─────────────────────────────────────────────────────────────────────

function PricingSection({
  monthlyPrice,
  customerCount,
}: {
  monthlyPrice: string
  customerCount: number | null
}) {
  return (
    <section className="border-b border-border py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'09 // Preço'}
        </Typography>
        <Typography variant="h2" className="mt-3 sm:text-4xl">
          Um preço. Sem contratos.
        </Typography>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-primary/40 bg-surface p-8 lg:p-10">
          <Typography variant="h1" className="font-mono text-primary-300">
            {monthlyPrice}
            <span className="text-xl text-muted-foreground">/mês</span>
          </Typography>
          <Typography variant="p" color="muted" className="mt-3">
            Acesso a Commit Talks, Commit Sessions, Commit Career, projetos internos e feedback
            técnico. Cancelas quando quiseres, diretamente na plataforma.
          </Typography>

          <a
            href={WHOP_COMMIT_PLUS_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'lg', className: 'mt-8 w-full gap-2 group' })}
          >
            Experimentar Commit+
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          {customerCount !== null && (
            <Typography variant="small" color="muted" className="mt-4 font-mono">
              {customerCount}+ membros já fazem parte do Commit+
            </Typography>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-28">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'11 // Junta-te a nós'}
        </Typography>
        <Typography variant="h2" className="mt-3 sm:text-4xl">
          Construímos algo que já tem pessoas, atividade e resultados.
        </Typography>
        <Typography variant="p" color="muted" className="mx-auto mt-4 max-w-xl">
          Existe uma comunidade gratuita. Para quem quer envolver-se mais e ter acesso a
          experiências adicionais, existe o Commit+.
        </Typography>
        <CtaButtons className="mt-8 items-center justify-center" />
      </div>
    </section>
  )
}
