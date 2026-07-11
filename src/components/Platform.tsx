'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Map,
  Newspaper,
  TrendingUp,
  GitCommit,
  LucideIcon,
} from 'lucide-react'
import { Typography } from '@commitpt/design-system'

const LAUNCH_DATE = new Date('2026-08-20T00:00:00')

interface PlatformFeature {
  icon: LucideIcon
  label: string
}

const features: PlatformFeature[] = [
  { icon: Map, label: 'Roadmaps de aprendizagem interativos' },
  { icon: BookOpen, label: 'Cursos práticos' },
  { icon: Newspaper, label: 'Feed de notícias tech' },
  { icon: TrendingUp, label: 'Acompanhamento de progresso' },
  { icon: GitCommit, label: 'Commit streaks' },
]

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function useCountdown(target: Date): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

interface CountdownUnitProps {
  value: number
  label: string
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Typography variant="h3" as="span" className="font-mono tabular-nums sm:text-4xl">
        {String(value).padStart(2, '0')}
      </Typography>
      <Typography variant="caption" color="muted" as="span" className="font-mono">
        {label}
      </Typography>
    </div>
  )
}

export default function Platform() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)

  return (
    <section id="platform" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 font-mono text-xs text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
              </span>
              em desenvolvimento — app.commitpt.com
            </div>

            <Typography variant="h2" className="leading-tight sm:text-4xl">
              Os membros têm <span className="font-mono text-primary">acesso antecipado</span> à
              plataforma que estamos a construir.
            </Typography>

            <Typography variant="large" color="muted">
              Uma plataforma de aprendizagem dedicada a programadores — roadmaps interativos, cursos
              práticos, notícias tech e acompanhamento de progresso. Entra agora e garante o acesso
              de membro fundador antes do lançamento.
            </Typography>

            <div className="rounded-lg border border-border bg-surface px-6 py-5">
              <p className="mb-4 font-mono text-xs text-muted-foreground">{'// lança em'}</p>
              <div className="flex items-start gap-6">
                <CountdownUnit value={days} label="dias" />
                <span className="mt-3 font-mono text-2xl font-bold text-border">:</span>
                <CountdownUnit value={hours} label="horas" />
                <span className="mt-3 font-mono text-2xl font-bold text-border">:</span>
                <CountdownUnit value={minutes} label="min" />
                <span className="mt-3 font-mono text-2xl font-bold text-border">:</span>
                <CountdownUnit value={seconds} label="seg" />
              </div>
            </div>

            <a
              href="https://discord.gg/yGAbprCBrT"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Segue o desenvolvimento no Discord
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">app.commitpt.com</span>
              <Typography variant="caption" color="secondary" as="span" className="font-mono">
                {'// membros fundadores têm acesso'}
              </Typography>
            </div>
            <div className="space-y-3">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
                >
                  <f.icon size={15} className="shrink-0 text-primary" />
                  <span>{f.label}</span>
                  <span className="ml-auto font-mono text-xs text-border">{'// em breve'}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-dashed border-border px-4 py-3 text-center font-mono text-xs text-muted-foreground">
              + mais — os membros influenciam o que é construído
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
