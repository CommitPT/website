# CommitPT Website — Walkthrough

> Guia de apresentação do projeto para a comunidade.  
> Para membros que queiram entender como o website foi construído, como está organizado e como contribuir.

---

## O que é este projeto?

O **commitpt.com** é o website público da comunidade CommitPT.

O objetivo é simples: convencer um visitante a entrar na comunidade — seja através do **Whop** (membership paga) ou do **Discord** (entrada gratuita). Tudo o que existe no website serve esse funil. Se uma secção não move o visitante para um desses dois destinos, não pertence aqui.

O website é **open source** e construído por membros da comunidade.

---

## Tech Stack

| Tecnologia | Versão | Porquê |
|---|---|---|
| [Next.js](https://nextjs.org) | ^14.2.5 | App Router, SSG/SSR, routing por ficheiro, SEO nativo |
| TypeScript | ^6.0.3 | Strict mode, sem `any`, sem surpresas |
| Tailwind CSS | ^3.4.15 | Design tokens, zero CSS custom necessário |
| Geist Sans + Mono | ^1.7.2 | Tipografia da Vercel — leitura excelente em ecrãs |
| lucide-react | ^0.460.0 | Ícones tree-shakeable e consistentes |
| Yarn | — | Package manager do projeto |

Sem bibliotecas de animação. Sem CSS modules. Todas as animações são via Tailwind (`animate-ping`, `transition-*`, e `animate-marquee` definido no config).

---

## Estrutura de ficheiros

```
.github/
  workflows/
    ci.yml                  ← pipeline CI (typecheck → lint → format → build)

app/
  globals.css               ← estilos globais e animações custom
  layout.tsx                ← root layout: metadata global, fontes, orbs de fundo
  page.tsx                  ← composição da homepage (importa e ordena as secções)
  contributors/
    page.tsx                ← única subpágina: /contributors

src/
  components/
    Header.tsx              ← navegação sticky com menu mobile ('use client')
    Hero.tsx                ← acima do fold, CTAs principais
    Stats.tsx               ← 4 métricas da comunidade
    ForWho.tsx              ← segmentação "é para ti se / não é para ti se"
    About.tsx               ← 6 cards de benefícios — "O Que Recebes"
    Inside.tsx              ← 6 cards de atividades — "O Que Acontece Cá Dentro"
    Features.tsx            ← 3 passos + CTA de adesão — "Como Funciona"
    Team.tsx                ← perfil do fundador — "O Fundador"
    SocialProof.tsx         ← marquee infinito de testemunhos
    ContributorsTeaser.tsx  ← preview de 5 contribuidores + link para /contributors
    FAQ.tsx                 ← acordeão de 6 perguntas ('use client')
    ContributorCard.tsx     ← card reutilizado na página /contributors
    Footer.tsx              ← rodapé com CTAs e navegação
  reviews.json              ← 4 testemunhos de membros
  contributors.json         ← 6 contribuidores ativos
  types/
    declarations.d.ts       ← declarações globais de tipos TypeScript

next.config.js              ← config Next.js (atualmente vazio)
tailwind.config.js          ← design tokens (cores, fontes, animações)
tsconfig.json               ← TypeScript strict, alias @/* → ./
.eslintrc.json              ← extends next/core-web-vitals + @typescript-eslint + prettier
.prettierrc                 ← semi:false, singleQuote:true, tabWidth:2, printWidth:100
commitlint.config.js        ← enforce Conventional Commits
```

---

## Composição da homepage

A homepage é composta por 12 secções, ordenadas em `app/page.tsx`:

```
Header              ← sticky, nav links para âncoras + botão "Entrar Agora"
├── Hero            ← proposta de valor + terminal mockup + 2 CTAs
├── Stats           ← 4 métricas: membros, profissionais, sessões, experiência
├── ForWho          ← "isto é para ti se" / "não é para ti se"
├── About           ← 01 // O Que Recebes — 6 cards de benefícios
├── Inside          ← 02 // O Que Acontece Cá Dentro — 6 cards de atividades
├── Features        ← 03 // Como Funciona — 3 passos + CTA de adesão
├── Team            ← 04 // O Fundador — perfil de Bruno Moisão
├── SocialProof     ← 05 // O Que Dizem os Membros — marquee com 4 reviews
├── ContributorsTeaser ← 07 // Contributors — 5 avatares + link /contributors
├── FAQ             ← 06 // Perguntas Frequentes — 6 perguntas em acordeão
└── Footer          ← CTAs + navegação
```

---

## Design System

O design é **dev-native** — inspirado em git diffs, terminais e editores de código.

### Cores (tokens em `tailwind.config.js`)

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0B0E14` | Fundo da página |
| `ink-light` | `#151922` | Fundo de secções e cards |
| `graphite` | `#1F242C` | Superfícies elevadas (barra do terminal) |
| `border` | `#30363D` | Todas as bordas |
| `muted` | `#8B949E` | Texto secundário e body |
| `text-primary` | `#F0F4F8` | Headings e texto principal |
| `git-add` | `#008afd` | Cor primária da marca, CTAs, accents |
| `git-add-hover` | `#0070d4` | Hover do CTA primário |
| `git-del` | `#F85149` | Elementos destrutivos (bullets "não é para ti") |
| `git-amber` | `#F0883E` | Labels de secção, badges "em breve" |
| `syntax-purple` | `#D2A8FF` | Sintaxe de código |
| `syntax-green` | `#7EE787` | Sintaxe de código |
| `syntax-blue` | `#79C0FF` | Sintaxe de código |

### Padrões visuais recorrentes

**Label de secção:**
```tsx
<span className="font-mono text-sm font-bold text-git-amber">
  01 // Nome da Secção
</span>
```

**Card interativo com accent lateral no hover:**
```tsx
<div className="group relative rounded-lg border border-border bg-ink p-6
                hover:border-git-add transition-colors">
  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-git-add
                  opacity-0 transition-opacity group-hover:opacity-100" />
  {/* conteúdo */}
</div>
```

**Badge animado (ponto live):**
```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-border
                bg-ink-light px-3 py-1 font-mono text-xs text-git-add">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full
                     bg-git-add opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-git-add" />
  </span>
  label text
</div>
```

---

## CTAs — Regras de negócio

Existem dois destinos de conversão no website:

| CTA | Destino | Estilo |
|---|---|---|
| **Primário** | `https://whop.com/commitpt-709e/commit-plus` | `bg-git-add text-ink` (azul sólido) |
| **Secundário** | `https://discord.gg/yGAbprCBrT` | `border-border` (outlined) |

**Regras:**
- Todos os links externos: `target="_blank" rel="noreferrer"`
- O Whop é sempre o CTA principal — é o ponto de receita
- CTAs obrigatórios em: Hero, Features (join block), Footer

---

## Dados — como adicionar conteúdo

### Adicionar um testemunho (`src/reviews.json`)

```json
{
  "name": "Nome do Membro",
  "discordUsername": "@username",
  "dateOfReview": "DD-MM-YYYY",
  "review": "Texto do testemunho.",
  "stars": 5
}
```

### Adicionar um contribuidor (`src/contributors.json`)

```json
{
  "name": "Nome Completo",
  "role": "Cargo @ Empresa",
  "bio": "Breve descrição.",
  "githubUsername": "username",
  "linkedin": "https://linkedin.com/in/...",
  "github": "https://github.com/...",
  "instagram": "https://instagram.com/...",
  "website": "https://..."
}
```

Os campos `linkedin`, `github`, `instagram`, `email` e `website` são opcionais. O campo obrigatório para o avatar é `githubUsername` — a imagem é carregada diretamente de `github.com/{githubUsername}.png`.

---

## Workflow de desenvolvimento

```bash
# instalar dependências
yarn

# dev server (http://localhost:3000)
yarn dev

# verificar tipos TypeScript
yarn typecheck

# lint (ESLint)
yarn lint

# formatar código (Prettier)
yarn format

# verificar formatação sem alterar (usado em CI)
yarn format:check

# build de produção
yarn build
```

### Git hooks (automáticos via Husky)

**`pre-commit`** — corre apenas nos ficheiros staged:

| Ficheiros | Ação |
|---|---|
| `*.ts`, `*.tsx` | `eslint --fix` → `prettier --write` |
| `*.json`, `*.css`, `*.md`, `*.yml`, `*.yaml` | `prettier --write` |

Ficheiros corrigidos são re-staged automaticamente. Se o ESLint encontrar erros que não consegue corrigir automaticamente, o commit é abortado.

**`commit-msg`** — valida o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar secção de eventos
fix: corrigir link do Discord no footer
chore: atualizar dependências
refactor: simplificar Hero component
```

Tipos válidos: `feat` `fix` `docs` `style` `refactor` `test` `chore` `perf` `ci` `build` `revert`

---

## CI — GitHub Actions (`.github/workflows/ci.yml`)

Corre em cada push e PR para `master` / `main`, em `ubuntu-latest` com Node.js 22:

1. `yarn install --frozen-lockfile`
2. `yarn typecheck`
3. `yarn lint`
4. `yarn format:check`
5. `yarn build`

Todos os passos têm de passar para o merge ser permitido.

---

## Como adicionar uma nova secção à homepage

1. Cria `src/components/NovaSeccao.tsx`
2. Usa o próximo número disponível na label: `08 // Nome da Secção`
3. Importa e adiciona em `app/page.tsx` na posição correta
4. Se usares `useState` ou `useEffect`, adiciona `'use client'` no topo do ficheiro

**Regra:** só adiciona secções que movam o visitante para o Whop ou Discord.

---

## Como adicionar uma nova página

1. Cria `app/nova-pagina/page.tsx`
2. Exporta `metadata` com `title`, `description`, `alternates.canonical`, `openGraph` e `twitter`
3. Usa o template de layout:

```tsx
import type { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

export const metadata: Metadata = {
  title: 'Título da Página',
  description: '150-160 caracteres com keywords relevantes.',
  alternates: { canonical: 'https://www.commitpt.com/nova-pagina' },
  openGraph: {
    type: 'website',
    url: 'https://www.commitpt.com/nova-pagina',
    title: 'Título da Página',
    description: 'Descrição para partilha em redes sociais.',
    siteName: 'CommitPT',
    images: [{ url: '/commit_3.png', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Título da Página',
    description: 'Descrição curta para Twitter/X.',
    images: ['/commit_3.png'],
  },
}

export default function NovaPagina() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        {/* conteúdo */}
      </main>
      <Footer />
    </div>
  )
}
```

4. Adiciona o link no `Header.tsx` (array `navLinks`) e no `Footer.tsx`

---

## Como contribuir

1. Faz fork do repositório
2. Cria uma branch com nome descritivo (`feat/nome-da-feature`, `fix/descricao-do-bug`)
3. Faz as alterações
4. Garante que `yarn typecheck && yarn lint && yarn build` passam sem erros
5. Abre um PR com descrição clara do que mudou e porquê

Dúvidas? Pergunta no Discord.

---

*Construído por membros da CommitPT. Para membros da CommitPT.*
