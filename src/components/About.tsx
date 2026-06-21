import { CheckCircle, MessageSquare, Calendar, Trophy, BookOpen, LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  desc: string
}

const benefits: Benefit[] = [
  {
    icon: CheckCircle,
    title: 'Para de abandonar projetos a meio',
    desc: 'Publica o teu objetivo semanal à segunda-feira. O teu grupo faz check-in à sexta. Projetos que morrem em isolamento sobrevivem quando há engenheiros experientes a acompanhar.',
  },
  {
    icon: MessageSquare,
    title: 'Recebe feedback de engenheiros que já fizeram ship',
    desc: 'Partilha o teu PR ou decisão de arquitetura e recebe feedback honesto e experiente — não o silêncio do Stack Overflow nem conselhos genéricos.',
  },
  {
    icon: Calendar,
    title: 'Constrói em público, faz ship a tempo',
    desc: 'Sessões de co-working ao vivo onde os membros constroem juntos e fazem commit antes de sair. Responsabilidade em tempo real, não apenas um canal que ninguém lê.',
  },
  {
    icon: Trophy,
    title: 'Constrói a consistência que te contrata',
    desc: 'Desafios semanais e commit streaks que transformam "faço amanhã" num historial que podes mostrar a empregadores.',
  },
  {
    icon: BookOpen,
    title: 'Ignora o ruído, fica com o que importa',
    desc: 'Roadmaps validados, templates usados por engenheiros na indústria, e workshops sobre as competências que fazem as carreiras avançar — não mais uma playlist do YouTube.',
  },
  {
    icon: MessageSquare,
    title: 'Desenvolve as soft skills que te distinguem',
    desc: 'Comunicar ideias, dar feedback construtivo, colaborar sob pressão — treinas tudo isto aqui. É o mais próximo de um ambiente de empresa real que vais ter antes de estares numa.',
  },
]

export default function About() {
  return (
    <section id="about" className="border-y border-border bg-ink-light">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">01 // O Que Recebes</span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Competências técnicas são só metade do caminho.
          </h2>
          <p className="mt-4 text-muted">
            Os melhores engenheiros sabem colaborar, dar e receber feedback, e trabalhar bem com
            outros. A CommitPT desenvolve as duas partes — porque é isso que o mercado realmente
            valoriza.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group relative rounded-lg border border-border bg-ink p-6 hover:border-git-add transition-colors"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-git-add opacity-0 transition-opacity group-hover:opacity-100" />
              <b.icon className="mb-4 h-6 w-6 text-git-add" />
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{b.title}</h3>
              <p className="text-sm text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
