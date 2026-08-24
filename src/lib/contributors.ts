import contributorsFallback from '@/src/contributors.json'

export interface Contributor {
  name: string
  role: string
  bio: string
  githubUsername: string
  /** Nº de contribuições somadas em todos os repositórios da organização. */
  contributions?: number
  linkedin?: string | null
  github?: string | null
  instagram?: string | null
  email?: string | null
  website?: string | null
}

type GitHubContributor = {
  login: string
  html_url?: string
  contributions?: number
}

type GitHubUserProfile = {
  login: string
  name?: string | null
  bio?: string | null
  company?: string | null
  blog?: string | null
  html_url?: string | null
  twitter_username?: string | null
}

type RawContributor = {
  login: string
  htmlUrl?: string
  contributions: number
}

/**
 * Logins que nunca devem aparecer na página, mesmo que a API do GitHub os
 * devolva (bots e contas que pediram para sair).
 */
const EXCLUDED_USERNAMES = new Set(['mrpotato5555'])

function profileUrl(username: string): string {
  return `https://github.com/${username}`
}

function isExcluded(login: string): boolean {
  const username = login.toLowerCase()
  return EXCLUDED_USERNAMES.has(username) || username.endsWith('[bot]')
}

function createHeaders() {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

/**
 * O perfil do GitHub é a base; `src/contributors.json` é a camada de correção.
 * Cada campo curado no JSON ganha ao valor equivalente do GitHub, campo a
 * campo — quem tiver o perfil bem preenchido não precisa de entrada no JSON, e
 * quem o tiver errado/vazio só precisa de corrigir os campos em causa.
 */
function mergeContributor(
  raw: RawContributor,
  profile: GitHubUserProfile | null,
  curated: Contributor | undefined
): Contributor {
  const githubRole = profile?.company?.trim().replace(/^@/, '') || ''

  return {
    name: curated?.name || profile?.name?.trim() || raw.login,
    role: curated?.role || githubRole || 'Contributor',
    bio: curated?.bio || profile?.bio?.trim() || '',
    githubUsername: raw.login,
    contributions: raw.contributions,
    github: curated?.github || profile?.html_url || raw.htmlUrl || profileUrl(raw.login),
    linkedin: curated?.linkedin ?? null,
    instagram: curated?.instagram ?? null,
    email: curated?.email ?? null,
    website: curated?.website || profile?.blog?.trim() || null,
  }
}

/**
 * O `github` não precisa de estar no JSON — é sempre derivável do
 * `githubUsername`. Só é preciso lá quando for mesmo diferente do padrão.
 */
function curatedContributors(): Contributor[] {
  return (contributorsFallback as Contributor[])
    .filter((c) => !isExcluded(c.githubUsername))
    .map((c) => ({ ...c, github: c.github || profileUrl(c.githubUsername) }))
}

async function fetchGitHubContributors(): Promise<Contributor[]> {
  const repos = ['website', 'discord-bot', 'design-system', 'platform-web', 'platform-api', 'docs']

  const endpoints = [
    ...repos.map((repo) => `https://api.github.com/repos/commitpt/${repo}/contributors`),
    'https://api.github.com/orgs/commitpt/public_members',
  ]

  const curatedByUsername = new Map(
    (contributorsFallback as Contributor[]).map((contributor) => [
      contributor.githubUsername.toLowerCase(),
      contributor,
    ])
  )

  const getProfile = async (username: string): Promise<GitHubUserProfile | null> => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: createHeaders(),
        next: { revalidate: 3600 },
      })

      if (!response.ok) {
        return null
      }

      return (await response.json()) as GitHubUserProfile
    } catch {
      return null
    }
  }

  // 1. Recolher os logins de todos os repositórios, somando as contribuições
  //    de quem aparece em mais do que um.
  const rawByLogin = new Map<string, RawContributor>()

  for (const endpoint of endpoints) {
    try {
      let page = 1

      while (page <= 10) {
        const url = new URL(endpoint)
        url.searchParams.set('per_page', '100')
        url.searchParams.set('page', String(page))

        const response = await fetch(url.toString(), {
          headers: createHeaders(),
          next: { revalidate: 3600 },
        })

        if (!response.ok) {
          break
        }

        const data = (await response.json()) as
          GitHubContributor[] | { items?: GitHubContributor[] }

        const contributors = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : []

        if (contributors.length === 0) {
          break
        }

        for (const contributor of contributors) {
          if (!contributor?.login || isExcluded(contributor.login)) {
            continue
          }

          const username = contributor.login.toLowerCase()
          const existing = rawByLogin.get(username)

          if (existing) {
            existing.contributions += contributor.contributions ?? 0
            existing.htmlUrl = existing.htmlUrl || contributor.html_url
          } else {
            rawByLogin.set(username, {
              login: contributor.login,
              htmlUrl: contributor.html_url,
              contributions: contributor.contributions ?? 0,
            })
          }
        }

        if (contributors.length < 100) {
          break
        }

        page += 1
      }
    } catch {
      continue
    }
  }

  // 2. Enriquecer com o perfil público e aplicar por cima as correções do JSON.
  const merged = await Promise.all(
    Array.from(rawByLogin.entries()).map(async ([username, raw]) => {
      const profile = await getProfile(raw.login)
      return [username, mergeContributor(raw, profile, curatedByUsername.get(username))] as const
    })
  )

  const contributorsByLogin = new Map<string, Contributor>(merged)

  // 3. Quem está curado no JSON mas a API não devolveu (contribuições fora do
  //    GitHub, repositórios privados, API em baixo) entra na mesma.
  for (const curated of curatedContributors()) {
    const username = curated.githubUsername.toLowerCase()

    if (!contributorsByLogin.has(username)) {
      contributorsByLogin.set(username, curated)
    }
  }

  if (contributorsByLogin.size === 0) {
    return curatedContributors()
  }

  return Array.from(contributorsByLogin.values()).sort(
    (a, b) => (b.contributions ?? 0) - (a.contributions ?? 0)
  )
}

export async function getContributors(): Promise<Contributor[]> {
  try {
    const contributors = await fetchGitHubContributors()

    return contributors.length > 0 ? contributors : curatedContributors()
  } catch {
    return curatedContributors()
  }
}
