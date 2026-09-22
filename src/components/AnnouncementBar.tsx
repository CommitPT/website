'use client'

import FrameRule from '@/src/components/layout/FrameRule'
import { announcement } from '@/src/content/home'
import { trackEvent } from '@/src/lib/analytics'
import { DISCORD_URL } from '@/src/lib/links'
import { ArrowRight } from 'lucide-react'

/** Faixa por cima do header com o próximo evento. Não é sticky — sai ao fazer scroll. */
export default function AnnouncementBar() {
  return (
    <aside aria-label="Próximo evento" className="relative">
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent('event_interaction', { location: 'announcement' })}
        className="group flex h-10 items-center justify-center gap-3 px-5 text-xs text-foreground/90 hover:text-foreground sm:text-sm"
      >
        <span className="rounded border border-(--bg-accent)/50 px-1.5 py-px font-mono text-[10px] font-semibold text-(--bg-accent)">
          {announcement.tag}
        </span>
        <span className="truncate">{announcement.text}</span>
        <ArrowRight
          size={14}
          className="shrink-0 transition-transform group-hover:translate-x-0.5"
        />
      </a>
      <FrameRule />
    </aside>
  )
}
