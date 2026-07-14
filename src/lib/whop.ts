import { unstable_cache } from 'next/cache'

export interface WhopReview {
  id: string
  title: string | null
  description: string | null
  stars: number
  status: 'pending' | 'published' | 'removed'
  created_at: string
  user: {
    id: string
    name: string
    username: string
  }
}

interface WhopReviewsResponse {
  data: WhopReview[]
}

interface TokenCache {
  token: string
  expiresAt: number // ms since epoch
}

// Module-level caches — survive across requests within the same server instance
let tokenCache: TokenCache | null = null
let lastSuccessfulReviews: WhopReview[] | null = null

// Refresh 5 minutes before actual expiry to avoid using a token that expires mid-request
const EXPIRY_BUFFER_MS = 5 * 60 * 1000
const TOKEN_TTL_HOURS = 3

async function getAccessToken(): Promise<string> {
  const now = Date.now()

  if (tokenCache && now < tokenCache.expiresAt - EXPIRY_BUFFER_MS) {
    return tokenCache.token
  }

  const apiKey = process.env.WHOP_API_KEY
  const companyId = process.env.WHOP_COMPANY_ID

  if (!apiKey) throw new Error('WHOP_API_KEY is not set')
  if (!companyId) throw new Error('WHOP_COMPANY_ID is not set')

  const expiresAt = new Date(now + TOKEN_TTL_HOURS * 60 * 60 * 1000).toISOString()

  const res = await fetch('https://api.whop.com/api/v1/access_tokens', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company_id: companyId, expires_at: expiresAt }),
    next: { revalidate: TOKEN_TTL_HOURS * 60 * 60 },
  })

  if (!res.ok) {
    throw new Error(`Whop token error: ${res.status} ${res.statusText}`)
  }

  const json: { token: string; expires_at: string } = await res.json()

  tokenCache = {
    token: json.token,
    expiresAt: new Date(json.expires_at).getTime(),
  }

  return tokenCache.token
}

async function fetchReviews(): Promise<WhopReview[]> {
  const productId = process.env.WHOP_PRODUCT_ID
  if (!process.env.WHOP_API_KEY || !productId) return []

  const token = await getAccessToken()

  const res = await fetch(`https://api.whop.com/api/v1/reviews?product_id=${productId}&first=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`Whop reviews error: ${res.status} ${res.statusText}`)
  }

  const json: WhopReviewsResponse = await res.json()
  return json.data.filter((r) => r.status === 'published')
}

// unstable_cache caches the result for 24h — individual no-store fetches inside are fine
const getCachedReviews = unstable_cache(fetchReviews, ['whop-reviews'], { revalidate: 86400 })

export async function getWhopReviews(): Promise<WhopReview[]> {
  if (!process.env.WHOP_API_KEY || !process.env.WHOP_PRODUCT_ID) return []

  try {
    const reviews = await getCachedReviews()
    if (reviews.length > 0) lastSuccessfulReviews = reviews
    return reviews
  } catch (err) {
    console.error('Failed to fetch Whop reviews:', err)
    return lastSuccessfulReviews ?? []
  }
}
