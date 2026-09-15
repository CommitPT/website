'use client'

import { DISCORD_URL } from '@/src/lib/links'
import { trackEvent } from '@/src/lib/analytics'
import { buttonVariants, Typography } from '@commitpt/design-system'
import { ArrowRight, ChevronDown } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Segment = { text: string; className: string }

// ── Constants ─────────────────────────────────────────────────────────────────

const LINES: Segment[][] = [
  [
    { text: 'const ', className: 'text-syntax-purple' },
    { text: 'comunidade ', className: 'text-syntax-blue' },
    { text: '= ', className: 'text-foreground' },
    { text: 'new ', className: 'text-syntax-purple' },
    { text: 'CommitPT', className: 'text-syntax-blue' },
    { text: '();', className: 'text-foreground' },
  ],
  [
    {
      text: '// Uma comunidade portuguesa de Engenharia de Software.',
      className: 'text-muted-foreground',
    },
  ],
  [
    { text: '+', className: 'text-primary-400' },
    { text: ' comunidade', className: 'text-primary-400' },
  ],
  [
    { text: '-', className: 'text-destructive' },
    { text: ' isolamento', className: 'text-destructive' },
  ],
  [
    { text: '+', className: 'text-primary-400' },
    { text: ' projetos', className: 'text-primary-400' },
  ],
  [
    { text: '-', className: 'text-destructive' },
    { text: ' procrastinação', className: 'text-destructive' },
  ],
  [
    { text: '+', className: 'text-primary-400' },
    { text: ' evolução', className: 'text-primary-400' },
  ],
  [{ text: '// Entra na comunidade. É grátis.', className: 'text-muted-foreground' }],
  [
    { text: 'await ', className: 'text-syntax-purple' },
    { text: 'comunidade', className: 'text-syntax-blue' },
    { text: '.', className: 'text-foreground' },
    { text: 'entrar', className: 'text-syntax-blue' },
    { text: '();', className: 'text-foreground' },
  ],
]

const CHAR_MS = 24
const LINE_PAUSE_MS = 120
// Espera que o terminal acabe de entrar antes de começar a escrever.
const START_MS = 900

// Cada linha revela-se com uma animação CSS `steps()` sobre a largura. O `ch`
// só é exato porque o bloco usa fonte monoespaçada.
const TIMELINE = (() => {
  let start = START_MS
  return LINES.map((line) => {
    const chars = line.reduce((sum, seg) => sum + seg.text.length, 0)
    const entry = { chars, delay: start, duration: chars * CHAR_MS }
    start += entry.duration + LINE_PAUSE_MS
    return entry
  })
})()

const TOTAL_MS = TIMELINE.reduce((sum, line) => sum + line.duration + LINE_PAUSE_MS, START_MS)

const ARIA_SCRIPT = LINES.map((line) => line.map((seg) => seg.text).join('')).join(' ')

// ── Component ─────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-15 lg:items-center">
          {/* Main Content Area */}
          <div>
            {/* Headline */}
            <Typography
              variant="h1"
              className="hero-enter-1 leading-[1.15] tracking-[-0.02em] sm:text-5xl lg:text-[46px] mb-7"
            >
              Junta-te à{' '}
              <span className="font-mono bg-linear-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                melhor comunidade de programação
              </span>{' '}
              de Portugal.
            </Typography>

            {/* Description */}
            <p className="hero-enter-2 max-w-[520px] text-base leading-relaxed text-muted-foreground mb-9">
              Junta-te a uma comunidade portuguesa de Engenharia de Software onde podes aprender com
              outros developers, participar em eventos, construir projetos e evoluir em conjunto.
            </p>

            {/* Action Buttons */}
            <div className="hero-enter-3 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' }) + ' group'}
                onClick={() => trackEvent('hero_join_click', { destination: 'discord' })}
              >
                Entrar Gratuitamente
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#happens"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Explorar a comunidade
                <ChevronDown
                  size={15}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Terminal Container */}
          <div className="hero-enter-4">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Terminal() {
  return (
    <div
      className="rounded-lg border border-border bg-surface shadow-2xl shadow-black/40 overflow-hidden min-h-[300px]"
      role="img"
      aria-label={`Editor de código animado: ${ARIA_SCRIPT}`}
    >
      {/* Window Controls & Bar */}
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-warning" />
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="ml-2 font-mono text-xs font-semibold text-muted-foreground">
          ~ index.js
        </span>
      </div>

      {/* Editor Body */}
      <div className="p-4 font-mono text-sm leading-relaxed sm:p-6 space-y-1 bg-surface">
        {LINES.map((line, lineIdx) => (
          <div key={lineIdx} className="flex">
            <span className="w-6 shrink-0 text-right text-muted-foreground select-none mr-4">
              {lineIdx + 1}
            </span>
            <span
              className="tw-line"
              style={{
                width: `${TIMELINE[lineIdx].chars}ch`,
                animationDuration: `${TIMELINE[lineIdx].duration}ms`,
                animationDelay: `${TIMELINE[lineIdx].delay}ms`,
                animationTimingFunction: `steps(${TIMELINE[lineIdx].chars})`,
              }}
            >
              {line.map((seg, segIdx) => (
                <span key={segIdx} className={seg.className}>
                  {seg.text}
                </span>
              ))}
            </span>
          </div>
        ))}

        <div
          className="tw-prompt flex items-center gap-2 mt-2"
          style={{ animationDelay: `${TOTAL_MS}ms` }}
        >
          <span className="w-6 shrink-0" />
          <span className="text-primary">$</span>
          <span className="inline-block w-[2px] h-[0.9em] bg-primary animate-pulse align-middle" />
        </div>
      </div>
    </div>
  )
}
