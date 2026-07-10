import type { Metadata } from 'next'
import { buttonVariants, Typography } from '@commitpt/design-system'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/src/data/projects'

export const metadata: Metadata = {
  title: 'Projetos CommitPT — Ferramentas Desenvolvidas pela Comunidade',
  description:
    'Conheça os projetos internos desenvolvidos pela CommitPT. Discord Bot, Website, Plataforma CommitPT e Design System.',
  keywords: ['commitpt projetos', 'ferramentas desenvolvimento', 'projetos open source'],
  openGraph: {
    type: 'website',
    title: 'Projetos CommitPT',
    description: 'Conheça os projetos internos desenvolvidos pela CommitPT.',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
  },
}

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 py-12 lg:py-20">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Projetos internos da comunidade
          </span>

          <Typography variant="h2" className="leading-[1.08] tracking-[-0.02em] mb-6">
            Ferramentas que movem CommitPT
          </Typography>

          <Typography variant="p" color="muted" className="max-w-2xl mx-auto">
            Conheça os projetos internos construídos pela comunidade. Cada ferramenta foi
            desenvolvida com foco em simplificar e potenciar a experiência dos nossos membros.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div className="group h-full border border-border bg-surface rounded-xl overflow-hidden hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer flex flex-col">
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <Typography
                    variant="h4"
                    className="mb-3 group-hover:text-primary transition-colors"
                  >
                    {project.title}
                  </Typography>

                  <Typography variant="p" color="muted" className="mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </Typography>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    className={buttonVariants({ variant: 'outline', className: 'w-full gap-2' })}
                  >
                    Ver mais
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
