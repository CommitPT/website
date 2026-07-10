export interface ProjectFeature {
  iconName: string
  title: string
  description: string
}

export interface ProjectMission {
  problem: string
  importance: string
  impact: string
}

export interface ProjectImpactMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  icon: string
  tags: string[]
  status: 'active' | 'coming-soon'
  link?: string
  storybookLink?: string
  tagline: string
  mission: ProjectMission
  features: ProjectFeature[]
  learnings: string[]
  workflow: string[]
  impact: ProjectImpactMetric[]
  contributorsCount?: number
}

export const projects: Project[] = [
  {
    id: 'discord-bot',
    title: 'Discord Bot',
    description:
      'Bot automático para gerenciar accountability, XP, invites, tickets, private chats e onboarding na comunidade CommitPT.',
    fullDescription:
      'O Discord Bot CommitPT é a ferramenta central que potencia toda a comunidade. Oferece um sistema completo de XP e levels, rastreamento de convites, seleção de roles por interesse e linguagem, sistema de tickets para suporte, criação de private chats para membros Commit+, relatórios de moderação e onboarding automático. Construído com TypeScript e discord.js v14, o bot gerencia integrações com SQLite para persistência de dados e integra alertas automáticos para staff.',
    image: '/discord-bot_800w.webp',
    icon: '🤖',
    tags: ['TypeScript', 'discord.js v14', 'SQLite'],
    status: 'active',
    link: 'https://github.com/commitpt/discord-bot',
    tagline: 'O sistema responsável por automatizar toda a operação da comunidade.',
    mission: {
      problem:
        'Gerir uma comunidade ativa no Discord manualmente é impossível. Sem automação, o staff perde horas em tarefas repetitivas e os membros têm uma experiência inconsistente.',
      importance:
        'O bot é a espinha dorsal da CommitPT. É ele que garante que cada membro é bem recebido, que o XP é registado, que os tickets são geridos e que os membros Commit+ têm acesso privilegiado — automaticamente.',
      impact:
        'Hoje, o bot serve centenas de membros em tempo real, sem intervenção manual. Liberta o staff para o que realmente importa: criar valor para a comunidade.',
    },
    features: [
      {
        iconName: 'Trophy',
        title: 'XP & Levels',
        description:
          'Reconhece automaticamente a participação dos membros com um sistema de pontos e níveis.',
      },
      {
        iconName: 'Ticket',
        title: 'Tickets',
        description: 'Sistema de suporte integrado entre membros e staff, diretamente no Discord.',
      },
      {
        iconName: 'UserPlus',
        title: 'Invite Tracking',
        description: 'Monitoriza convites e crescimento orgânico da comunidade em tempo real.',
      },
      {
        iconName: 'Lock',
        title: 'Private Chats',
        description: 'Criação automática de canais privados exclusivos para membros Commit+.',
      },
      {
        iconName: 'ShieldAlert',
        title: 'Reports',
        description: 'Ferramentas de moderação integradas para manter a comunidade saudável.',
      },
      {
        iconName: 'DoorOpen',
        title: 'Onboarding',
        description: 'Automatiza a entrada e configuração de novos membros na comunidade.',
      },
    ],
    learnings: [
      'TypeScript',
      'Discord.js v14',
      'SQLite',
      'Arquitetura de aplicações',
      'Persistência de dados',
      'Sistema de eventos',
      'Slash Commands',
      'Code Reviews',
      'Trabalho em equipa',
    ],
    workflow: ['Ideias', 'Planeamento', 'Issues', 'Implementação', 'Code Review', 'Deploy'],
    impact: [
      { value: '300+', label: 'membros servidos' },
      { value: '20+', label: 'funcionalidades ativas' },
      { value: '6', label: 'módulos independentes' },
      { value: '100%', label: 'automatizado' },
    ],
  },
  {
    id: 'design-system',
    title: '@commitpt/design-system',
    description:
      'Biblioteca de componentes React com Tailwind CSS v4, TypeScript e shadcn/ui. Tema customizável via CSS custom properties.',
    fullDescription:
      'O @commitpt/design-system é a biblioteca central de componentes reutilizáveis que potencia toda a plataforma CommitPT. Construído com React, TypeScript e Tailwind CSS v4, oferece um conjunto de componentes bem documentados (Button, Typography, Avatar, etc) com suporte total a customização via CSS custom properties. Inclui Storybook para documentação interativa e usa Changesets para gestão de versioning semântico. Publicado no npm scope @commitpt e disponível para uso em qualquer projeto da comunidade.',
    image: '/storybook_800w.webp',
    icon: '🎨',
    tags: ['React', 'TypeScript', 'Tailwind CSS v4'],
    status: 'active',
    link: 'https://github.com/commitpt/design-system',
    storybookLink: 'https://main--6a47d6ac8a9990bb6908d4a9.chromatic.com/',
    tagline: 'A biblioteca de componentes que unifica toda a experiência visual da CommitPT.',
    mission: {
      problem:
        'Sem um sistema de design partilhado, cada projeto da CommitPT teria componentes inconsistentes, estilos diferentes e bugs visuais duplicados.',
      importance:
        'O design system é a fundação visual de tudo o que a CommitPT constrói. Garante consistência, acelera o desenvolvimento e eleva a qualidade de todos os projetos.',
      impact:
        'Hoje é usado pelo Website e pela Plataforma CommitPT, e qualquer futuro projeto pode importá-lo com uma única linha.',
    },
    features: [
      {
        iconName: 'Layers',
        title: 'Componentes React',
        description: 'Button, Typography, Avatar e mais — todos bem documentados e testados.',
      },
      {
        iconName: 'Palette',
        title: 'Theming CSS',
        description:
          'Tema totalmente customizável via CSS custom properties, sem reescrever código.',
      },
      {
        iconName: 'BookOpen',
        title: 'Storybook',
        description: 'Documentação interativa de todos os componentes com exemplos em tempo real.',
      },
      {
        iconName: 'Package',
        title: 'Publicado no npm',
        description: 'Disponível via @commitpt/design-system para qualquer projeto da comunidade.',
      },
      {
        iconName: 'GitMerge',
        title: 'Semantic Versioning',
        description: 'Gestão de versões com Changesets para releases controladas e seguras.',
      },
      {
        iconName: 'Zap',
        title: 'Tailwind CSS v4',
        description:
          'Estilização moderna com a mais recente versão do Tailwind, sem configuração extra.',
      },
    ],
    learnings: [
      'React',
      'TypeScript',
      'Tailwind CSS v4',
      'Storybook',
      'Design Tokens',
      'Semantic Versioning',
      'npm Publishing',
      'Component API Design',
      'Code Reviews',
    ],
    workflow: ['Design', 'Componente', 'Documentação', 'Review', 'Release', 'Adoção'],
    impact: [
      { value: '3+', label: 'projetos que o usam' },
      { value: '10+', label: 'componentes reutilizáveis' },
      { value: '1', label: 'source of truth' },
      { value: 'npm', label: 'publicado e disponível' },
    ],
  },
  {
    id: 'website',
    title: 'Website CommitPT',
    description:
      'Landing page moderna e otimizada com Next.js 14, TypeScript e Tailwind CSS. Apresenta a comunidade e funciona como funil de conversão para Whop e Discord.',
    fullDescription:
      'O Website CommitPT é a porta de entrada para a comunidade. Construído com Next.js 14 (App Router), TypeScript em modo strict e Tailwind CSS v4, oferece uma experiência rápida e otimizada. O site foi desenhado como um funil de conversão com duas CTAs principais: a adesão paga via Whop e o acesso gratuito ao Discord. Inclui múltiplas seções (Hero, About, Features, Projetos, Footer) com animações suaves, design responsivo e SEO completo. Usa componentes da @commitpt/design-system, integração com CI/CD e Git hooks automáticos para garantir qualidade de código.',
    image: '/website_800w.webp',
    icon: '🌐',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS v4'],
    status: 'active',
    link: 'https://github.com/commitpt/website',
    tagline: 'A porta de entrada da CommitPT — o primeiro contacto de cada novo membro.',
    mission: {
      problem:
        'A CommitPT precisa de uma presença online que transmita profissionalismo e converta visitantes em membros. Um simples README não chega.',
      importance:
        'O website é o principal funil de conversão da comunidade. É ele que apresenta a proposta de valor, constrói confiança e encaminha visitantes para o Whop e o Discord.',
      impact:
        'Cada membro que entra na CommitPT passou pelo website. É a primeira impressão que define se alguém se junta ou não.',
    },
    features: [
      {
        iconName: 'Funnel',
        title: 'Funil de Conversão',
        description: 'Desenhado para converter visitantes em membros Whop ou Discord.',
      },
      {
        iconName: 'Smartphone',
        title: 'Design Responsivo',
        description: 'Experiência perfeita em qualquer dispositivo, do mobile ao desktop.',
      },
      {
        iconName: 'Search',
        title: 'SEO Otimizado',
        description: 'Metadata, Open Graph e estrutura semântica para máxima visibilidade.',
      },
      {
        iconName: 'Rocket',
        title: 'Performance',
        description: 'Next.js 14 App Router com SSG para tempos de carregamento mínimos.',
      },
      {
        iconName: 'Code2',
        title: 'Design System',
        description: 'Usa @commitpt/design-system para consistência visual com os outros projetos.',
      },
      {
        iconName: 'GitBranch',
        title: 'CI/CD',
        description: 'Pipeline automático de typecheck, lint, format e build em cada PR.',
      },
    ],
    learnings: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS v4',
      'SEO & Metadata',
      'App Router',
      'CI/CD com GitHub Actions',
      'Design System',
      'Git Hooks',
      'Code Reviews',
    ],
    workflow: ['Design', 'Componente', 'Review', 'CI/CD', 'Deploy', 'Feedback'],
    impact: [
      { value: '1ª', label: 'impressão da comunidade' },
      { value: '100%', label: 'open source' },
      { value: '2', label: 'CTAs de conversão' },
      { value: '4', label: 'checks de CI' },
    ],
  },
  {
    id: 'platform',
    title: 'Plataforma CommitPT',
    description:
      'Plataforma didática com frontend em Next.js 15 e API em NestJS. Sistema de autenticação Discord, database PostgreSQL e progressão de aprendizado.',
    fullDescription:
      'A Plataforma CommitPT é um ecosistema completo de aprendizado para a comunidade portuguesa de programadores. Composta por duas partes: (1) platform-web — frontend em Next.js 15 com Auth.js v5 (Discord OAuth), Tailwind CSS e Drizzle ORM para acesso a Neon PostgreSQL; oferece dashboard de aprendizado, explorador de cursos, editor de código integrado, roadmap visual e perfil de utilizador com sistema de premium via roles Discord. (2) platform-api — REST API em NestJS com PostgreSQL via Prisma ORM, Redis para cache, Zod para validação e Swagger para documentação. O sistema permite rastrear progresso, gerenciar cursos e lições, e determinar acesso premium automaticamente baseado em roles do Discord.',
    image: '/projects/platform.svg',
    icon: '📚',
    tags: ['Next.js 15', 'NestJS', 'PostgreSQL', 'Auth.js'],
    status: 'coming-soon',
    link: 'https://github.com/commitpt/platform',
    tagline: 'O ecosistema de aprendizado que vai definir o futuro da CommitPT.',
    mission: {
      problem:
        'A CommitPT precisa de uma plataforma própria para entregar conteúdo educativo, rastrear progresso e oferecer uma experiência de aprendizado estruturada — não dependente de ferramentas externas.',
      importance:
        'A plataforma é o próximo passo da CommitPT. É aqui que os membros vão aceder a cursos, roadmaps e ferramentas de aprendizado exclusivas, integradas com o sistema de roles do Discord.',
      impact:
        'Quando lançada, a plataforma vai ser o coração educativo da comunidade — o lugar onde os membros crescem de iniciantes a engenheiros.',
    },
    features: [
      {
        iconName: 'GraduationCap',
        title: 'Cursos & Lições',
        description: 'Sistema completo de cursos com lições, progresso e certificação.',
      },
      {
        iconName: 'Map',
        title: 'Roadmap Visual',
        description:
          'Percurso de aprendizado personalizado para diferentes áreas de especialização.',
      },
      {
        iconName: 'Code2',
        title: 'Editor de Código',
        description: 'Editor integrado para praticar diretamente na plataforma, sem sair.',
      },
      {
        iconName: 'Shield',
        title: 'Auth Discord',
        description:
          'Login via Discord OAuth com verificação automática de roles e acesso premium.',
      },
      {
        iconName: 'Database',
        title: 'PostgreSQL & Drizzle',
        description: 'Base de dados robusta com ORM moderno para gestão de dados de aprendizado.',
      },
      {
        iconName: 'Server',
        title: 'API NestJS',
        description: 'REST API modular em NestJS com Redis, Prisma, Zod e documentação Swagger.',
      },
    ],
    learnings: [
      'Next.js 15',
      'NestJS',
      'PostgreSQL',
      'Auth.js v5',
      'Discord OAuth',
      'Drizzle ORM',
      'Redis',
      'REST API Design',
      'Monorepo',
      'Code Reviews',
    ],
    workflow: ['Planeamento', 'API', 'Frontend', 'Auth', 'Review', 'Launch'],
    impact: [
      { value: '2026', label: 'ano de lançamento' },
      { value: '2', label: 'aplicações (web + api)' },
      { value: '∞', label: 'potencial de impacto' },
      { value: 'Em breve', label: 'coming soon' },
    ],
  },
]
