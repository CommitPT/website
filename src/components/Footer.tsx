import { ArrowRight, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <a href="#hero" className="font-mono text-lg font-bold text-text-primary">
              <span className="text-git-add">~/</span>CommitPT
            </a>
            <p className="max-w-sm text-sm text-muted">
              Uma comunidade de crescimento de carreira para engenheiros de software portugueses que
              levam o ship a sério.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <a
              href="https://whop.com/commitpt-709e/commit-plus"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-git-add px-5 py-2.5 text-sm font-semibold text-ink hover:bg-[#4bc45d] transition-colors"
            >
              Adere já
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://discord.gg/yGAbprCBrT"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-text-primary hover:border-git-add hover:text-git-add transition-colors"
            >
              <MessageCircle size={15} />
              Experimenta o Discord Grátis
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#about" className="hover:text-git-add transition-colors">
              Benefícios
            </a>
            <a href="#features" className="hover:text-git-add transition-colors">
              Como funciona
            </a>
            <a href="#team" className="hover:text-git-add transition-colors">
              O Fundador
            </a>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} CommitPT. Construído para devs que fazem ship.
          </p>
        </div>
      </div>
    </footer>
  )
}
