import type { Metadata } from 'next'
import { buttonVariants, Typography } from '@commitpt/design-system'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Github,
  Trophy,
  Ticket,
  UserPlus,
  Lock,
  ShieldAlert,
  DoorOpen,
  Layers,
  Palette,
  BookOpen,
  Package,
  GitMerge,
  Zap,
  Filter,
  Smartphone,
  Search,
  Rocket,
  Code2,
  GitBranch,
  GraduationCap,
  Map,
  Shield,
  Database,
  Server,
  type LucideIcon,
} from 'lucide-react'
import { projects, type Project } from '@/src/data/projects'
import { notFound } from 'next/navigation'

// ── Icon registry ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Trophy,
  Ticket,
  UserPlus,
  Lock,
  ShieldAlert,
  DoorOpen,
  Layers,
  Palette,
  BookOpen,
  Package,
  GitMerge,
  Zap,
  Filter,
  Smartphone,
  Search,
  Rocket,
  Code2,
  GitBranch,
  GraduationCap,
  Map,
  Shield,
  Database,
  Server,
}

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Code2
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.commitpt.com'

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    return { title: 'Projeto não encontrado — CommitPT' }
  }

  const title = `${project.title} — CommitPT`
  const description = `${project.tagline} Um projeto open source desenvolvido colaborativamente pela comunidade CommitPT.`
  const url = `${BASE_URL}/projects/${project.id}`

  return {
    title,
    description,
    keywords: [
      ...project.tags,
      'commitpt',
      'projetos open source',
      'comunidade programadores portugal',
      project.title.toLowerCase(),
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'CommitPT',
      locale: 'pt_PT',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3)

  return (
    <div className="relative overflow-hidden">
      <HeroSection project={project} />
      <MissionSection project={project} />
      <FeaturesSection project={project} />
      <LearningsSection project={project} />
      <WorkflowSection project={project} />
      <ImpactSection project={project} />
      <OtherProjectsSection projects={otherProjects} />
      <CtaSection />
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-16 py-12 lg:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft size={16} />
        <span className="text-sm font-medium">Voltar aos Projetos</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Projeto da Comunidade
          </div>

          <Typography
            variant="h1"
            className="leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-5xl mb-5"
          >
            {project.title}
          </Typography>

          <p className="text-lg leading-relaxed text-muted-foreground mb-8 max-w-lg">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: 'lg', className: 'gap-2' })}
              >
                <Github size={16} />
                Ver no GitHub
              </a>
            )}
            {project.storybookLink && (
              <a
                href={project.storybookLink}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2' })}
              >
                <BookMarked size={16} />
                Ver Storybook
              </a>
            )}
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2' })}
            >
              Contribuir para este Projeto
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="relative">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-auto rounded-xl border border-border bg-surface object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

// ── Mission ───────────────────────────────────────────────────────────────────

function MissionSection({ project }: { project: Project }) {
  const cards = [
    { label: 'O Problema', text: project.mission.problem },
    { label: 'A Importância', text: project.mission.importance },
    { label: 'O Impacto', text: project.mission.impact },
  ]

  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// A missão deste projeto'}
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {cards.map((card) => (
            <div
              key={card.label}
              className="border border-border bg-surface rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <p className="font-mono text-xs text-muted-foreground mb-3">{card.label}</p>
              <p className="text-sm leading-relaxed text-foreground">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesSection({ project }: { project: Project }) {
  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// Funcionalidades'}
        </Typography>

        <Typography variant="h2" className="tracking-[-0.02em] mt-3 mb-12">
          O que este projeto faz
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.features.map((feature) => {
            const Icon = resolveIcon(feature.iconName)
            return (
              <div
                key={feature.title}
                className="border border-border bg-surface rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-4 inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20">
                  <Icon size={20} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground mb-2">{feature.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Learnings ─────────────────────────────────────────────────────────────────

function LearningsSection({ project }: { project: Project }) {
  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// O que vais aprender'}
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
          <div>
            <Typography variant="h2" className="tracking-[-0.02em] mb-4">
              Neste projeto vais trabalhar com
            </Typography>
            <p className="text-base leading-relaxed text-muted-foreground">
              Contribuir para projetos reais é a forma mais rápida de crescer como engenheiro. Aqui
              não trabalhas apenas com tecnologias — trabalhas em equipa, com code reviews, com
              processos reais e com responsabilidade.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.learnings.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-sm text-foreground"
              >
                <span className="text-primary font-bold">✓</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Workflow ──────────────────────────────────────────────────────────────────

function WorkflowSection({ project }: { project: Project }) {
  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// Como contribuímos'}
        </Typography>

        <Typography variant="h2" className="tracking-[-0.02em] mt-3 mb-12">
          O processo de contribuição
        </Typography>

        <div className="flex flex-wrap items-center gap-3">
          {project.workflow.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-3 border border-border bg-surface rounded-lg px-4 py-3">
                <span className="font-mono text-xs text-primary shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-sm text-foreground">{step}</span>
              </div>
              {index < project.workflow.length - 1 && (
                <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Impact ────────────────────────────────────────────────────────────────────

function ImpactSection({ project }: { project: Project }) {
  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// Impacto'}
        </Typography>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {project.impact.map((metric) => (
            <div
              key={metric.label}
              className="border border-border bg-surface rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
            >
              <p className="font-mono text-3xl font-bold bg-linear-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent mb-2">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Other Projects ────────────────────────────────────────────────────────────

function OtherProjectsSection({ projects: otherProjects }: { projects: Project[] }) {
  if (otherProjects.length === 0) return null

  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <Typography variant="overline" color="secondary" as="span" className="font-mono">
          {'// Explora outros projetos'}
        </Typography>

        <Typography variant="h2" className="tracking-[-0.02em] mt-3 mb-12">
          Outros projetos da comunidade
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div className="group h-full border border-border bg-surface rounded-xl overflow-hidden hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer flex flex-col">
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="border border-border bg-surface rounded-2xl p-10 lg:p-16 text-center">
          <Typography variant="h2" className="tracking-[-0.02em] mb-6">
            Gostavas de contribuir?
          </Typography>

          <p className="text-base leading-relaxed text-muted-foreground mb-10 max-w-2xl mx-auto">
            Todos os projetos são desenvolvidos colaborativamente por membros da comunidade. Se
            queres ganhar experiência em projetos reais, colaborar com outros engenheiros e
            contribuir para ferramentas utilizadas diariamente, junta-te à comunidade.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: 'lg', className: 'gap-2' })}
            >
              Entrar na CommitPT
              <ArrowRight size={16} />
            </a>
            <Link
              href="/projects"
              className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2' })}
            >
              Explorar todos os projetos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
