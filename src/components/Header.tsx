'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Benefícios', href: '/#about' },
  { label: 'Como funciona', href: '/#features' },
  { label: 'O Fundador', href: '/#team' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contribuidores', href: '/contributors' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="flex items-center gap-2 font-mono text-lg font-bold text-text-primary"
        >
          <span className="text-git-add">~/</span>
          CommitPT
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-git-add transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://whop.com/commitpt-709e/commit-plus"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-git-add px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-git-add-hover"
          >
            Entrar Agora
          </a>
        </nav>
        <button
          className="md:hidden text-text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-git-add"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
