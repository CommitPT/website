import { unstable_cache } from 'next/cache'
import { WHOP_COMMIT_PLUS_ANNUAL_URL, WHOP_COMMIT_PLUS_URL } from '@/src/lib/links'

const MONTHLY_PLAN_ID = WHOP_COMMIT_PLUS_URL.split('/').pop()
const ANNUAL_PLAN_ID = WHOP_COMMIT_PLUS_ANNUAL_URL.split('/').pop()

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

export interface WhopPlan {
  id: string
  currency: string
  renewal_price: number
  initial_price: number
  product: { id: string; title: string }
}

interface WhopPlansResponse {
  data: WhopPlan[]
}

interface WhopMembership {
  id: string
}

interface WhopMembershipsResponse {
  data: WhopMembership[]
  page_info: {
    end_cursor: string | null
    has_next_page: boolean
  }
}

export interface WhopPlanPrices {
  monthly: number | null
  annual: number | null
}

// Module-level caches — survive across requests within the same server instance
let tokenCache: TokenCache | null = null
let lastSuccessfulReviews: WhopReview[] | null = null
let lastSuccessfulPlanPrices: WhopPlanPrices | null = null
let lastSuccessfulCustomerCount: number | null = null

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
  } catch {
    return lastSuccessfulReviews ?? []
  }
}

async function fetchPlanPrices(): Promise<WhopPlanPrices> {
  const productId = process.env.WHOP_PRODUCT_ID
  if (!process.env.WHOP_API_KEY || !productId) return { monthly: null, annual: null }

  const token = await getAccessToken()

  const res = await fetch(`https://api.whop.com/api/v1/plans?product_id=${productId}&first=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`Whop plans error: ${res.status} ${res.statusText}`)
  }

  const json: WhopPlansResponse = await res.json()
  const monthlyPlan = json.data.find((p) => p.id === MONTHLY_PLAN_ID)
  const annualPlan = json.data.find((p) => p.id === ANNUAL_PLAN_ID)

  return {
    monthly: monthlyPlan ? monthlyPlan.renewal_price : null,
    annual: annualPlan ? annualPlan.renewal_price : null,
  }
}

// unstable_cache caches the result for 24h — individual no-store fetches inside are fine
const getCachedPlanPrices = unstable_cache(fetchPlanPrices, ['whop-plan-prices'], {
  revalidate: 86400,
})

/** Preços mensal e anual (total cobrado/ano) do Commit+, em euros. `null` por plano se indisponível. */
export async function getWhopPlanPrices(): Promise<WhopPlanPrices> {
  if (!process.env.WHOP_API_KEY || !process.env.WHOP_PRODUCT_ID)
    return { monthly: null, annual: null }

  try {
    const prices = await getCachedPlanPrices()
    if (prices.monthly !== null || prices.annual !== null) lastSuccessfulPlanPrices = prices
    return prices
  } catch {
    return lastSuccessfulPlanPrices ?? { monthly: null, annual: null }
  }
}

async function fetchActiveCustomerCount(): Promise<number | null> {
  const productId = process.env.WHOP_PRODUCT_ID
  if (!process.env.WHOP_API_KEY || !productId) return null

  const token = await getAccessToken()

  let count = 0
  let after: string | null = null
  let page = 0

  // Cursor pagination, capped well above any realistic membership count.
  while (page < 50) {
    const url = new URL('https://api.whop.com/api/v1/memberships')
    url.searchParams.set('product_id', productId)
    url.searchParams.set('status', 'active')
    url.searchParams.set('first', '100')
    if (after) url.searchParams.set('after', after)

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Whop memberships error: ${res.status} ${res.statusText}`)
    }

    const json: WhopMembershipsResponse = await res.json()
    count += json.data.length

    if (!json.page_info.has_next_page || json.data.length === 0) break
    after = json.page_info.end_cursor
    page += 1
  }

  return count
}

// unstable_cache caches the result for 24h — individual no-store fetches inside are fine
const getCachedActiveCustomerCount = unstable_cache(fetchActiveCustomerCount, ['whop-customers'], {
  revalidate: 86400,
})

/** Nº de membros com subscrição ativa do Commit+. `null` se indisponível. */
export async function getWhopCustomerCount(): Promise<number | null> {
  if (!process.env.WHOP_API_KEY || !process.env.WHOP_PRODUCT_ID) return null

  try {
    const count = await getCachedActiveCustomerCount()
    if (count !== null) lastSuccessfulCustomerCount = count
    return count
  } catch {
    return lastSuccessfulCustomerCount
  }
}
