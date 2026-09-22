# Plano de implementação: animações (anime.js) + cena 3D (three.js)

Branch: `feat/motion`, criada a partir de `website/v2`. Tarefas em [`tasks/todo.md`](todo.md).

## Visão geral

Dar vida ao site sem o tornar mais lento nem mais difícil de usar. Duas camadas:

1. **anime.js**: movimento pequeno e com propósito. Entrada do hero, secções a aparecer ao
   fazer scroll, números a contar e os preços do Commit+ a entrarem como um diff de git.
2. **three.js**: uma única cena, o **"commit graph"**. Um grafo de git em 3D, com a linha
   `main`, branches que saem e fazem merge e commits novos a aparecer na ponta, em loop. Fica no
   painel do hero, por trás do vídeo, com as cores da paleta da visita. É a imagem da própria
   comunidade: pessoas a fazer commits em conjunto.

Regra de ouro: **o site tem de continuar perfeito sem JavaScript, com "reduzir movimento" ativo,
num telemóvel fraco ou sem WebGL.** As animações são uma camada por cima, nunca uma dependência.

## Decisões de arquitetura

- **Nenhuma secção passa a client component.** As secções continuam Server Components e marcam
  o que anima com atributos `data-*` (`data-reveal`, `data-count-to`, `data-diff-line`). Um só
  componente cliente, `HomeMotion`, lê esses atributos e aplica o anime.js. Menos JS e o markup
  continua a ser a fonte de verdade.
- **As duas bibliotecas carregam depois do conteúdo.** O `animejs` entra por `import()` dentro de
  um `useEffect`, e o `three` por `next/dynamic({ ssr: false })` só quando o painel do hero está
  visível e o browser está livre (`requestIdleCallback`). Critério mensurável: o "First Load JS"
  de `/` no `yarn build` fica em **132 kB ± 3 kB**.
- **Movimento opcional.** O `BACKGROUND_SCRIPT` (já corre no `<head>`) passa também a pôr
  `data-motion` no `<html>` quando **não** há `prefers-reduced-motion`. O CSS só esconde os
  elementos a animar quando esse atributo existe, e há uma animação CSS de segurança que os mostra
  ao fim de ~2,5 s se o anime.js não chegar. Assim nunca há conteúdo preso invisível.
- **O LCP não é tocado.** O `<h1>` do hero nunca começa invisível. Anima só em `transform`,
  a partir de um estado visível. Os restantes elementos podem fazer fade.
- **Cores da cena vêm da paleta.** O `--bg-from`/`--bg-to` estão em `oklch()`, que o
  `THREE.Color` não entende. Um utilitário converte-os para RGB desenhando 1 píxel num canvas 2D
  e lendo-o com `getImageData`.
- **A cena desiste cedo.** Não carrega se: movimento reduzido, sem WebGL, `saveData`, ecrã
  `< 768px` ou `hardwareConcurrency <= 4`. Nesses casos fica o degradê CSS atual, que já é bonito.
  Quando carrega, faz pausa fora do ecrã e com o separador escondido, e limita o
  `devicePixelRatio` a 1,5.
- **Geometria barata.** `Points` + `LineSegments` com ~150 nós, sem texturas nem luzes. O círculo
  dos pontos é feito no shader. O canvas é transparente, com mistura aditiva por cima do degradê.

## Tarefas

### Fase 1: Base
- [x] T1: Base de movimento + secções a aparecer no scroll (anime.js)

### Fase 2: Cena 3D (o maior risco, por isso vem cedo)
- [x] T2: Commit graph estático no painel do hero, com fallback
- [x] T3: Commit graph vivo (crescer, parallax, pausa fora do ecrã)

### Checkpoint A: auditoria + desempenho + revisão tua

### Fase 3: Micro-animações
- [ ] T4: Entrada do hero
- [ ] T5: Números a contar
- [ ] T6: Preços do Commit+ como diff de git

### Checkpoint B: auditoria + revisão tua

### Fase 4: Fecho
- [ ] T7: Documentação (CLAUDE.MD, PLANO-REDESIGN) e verificação final

## Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| three.js pesado no primeiro carregamento | Alto | Chunk à parte, carregado só no idle e com o painel visível. Verificado pelo "First Load JS" no build |
| LCP pior por causa da animação de entrada | Alto | O `<h1>` nunca começa invisível. LCP medido na auditoria antes/depois |
| Conteúdo preso invisível se o JS falhar | Alto | CSS só esconde com `data-motion`, mais a animação de segurança de 2,5 s |
| Cena a gastar bateria/CPU | Médio | Pausa fora do ecrã e com o separador escondido, DPR ≤ 1,5, ~150 nós, desativada em mobile e hardware fraco |
| `oklch` não suportado pelo three | Médio | Conversão via canvas 2D. Se falhar, usa cores fixas da paleta 0 |
| Movimento a mais a parecer "template" | Médio | Uma animação por secção, no máximo. Durações 400–700 ms, sem bounce. Revisão tua nos checkpoints |
| React Strict Mode monta os efeitos duas vezes | Baixo | Todos os efeitos limpam-se (`revert()` no anime, `dispose()` no three) |

## Decisões tomadas (2026-09-22)

1. **Cena 3D:** painel do hero, por trás do vídeo.
2. **Conceito:** commit graph.
3. **Telemóvel:** sem cena 3D abaixo de 768px, fica o degradê.
4. **Auditoria:** o script vai para `scripts/ui-audit.mjs` com `yarn audit:ui` (Task 7).
