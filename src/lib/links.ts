// ── Conversion links ──────────────────────────────────────────────────────────
//
// Both funnel entry points go through Whop on purpose. Whop is where the click
// is attributed, so it is the destination even for the free tier — the Discord
// invite is handed out on the other side.
//
// Do not link discord.gg directly. It reaches the same server but bypasses the
// funnel, so the visit is invisible.

/** Paid membership. Primary CTA everywhere. */
export const WHOP_COMMIT_PLUS_URL = 'https://whop.com/commitpt-709e/commit-plus'

/** Free tier — routes through Whop, then on to Discord. Secondary CTA. */
export const WHOP_FREE_DISCORD_URL =
  'https://whop.com/joined/commitpt-709e/products/acesso-commitpt/'
