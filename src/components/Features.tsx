import { ArrowRight, Users, MessageCircle, Rocket, LucideIcon } from 'lucide-react'

interface Step {
  number: string
  icon: LucideIcon
  title: string
  desc: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: Users,
    title: 'Entras e escolhes o teu caminho',
    desc: 'Ao entrar, escolhes as áreas que mais te interessam e passas imediatamente a ter contacto com pessoas dessas mesmas áreas. Sem fricção, sem esperas.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Participas e colaboras em projetos reais',
    desc: 'A comunidade promove projetos internos nos quais podes participar e colaborar com outros membros. Não há pressão para entregar — mas recomendamos que o faças, porque é assim que se evolui.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Fazes ship',
    desc: 'A tua primeira demo. A tua primeira revisão de código de alguém que já esteve lá. O teu primeiro momento de "eu realmente consegui." Depois fazes de novo.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative bg-ink-light">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">03 // Como Funciona</span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Como funciona na prática.
          </h2>
          <p className="mt-4 text-muted">
            Entras, escolhes as tuas áreas, conheces pessoas e começas a evoluir. Sem complicações.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col">
              {i !== steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-px w-full -translate-y-1/2 border-t-2 border-dashed border-border md:block" />
              )}
              <div className="relative flex h-full flex-col items-start rounded-lg border border-border bg-ink-light p-6">
                <span className="mb-4 font-mono text-sm text-muted">{step.number}</span>
                <step.icon className="mb-4 h-8 w-8 text-git-add" />
                <h3 className="mb-2 text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          id="join"
          className="mt-20 rounded-lg border border-border bg-ink-light p-8 text-center lg:p-12"
        >
          <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Dá hoje o primeiro passo rumo à vida dos teus sonhos.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Junta-te às mais de 200 pessoas que já fazem parte da comunidade.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-git-add px-6 py-3 text-sm font-semibold text-ink hover:bg-[#4bc45d] transition-colors"
            >
              Adere já
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://discord.gg/yGAbprCBrT"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-ink px-6 py-3 text-sm font-semibold text-text-primary hover:border-git-add hover:text-git-add transition-colors"
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
