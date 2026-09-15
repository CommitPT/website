'use client'

import SectionHeader from '@/src/components/SectionHeader'
import { trackEvent } from '@/src/lib/analytics'
import { projects, type Project } from '@/src/data/projects'
import { Typography } from '@commitpt/design-system'
import {
  BookOpen,
  ChevronDown,
  Code2,
  DoorOpen,
  GitBranch,
  GitMerge,
  Layers,
  Lock,
  LucideIcon,
  Package,
  Palette,
  Rocket,
  Search,
  ShieldAlert,
  Smartphone,
  Ticket,
  Trophy,
  UserPlus,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

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
  Smartphone,
  Search,
  Rocket,
  Code2,
  GitBranch,
}

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Code2
}

// ── Data ──────────────────────────────────────────────────────────────────────

const visibleProjects = projects.filter((project) => project.status === 'active')

// ── Component ─────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <SectionHeader
          eyebrow="Projetos"
          title="Não ficamos apenas pela conversa."
          description="Membros participam em projetos da comunidade com Git, pull requests e code review, a forma mais rápida de ganhar experiência prática."
          className="mb-12"
        />

        {/* Project Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const topImpact = project.impact.slice(0, 2)

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50">
      <Typography variant="h4" className="mb-2">
        {project.title}
      </Typography>
      <Typography variant="p" color="muted" className="mb-4 flex-1 leading-relaxed">
        {project.description}
      </Typography>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      {expanded && (
        <div className="mb-5 space-y-4 border-t border-border pt-5">
          <Typography variant="small" color="muted" className="leading-relaxed">
            {project.mission.impact}
          </Typography>

          <ul className="space-y-2">
            {project.features.slice(0, 3).map((feature) => {
              const Icon = resolveIcon(feature.iconName)
              return (
                <li key={feature.title} className="flex items-center gap-2 text-sm text-foreground">
                  <Icon size={14} className="shrink-0 text-primary" aria-hidden="true" />
                  {feature.title}
                </li>
              )
            })}
          </ul>

          <div className="flex flex-wrap gap-4">
            {topImpact.map((metric) => (
              <div key={metric.label}>
                <span className="font-mono text-lg font-bold text-primary">{metric.value}</span>{' '}
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          const next = !expanded
          setExpanded(next)
          if (next) trackEvent('project_interaction', { project: project.id, action: 'expand' })
        }}
        className="group/btn mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
        aria-expanded={expanded}
      >
        {expanded ? 'Ver menos' : 'Ver mais'}
        <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}
