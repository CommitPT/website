import { FeatureCard, Typography } from '@commitpt/design-system'
import {
  Award,
  BarChart2,
  Lightbulb,
  LucideIcon,
  Map,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Benefit {
  icon: LucideIcon
  title: string
  desc: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    title: 'Transformas intenção em progresso concreto',
    desc: 'Criamos estrutura para te ajudar a transformar planos em resultados — contexto, apoio e as pessoas certas à volta no momento certo.',
  },
  {
    icon: Lightbulb,
    title: 'Tomas decisões técnicas com mais confiança',
    desc: 'Com acesso a perspetivas de quem já enfrentou os mesmos problemas em contexto profissional, as tuas escolhas de arquitectura deixam de ser suposições e passam a ser decisões fundamentadas.',
  },
  {
    icon: BarChart2,
    title: 'Constróis uma consistência visível',
    desc: 'Em vez de picos de produtividade seguidos de semanas em branco, tens um ambiente que te incentiva a construir um ritmo sustentável — um historial de evolução que podes demonstrar a potenciais empregadores.',
  },
  {
    icon: MessageCircle,
    title: 'Aprendes a comunicar o que constróis',
    desc: 'Começas a explicar as tuas decisões com clareza, a justificar escolhas técnicas e a colaborar de forma eficaz. Competências que te distinguem muito além do código que escreves.',
  },
  {
    icon: Map,
    title: 'Percebes o mercado por dentro',
    desc: 'Deixas de navegar às cegas. Com acesso a profissionais que trabalham no mercado todos os dias, perceberes o que as empresas valorizam, como funcionam as entrevistas e o que diferencia quem cresce.',
  },
  {
    icon: Award,
    title: 'Constróis provas reais de evolução',
    desc: 'A oportunidade de contribuir para projetos, submeter código a revisão e participar em iniciativas da comunidade. Não te damos apenas um certificado — criamos oportunidades para construíres provas concretas daquilo que sabes fazer.',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            02 // O Que Muda
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            O que muda quando deixas de evoluir sozinho.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Entrar numa comunidade certa não é só ter mais pessoas à volta. É ter acesso a contexto,
            perspetiva e estrutura que facilitam o teu crescimento.
          </Typography>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <FeatureCard
              key={b.title}
              icon={<b.icon className="icon" aria-hidden="true" />}
              title={b.title}
              description={b.desc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
