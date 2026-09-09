// ── Types ─────────────────────────────────────────────────────────────────────

type GtagFn = (command: 'event', eventName: string, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

// ── Events ────────────────────────────────────────────────────────────────────
//
// Nomes usados nos CTAs da homepage. Mantidos como union para evitar
// nomes de evento divergentes espalhados pelos componentes.

export type AnalyticsEvent =
  | 'hero_join_click'
  | 'community_join_click'
  | 'project_interaction'
  | 'event_interaction'
  | 'commit_plus_view'
  | 'commit_plus_checkout'
  | 'testimonial_interaction'

// ── Helper ────────────────────────────────────────────────────────────────────

/** No-op quando o consentimento de cookies ainda não ativou o Google Analytics. */
export function trackEvent(name: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
