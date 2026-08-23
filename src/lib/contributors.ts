import contributorsFallback from '@/src/contributors.json'
import fs from 'fs'
import path from 'path'

export interface Contributor {
  name: string
  role: string
  bio: string
  githubUsername: string
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

function createHeaders() {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function fetchGitHubContributors(): Promise<Contributor[]> {
  const repos = ['website', 'discord-bot', 'design-system', 'platform-web', 'platform-api', 'docs']

  const endpoints = [
    ...repos.map((repo) => `https://api.github.com/repos/commitpt/${repo}/contributors`),
    'https://api.github.com/orgs/commitpt/public_members',
  ]

  const fallbackByUsername = new Map(
    (contributorsFallback as Contributor[]).map((contributor) => [
      contributor.githubUsername.toLowerCase(),
      contributor,
    ])
  )

  const contributorsByLogin = new Map<string, Contributor>()

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

        const profileResults = await Promise.all(
          contributors
            .filter((contributor): contributor is GitHubContributor => Boolean(contributor?.login))
            .map(async (contributor) => {
              const username = contributor.login.toLowerCase()
              if (contributorsByLogin.has(username)) {
                return null
              }

              const fallback = fallbackByUsername.get(username)

              if (fallback) {
                return {
                  username,
                  contributorData: {
                    name: fallback.name || contributor.login,
                    role: fallback.role || 'Contributor',
                    bio: fallback.bio || `Contribuidor ativo...`,
                    githubUsername: contributor.login,
                    github: fallback.github || contributor.html_url || null,
                    linkedin: fallback.linkedin ?? null,
                    instagram: fallback.instagram ?? null,
                    email: fallback.email ?? null,
                    website: fallback.website ?? null,
                  } satisfies Contributor,
                }
              }

              // só chega aqui se não houver fallback no JSON
              const profile = await getProfile(contributor.login)
              const company = profile?.company?.trim()
              const bio = profile?.bio?.trim() || ''
              const website = profile?.blog?.trim() ? profile.blog.trim() : null

              return {
                username,
                contributorData: {
                  name: profile?.name?.trim() || contributor.login,
                  role: company || 'Contributor',
                  bio: bio || `Contribuidor ativo...`,
                  githubUsername: contributor.login,
                  github: profile?.html_url || contributor.html_url || null,
                  linkedin: null,
                  instagram: null,
                  email: null,
                  website,
                } satisfies Contributor,
              }
            })
        )

        profileResults.forEach((result) => {
          if (!result) {
            return
          }

          contributorsByLogin.set(result.username, result.contributorData)
        })

        if (contributors.length < 100) {
          break
        }

        page += 1
      }
    } catch {
      continue
    }
  }

  // garantir que todos os contributors do JSON estão na lista caso nao esteja ele vai buscar a API do github
  // caso a API nao retorne o contributor ele vai usar o do JSON
  for (const fallbackContributor of contributorsFallback as Contributor[]) {
    const username = fallbackContributor.githubUsername.toLowerCase()
    if (!contributorsByLogin.has(username)) {
      contributorsByLogin.set(username, fallbackContributor)
    }
  }

  if (contributorsByLogin.size > 0) {
    const all = Array.from(contributorsByLogin.values())

    // Preferred ordering for top contributors (lowercase github usernames)
    const preferredOrder = [
      'spars57',
      'swaggath4k1ng',
      'rafaelj13',
      'alexandrahockett',
      'github',
      'luisilvapt',
      'hohops',
      'goncalocoimbra',
      'gongas251',
      'azunieee',
      'vexypt',
      'mrpotato5555',
    ]

    const byUsername = new Map(all.map((c) => [c.githubUsername.toLowerCase(), c]))

    const ordered: Contributor[] = []
    for (const u of preferredOrder) {
      const item = byUsername.get(u)
      if (item) {
        ordered.push(item)
        byUsername.delete(u)
      }
    }

    const remaining = Array.from(byUsername.values()).sort((a, b) => a.name.localeCompare(b.name))

    const finalContributors = ordered.concat(remaining)

    // Sincroniza com o ficheiro JSON caso existam novos users no github
    try {
      const filePath = path.join(process.cwd(), 'src', 'contributors.json')

      const existingUsernames = new Set(
        (contributorsFallback as Contributor[]).map((c) => c.githubUsername.toLowerCase())
      )
      const hasNew = finalContributors.some(
        (c) => !existingUsernames.has(c.githubUsername.toLowerCase())
      )

      if (hasNew) {
        fs.writeFileSync(filePath, JSON.stringify(finalContributors, null, 2))
        console.log('contributors.json sincronizado com novos contribuidores!')
      }
    } catch (err) {
      // Ignorar erros na produção (onde o sistema de ficheiros é read-only)
    }

    return finalContributors
  }

  return contributorsFallback as Contributor[]
}

const HIDDEN_CONTRIBUTORS = ['mrpotato5555']

function isVisible(contributor: Contributor): boolean {
  return !HIDDEN_CONTRIBUTORS.includes(contributor.githubUsername.toLowerCase())
}

export async function getContributors(): Promise<Contributor[]> {
  try {
    const contributors = await fetchGitHubContributors()

    return (
      contributors.length > 0 ? contributors : (contributorsFallback as Contributor[])
    ).filter(isVisible)
  } catch {
    return (contributorsFallback as Contributor[]).filter(isVisible)
  }
}
