# Tarefas: animações + cena 3D

Plano e decisões: [`tasks/plan.md`](plan.md). Branch: `feat/motion`.

**Verificação comum a todas as tarefas** (a definition of done deste projeto):
`yarn typecheck`, `yarn lint`, `yarn format:check` e `yarn build` a passar. "First Load JS" de `/`
em 132 kB ± 3 kB. Auditoria de UI sem regressões: 0 erros na consola, 0 violações axe, sem overflow
a 320/768/1024/1440px.

---

## Task 1: Base de movimento + secções a aparecer no scroll

**Description:** Instala o `animejs` e cria a infraestrutura que as outras tarefas usam: a flag
`data-motion` no `<html>` (definida no script do `<head>` quando não há movimento reduzido), o
CSS que esconde `[data-reveal]` só com essa flag, a animação de segurança, e o componente cliente
`HomeMotion`, que importa o anime.js de forma dinâmica. Primeiro uso real: o título de cada secção e
as células das grelhas (Para quem, O que ganhas, Testemunhos) aparecem em cascata ao entrar no ecrã.

**Acceptance criteria:**
- [x] Com movimento: títulos e células aparecem em cascata ao fazer scroll, uma só vez
- [x] Com `prefers-reduced-motion: reduce` ou sem JS: tudo visível de imediato, sem animação
- [x] O `animejs` não entra no "First Load JS" de `/` (chunk à parte)

**Verification:**
- [x] Verificação comum
- [x] Auditoria com emulação de `prefers-reduced-motion: reduce`: nenhum elemento com `opacity: 0`
- [x] Manual: scroll pela página, e ver que recarregar a meio da página não deixa secções invisíveis

**Dependencies:** Nenhuma

**Files likely touched:**
- `package.json`, `yarn.lock`
- `src/components/layout/SiteBackground.tsx` (flag `data-motion` no script)
- `app/globals.css` (regras `[data-motion] [data-reveal]` + animação de segurança)
- `src/components/motion/HomeMotion.tsx` (novo)
- `src/components/layout/SectionHeading.tsx`, `app/page.tsx`

**Estimated scope:** M

---

## Task 2: Commit graph estático no painel do hero, com fallback

**Description:** Instala `three` + `@types/three`. Cria a cena `CommitGraph`: um grafo de git
(linha `main` + 3–4 branches que saem e fazem merge, ~150 nós em `Points` e as ligações em
`LineSegments`), com as cores `--bg-from`/`--bg-to` convertidas de `oklch` para RGB. Monta-a no
painel do hero com `next/dynamic({ ssr: false })`, carregada só com o painel visível e o browser
livre. Nesta tarefa renderiza **um só frame**, sem loop, para isolar o risco de bundle e fallback.

**Acceptance criteria:**
- [x] Desktop com WebGL: o grafo aparece por trás do vídeo, com as cores da paleta da visita
- [x] Movimento reduzido, sem WebGL, `saveData`, `< 768px` ou `hardwareConcurrency <= 4`: o three.js nem é pedido e fica o degradê CSS
- [x] "First Load JS" de `/` continua em 132 kB ± 3 kB

**Verification:**
- [x] Verificação comum
- [x] Auditoria: a 1440px o chunk do three é pedido. A 320px e com movimento reduzido não é pedido (ver pedidos de rede no CDP)
- [x] Manual: 4 refreshes, e as cores do grafo mudam com a paleta

**Dependencies:** Task 1 (flag `data-motion`)

**Files likely touched:**
- `package.json`, `yarn.lock`
- `src/components/three/CommitGraph.tsx` (novo, cena)
- `src/components/three/HeroScene.tsx` (novo, dynamic import + condições de fallback)
- `src/lib/cssColor.ts` (novo, conversão oklch → RGB)
- `src/components/sections/Hero.tsx`

**Estimated scope:** M

---

## Task 3: Commit graph vivo

**Description:** Põe a cena a mexer: commits novos a aparecer na ponta do `main` e o grafo a
deslizar lentamente (loop infinito), branches a fazer merge, e um parallax leve do rato. Pausa com
o painel fora do ecrã (IntersectionObserver) e com o separador escondido (`visibilitychange`).
Limpeza completa ao desmontar.

**Acceptance criteria:**
- [x] Animação contínua e suave (≈60 fps num portátil comum)
- [x] Sem render loop com o painel fora do ecrã ou o separador escondido
- [x] Ao desmontar: `renderer.dispose()`, geometrias e materiais libertados, listeners removidos

