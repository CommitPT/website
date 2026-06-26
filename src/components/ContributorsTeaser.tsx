import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import contributorsData from '@/src/contributors.json'

const preview = contributorsData.slice(0, 5)

export default function ContributorsTeaser() {
  return (
    <section className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="font-mono text-sm font-bold text-git-amber">07 // Contributors</span>
            <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
              Pessoas reais a construir em público.
            </h2>
            <p className="mt-4 text-muted">
              A CommitPT é feita pelas pessoas que nela participam. Conhece quem está por trás dos
              projetos, das revisões de código e das sessões de co-working.
            </p>
            <a
              href="/contributors"
              className="group mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-ink-light px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-git-add hover:text-git-add"
            >
              Ver todos os contribuidores
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {preview.map((c) => (
              <div key={c.githubUsername} className="group relative">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-border transition-colors group-hover:border-git-add">
                  <Image
                    src={`https://github.com/${c.githubUsername}.png`}
                    alt={c.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-graphite px-2 py-1 font-mono text-xs text-text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {c.name}
                </div>
              </div>
            ))}
            {contributorsData.length > preview.length && (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-ink-light font-mono text-xs font-bold text-muted">
                +{contributorsData.length - preview.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
