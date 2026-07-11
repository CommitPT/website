import { Typography } from '@commitpt/design-system'
import {
  Award,
  BarChart2,
  Lightbulb,
  LucideIcon,
  Map,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  desc: string
}

const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    title: 'Transformas intenção em progresso concreto',
    desc: 'Deixas de acumular planos e começas a acumular resultados. A diferença não é motivação — é ter contexto, estrutura e as pessoas certas à volta no momento certo.',
  },
  {
    icon: Lightbulb,
    title: 'Tomas decisões técnicas com mais confiança',
    desc: 'Com acesso a perspetivas de quem já enfrentou os mesmos problemas em contexto profissional, as tuas escolhas de arquitectura deixam de ser suposições e passam a ser decisões fundamentadas.',
  },
  {
    icon: BarChart2,
    title: 'Constróis uma consistência visível',
    desc: 'Em vez de picos de produtividade seguidos de semanas em branco, desenvolves um ritmo sustentável — um historial de evolução contínua que qualquer empregador pode ver e valorizar.',
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
    desc: 'Projetos em produção, código revisto por profissionais, participação em iniciativas reais. Não um certificado — um percurso que fala por si a qualquer empresa.',
  },
]

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            02 // O Que Muda
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            O que muda quando deixas de evoluir sozinho.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Entrar numa comunidade certa não é só ter mais pessoas à volta. É ter acesso a contexto,
            perspetiva e estrutura que tornam o teu crescimento inevitável.
          </Typography>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 hover:border-primary transition-colors"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <b.icon className="mb-4 h-6 w-6 text-primary" />
              <Typography variant="h5" as="h3" className="mb-2">
                {b.title}
              </Typography>
              <Typography variant="small" color="muted">
                {b.desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
