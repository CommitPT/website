import { buttonVariants } from '@commitpt/design-system'
import { ArrowRight, Code, MessageCircle, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-15 lg:items-start">
          <div>
            <div className="hero-enter-1 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              300+ programadores portugueses já dentro
            </div>

            <h1 className="hero-enter-2 text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[46px] mb-7">
              A comunidade que transforma programadores em{' '}
              <span className="block font-mono bg-linear-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                engenheiros de topo.
              </span>
            </h1>

            <p className="hero-enter-3 max-w-[520px] text-[17px] leading-[1.65] text-muted-foreground mb-9">
              Ser um engenheiro de topo não é só ser bom tecnicamente. É saber colaborar, receber
              críticas, comunicar bem e trabalhar em equipa. A CommitPT é o ambiente mais próximo de
              uma empresa real que vais encontrar — antes de estares numa.
            </p>

            <div className="hero-enter-4 flex flex-col gap-4 sm:flex-row mb-8">
              <a
                href="https://whop.com/commitpt-709e/commit-plus"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: 'lg' })}
              >
                Junta-te à Comunidade
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://discord.gg/yGAbprCBrT"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                <MessageCircle size={16} />
                Experimenta o Discord Grátis
              </a>
            </div>

            <div className="hero-enter-5 flex flex-wrap gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />
                <span>
                  <strong className="font-mono font-semibold text-foreground">300+</strong> membros
                  ativos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Code size={18} className="text-warning" />
                <span>
                  <strong className="font-mono font-semibold text-foreground">5+</strong> anos de
                  experiência no mercado
                </span>
              </div>
            </div>
          </div>

          <div className="hero-enter-6">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}

function Terminal() {
  return (
    <div className="rounded-lg border border-border bg-surface shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-warning" />
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">~ sprint-2026-Q3</span>
      </div>
      <div
        className="p-4 text-sm leading-relaxed sm:p-6"
        style={{ fontFamily: 'Consolas, monospace' }}
      >
        <div className="flex gap-4">
          <div className="flex flex-col text-right text-muted-foreground select-none">
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
              <span className="text-foreground">=</span>{' '}
              <span className="text-syntax-purple">new</span>{' '}
              <span className="text-syntax-blue">CommitPT</span>
              <span className="text-foreground">();</span>
            </div>
            <div className="text-muted-foreground">{'// Engenheiros reais. Feedback real.'}</div>
            <div>
              <span className="text-destructive">-</span>{' '}
              <span className="text-destructive">isolation</span>
            </div>
            <div>
              <span className="text-primary">+</span>{' '}
              <span className="text-primary">weeklyShips</span>
            </div>
            <div>
              <span className="text-primary">+</span>{' '}
              <span className="text-primary">codeReviews</span>
            </div>
            <div>
              <span className="text-primary">+</span>{' '}
              <span className="text-primary">careerGrowth</span>
            </div>
            <div className="text-muted-foreground">{'// commit para o teu próximo nível.'}</div>
            <div>
              <span className="text-syntax-purple">await</span>{' '}
              <span className="text-syntax-blue">community</span>.
              <span className="text-syntax-blue">join</span>
              <span className="text-foreground">();</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
