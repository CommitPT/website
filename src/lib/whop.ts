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
  if (!apiKey) {
    throw new Error('WHOP_API_KEY is not set')
  }

  const companyId = process.env.WHOP_COMPANY_ID
  if (!companyId) {
    throw new Error('WHOP_COMPANY_ID is not set')
  }

  const expiresAt = new Date(now + TOKEN_TTL_HOURS * 60 * 60 * 1000).toISOString()

  const res = await fetch('https://api.whop.com/api/v1/access_tokens', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company_id: companyId, expires_at: expiresAt }),
    cache: 'no-store',
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

export async function getWhopReviews(): Promise<WhopReview[]> {
  const productId = process.env.WHOP_PRODUCT_ID

  if (!process.env.WHOP_API_KEY || !productId) {
    return []
  }

  try {
    const token = await getAccessToken()

    const res = await fetch(
      `https://api.whop.com/api/v1/reviews?product_id=${productId}&first=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 86400 },
      }
    )

    if (!res.ok) {
      console.error(`Whop reviews error: ${res.status} ${res.statusText}`)
      return []
    }

    const json: WhopReviewsResponse = await res.json()
    const reviews = json.data.filter((r) => r.status === 'published')
    lastSuccessfulReviews = reviews
    return reviews
  } catch (err) {
    console.error('Failed to fetch Whop reviews:', err)
    if (lastSuccessfulReviews) {
      return lastSuccessfulReviews
    }
    return []
  }
}
