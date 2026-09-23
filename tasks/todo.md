# Tarefas: conteúdo real e honestidade da página

Plano e decisões: [`plan.md`](plan.md). Branch: `feat/content-pass`.

**Verificação comum a todas as tarefas:** `yarn typecheck`, `yarn lint`, `yarn format:check` e
`yarn build` a passar; "First Load JS" de `/` dentro de 132 kB ± 5 kB; `yarn audit:ui` sem erros de
consola, sem violações axe e sem overflow a 320/768/1024/1440px.

---

## Task 1: Texto real no hero

**Description:** Troca o lorem ipsum do hero pelo texto definitivo, na direção "problema":
título curto sobre o limite de programar sozinho, subtítulo que diz o que é a comunidade com os
números reais, e a pílula de prova social por baixo do vídeo. Só toca em conteúdo — a estrutura e
as animações ficam como estão.

**Acceptance criteria:**
- [x] Nenhum `TODO(copy)` no bloco `hero` de `src/content/home.ts`
- [x] Nada no texto promete emprego, salário ou resultado garantido
- [x] Título quebra em 2–3 linhas conforme a largura, sem cortar palavras (3 linhas a 1300px)

**Verification:**
- [x] Verificação comum
- [x] Manual: ler em voz alta e confirmar que não há frase de brochura ("desbloqueia o teu potencial")
- [x] Screenshot a 320 e 1440px

**Dependencies:** Nenhuma

**Files likely touched:**
- `src/content/home.ts`

**Estimated scope:** XS

---

## Task 2: Remover a chamada final

**Description:** A secção "Não evoluas sozinho" sai. Os dois caminhos já aparecem no header, no
hero, nas etiquetas dos benefícios, na faixa a seguir à tabela, nos preços e na barra do telemóvel.
A página passa a fechar no FAQ e no rodapé.

**Acceptance criteria:**
- [x] `FinalCta` deixa de ser montado e o componente é removido
- [x] A barra do telemóvel continua visível no FAQ e no fim da página (deixa de haver secção depois dos preços a escondê-la)
- [x] `CLAUDE.MD` deixa de listar a chamada final na estrutura da página e na tabela de CTAs

**Verification:**
- [x] Verificação comum
- [x] `yarn audit:ui`: sem regressões, e o rodapé continua a fechar a página com o degradê
- [x] Manual a 390px: chegar ao fim da página e ver a barra com os dois botões

**Dependencies:** Nenhuma

**Files likely touched:**
- `app/page.tsx`
- `src/components/sections/FinalCta.tsx` (apagado)
- `src/content/home.ts` (bloco `finalCta`)
- `CLAUDE.MD`

**Estimated scope:** S

---

## Checkpoint A: depois das Tasks 1–2
- [x] Verificação comum passa
- [ ] **Revisão tua do texto do hero** antes de escrever o resto do conteúdo

---

## Task 3: "Como funciona o Commit+" no lugar da comparação

**Description:** A secção deixa de comparar percursos e passa a explicar os quatro rituais do
Commit+: o que é, com que ritmo acontece e com o que o membro fica. Fecha com uma linha a assumir o
que a CommitPT não é. Mantém-se `wide`, com tabela no desktop e cartões empilhados no telemóvel, e
mantém-se a faixa de CTA por baixo.

**Acceptance criteria:**
- [x] Nenhuma linha compara a CommitPT com curso, licenciatura, bootcamp ou aprender sozinho
- [x] Existe uma linha visível com o que a CommitPT não é (não é curso, não dá certificado, não garante emprego)
- [x] O id da secção e o link do menu continuam a funcionar

**Verification:**
- [x] Verificação comum
- [x] `yarn audit:ui`: sem overflow a 320px (a tabela é o sítio onde isso rebenta primeiro)
- [x] Manual: ler as 4 linhas e confirmar que nenhuma promete resultado

**Dependencies:** Checkpoint A

**Files likely touched:**
- `src/content/home.ts` (modelo de dados da secção muda)
- `src/components/sections/Comparison.tsx` (renomeado)
- `app/page.tsx`, `CLAUDE.MD`

**Estimated scope:** M

---

## Task 4: Carrossel de testemunhos reais, com dados da Whop

**Description:** Substitui os três cartões de lorem ipsum pelo carrossel do site atual: avaliações
da Whop (`getWhopReviews()`, já em `src/lib/whop.ts`) juntas às locais de `src/reviews.json`,
marquee no desktop, scroll com snap no telemóvel e "Ver mais" por cartão. Porta o `ReviewScroll` do
`master` para dentro da nossa `Section`, com os tokens e o estilo atuais.

**Acceptance criteria:**
- [ ] Com chave de API: aparecem as avaliações da Whop e as locais, sem repetidos
- [ ] Sem chave, ou com a API a falhar: aparecem só as locais, sem erro e sem secção vazia
- [ ] Com `prefers-reduced-motion`: o marquee não anda e os cartões continuam acessíveis por scroll
- [ ] A cópia duplicada do marquee não é lida pelos leitores de ecrã nem apanha o teclado

**Verification:**
- [ ] Verificação comum
- [ ] `yarn audit:ui`: 0 violações axe (atenção à ordem de tabulação com a cópia do marquee)
- [ ] Manual: testar com a variável de ambiente apagada, para ver o fallback
- [ ] Manual a 390px: arrastar os cartões e abrir um "Ver mais"

**Dependencies:** Checkpoint A

**Files likely touched:**
- `src/components/sections/Testimonials.tsx`
- `src/components/ui/ReviewScroll.tsx` (novo, portado)
- `src/reviews.json` (novo, copiado do `master`)
- `app/globals.css` (keyframes do marquee, removidos no redesign)
- `src/content/home.ts`

**Estimated scope:** M

---

## Checkpoint B: depois das Tasks 3–4
- [ ] Verificação comum + `yarn audit:ui` completo
- [ ] Screenshots das duas secções a 320 e 1440px
- [ ] **Revisão tua**: a tabela diz o que querias, e os testemunhos estão com os dados certos?

---

## Task 5: Documentação e auditoria final

**Description:** Atualiza o `CLAUDE.MD` (estrutura da página sem a chamada final, secção nova,
fonte dos testemunhos e variáveis de ambiente necessárias) e o `docs/PLANO-REDESIGN.md`. Marca no
`tasks/backlog.md` o que ficou feito.

**Acceptance criteria:**
- [ ] O `CLAUDE.MD` explica de onde vêm os testemunhos e o que acontece sem chave de API
- [ ] O documento do CEO reflete a página como ela fica
- [ ] Auditoria final registada no PR

**Verification:**
- [ ] Verificação comum
- [ ] Revisão de um PR `feat/content-pass` → `website/v2`

**Dependencies:** Tasks 1–4

**Files likely touched:**
- `CLAUDE.MD`, `docs/PLANO-REDESIGN.md`, `tasks/backlog.md`

**Estimated scope:** S
