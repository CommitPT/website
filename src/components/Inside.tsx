import {
  Video,
  GitPullRequest,
  Briefcase,
  Users,
  BookOpen,
  MessageSquare,
  LucideIcon,
} from 'lucide-react'

interface Activity {
  icon: LucideIcon
  title: string
  desc: string
}

const activities: Activity[] = [
  {
    icon: Video,
    title: 'Sessões ao Vivo',
    desc: 'Chamadas regulares onde os membros partilham o que estão a construir, discutem desafios técnicos e recebem feedback em tempo real.',
  },
  {
    icon: GitPullRequest,
    title: 'Revisões de Código',
    desc: 'Partilha o teu PR ou arquitetura e recebe feedback honesto. Aprendes a dar e a receber críticas construtivas — uma das soft skills mais valorizadas no mercado.',
  },
  {
    icon: Briefcase,
    title: 'Discussões de Carreira',
    desc: 'De entrevistas a negociação de salário — abordamos os temas que as faculdades não ensinam e que fazem diferença no mercado.',
  },
  {
    icon: Users,
    title: 'Networking Real',
    desc: 'Colabora em projetos reais com outros membros, pratica trabalho em equipa e cria ligações com programadores portugueses dentro e fora do país.',
  },
  {
    icon: BookOpen,
    title: 'Recursos e Roadmaps',
    desc: 'Acesso a roadmaps validados, templates e recursos curados por profissionais da área — sem o ruído das playlists infinitas.',
  },
  {
    icon: MessageSquare,
    title: 'Suporte Contínuo',
    desc: 'Tens uma dúvida técnica, um bloqueio ou só queres saber se estás no caminho certo? A comunidade está sempre disponível.',
  },
]

export default function Inside() {
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">
            02 // O Que Acontece Cá Dentro
          </span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            O que encontras quando entras.
          </h2>
          <p className="mt-4 text-muted">
            Não é só um servidor de Discord. É o ambiente mais próximo de uma empresa real que vais
            encontrar — onde desenvolves competências técnicas e soft skills em simultâneo.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a) => (
            <div
              key={a.title}
              className="group relative rounded-lg border border-border bg-ink-light p-6 hover:border-git-add transition-colors"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-git-add opacity-0 transition-opacity group-hover:opacity-100" />
              <a.icon className="mb-4 h-6 w-6 text-git-add" />
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{a.title}</h3>
              <p className="text-sm text-muted">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
