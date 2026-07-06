'use client'

import { Button, Logo, Typography } from '@commitpt/design-system'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

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
    <header className="sticky top-0 z-50 border-b border-border bg-surface/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <Typography variant="h6" as="span" className="font-mono">
            CommitPT
          </Typography>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="default"
            onClick={() => {
              const url = 'https://whop.com/commitpt-709e/commit-plus'
              window.open(url, '_blank')
            }}
          >
            Entrar Agora
          </Button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
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
