# Backlog do website

O que vem a seguir, por ordem de prioridade. Cada item diz **porquê** e o **tamanho**.
O plano do redesign está em [`docs/PLANO-REDESIGN.md`](../docs/PLANO-REDESIGN.md); o plano em curso
em [`plan.md`](plan.md) e [`todo.md`](todo.md); as animações, já feitas, em
[`done/motion-plan.md`](done/motion-plan.md).

---

## 1. Barra fixa de CTAs no telemóvel — ✅ feito (branch `feat/mobile-cta`)

Já está decidida no `CLAUDE.MD` ("Mobile: Sticky bottom bar with both, after the hero") mas nunca
foi feita. No telemóvel, depois do hero, o visitante fica sem nenhum botão à vista até à secção de
preços.

- [x] Barra fixa no fundo, só abaixo de `md`, com "Entrar grátis" (Discord) e "Commit+" (`#precos`)
- [x] Aparece depois do hero sair do ecrã; desaparece na secção de preços, onde seria redundante
- [x] Não colide com o aviso de cookies (que também é fixo em baixo)
- [x] Respeita a área segura do iPhone e não tapa o rodapé
- [x] `trackEvent` com `location: 'mobile_bar'`, para se saber quanto converte

**Tamanho:** S · **Ficheiros:** `src/components/MobileCtaBar.tsx` (novo), `app/page.tsx`,
`src/components/CookieConsent.tsx`, `src/components/sections/Hero.tsx`

---

## 2. Conteúdo real — parcialmente feito

Feito: hero, tabela "Como funciona" e testemunhos reais (Whop + `src/reviews.json`).
Falta: os perfis de "Para quem é", os benefícios, o texto do fundador, as respostas do FAQ, o vídeo
e as fotos.
Enquanto houver lorem ipsum, nada do resto interessa: é isto que decide se o visitante fica.

Atenção: texto real é mais comprido que lorem e pode partir o layout. Correr `yarn audit:ui` depois.

**Tamanho:** M (o trabalho é da direção, não técnico) · **Bloqueia:** o lançamento

---

## 3. Números que se atualizam sozinhos

Os "550+" e "90 000+" estão escritos à mão e vão envelhecer. Se o widget do servidor de Discord
estiver ligado, há um endpoint público com membros e quantos estão online. "X online neste momento"
é prova social a sério.

- Revalidar no servidor (ISR) para não depender do browser do visitante
- Nunca deixar o número desaparecer se a API falhar: fica o valor escrito à mão

**Tamanho:** S · **Precisa:** widget do Discord ligado

---

## 4. Próximo evento vindo do Discord

A faixa de anúncio diz "00 de mês, 21h00". Os eventos agendados do Discord podem ser lidos pelo bot
que a comunidade já tem, e a faixa passa a estar sempre certa. Sem isto, ou alguém se lembra de
editar, ou fica ali uma data falsa — o que é pior do que não ter faixa nenhuma.

**Tamanho:** M · **Precisa:** token do bot e uma rota ou job que guarde o próximo evento

---

## 5. Projetos como prova dentro de "O que ganhas"

O bot, o design system e este website são a prova mais forte de que se constrói mesmo. Não voltam
como secção própria (é uma saída do funil), mas sim como uma tira compacta com stack e link para o
GitHub, com os números (commits, contribuidores) lidos no build.

**Tamanho:** S

---

## 6. Imagem de partilha da homepage

Ao partilhar o link no Discord ou WhatsApp aparece só o logótipo. Devia aparecer um cartão gerado
com a paleta e o número de membros. Os perfis `/u/[username]` já fazem isto; a homepage não.

**Tamanho:** S · **Ficheiros:** `app/opengraph-image.tsx`

---

## 7. Dados estruturados para o Google

`JSON-LD` de `Organization` e de `FAQPage` sobre o FAQ que já existe. É o que faz o Google mostrar
as perguntas diretamente nos resultados de pesquisa.

**Tamanho:** XS

---

## 8. Medir antes de adivinhar

Os cliques já são registados com a origem (`location`). Falta definir o funil no GA4 e, quando
houver tráfego suficiente, testar duas versões do hero: Discord primeiro contra Commit+ primeiro.
A discussão sobre qual deve ser o botão principal resolve-se com dados, não com opinião.

**Tamanho:** S · **Depende de:** ter tráfego real

---

## Não fazer para já

- **Mais animações.** O movimento atual está no ponto; mais seria ruído.
- **Páginas novas** (changelog, blog). Cada página é uma saída do funil. Um changelog fica melhor
  como canal no Discord.
