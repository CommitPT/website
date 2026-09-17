import LanguageBar from '@/src/components/LanguageBar'
import SectionHeader from '@/src/components/SectionHeader'
import { projects, type Project } from '@/src/data/projects'
import { Typography } from '@commitpt/design-system'

// ── Data ──────────────────────────────────────────────────────────────────────

const active = projects.filter((p) => p.status === 'active')
const upcoming = projects.filter((p) => p.status === 'coming-soon')

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectsBoard() {
  const [featured, ...rest] = active

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeader
          eyebrow="Projetos"
          title="Isto é o que a comunidade construiu."
          description="Repositórios reais, mantidos por membros, com pull requests e code review. A distribuição de linguagens é a que o GitHub reporta em cada repo."
          className="mb-12"
        />

        {/* Um projeto em destaque a ocupar a linha toda, os restantes a meias.
            3 projetos, 2 linhas, sem células vazias. */}
        <div className="grid gap-5 md:grid-cols-2">
          {featured && <RepoPanel project={featured} className="md:col-span-2" featured />}
          {rest.map((project) => (
            <RepoPanel key={project.id} project={project} />
          ))}
        </div>

        {upcoming.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <Typography variant="small" color="muted" className="block">
              Em construção, ainda sem versão pública:
            </Typography>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {upcoming.map((project) => (
                <li key={project.id} className="flex items-baseline gap-2">
                  <span className="font-mono text-sm text-foreground">{project.id}</span>
                  <span className="text-xs text-muted-foreground">{project.tags[0]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function RepoPanel({
  project,
  className = '',
  featured = false,
}: {
  project: Project
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-border bg-surface p-6 lg:p-8 ${className}`}
    >
      <div className={featured ? 'md:flex md:items-start md:justify-between md:gap-12' : ''}>
        <div className={featured ? 'md:max-w-[52%]' : ''}>
          <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
          <Typography variant={featured ? 'h3' : 'h4'} className="mt-2">
            {project.title}
          </Typography>
          <Typography variant="p" color="muted" className="mt-3 leading-relaxed">
            {project.description}
          </Typography>
        </div>

        {project.languages && (
          <div className={featured ? 'mt-8 md:mt-2 md:w-[38%] md:shrink-0' : 'mt-6'}>
            <LanguageBar languages={project.languages} />
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
