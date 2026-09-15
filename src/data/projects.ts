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
      'O principal motor operacional da comunidade. Automatiza accountability, XP, invites, tickets, private chats e onboarding com automatismos pouco comuns em comunidades de Discord.',
    fullDescription:
      'O Discord Bot CommitPT é o principal motor operacional da comunidade, com automatismos pouco comuns em comunidades de Discord. Oferece um sistema completo de XP e levels, rastreamento de convites, seleção de roles por interesse e linguagem, sistema de tickets para suporte, criação de private chats para membros Commit+, relatórios de moderação e onboarding automático. Construído com TypeScript e discord.js v14, o bot gerencia integrações com SQLite para persistência de dados e integra alertas automáticos para staff.',
    image: '/discord-bot_800w.webp',
    icon: '🤖',
    tags: ['TypeScript', 'discord.js v14', 'PostgreSQL'],
    status: 'active',
    link: 'https://github.com/commitpt/discord-bot',
    tagline: 'O sistema responsável por automatizar toda a operação da comunidade.',
    mission: {
      problem:
        'Gerir uma comunidade ativa no Discord manualmente é impossível. Sem automação, o staff perde horas em tarefas repetitivas e os membros têm uma experiência inconsistente.',
      importance:
        'O bot é o principal motor da comunidade em termos operacionais, com automatismos pouco comuns em comunidades de Discord. É ele que garante que cada membro é bem recebido, que o XP é registado, que os tickets são geridos e que os membros Commit+ têm acesso privilegiado, automaticamente.',
      impact:
        'Hoje, o bot serve mais de 550 membros em tempo real, sem intervenção manual. É o principal motor operacional da comunidade e liberta o staff para o que realmente importa: criar valor para a comunidade.',
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
      'PostgreSQL',
      'Arquitetura de aplicações',
      'Persistência de dados',
      'Sistema de eventos',
      'Slash Commands',
      'Code Reviews',
      'Trabalho em equipa',
    ],
    workflow: ['Ideias', 'Planeamento', 'Issues', 'Implementação', 'Code Review', 'Deploy'],
    impact: [
      { value: '550+', label: 'membros servidos' },
      { value: '30+', label: 'funcionalidades ativas' },
      { value: '6', label: 'módulos independentes' },
      { value: '100%', label: 'automatizado' },
    ],
  },
  {
    id: 'design-system',
    title: 'Design System (UI/UX)',
    description:
      'Biblioteca de componentes React com Tailwind CSS v4, TypeScript e shadcn/ui. Tema customizável via CSS custom properties.',
    fullDescription:
      'O @commitpt/design-system é a biblioteca central de componentes reutilizáveis que potencia toda a plataforma CommitPT. Construído com React, TypeScript e Tailwind CSS v4, oferece um conjunto de componentes bem documentados (Button, Typography, Avatar, etc) com suporte total a customização via CSS custom properties. Inclui Storybook para documentação interativa e usa Changesets para gestão de versioning semântico. Publicado no npm scope @commitpt e disponível para uso em qualquer projeto da comunidade.',
    image: '/storybook_800w.webp',
    icon: '🎨',
    tags: ['React', 'TypeScript', 'Tailwind CSS v4'],
    status: 'active',
    link: 'https://github.com/commitpt/design-system',
    storybookLink: 'https://storybook.commitpt.com',
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
        description: 'Button, Typography, Avatar e mais, todos bem documentados e testados.',
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
    title: 'Website',
    description:
      'Landing page moderna e otimizada com Next.js 14, TypeScript e Tailwind CSS. Apresenta a comunidade e funciona como funil de conversão para Whop e Discord.',
    fullDescription:
      'O Website CommitPT é a porta de entrada para a comunidade. Construído com Next.js 14 (App Router), TypeScript em modo strict e Tailwind CSS v4, oferece uma experiência rápida e otimizada. O site foi desenhado como um funil de conversão com duas CTAs principais: a adesão paga via Whop e o acesso gratuito ao Discord. Inclui múltiplas seções (Hero, About, Features, Projetos, Footer) com animações suaves, design responsivo e SEO completo. Usa componentes da @commitpt/design-system, integração com CI/CD e Git hooks automáticos para garantir qualidade de código.',
    image: '/website_800w.webp',
    icon: '🌐',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS v4'],
    status: 'active',
    link: 'https://github.com/commitpt/website',
    tagline: 'A porta de entrada da CommitPT, o primeiro contacto de cada novo membro.',
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
    id: 'platform-web',
    title: 'Plataforma CommitPT (Web)',
    description:
      'Frontend da plataforma didática em Next.js 15, com autenticação Discord e progressão de aprendizagem.',
    fullDescription:
      'O platform-web é o frontend da Plataforma CommitPT, construído em Next.js 15 com Auth.js v5 (Discord OAuth), Tailwind CSS e Drizzle ORM para acesso a Neon PostgreSQL. Oferece dashboard de aprendizagem, explorador de cursos, editor de código integrado, roadmap visual e perfil de utilizador com sistema de premium via roles Discord.',
    image: '/projects/platform.svg',
    icon: '📚',
    tags: ['Next.js 15', 'TypeScript', 'Drizzle ORM'],
    status: 'coming-soon',
    link: 'https://github.com/commitpt/platform-web',
    tagline: 'O ecossistema de aprendizagem que vai definir o futuro da CommitPT.',
    mission: {
      problem:
        'A CommitPT precisa de uma plataforma própria para entregar conteúdo educativo, acompanhar o progresso e oferecer uma experiência de aprendizagem estruturada, não dependente de ferramentas externas.',
      importance:
        'A plataforma é o próximo passo da CommitPT. É aqui que os membros vão aceder a cursos, roadmaps e ferramentas de aprendizagem exclusivas, integradas com o sistema de roles do Discord.',
      impact:
        'Quando lançada, a plataforma vai ser o coração educativo da comunidade, o lugar onde os membros crescem de iniciantes a engenheiros.',
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
          'Percurso de aprendizagem personalizado para diferentes áreas de especialização.',
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
        description: 'Base de dados robusta com ORM moderno para gestão de dados de aprendizagem.',
      },
    ],
    learnings: [
      'Next.js 15',
      'TypeScript',
      'Auth.js v5',
      'Discord OAuth',
      'Drizzle ORM',
      'PostgreSQL',
      'Code Reviews',
    ],
    workflow: ['Planeamento', 'Frontend', 'Auth', 'Review', 'Launch'],
    impact: [
      { value: '2026', label: 'ano de lançamento' },
      { value: '97%', label: 'TypeScript / React' },
      { value: 'Em breve', label: 'coming soon' },
    ],
  },
  {
    id: 'platform-api',
    title: 'Plataforma CommitPT (API)',
    description:
      'API REST em NestJS que serve a plataforma didática: cursos, progresso e acesso premium via Discord.',
    fullDescription:
      'O platform-api é a REST API em NestJS que serve o platform-web, com PostgreSQL via Prisma ORM, Redis para cache, Zod para validação e Swagger para documentação. Permite acompanhar o progresso, gerir cursos e lições, e determinar acesso premium automaticamente com base nos roles do Discord.',
    image: '/projects/platform.svg',
    icon: '🛠️',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL'],
    status: 'coming-soon',
    link: 'https://github.com/commitpt/platform-api',
    tagline: 'O motor por trás dos cursos, do progresso e do acesso premium da plataforma.',
    mission: {
      problem:
        'O platform-web precisa de uma API robusta e desacoplada para gerir cursos, progresso e permissões sem depender de lógica espalhada pelo frontend.',
      importance:
        'É a API que decide quem tem acesso a quê, regista o progresso de cada membro e mantém a plataforma e o Discord sincronizados.',
      impact:
        'Quando lançada, garante que a progressão de aprendizagem é fiável e que o acesso premium reflete sempre o estado real de cada membro no Discord.',
    },
    features: [
      {
        iconName: 'Server',
        title: 'API NestJS',
        description: 'REST API modular em NestJS com Redis, Prisma, Zod e documentação Swagger.',
      },
      {
        iconName: 'Database',
        title: 'PostgreSQL & Prisma',
        description: 'Persistência de cursos, lições e progresso via Prisma ORM.',
      },
      {
        iconName: 'Zap',
        title: 'Cache com Redis',
        description: 'Reduz latência em endpoints de leitura frequente.',
      },
      {
        iconName: 'ShieldAlert',
        title: 'Validação com Zod',
        description: 'Contratos de entrada validados em runtime, não só em tipos.',
      },
    ],
    learnings: ['NestJS', 'TypeScript', 'Prisma ORM', 'Redis', 'Zod', 'Swagger', 'Code Reviews'],
    workflow: ['Planeamento', 'API', 'Review', 'Launch'],
    impact: [
      { value: '2026', label: 'ano de lançamento' },
      { value: '88.7%', label: 'TypeScript' },
      { value: 'Em breve', label: 'coming soon' },
    ],
  },
  {
    id: 'usm',
    title: 'USM (User Statistics & Management)',
    description:
      'Serviço que gere perfis de membros: XP, streaks, links e achievements. Já em produção, alimenta os perfis públicos do site.',
    fullDescription:
      'O USM (usm.commitpt.com) é o serviço que centraliza os dados de cada membro: perfil, estatísticas (XP, mensagens enviadas, calls), streaks de participação, links pessoais e achievements desbloqueados. É consumido diretamente por este website para gerar os perfis públicos em /u/[username], com fallback gracioso quando algum endpoint secundário falha.',
    image: '/projects/platform.svg',
    icon: '📊',
    tags: ['TypeScript', 'REST API', 'Docker'],
    status: 'coming-soon',
    link: 'https://github.com/commitpt/usm',
    tagline: 'A fonte de verdade sobre quem é cada membro e o que já construiu.',
    mission: {
      problem:
        'Sem um serviço central, os dados de cada membro (XP, streaks, achievements) ficariam espalhados entre o bot, a plataforma e o website, com risco de ficarem dessincronizados.',
      importance:
        'O USM é a fonte única de verdade sobre cada membro. Bot, website e futura plataforma consultam-no em vez de manterem cópias próprias dos mesmos dados.',
      impact:
        'Já alimenta os perfis públicos deste website em produção, com estatísticas, streaks e achievements reais de cada membro.',
    },
    features: [
      {
        iconName: 'UserPlus',
        title: 'Perfis de Membro',
        description: 'Dados agregados de cada membro: bio, GitHub, estatísticas e streak.',
      },
      {
        iconName: 'Trophy',
        title: 'Achievements',
        description: 'Sistema de conquistas desbloqueadas por participação na comunidade.',
      },
      {
        iconName: 'Zap',
        title: 'Streaks',
        description: 'Acompanha sequências de participação, com freezes incluídos.',
      },
    ],
    learnings: ['TypeScript', 'REST API Design', 'Docker', 'Code Reviews'],
    workflow: ['Planeamento', 'API', 'Review', 'Deploy'],
    impact: [
      { value: '94.5%', label: 'TypeScript' },
      { value: '1', label: 'fonte de verdade' },
      { value: 'Em produção', label: 'já em uso' },
    ],
  },
  {
    id: 'audit-logs',
    title: 'Audit Logs',
    description: 'Serviço interno que regista eventos de auditoria dos sistemas da CommitPT.',
    fullDescription:
      'O Audit Logs centraliza o registo de eventos de auditoria entre os sistemas internos da CommitPT, com PostgreSQL para persistência e Docker para deploy. Descrição a confirmar com a equipa.',
    image: '/projects/platform.svg',
    icon: '🗂️',
    tags: ['TypeScript', 'PostgreSQL', 'Docker'],
    status: 'coming-soon',
    link: 'https://github.com/commitpt/audit-logs',
    tagline: 'O registo do que acontece por trás dos outros sistemas.',
    mission: {
      problem:
        'Sem um registo centralizado, é difícil investigar o que aconteceu entre os vários sistemas da CommitPT quando algo corre mal.',
      importance: 'Garante rastreabilidade entre os sistemas internos da comunidade.',
      impact: 'Descrição a confirmar com a equipa.',
    },
    features: [],
    learnings: ['TypeScript', 'PostgreSQL', 'Docker', 'Code Reviews'],
    workflow: ['Planeamento', 'API', 'Review', 'Deploy'],
    impact: [
      { value: '85%', label: 'TypeScript' },
      { value: '5.2%', label: 'PLpgSQL' },
    ],
  },
]
