import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import CookieConsent from '@/src/components/CookieConsent'
import Frame from '@/src/components/layout/Frame'
import SiteBackground, { BACKGROUND_SCRIPT } from '@/src/components/layout/SiteBackground'
import './globals.css'

const BASE_URL = 'https://www.commitpt.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'CommitPT — A comunidade portuguesa de Engenharia de Software',
  description:
    'A CommitPT é uma comunidade portuguesa de Engenharia de Software, gratuita para qualquer pessoa. Aprende com outros developers, participa em eventos, constrói projetos e evolui em conjunto. Commit+ é uma experiência premium opcional.',
  keywords: [
    'commitpt',
    'bruno moisao',
    'comunidade programadores portugal',
    'comunidade programação',
    'engenheiros software portugal',
    'aprender a programar',
    'aprender programação',
    'aprender python',
    'aprender javascript',
    'aprender typescript',
    'aprender desenvolvimento web',
    'como começar a programar',
    'programação para iniciantes',
    'curso programação portugal',
    'crescimento carreira tech',
    'carreira desenvolvedor',
    'como arranjar emprego programação',
    'developer portugal',
    'programador portugal',
    'code review',
    'accountability programadores',
    'side projects',
    'build in public',
    'projetos pessoais programação',
    'comunidade tech portugal',
    'discord programadores',
  ],
  authors: [{ name: 'CommitPT', url: BASE_URL }],
  creator: 'CommitPT',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'CommitPT — A comunidade portuguesa de Engenharia de Software',
    description:
      'A CommitPT é uma comunidade portuguesa de Engenharia de Software, gratuita para qualquer pessoa. Aprende com outros developers, participa em eventos, constrói projetos e evolui em conjunto. Commit+ é uma experiência premium opcional.',
    siteName: 'CommitPT',
    images: [{ url: '/commit_3_512w.webp', width: 512, height: 512, alt: 'CommitPT' }],
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary',
    title: 'CommitPT — A comunidade portuguesa de Engenharia de Software',
    description:
      'A CommitPT é uma comunidade portuguesa de Engenharia de Software, gratuita para qualquer pessoa.',
    images: ['/commit_3_512w.webp'],
  },
  icons: {
    icon: '/commit_icon_256w.webp',
    apple: '/commit_icon_256w.webp',
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o BACKGROUND_SCRIPT acrescenta `data-bg` antes da hidratação
    <html
      lang="pt"
      // As variáveis de fonte têm de estar no <html>: o --font-sans do @theme é resolvido em :root
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BACKGROUND_SCRIPT }} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0B0C0E" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-hidden"
        >
          Saltar para o conteúdo principal
        </a>
        <SiteBackground />
        <Frame>{children}</Frame>
        <CookieConsent />
      </body>
    </html>
  )
}
