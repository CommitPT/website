import { buttonVariants, Typography } from '@commitpt/design-system'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <a
              href="/#hero"
              className="inline-flex items-center gap-2 font-mono text-lg font-bold text-foreground"
            >
              <Image
                src="/commit_icon_256w.webp"
                alt=""
                width={28}
                height={28}
                className="shrink-0 rounded-md object-cover"
              />
              CommitPT
            </a>
            <Typography variant="small" color="muted" className="max-w-sm">
              A comunidade portuguesa que transforma programadores em engenheiros de topo.
            </Typography>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({})}
            >
              Adere já
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://discord.gg/yGAbprCBrT"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline' })}
              style={{ color: 'oklch(0.8 0.1 240)' }}
            >
              <MessageCircle size={15} />
              Experimenta o Discord Grátis
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="/#about" className="hover:text-primary transition-colors">
              Benefícios
            </a>
            <a href="/#features" className="hover:text-primary transition-colors">
              Como funciona
            </a>
            <a href="/#team" className="hover:text-primary transition-colors">
              O Fundador
            </a>
            <a href="/#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
            <a
              href="https://www.instagram.com/commitpt_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Termos e Condições
            </a>
            <Typography variant="caption" color="muted">
              © 2025-{new Date().getFullYear()} CommitPT. Todos os direitos reservados
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  )
}
