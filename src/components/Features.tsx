import { ArrowRight, CreditCard, MessageCircle, Rocket, LucideIcon } from 'lucide-react'

interface Step {
  number: string
  icon: LucideIcon
  title: string
  desc: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: CreditCard,
    title: 'Join on Whop',
    desc: 'Pick a membership tier and unlock the community.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Connect on Discord',
    desc: 'Introduce yourself, pick your channels, and meet your squad.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Commit & ship',
    desc: 'Set weekly goals, build in public, and celebrate the wins.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-sl font-bold text-git-amber">02 // How It Works</span>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            From signup to shipped in three steps.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i !== steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-px w-full -translate-y-1/2 border-t-2 border-dashed border-border md:block" />
              )}
              <div className="relative flex flex-col items-start rounded-lg border border-border bg-ink-light p-6">
                <span className="mb-4 font-mono text-sm text-muted">{step.number}</span>
                <step.icon className="mb-4 h-8 w-8 text-git-add" />
                <h3 className="mb-2 text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          id="join"
          className="mt-20 rounded-lg border border-border bg-ink-light p-8 text-center lg:p-12"
        >
          <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">Ready to commit?</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Join the community today. Start with Discord or unlock the full experience on Whop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
              className="inline-flex items-center gap-2 rounded-md border border-border bg-ink px-6 py-3 text-sm font-semibold text-text-primary hover:border-git-add hover:text-git-add transition-colors"
            >
              <MessageCircle size={16} />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
