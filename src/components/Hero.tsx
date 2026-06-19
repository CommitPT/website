import { ArrowRight, MessageCircle, Users, Code } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-ink-light px-3 py-1 font-mono text-xs text-git-add">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-git-add opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-git-add"></span>
              </span>
              accepting new members
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Ship code.
              <br />
              Stay <span className="text-git-add font-mono">accountable</span>.
              <br />
              Grow together.
            </h1>
            <p className="max-w-lg text-lg text-muted">
              CommitPT is a community for programmers who want to stop coding alone and start
              building in public—through weekly accountability, reviews, and real momentum.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://whop.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-git-add px-6 py-3 text-sm font-semibold text-ink hover:bg-[#4bc45d] transition-colors"
              >
                Join on Whop
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-ink-light px-6 py-3 text-sm font-semibold text-text-primary hover:border-git-add hover:text-git-add transition-colors"
              >
                <MessageCircle size={16} />
                Join Discord
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-git-add" />
                <span>Accountability groups</span>
              </div>
              <div className="flex items-center gap-2">
                <Code size={18} className="text-git-amber" />
                <span>Weekly build sessions</span>
              </div>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  )
}

function Terminal() {
  return (
    <div className="rounded-lg border border-border bg-ink-light shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-graphite px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-git-del" />
        <div className="h-3 w-3 rounded-full bg-git-amber" />
        <div className="h-3 w-3 rounded-full bg-git-add" />
        <span className="ml-2 font-mono text-xs text-muted">commitpt-landing.md</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed sm:p-6">
        <div className="flex gap-4">
          <div className="flex flex-col text-right text-muted select-none">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-syntax-purple">const</span>{' '}
              <span className="text-syntax-blue">community</span>{' '}
              <span className="text-text-primary">=</span>{' '}
              <span className="text-syntax-purple">new</span>{' '}
              <span className="text-syntax-blue">CommitPT</span>
              <span className="text-text-primary">();</span>
            </div>
            <div className="text-muted">{'// Stop coding alone.'}</div>
            <div>
              <span className="text-git-del">-</span>{' '}
              <span className="text-git-del">procrastination</span>
            </div>
            <div>
              <span className="text-git-add">+</span>{' '}
              <span className="text-git-add">accountability</span>
            </div>
            <div>
              <span className="text-git-add">+</span>{' '}
              <span className="text-git-add">weeklyShips</span>
            </div>
            <div className="text-muted">{'// Build habits that compound.'}</div>
            <div>
              <span className="text-syntax-purple">await</span>{' '}
              <span className="text-syntax-blue">community</span>.
              <span className="text-syntax-blue">join</span>
              <span className="text-text-primary">();</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
