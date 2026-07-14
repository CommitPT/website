import { buttonVariants, FeatureCard, Typography } from '@commitpt/design-system'
import {
  ArrowRight,
  BookMarked,
  GitBranch,
  GitPullRequest,
  LucideIcon,
  MessageCircle,
  MessageSquare,
  Target,
  Video,
} from 'lucide-react'

interface Solution {
  icon: LucideIcon
  title: string
  desc: string
}

const solutions: Solution[] = [
  {
    icon: Video,
    title: 'Sessões Semanais ao Vivo',
    desc: 'Chamadas regulares onde os membros apresentam o que estão a construir, discutem desafios técnicos e recebem perspetivas em tempo real. Estruturadas e focadas — sem perder tempo.',
  },
  {
    icon: Target,
    title: 'Check-ins de Projetos',
    desc: 'Cada membro partilha o que comprometeu para a semana e o que entregou. Um ciclo simples e repetido que transforma intenção em hábito — e em resultados visíveis semana após semana.',
  },
  {
    icon: GitPullRequest,
    title: 'Revisões de Código e Arquitectura',
    desc: 'Submetes o teu trabalho e recebes análise de profissionais com experiência real no mercado. Feedback específico e accionável — não opiniões genéricas nem o silêncio do Stack Overflow.',
  },
  {
    icon: MessageSquare,
    title: 'Discussões Técnicas e de Carreira',
    desc: 'Canais dedicados a system design, ferramentas, boas práticas, processos de entrevista, salários e progressão. Conversas reais com pessoas que navegam estas questões todos os dias.',
  },
  {
    icon: GitBranch,
    title: 'Projetos Colaborativos',
    desc: 'Trabalhas em projetos internos com outros membros: defines tarefas, colaboras em código, iteras e entregas. A dinâmica mais próxima de uma equipa de engenharia real que vais encontrar antes de estares numa.',
  },
  {
    icon: BookMarked,
    title: 'Recursos e Roadmaps Curados',
    desc: 'Materiais selecionados por profissionais da área — sem o ruído das playlists infinitas. Roadmaps validados, templates e referências que podes usar de imediato.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            03 // Como Funciona
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Como a CommitPT torna isso possível.
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            Não é magia. São mecanismos concretos, repetidos todas as semanas, com as pessoas
            certas. É assim que o crescimento deixa de ser acidental e passa a ser inevitável.
          </Typography>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <FeatureCard
              key={s.title}
              icon={<s.icon className="icon" aria-hidden="true" />}
              title={s.title}
              description={s.desc}
            />
          ))}
        </div>
        <div
          id="join"
          className="mt-20 rounded-lg border border-border bg-surface p-8 text-center lg:p-12 shadow-xl shadow-black/40"
        >
          <Typography variant="h3" className="sm:text-3xl">
            Já sabes qual é o problema. A solução está a um clique.
          </Typography>
          <Typography variant="p" color="muted" className="mx-auto mt-3 max-w-xl">
            Junta-te a mais de 350 programadores portugueses que pararam de aprender sozinhos.
          </Typography>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'lg' })}
            >
              Adere já
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://discord.gg/yGAbprCBrT"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              style={{ color: 'oklch(0.8 0.1 240)' }}
            >
              <MessageCircle size={16} />
              Experimenta o Discord Grátis
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
