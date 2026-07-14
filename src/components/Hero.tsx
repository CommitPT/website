'use client'

import { Badge, buttonVariants, Typography } from '@commitpt/design-system'
import { ArrowRight, Briefcase, MessageCircle, Mic, Star, Users } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'

type Segment = { text: string; className: string }

const LINES: Segment[][] = [
  [
    { text: 'const ', className: 'text-syntax-purple' },
    { text: 'comunidade ', className: 'text-syntax-blue' },
    { text: '= ', className: 'text-foreground' },
    { text: 'new ', className: 'text-syntax-purple' },
    { text: 'CommitPT', className: 'text-syntax-blue' },
    { text: '();', className: 'text-foreground' },
  ],
  [{ text: '// Profissionais experientes.', className: 'text-muted-foreground' }],
  [
    { text: '+', className: 'text-primary-400' },
    { text: ' suporte', className: 'text-primary-400' },
  ],
  [
    { text: '-', className: 'text-destructive' },
    { text: ' isolamento', className: 'text-destructive' },
  ],
  [
    { text: '+', className: 'text-primary-400' },
    { text: ' crescimento', className: 'text-primary-400' },
  ],
  [
    { text: '-', className: 'text-destructive' },
    { text: ' frustrações', className: 'text-destructive' },
  ],
  [
    { text: '+', className: 'text-primary-400' },
    { text: ' impacto', className: 'text-primary-400' },
  ],
  [
    { text: '-', className: 'text-destructive' },
    { text: ' desistência', className: 'text-destructive' },
  ],
  [{ text: '// Dá commit para o próximo nível.', className: 'text-muted-foreground' }],
  [
    { text: 'await ', className: 'text-syntax-purple' },
    { text: 'comunidade', className: 'text-syntax-blue' },
    { text: '.', className: 'text-foreground' },
    { text: 'entrar', className: 'text-syntax-blue' },
    { text: '();', className: 'text-foreground' },
  ],
]

const LINE_ENDS: number[] = (() => {
  let acc = 0
  return LINES.map((line) => {
    acc += line.reduce((s, seg) => s + seg.text.length, 0)
    return acc
  })
})()

const TOTAL_CHARS = LINE_ENDS[LINE_ENDS.length - 1]

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-15 lg:items-center">
          <div>
            <Badge variant="primary" className="hero-enter-1 mb-6">
              350+ programadores portugueses já dentro
            </Badge>

            <Typography
              variant="h1"
              className="hero-enter-2 leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[46px] mb-7"
            >
              A comunidade que transforma programadores em{' '}
              <span className="block font-mono bg-linear-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                engenheiros de topo.
              </span>
            </Typography>

            <p className="hero-enter-3 max-w-[520px] text-base leading-relaxed text-muted-foreground mb-9">
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
                style={{ color: 'oklch(0.8 0.1 240)' }}
              >
                <MessageCircle size={16} />
                Experimenta o Discord Grátis
              </a>
            </div>

            <div
              className="hero-enter-5 flex flex-wrap gap-y-3 text-[13px] font-semibold"
              style={{ color: '#f1f5f9' }}
            >
              {[
                { icon: Users, value: '350+', label: 'membros ativos' },
                { icon: Briefcase, value: '25+', label: 'profissionais da área' },
                { icon: Mic, value: '4+', label: 'sessões por mês' },
                { icon: Star, value: '5+', label: 'anos de experiência' },
              ].map((m, i) => (
                <Fragment key={m.label}>
                  {i > 0 && (
                    <span className="hidden sm:block w-px self-stretch bg-border mx-5 my-0.5" />
                  )}
                  <div className="flex items-center gap-1.5 w-1/2 sm:w-auto">
                    <m.icon size={13} className="text-muted-foreground/60 shrink-0" />
                    <span>
                      <strong className="font-mono font-semibold text-foreground">{m.value}</strong>{' '}
                      {m.label}
                    </span>
                  </div>
                </Fragment>
              ))}
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
  const [displayedChars, setDisplayedChars] = useState(0)
  const isDone = displayedChars >= TOTAL_CHARS

  useEffect(() => {
    if (isDone) return

    const isLineEnd = LINE_ENDS.includes(displayedChars)
    const delay = isLineEnd ? 80 + Math.random() * 100 : 15 + Math.random() * 30

    const timer = setTimeout(() => setDisplayedChars((prev) => prev + 1), delay)
    return () => clearTimeout(timer)
  }, [displayedChars, isDone])

  let remaining = displayedChars
  const renderedLines = LINES.map((line, lineIdx) => {
    if (remaining <= 0) return null

    const lineLen = line.reduce((s, seg) => s + seg.text.length, 0)
    const isActive = remaining < lineLen
    const charsToShow = Math.min(remaining, lineLen)
    remaining -= charsToShow

    let charCount = 0
    const segments = line.map((seg, segIdx) => {
      if (charCount >= charsToShow) return null
      const shown = seg.text.slice(0, charsToShow - charCount)
      charCount += shown.length
      return (
        <span key={segIdx} className={seg.className}>
          {shown}
        </span>
      )
    })

    return (
      <div key={lineIdx} className="flex">
        <span className="w-6 shrink-0 text-right text-muted-foreground select-none mr-4">
          {lineIdx + 1}
        </span>
        <span>
          {segments}
          {isActive && (
            <span className="inline-block w-[2px] h-[0.9em] bg-primary animate-pulse align-middle ml-px" />
          )}
        </span>
      </div>
    )
  })

  return (
    <div
      className="rounded-lg border border-border bg-surface shadow-2xl shadow-black/40 overflow-hidden"
      role="img"
      aria-label="Editor de código animado: const comunidade = new CommitPT(); + suporte - isolamento + crescimento - frustrações + impacto - desistência await comunidade.entrar();"
      data-animation-done={isDone ? 'true' : undefined}
    >
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive" />
        <div className="h-3 w-3 rounded-full bg-warning" />
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="ml-2 font-mono text-xs font-semibold" style={{ color: '#94a3b8' }}>
          ~ index.js
        </span>
      </div>
      <div
        className="p-4 text-sm leading-relaxed sm:p-6 space-y-1 bg-surface"
        style={{ fontFamily: 'Consolas, monospace' }}
      >
        {renderedLines}
        {isDone && (
          <div className="flex items-center gap-2 mt-2">
            <span className="w-6 shrink-0" />
            <span className="text-primary">$</span>
            <span className="inline-block w-[2px] h-[0.9em] bg-primary animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  )
}