**Verification:**
- [x] Verificação comum
- [x] Auditoria: com scroll até ao fim da página, contar frames de `requestAnimationFrame` durante 1 s. Tem de dar ~0
- [x] Manual: sem saltos ao voltar ao separador e sem avisos de WebGL na consola

**Dependencies:** Task 2

**Files likely touched:**
- `src/components/three/CommitGraph.tsx`
- `src/components/three/HeroScene.tsx`

**Estimated scope:** S

---

## Checkpoint A: depois das Tasks 1–3
- [ ] Verificação comum passa
- [ ] LCP medido antes/depois, sem piorar mais de 100 ms
- [ ] Screenshots a 320/1440px com e sem movimento reduzido
- [ ] **Revisão tua antes de continuar** (conceito e intensidade da cena)

---

## Task 4: Entrada do hero

**Description:** Ao carregar: etiqueta, subtítulo, botões e números entram em cascata (fade +
subir 12px). O `<h1>` sobe só em `transform`, sem começar invisível, para não atrasar o LCP.

**Acceptance criteria:**
- [ ] Cascata de ~600 ms no total, sem bounce
- [ ] O `<h1>` nunca tem `opacity < 1`
- [ ] Movimento reduzido: sem animação

**Verification:**
- [ ] Verificação comum + LCP igual ao do Checkpoint A (±100 ms)
- [ ] Manual: carregar a página 3 vezes, sem flash de conteúdo

**Dependencies:** Task 1

**Files likely touched:**
- `src/components/sections/Hero.tsx` (atributos `data-*`)
- `src/components/motion/HomeMotion.tsx`

**Estimated scope:** S

---

## Task 5: Números a contar

**Description:** Os números do hero (550+, 90 000+, 4+, 14+) contam de 0 até ao valor quando
entram no ecrã, com o formato pt-PT (espaço como separador de milhares). O HTML traz sempre o valor
final, para SEO, sem JS e com movimento reduzido.

**Acceptance criteria:**
- [ ] Contagem de ~1,2 s, com easing a abrandar no fim, uma só vez
- [ ] O valor final é idêntico ao texto original (incluindo o `+`)
- [ ] Sem saltos de layout durante a contagem (largura fixa com `tabular-nums`)

**Verification:**
- [ ] Verificação comum
- [ ] Auditoria: CLS durante a contagem = 0

**Dependencies:** Task 1

**Files likely touched:**
- `src/components/sections/Hero.tsx`
- `src/components/motion/HomeMotion.tsx`

**Estimated scope:** S

---

## Task 6: Preços do Commit+ como diff de git

**Description:** Quando o cartão do Commit+ entra no ecrã, as linhas `+` entram uma a uma, como um
diff a ser aplicado: cada uma desliza e tem um flash verde breve no fundo. Reforça a ideia de que o
Commit+ é "o Gratuito mais isto".

**Acceptance criteria:**
- [ ] Linhas `+` em cascata (~80 ms entre linhas), com flash verde que desvanece
- [ ] O botão "Aderir" não é animado (clicável desde o início)
- [ ] Movimento reduzido: sem animação

**Verification:**
- [ ] Verificação comum
- [ ] Manual: ver no desktop e a 320px

**Dependencies:** Task 1

**Files likely touched:**
- `src/components/sections/Pricing.tsx`
- `src/components/motion/HomeMotion.tsx`

**Estimated scope:** S

---

## Checkpoint B: depois das Tasks 4–6
- [ ] Verificação comum + auditoria completa
- [ ] **Revisão tua**: a quantidade de movimento parece intencional e não "template"?

---

## Task 7: Documentação e verificação final

**Description:** Atualiza a secção "Animations" do `CLAUDE.MD` (atributos `data-*`, `HomeMotion`,
regras da cena, como adicionar uma animação nova) e marca a fase 7 como feita no
`docs/PLANO-REDESIGN.md`. Se aprovares a pergunta 4 do plano, move o script de auditoria para
`scripts/ui-audit.mjs`.

**Acceptance criteria:**
- [ ] O `CLAUDE.MD` explica como adicionar uma animação sem criar client components
- [ ] O plano do redesign está atualizado
- [ ] Auditoria final registada no PR

**Verification:**
- [ ] Verificação comum
- [ ] Revisão de um PR `feat/motion` → `website/v2`

**Dependencies:** Tasks 1–6

**Files likely touched:**
- `CLAUDE.MD`, `docs/PLANO-REDESIGN.md`
- `scripts/ui-audit.mjs` e `package.json` (opcional)

**Estimated scope:** S
