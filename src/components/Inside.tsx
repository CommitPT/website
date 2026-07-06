import { BookOpen, EyeOff, Clock, FolderOpen, Unlink, Compass, LucideIcon } from 'lucide-react'
import { Typography } from '@commitpt/design-system'

interface Problem {
  icon: LucideIcon
  title: string
  desc: string
}

const problems: Problem[] = [
  {
    icon: BookOpen,
    title: 'Aprendes muito, constróis pouco',
    desc: 'Segues tutoriais, entendes os conceitos, resolves os exercícios. Mas quando abres um projeto em branco, o bloqueio aparece. O conhecimento está lá — só não é ainda verdadeiramente teu.',
  },
  {
    icon: EyeOff,
    title: 'Sem feedback, repetes os mesmos erros',
    desc: 'Há hábitos de código que estás a cultivar há meses que nunca devias ter aprendido. Sem ninguém que os identifique, nunca saberás que existem — até que alguém numa entrevista os aponte.',
  },
  {
    icon: Clock,
    title: 'Sem accountability, tudo fica para amanhã',
    desc: 'Planeias trabalhar no projeto este fim-de-semana. Surge algo. Depois outra coisa. Como não há ninguém a contar contigo, adiar não tem consequências — até perceberes que passaram meses.',
  },
  {
    icon: FolderOpen,
    title: 'Projetos a meio que nunca chegam a lado nenhum',
    desc: 'A pasta de projetos está cheia. Nenhum em produção. Cada ideia nova parece mais urgente do que terminar o que já começaste — e o ciclo repete-se indefinidamente.',
  },
  {
    icon: Unlink,
    title: 'Soft skills não se treinam em tutoriais',
    desc: 'Comunicar uma decisão técnica, dar feedback útil, trabalhar em equipa sob pressão — são as competências que mais distinguem quem evolui. E não há curso que as ensine.',
  },
  {
    icon: Compass,
    title: 'O mercado é opaco quando estás de fora',
    desc: 'Não sabes o que as empresas realmente procuram. Processos de entrevista, progressão salarial, transições de carreira — tudo parece uma caixa negra sem acesso a quem já passou por isso.',
  },
]

export default function Inside() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            01 // O Problema
          </Typography>
          <Typography variant="h2" className="mt-3 sm:text-4xl">
            Crescer como engenheiro é difícil.{' '}
            <span className="text-muted-foreground">Sozinho, é quase impossível.</span>
          </Typography>
          <Typography variant="p" color="muted" className="mt-4">
            A maioria dos programadores está presa num ciclo que não reconhece. Mais um tutorial.
            Mais um projeto a meio. Mais uma semana sem evoluir de verdade.
          </Typography>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 hover:border-destructive transition-colors"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-destructive opacity-0 transition-opacity group-hover:opacity-100" />
              <p.icon className="mb-4 h-6 w-6 text-destructive" />
              <Typography variant="h5" className="mb-2">
                {p.title}
              </Typography>
              <Typography variant="small" color="muted">
                {p.desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
