# CommitPT — Plano do novo website

> Documento de trabalho para alinhar com a direção. Resume **o que vamos construir, porquê, e o que
> precisamos para lançar**. Última atualização: 2026-09-21.

---

## 1. Resumo

O website atual (commitpt.com) tem a informação certa, mas **não deixa claro em poucos segundos o
que é a comunidade** nem conduz o visitante a uma decisão. O novo website é uma **página única em
formato de funil**, com um vídeo de apresentação no topo, que leva cada visitante a uma de duas
ações:

1. **Entrar grátis no Discord** — a porta de entrada, sem atrito.
2. **Aderir ao Commit+** (via Whop) — a experiência paga.

A mensagem central: **"Começa grátis. Sobe para o Commit+ quando quiseres."** As duas opções não
competem — são dois passos do mesmo caminho.

---

## 2. Referências

Usámos estes sites como inspiração de **estrutura e estilo**, não de conteúdo. Todo o texto,
números, fotos e testemunhos serão da CommitPT.

| Site                                           | O que aproveitamos                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| [aihero.dev](https://www.aihero.dev/)          | Visual principal: conteúdo numa moldura com linhas finas, fundo em degradê |
| [viverdecodigo.pt](https://viverdecodigo.pt/)  | Tabela comparativa com alternativas                                       |
| [blueprint-academy.com](https://www.blueprint-academy.com/) | Estrutura de funil com vídeo no topo                         |
| [comunidadealpha.xyz](https://comunidadealpha.xyz/) | Secção "Para quem é"                                                 |
| [asclub.pt](https://www.asclub.pt/)            | Secção sobre quem está por trás do projeto                                |

---

## 3. Visual

### Moldura

O site vive dentro de uma moldura com bordas finas; as secções são separadas por linhas
horizontais. O fundo dentro da moldura é cinzento-escuro neutro (combina com todas as cores do
degradê). Fora da moldura aparece o degradê, que se move lentamente; o mesmo degradê aparece dentro
do site em pontos-chave (vídeo, foto do fundador, chamada final) e o botão principal usa a cor dele.

```
 ░░│  Anúncio: próximo evento                          │░░
 ░░│  Logo   Para quem · O que ganhas · …   Grátis [Juntar-me]
 ░░+───────────────────────────┬───────────────────────+░░
 ░░│  Título                   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │░░
 ░░│  Texto                    │ ▓▓   [ ▶ vídeo ]   ▓▓ │░░
 ░░│  [Entrar grátis] [Commit+]│ ▓▓  550+ developers ▓ │░░
 ░░│  550+  90 000+  4+  14+   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │░░
 ░░+───────────────────────────┴───────────────────────+░░
 ░░│  Secção seguinte…                                 │░░
   ↑ degradê (muda a cada visita)      ▓ = o mesmo degradê dentro do site
```

**Porquê:** as linhas dão um ar técnico e "de engenharia", que combina com a comunidade. O cinzento
neutro deixa o degradê ser a única cor forte, e repeti-lo junto ao vídeo liga o interior ao exterior
do site.

### Degradê que muda a cada visita

Temos **4 combinações de cor**, todas tiradas das cores da marca. Cada vez que alguém abre o site,
aparece uma diferente (nunca a mesma duas vezes seguidas).

| Nome      | Cores           |
| --------- | --------------- |
| `main`    | azul → roxo     |
| `hotfix`  | âmbar → vermelho |
| `merged`  | verde → azul    |
| `release` | roxo → âmbar    |

**Porquê:** dá personalidade e faz o site parecer "vivo" sem distrair do conteúdo — o degradê fica
sempre **fora** da zona de texto.

### Regras para não parecer um site genérico

- Números concretos e verdadeiros (550+ membros, 90 000+ mensagens), nunca inventados.
- Fotos e nomes reais de membros e sessões — nada de imagens de banco.
- Sem frases feitas ("desbloqueia o teu potencial") nem emojis.
- Uma cor de destaque de cada vez; a letra monoespaçada só para detalhes técnicos.

---

## 4. Estrutura da página

| #   | Secção                       | Objetivo                                                                     |
| --- | ---------------------------- | ---------------------------------------------------------------------------- |
| —   | **Faixa de anúncio + topo**  | Próximo evento; menu só com atalhos para secções da própria página (não tira ninguém do site) |
| 1   | **Título + vídeo**           | Texto e botões à esquerda, vídeo sobre o degradê à direita (no telemóvel fica por baixo) |
| 2   | **Para quem é**              | O visitante reconhece-se num dos 4 perfis                                     |
| 3   | **O que ganhas**             | Benefícios concretos, cada um com prova real                                  |
| 4   | **Quem está por trás**       | Confiança: pessoas reais, fotos de sessões reais                              |
| 5   | **Compara as alternativas**  | Mostrar porque a CommitPT faz sentido face a outras opções                    |
| 6   | **Testemunhos**              | Prova social de membros reais                                                 |
| 7   | **Gratuito vs Commit+**      | A decisão: duas opções lado a lado                                            |
| 8   | **Perguntas frequentes**     | Tirar as últimas dúvidas (preço, cancelamento, nível necessário)              |
| 9   | **Chamada final + rodapé**   | Última oportunidade para as duas ações                                        |

### Conteúdo de cada secção (versão CommitPT)

| Secção                  | Conteúdo                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Prova social (topo)     | **550+ developers** + fotos reais de membros                                                              |
| Para quem é             | **Estudantes · À procura do 1.º emprego · Developers que querem subir de nível · Em mudança de carreira** |
| O que ganhas            | **Talks com recrutadores · Sessions técnicas · Projetos reais com code review · Rede de 550+ devs em PT** |
| Quem está por trás      | Fundador + contribuidores, com fotos de sessões                                                           |
| Tabela comparativa      | **Ensino tradicional · Bootcamps · Aprender sozinho · CommitPT**                                          |

---

## 5. Estratégia de conversão: Discord e Commit+

### O raciocínio

Quem chega ao site pela primeira vez **ainda não nos conhece** e dificilmente paga 19,99 € logo na
primeira visita. Se o convencermos a entrar grátis no Discord, passa a ver a comunidade a funcionar
(Talks, Sessions, projetos) — e é aí que a venda do Commit+ acontece com naturalidade. O site trata
da primeira conversão; o Commit+ é vendido a quem já está convencido.

### Onde aparece cada botão

| Sítio                        | Botão(ões)                                                                   | Porquê                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Topo**                     | "Entrar grátis" (discreto) + "Juntar-me" → leva à secção de preços           | Os dois caminhos sempre visíveis; "Juntar-me" mostra as opções lado a lado     |
| **Junto ao vídeo**           | **"Entrar grátis no Discord"** (principal) + "Ver o Commit+" (secundário)    | Visitante ainda frio → a opção sem risco converte mais                         |
| **O que ganhas**             | Cada benefício com etiqueta `Grátis` ou `Commit+`                             | Mostra o que fica de fora sem pagar — cria vontade antes de chegar aos preços  |
| **Depois da tabela**         | Faixa: "Queres o ritmo completo? Commit+ desde 9,99 €/mês"                   | Momento em que o visitante está mais convencido                                 |
| **Preços**                   | Gratuito + **Commit+ em destaque** (plano anual por defeito)                  | Aqui o Commit+ é o protagonista                                                |
| **Chamada final**            | Os dois: "Começa grátis. Sobe quando quiseres."                               | Fecha o caminho                                                                |
| **Telemóvel**                | Barra fixa em baixo: `Entrar grátis` · `Commit+`                              | As duas ações sempre a um toque                                                |

### Preços apresentados como "o que ganhas a mais"

```
  Gratuito                    Commit+
  ✓ Discord                   ✓ Tudo do Gratuito
  ✓ Discussões técnicas     + Commit Talks com recrutadores
  ✓ Eventos abertos         + Commit Sessions (workshops)
                            + Commit Career (CV, entrevistas, salários)
                            + Projetos da comunidade com code review
```

**Porquê:** o Commit+ não é "outro produto", é **o gratuito mais** — a decisão fica mais simples.

### Medir o que funciona

Cada botão regista de onde veio o clique (topo, vídeo, preços…) e para onde foi (Discord ou
Commit+). Assim sabemos que secções convertem e ajustamos com dados, não com palpites.

### Fora do site

O Discord também deve vender o Commit+: canais de Sessions visíveis mas fechados, o bot a anunciar a
próxima Talk, etc.

---

## 6. Vídeo de apresentação

- Vai ficar alojado no **YouTube**.
- O site fica pronto **antes** de o vídeo existir: mostra uma capa com "Vídeo em breve". Quando o
  vídeo estiver pronto, basta colar o ID do YouTube.
- O vídeo só carrega quando a pessoa carrega em "play" — o site continua rápido.
- **Legendas em português são obrigatórias** — muita gente vê sem som.

---

## 7. Animações (feito)

- **anime.js** — as secções aparecem ao entrar no ecrã, o hero entra em cascata, os números contam
  (550+, 90 000+…) e as vantagens do Commit+ entram como um diff de git a ser aplicado.
- **three.js** — o painel do vídeo tem o **commit graph**: um histórico de git em 3D, com a linha
  principal, branches que saem e voltam a juntar-se, e um ponto a percorrer a linha. Usa as cores do
  degradê da visita.

Ambos só são carregados depois do conteúdo, e o site funciona igual sem eles. Quem tem "reduzir
movimento" ativo no sistema não vê animações, e o 3D nem chega a ser descarregado. No telemóvel e em
computadores fracos fica o degradê. O peso inicial da página subiu 3 kB.

---

## 8. Fases

| Fase | Entrega                                                               |
| ---- | --------------------------------------------------------------------- |
| 1    | Base: moldura, degradês aleatórios, topo e rodapé                     |
| 2    | Título + vídeo + botões + prova social                                |
| 3    | Para quem é · O que ganhas · Quem está por trás                        |
| 4    | Tabela comparativa (computador e telemóvel)                           |
| 5    | Testemunhos · Preços · Perguntas frequentes · Chamada final            |
| 6    | Conteúdo real: vídeo, fotos, textos, números                          |
| 7    | ✅ Animações (anime.js, three.js)                                      |

As fases 1–5 usam texto provisório onde ainda não há conteúdo final.

---

## 9. O que precisamos da direção

- [ ] **Vídeo de apresentação** (1–2 min, com legendas)
- [ ] **Fotos reais** de sessões, eventos e do fundador
- [ ] **Testemunhos reais** (nome, foto, autorização para publicar)
- [ ] **Números atualizados** (membros, mensagens, sessões por mês)
- [ ] Validar a **estratégia de botões** (secção 5)
- [ ] Validar os **4 perfis** de "Para quem é" e os **4 benefícios** de "O que ganhas"
