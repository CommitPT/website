# Plano de implementação: conteúdo real e honestidade da página

Branch sugerida: `feat/content-pass`, a partir de `website/v2`. Tarefas em [`todo.md`](todo.md).
O plano das animações, já concluído, está em [`done/motion-plan.md`](done/motion-plan.md).

## Visão geral

Quatro mudanças que tiram lorem ipsum e ruído da página, e trocam a única secção que fazia uma
afirmação que não queremos fazer. Nenhuma delas é técnica ao ponto de precisar de infraestrutura
nova, exceto os testemunhos, que passam a vir da Whop.

1. **Hero** com texto real, em vez de lorem ipsum.
2. **Chamada final sai.** Os botões já aparecem no header, no hero, nos preços, na faixa depois da
   tabela e na barra do telemóvel. Repetir outra vez antes do rodapé é ruído.
3. **"Compara as alternativas" passa a "Como funciona o Commit+".** Deixa de comparar e passa a
   explicar.
4. **Testemunhos reais**, vindos da Whop, com o layout deslizante que já existe no `master`.

**Fora de âmbito:** a secção "Quem está por trás". O texto e as fotos são do CEO, e não se mexe.

## Decisões de arquitetura

- **A tabela deixa de comparar percursos.** Comparar o Commit+ com um CTESP, uma licenciatura ou um
  bootcamp é uma comparação falsa: dão coisas diferentes (canudo, estágio e avaliação, contra
  prática, revisão de código e rede). E nada na página pode sugerir emprego garantido. A tabela
  passa a descrever os quatro rituais — o que é, com que ritmo, e com o que o membro fica — e
  fecha com uma linha a assumir o que a CommitPT **não** é.
- **Testemunhos: Whop primeiro, ficheiro como rede de segurança.** O padrão do `master` mantém-se:
  `getWhopReviews()` (já existe em `src/lib/whop.ts`) mais as avaliações locais de
  `src/reviews.json`. Sem chave de API, ou com a API em baixo, a secção mostra na mesma as locais.
  Nunca pode ficar vazia nem rebentar o build.
- **O componente de testemunhos é portado, não reinventado.** O `ReviewScroll` do `master` já
  resolve marquee no desktop, scroll com snap no telemóvel, "Ver mais" por cartão e a metade
  duplicada escondida dos leitores de ecrã. Traz-se para dentro da nossa `Section`, com os tokens
  atuais.
- **A secção fica Server Component**; só o carrossel é cliente, como no `master`.
- **O movimento respeita as regras que já temos:** o marquee tem de parar com
  `prefers-reduced-motion`, tal como tudo o resto.

## Tarefas

### Fase 1: Texto e limpeza
- [x] T1: Texto real no hero
- [x] T2: Remover a chamada final

### Checkpoint A: revisão tua do texto

### Fase 2: A tabela
- [ ] T3: "Como funciona o Commit+" no lugar da comparação

### Fase 3: Testemunhos (o maior risco)
- [ ] T4: Carrossel de testemunhos reais, com dados da Whop

### Checkpoint B: auditoria + revisão tua

### Fase 4: Fecho
- [ ] T5: Documentação e auditoria final

## Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Sem `WHOP_API_KEY` o build não traz avaliações | Alto | `src/reviews.json` é sempre incluído; a secção nunca fica vazia |
| API da Whop lenta ou em baixo a travar a página | Alto | Pedido em cache (`unstable_cache`), com falha silenciosa para o ficheiro local |
| Testemunhos muito compridos (há um com 12 linhas) | Médio | `ExpandableText` com 3 linhas e "Ver mais"; altura do cartão fixa |
| Marquee a consumir CPU e a ignorar movimento reduzido | Médio | CSS puro, `pause-on-hover`, e desligado em `prefers-reduced-motion` |
| Metade duplicada do marquee lida pelos leitores de ecrã | Médio | `aria-hidden` + tirar os botões da cópia (o `inert` como booleano não funciona no React 18) |
| Texto real mais comprido que o lorem a partir o layout | Médio | `yarn audit:ui` a 320/768/1024/1440 depois de cada tarefa |
| A tabela nova voltar a sugerir garantias | Alto | Revisão tua no Checkpoint A e linha explícita do que a CommitPT não é |

## Decisões tomadas (2026-09-23)

1. **Tabela:** "Como funciona o Commit+" — rituais, ritmo e o que o membro leva.
2. **Hero:** direção "problema" — "Programar sozinho tem limite."
3. **Chamada final:** sai da página.
4. **Planos:** o das animações foi arquivado em `tasks/done/`.

## Perguntas em aberto

- O `.env` de produção já tem `WHOP_API_KEY`, `WHOP_COMPANY_ID` e `WHOP_PRODUCT_ID`? Sem isso, a
  T4 entrega só as 5 avaliações locais (o que é aceitável para lançar).
- Os números do ritmo na tabela ("~1×/mês", "2–3×/mês") têm de ser confirmados por ti. Os que estão
  no plano são a minha leitura do site atual.
