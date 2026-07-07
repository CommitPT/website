import { Typography } from '@commitpt/design-system'

const forYou = [
  'Queres evoluir como engenheiro de software e procuras um ambiente que te desafie a crescer',
  'Estás no início da carreira e gostavas de aprender diretamente com engenheiros experientes',
  'Queres construir projetos, receber feedback e aprender com outras pessoas',
  'Estás cansado de aprender sozinho através de tutoriais e procuras uma comunidade ativa',
  'Queres desenvolver competências técnicas e também soft skills como comunicação, colaboração e feedback',
  'Procuras uma comunidade onde as pessoas realmente participam, partilham conhecimento e se ajudam mutuamente',
  'Queres rodear-te de pessoas ambiciosas que te motivem a evoluir',
]

const notForYou = [
  'Procuras apenas consumir conteúdo sem participar na comunidade',
  'Esperas que alguém faça o trabalho por ti ou te dê sempre a resposta',
  'Queres resultados sem investir tempo e esforço na tua evolução',
  'Só procuras conteúdo motivacional, sem intenção de colocar nada em prática',
  'Não tens interesse em colaborar ou contribuir quando puderes',
]

export default function ForWho() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-xs text-primary">{'// isto é para ti se'}</p>
            <ul className="">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-primary">+</span>
                  <Typography variant="small" color="muted">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs text-destructive">{'// não é para ti se'}</p>
            <ul className="">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-destructive">-</span>
                  <Typography variant="small" color="muted">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
