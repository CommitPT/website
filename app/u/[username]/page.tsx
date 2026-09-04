import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import { getContributors } from '@/src/lib/contributors'
import { getPublicProfile, type PublicProfileLink } from '@/src/lib/usm'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from '@commitpt/design-system'
import {
  ArrowRight,
  Flame,
  GitBranch,
  Github,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  MessageSquare,
  Music2,
  Phone,
  Trophy,
  Twitter,
  Video,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const BASE_URL = 'https://www.commitpt.com'

// ── Link type → icon ─────────────────────────────────────────────────────────

const LINK_ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  tiktok: Music2,
  discord: MessageSquare,
  youtube: Video,
  website: LinkIcon,
}

function iconForLink(link: PublicProfileLink): LucideIcon {
  return LINK_ICONS[link.type.toLowerCase()] ?? LinkIcon
}

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

/** Primeiro e último nome próprio, a partir do nome completo (ex.: "Guilherme Filipe Martins
 * Ribeiro" → "Guilherme Ribeiro"). `null` se não houver nome completo definido. */
function shortName(fullName: string | null): string | null {
  if (!fullName) return null

  const parts = fullName.trim().split(/\s+/)
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1]}`
}

// ── Metadata ──────────────────────────────────────────────────────────────────

interface ProfilePageProps {
  params: { username: string }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const profile = await getPublicProfile(params.username)

  if (!profile) {
    return { title: 'Perfil não encontrado — CommitPT' }
  }

  const displayName = shortName(profile.fullName) ?? profile.username
  const title = `${displayName} — Perfil CommitPT`
  const description = profile.bio || `Perfil de ${displayName} na comunidade CommitPT.`

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/u/${profile.username}`,
    },
    openGraph: {
      type: 'profile',
      url: `${BASE_URL}/u/${profile.username}`,
      title,
      description,
      siteName: 'CommitPT',
      locale: 'pt_PT',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getPublicProfile(params.username)

  if (!profile) {
    notFound()
  }

  const contributor = profile.githubUsername
    ? (await getContributors()).find(
        (c) => c.githubUsername.toLowerCase() === profile.githubUsername!.toLowerCase()
      )
    : undefined
  const hasContributions = !!contributor && (contributor.contributions ?? 0) > 0
  const displayName = shortName(profile.fullName) ?? profile.username

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content">
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
              <Avatar size="xl">
                {profile.githubUsername && (
                  <AvatarImage
                    src={`https://github.com/${profile.githubUsername}.png`}
                    alt={displayName}
                  />
                )}
                <AvatarFallback>{initials(displayName)}</AvatarFallback>
              </Avatar>

              <div>
                <Typography variant="h1" className="text-4xl sm:text-5xl">
                  {displayName}
                </Typography>
                {displayName !== profile.username && (
                  <Typography variant="small" color="muted" className="mt-1 font-mono">
                    @{profile.username}
                  </Typography>
                )}
                {profile.bio && (
                  <Typography variant="p" color="muted" className="mt-3 max-w-xl">
                    {profile.bio}
                  </Typography>
                )}

                {profile.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                    {profile.links.map((link) => {
                      const Icon = iconForLink(link)
                      return (
                        <a
                          key={link.id}
                          href={link.value}
                          target="_blank"
                          rel="noreferrer"
                          title={link.description ?? link.type}
                          className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Icon size={14} aria-hidden="true" />
                          {link.type}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {(profile.stats || profile.streak) && <StatsSection profile={profile} />}

        {hasContributions && contributor && <GitHubSection contributor={contributor} />}

        {profile.achievements.length > 0 && (
          <AchievementsSection achievements={profile.achievements} />
        )}
      </main>
      <Footer />
    </div>
  )
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function StatsSection({
  profile,
}: {
  profile: NonNullable<Awaited<ReturnType<typeof getPublicProfile>>>
}) {
  const tiles: { icon: LucideIcon; value: string | number; label: string }[] = []

  if (profile.stats) {
    tiles.push(
      { icon: Zap, value: profile.stats.experience, label: 'XP' },
      { icon: MessageSquare, value: profile.stats.messagesSent, label: 'mensagens enviadas' },
      { icon: Phone, value: profile.stats.callsJoined, label: 'chamadas participadas' }
    )
  }

  if (profile.streak) {
    tiles.push(
      { icon: Flame, value: profile.streak.currentStreak, label: 'streak atual' },
      { icon: Trophy, value: profile.streak.longestStreak, label: 'streak mais longa' }
    )
  }

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface px-4 py-6 text-center"
            >
              <tile.icon size={18} className="text-primary" aria-hidden="true" />
              <Typography variant="h3" className="font-mono" as="p">
                {tile.value}
              </Typography>
              <Typography variant="small" color="muted">
                {tile.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── GitHub ────────────────────────────────────────────────────────────────────

function GitHubSection({
  contributor,
}: {
  contributor: Awaited<ReturnType<typeof getContributors>>[number]
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GitBranch size={18} className="text-primary" aria-hidden="true" />
              <CardTitle>Contribuidor open source</CardTitle>
            </div>
            <CardDescription>
              {contributor.contributions} contribuições em projetos da comunidade CommitPT.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href={contributor.github ?? `https://github.com/${contributor.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-2' })}
            >
              <Github size={14} aria-hidden="true" />
              Ver perfil no GitHub
              <ArrowRight size={14} />
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// ── Achievements ──────────────────────────────────────────────────────────────

function AchievementsSection({
  achievements,
}: {
  achievements: NonNullable<Awaited<ReturnType<typeof getPublicProfile>>>['achievements']
}) {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
        <Typography variant="h2" className="mb-8 sm:text-3xl">
          Achievements
        </Typography>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{achievement.name}</CardTitle>
                  <Badge variant="secondary">+{achievement.xpReward} XP</Badge>
                </div>
                {achievement.description && (
                  <CardDescription>{achievement.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Typography variant="small" color="muted" className="font-mono">
                  Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-PT')}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
