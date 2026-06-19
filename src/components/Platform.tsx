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

const LAUNCH_DATE = new Date('2026-08-20T00:00:00')

interface PlatformFeature {
  icon: LucideIcon
  label: string
}

const features: PlatformFeature[] = [
  { icon: Map, label: 'Interactive learning roadmaps' },
  { icon: BookOpen, label: 'Hands-on courses' },
  { icon: Newspaper, label: 'Tech news feed' },
  { icon: TrendingUp, label: 'Progress tracking' },
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
      <span className="font-mono text-3xl font-bold tabular-nums text-text-primary sm:text-4xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-mono text-xs text-muted">{label}</span>
    </div>
  )
}

export default function Platform() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)

  return (
    <section id="platform" className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-git-amber/30 bg-git-amber/10 px-3 py-1 font-mono text-xs text-git-amber">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-git-amber opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-git-amber"></span>
              </span>
              in development — app.commitpt.com
            </div>

            <h2 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              The learning platform <span className="text-git-add font-mono">is being built</span>.
            </h2>

            <p className="text-lg text-muted">
              A full learning platform for developers — interactive roadmaps, hands-on courses, tech
              news, and progress tracking. Built on the best of boot.dev, Codedex, and roadmap.sh.
            </p>

            <div className="rounded-lg border border-border bg-ink-light px-6 py-5">
              <p className="mb-4 font-mono text-xs text-muted">{'// launching in'}</p>
              <div className="flex items-start gap-6">
                <CountdownUnit value={days} label="days" />
                <span className="mt-3 font-mono text-2xl font-bold text-border">:</span>
                <CountdownUnit value={hours} label="hours" />
                <span className="mt-3 font-mono text-2xl font-bold text-border">:</span>
                <CountdownUnit value={minutes} label="min" />
                <span className="mt-3 font-mono text-2xl font-bold text-border">:</span>
                <CountdownUnit value={seconds} label="sec" />
              </div>
            </div>

            <a
              href="https://discord.gg/your-invite"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-git-add px-5 py-2.5 text-sm font-semibold text-git-add hover:bg-git-add hover:text-ink transition-colors"
            >
              Follow progress on Discord
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="rounded-lg border border-border bg-ink-light p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">app.commitpt.com</span>
              <span className="font-mono text-xs text-git-amber">{'// planned features'}</span>
            </div>
            <div className="space-y-3">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-md border border-border bg-ink px-4 py-3 text-sm text-muted"
                >
                  <f.icon size={15} className="shrink-0 text-git-add" />
                  <span>{f.label}</span>
                  <span className="ml-auto font-mono text-xs text-border">{'// soon'}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-dashed border-border px-4 py-3 text-center font-mono text-xs text-muted">
              + more — join Discord to follow the build
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
