// ── Background palettes ───────────────────────────────────────────────────────
//
// As cores de cada paleta vivem em globals.css (`html[data-bg='N']`). Este
// número tem de bater certo com a quantidade de paletas definidas lá.

const PALETTE_COUNT = 4
const STORAGE_KEY = 'cpt-bg'

/**
 * Corre no <head> antes do primeiro paint: escolhe uma paleta aleatória,
 * diferente da última vista nesta sessão, e marca-a em `<html data-bg>`.
 * Tem de ser um script inline — num componente React o valor ficava fixo no
 * build (página estática) e causava hydration mismatch.
 */
export const BACKGROUND_SCRIPT = `(function(){var n=${PALETTE_COUNT},i;try{var l=sessionStorage.getItem('${STORAGE_KEY}');do{i=Math.floor(Math.random()*n)}while(n>1&&String(i)===l);sessionStorage.setItem('${STORAGE_KEY}',String(i))}catch(e){i=Math.floor(Math.random()*n)}document.documentElement.setAttribute('data-bg',String(i))})()`

// ── Component ─────────────────────────────────────────────────────────────────

/** Degradê fixo por trás da moldura, com grão por cima. Só visível fora do Frame. */
export default function SiteBackground() {
  return <div aria-hidden className="site-bg" />
}
