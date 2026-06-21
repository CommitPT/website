const forYou = [
  'Continuas a começar projetos e não os acabas',
  'Queres crescer mais rápido mas o teu ambiente não te impulsiona',
  'Estás no início da carreira e queres acesso a engenheiros experientes',
  'Estás a construir em público e queres uma comunidade que realmente participa',
  'Estás farto de aprender sozinho com tutoriais que nunca acabam',
]

const notForYou = [
  'Procuras um sítio para estar presente sem contribuir',
  'Queres conteúdo motivacional sem fazer o trabalho',
]

export default function ForWho() {
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 font-mono text-xs text-git-add">{'// isto é para ti se'}</p>
            <ul className="">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 shrink-0 font-mono text-git-add">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs text-git-del">{'// não é para ti se'}</p>
            <ul className="">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 shrink-0 font-mono text-git-del">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
