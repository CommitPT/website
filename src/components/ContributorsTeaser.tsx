import { Avatar, AvatarImage, AvatarFallback, Typography } from '@commitpt/design-system'
import { ArrowRight } from 'lucide-react'
import contributorsData from '@/src/contributors.json'

const preview = contributorsData.slice(0, 5)

export default function ContributorsTeaser() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
          <Typography variant="overline" color="secondary" as="span" className="font-mono">
            06 // Contribuidores
            </Typography>
            <Typography variant="h2" className="mt-3 sm:text-4xl">
              Pessoas reais a construir em público.
            </Typography>
            <Typography variant="p" color="muted" className="mt-4">
              A CommitPT é feita pelas pessoas que nela participam. Conhece quem está por trás dos
              projetos, das revisões de código e das sessões de co-working.
            </Typography>
            <a
              href="/contributors"
              className="group mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Ver todos os contribuidores
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {preview.map((c) => (
              <div key={c.githubUsername} className="group relative">
                <Avatar variant="secondary" className="h-14 w-14" tooltip={c.name}>
                  <AvatarImage src={`https://github.com/${c.githubUsername}.png`} alt={c.name} />
                  <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            ))}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-surface font-mono text-xs font-bold text-muted-foreground">
              +20
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
