import { CheckCircle, MessageSquare, Calendar, Trophy, BookOpen, LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  desc: string
}

const benefits: Benefit[] = [
  {
    icon: CheckCircle,
    title: 'Accountability threads',
    desc: 'Share weekly goals and check-ins so you actually finish projects.',
  },
  {
    icon: MessageSquare,
    title: 'Code reviews & feedback',
    desc: 'Get eyes on your PRs, architecture, and side projects.',
  },
  {
    icon: Calendar,
    title: 'Co-working sessions',
    desc: 'Show up, build together, and ship more consistently.',
  },
  {
    icon: Trophy,
    title: 'Challenges & streaks',
    desc: 'Gamified commitments that make habit-building stick.',
  },
  {
    icon: BookOpen,
    title: 'Curated resources',
    desc: 'Roadmaps, templates, and workshops for your next level.',
  },
]

export default function About() {
  return (
    <section id="about" className="border-y border-border bg-ink-light">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm font-bold text-git-amber">01 // What You Get</span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            A community built around shipping.
          </h2>
          <p className="mt-4 text-muted">
            We don&apos;t trade motivational quotes. We trade commits, code reviews, and shipped
            demos.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group relative rounded-lg border border-border bg-ink p-6 hover:border-git-add transition-colors"
            >
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-git-add opacity-0 transition-opacity group-hover:opacity-100" />
              <b.icon className="mb-4 h-6 w-6 text-git-add" />
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{b.title}</h3>
              <p className="text-sm text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
