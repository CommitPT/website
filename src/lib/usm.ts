export interface PublicProfileStats {
  experience: number
  messagesSent: number
  callsJoined: number
}

export interface PublicProfileStreak {
  currentStreak: number
  longestStreak: number
  freezes: number
  freezesUsed: number
}

export interface PublicProfileLink {
  id: string
  type: string
  value: string
  description: string | null
}

export interface PublicProfileAchievement {
  id: string
  key: string
  category: string
  name: string
  description: string | null
  xpReward: number
  unlockedAt: string
}

export interface PublicProfile {
  username: string
  fullName: string | null
  bio: string | null
  createdAt: string
  githubUsername: string | null
  stats: PublicProfileStats | null
  streak: PublicProfileStreak | null
  links: PublicProfileLink[]
  achievements: PublicProfileAchievement[]
}

// ── Raw API shapes (subset of fields we actually consume) ──────────────────────

interface UsmUser {
  id: string
  username: string | null
  fullName: string | null
  bio: string | null
  createdAt: string
  githubId: string | null
}

interface UsmUserStatistics {
  experience: number
  messagesSent: number
  callsJoined: number
}

interface UsmUserStreak {
  currentStreak: number
  longestStreak: number
  freezes: number
  freezesUsed: number
}

interface UsmUserLink {
  id: string
  type: string
  value: string
  description: string | null
}

interface UsmAchievement {
  key: string
  category: string
  name: string
  description: string | null
  xpReward: number
}

interface UsmUserAchievement {
  id: string
  unlockedAt: string
  achievement: UsmAchievement
}

// ── Client ────────────────────────────────────────────────────────────────────

const API_BASE = process.env.USM_API_URL ?? 'https://usm.commitpt.com'
const REVALIDATE_SECONDS = 300

function headers(): HeadersInit {
  const apiKey = process.env.USM_API_KEY
  return {
    'X-API-KEY': apiKey ?? '',
    'Content-Type': 'application/json',
  }
}

async function get<T>(path: string): Promise<T | null> {
  if (!process.env.USM_API_KEY) return null

  const res = await fetch(`${API_BASE}${path}`, {
    headers: headers(),
    next: { revalidate: REVALIDATE_SECONDS },
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error(`USM API error: ${res.status} ${res.statusText} (${path})`)

  return (await res.json()) as T
}

async function getOrEmpty<T>(path: string, fallback: T): Promise<T> {
  try {
    const result = await get<T>(path)
    return result ?? fallback
  } catch {
    return fallback
  }
}

/**
 * Perfil público de um membro, agregado a partir de vários endpoints do serviço
 * de gestão de utilizadores (usm.commitpt.com). Devolve `null` quando o
 * username não existe. Falhas em endpoints secundários (estatísticas, streak,
 * links, achievements) degradam de forma graciosa em vez de derrubar a página.
 */
export async function getPublicProfile(username: string): Promise<PublicProfile | null> {
  if (!process.env.USM_API_KEY) return null

  const user = await get<UsmUser>(`/user/username/${encodeURIComponent(username)}`).catch(
    () => null
  )

  if (!user) return null

  const [stats, streak, links, achievements] = await Promise.all([
    getOrEmpty<UsmUserStatistics | null>(`/user-statistics/user/${user.id}`, null),
    getOrEmpty<UsmUserStreak | null>(`/user-streak/user/${user.id}`, null),
    getOrEmpty<UsmUserLink[]>(`/user-link/user/${user.id}`, []),
    getOrEmpty<UsmUserAchievement[]>(`/achievements/user/${user.id}`, []),
  ])

  return {
    username: user.username ?? username,
    fullName: user.fullName,
    bio: user.bio,
    createdAt: user.createdAt,
    githubUsername: user.githubId,
    stats: stats
      ? {
          experience: stats.experience,
          messagesSent: stats.messagesSent,
          callsJoined: stats.callsJoined,
        }
      : null,
    streak: streak
      ? {
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          freezes: streak.freezes,
          freezesUsed: streak.freezesUsed,
        }
      : null,
    links: links.map((link) => ({
      id: link.id,
      type: link.type,
      value: link.value,
      description: link.description,
    })),
    achievements: achievements.map((ua) => ({
      id: ua.id,
      key: ua.achievement.key,
      category: ua.achievement.category,
      name: ua.achievement.name,
      description: ua.achievement.description,
      xpReward: ua.achievement.xpReward,
      unlockedAt: ua.unlockedAt,
    })),
  }
}
