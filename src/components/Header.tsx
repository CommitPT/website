'use client'

import AnnouncementBar from '@/src/components/AnnouncementBar'
import FrameRule from '@/src/components/layout/FrameRule'
import CtaLink from '@/src/components/ui/CtaLink'
import { nav } from '@/src/content/home'
import { cx } from '@/src/lib/cx'
import { DISCORD_URL } from '@/src/lib/links'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// ── Scroll spy ────────────────────────────────────────────────────────────────

/** id da secção visível a meio do ecrã, para marcar o link ativo. */
function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

const NAV_IDS = nav.map((item) => item.id)

// ── Component ─────────────────────────────────────────────────────────────────
//
// Os links são âncoras da própria página (não saídas do funil). À direita, os
// dois caminhos: Discord grátis (discreto) e Commit+ (botão, leva aos preços).

export default function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2.5">
              <Image
                src="/commit_icon_256w.webp"
                alt=""
                width={28}
                height={28}
                className="shrink-0 rounded-md object-cover"
                priority
              />
              <span className="font-mono font-bold text-foreground">CommitPT</span>
            </a>

            <nav aria-label="Secções" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cx(
                    'rounded-md px-3 py-1.5 text-sm transition-colors',
                    active === item.id
                      ? 'bg-foreground/10 text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <CtaLink
              href={DISCORD_URL}
              event="community_join_click"
              location="header"
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Entrar grátis
            </CtaLink>
            <CtaLink href="/#precos" event="pricing_anchor_click" location="header" size="sm">
              Juntar-me
            </CtaLink>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="ml-1 rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Secções" className="relative border-t border-border px-5 py-4 lg:hidden">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <CtaLink
              href={DISCORD_URL}
              event="community_join_click"
              location="header_mobile"
              variant="outline"
              className="mt-4 w-full sm:hidden"
            >
              Entrar grátis no Discord
            </CtaLink>
          </nav>
        )}
        <FrameRule />
      </header>
    </>
  )
}
