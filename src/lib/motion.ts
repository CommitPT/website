// ── Motion flags ──────────────────────────────────────────────────────────────
//
// `<html data-motion>` = o visitante aceita animações. Definido antes do primeiro
// paint pelo MOTION_SCRIPT (no <head>), por isso o CSS pode esconder os elementos a
// animar sem flash. Sem o atributo (movimento reduzido, sem JS), tudo fica visível.
//
// `<html data-motion-ready>` = o HomeMotion arrancou. Desliga a animação CSS de
// segurança que, sem ele, revela tudo ao fim de 2,5 s.

export const MOTION_SCRIPT = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-motion','')}catch(e){}})()`

export function motionEnabled(): boolean {
  return typeof document !== 'undefined' && document.documentElement.hasAttribute('data-motion')
}
