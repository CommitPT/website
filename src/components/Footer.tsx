import { Typography } from '@commitpt/design-system'
import Image from 'next/image'

// ── Component ─────────────────────────────────────────────────────────────────
//
// Só marca e links legais. A chamada final (Discord + Commit+) é uma secção
// própria da homepage, para não aparecer nas páginas legais.
//
// É aqui que o degradê da visita fecha a página, a metade da intensidade dos
// painéis do hero, para não competir com os links.

export default function Footer() {
  return (
    <footer className="gradient-panel mt-auto [--panel-opacity:0.32]">
      {/* Véu escuro: o degradê fecha a página, mas o texto do rodapé tem de continuar
          legível em cima das zonas claras de qualquer paleta. */}
      <div aria-hidden className="absolute inset-0 bg-background/55" />
      <div className="relative z-10 px-5 py-12 sm:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-lg font-bold text-foreground"
        >
          <Image
            src="/commit_icon_256w.webp"
            alt=""
            width={24}
            height={24}
            className="shrink-0 rounded-md object-cover"
          />
          CommitPT
        </a>
        <Typography variant="small" color="muted" className="mt-3 max-w-sm">
          A comunidade portuguesa de Engenharia de Software.
        </Typography>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/privacy" className="transition-colors hover:text-foreground">
              Política de Privacidade
            </a>
            <a href="/terms" className="transition-colors hover:text-foreground">
              Termos e Condições
            </a>
            <a
              href="https://www.instagram.com/commitpt_/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
          </div>
          <span className="font-mono">© 2025-{new Date().getFullYear()} CommitPT</span>
        </div>
      </div>
    </footer>
  )
}
