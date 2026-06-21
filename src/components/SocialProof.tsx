interface Testimonial {
  quote: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Fiz ship do meu primeiro projeto pessoal em 3 semanas após entrar. O grupo de responsabilidade aparece mesmo — todas as semanas. Era isso que faltava.',
    name: 'João M.',
    role: 'Junior Frontend Developer',
  },
  {
    quote:
      'Recebi uma revisão de código à minha arquitetura que me poupou de um erro que me teria custado semanas. Esse tipo de feedback não se encontra em estranhos no Reddit.',
    name: 'Ana C.',
    role: 'Backend Engineer',
  },
  {
    quote:
      'Estava preso no tutorial hell há meses. Os objetivos semanais e a pressão do grupo tiraram-me daí. Fiz mais ship em 2 meses aqui do que no ano anterior.',
    name: 'Rodrigo F.',
    role: 'Self-taught Developer',
  },
]

const stats = [
  { value: '200+', label: 'membros ativos' },
  { value: '5+', label: 'anos de experiência no mercado' },
  { value: '4+', label: 'sessões ao vivo/mês' },
]

export default function SocialProof() {
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">
            02 // O Que Dizem os Membros
          </span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Engenheiros reais. Resultados reais.
          </h2>
          <p className="mt-4 text-muted">
            Não acredites só na nossa palavra. É isto que acontece quando os programadores param de
            programar sozinhos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-lg border border-border bg-ink p-6"
            >
              <p className="text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                <p className="font-mono text-xs text-git-amber">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-ink">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-6 text-center">
              <p className="font-mono text-3xl font-bold text-git-add">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
