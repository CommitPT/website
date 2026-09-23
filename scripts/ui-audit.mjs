// Auditoria de UI da homepage, por Chrome DevTools Protocol. Node 22+ (WebSocket global).
//
//   yarn build && yarn start              # noutro terminal
//   yarn audit:ui                         # ou: yarn audit:ui http://localhost:3001/
//
// Verifica: erros na consola, overflow horizontal a 320/768/1024/1440, axe-core (WCAG 2.1 AA),
// ordem de tabulação, menu mobile, animações (nada preso invisível), cena 3D (só onde deve
// carregar) e desenhos WebGL (tem de parar fora do ecrã). Sai com código 1 se algo falhar.
//
// Precisa de um browser Chromium instalado (Edge ou Chrome). Defina BROWSER=<caminho> para
// indicar outro. Nada disto corre no CI: é uma ferramenta local.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const URL_ = process.argv[2] ?? process.env.AUDIT_URL ?? 'http://localhost:3000/'
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'commitpt-ui-audit-'))
const PORT = 9333

const BROWSERS = [
  process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const BROWSER = BROWSERS.find((candidate) => fs.existsSync(candidate))
if (!BROWSER) {
  console.error('Nenhum browser Chromium encontrado. Define BROWSER=<caminho para o executável>.')
  process.exit(1)
}

const edge = spawn(
  BROWSER,
  [
    '--headless=new',
    '--hide-scrollbars',
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${path.join(OUT, 'edge-profile')}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let targets
for (let i = 0; i < 40; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()
    if (targets.length) break
  } catch {}
  await sleep(250)
}
const page = targets.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r))

let id = 0
const pending = new Map()
const consoleErrors = []
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  }
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
    consoleErrors.push(
      `${msg.params.type}: ${msg.params.args.map((a) => a.value ?? a.description).join(' ')}`
    )
  }
  if (msg.method === 'Runtime.exceptionThrown')
    consoleErrors.push(
      `exception: ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`
    )
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error')
    consoleErrors.push(`log: ${msg.params.entry.text} ${msg.params.entry.url ?? ''}`)
})
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id
    pending.set(i, r)
    ws.send(JSON.stringify({ id: i, method, params }))
  })
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails))
  return r.result.result.value
}

await send('Runtime.enable')
await send('Log.enable')
await send('Page.enable')
await send('Network.enable')
let requests = []
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.method === 'Network.requestWillBeSent') requests.push(m.params.request.url)
})

async function load(width, height = 900, { reducedMotion = false } = {}) {
  await send('Emulation.setEmulatedMedia', {
    features: [
      { name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' },
    ],
  })
  requests = []
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  })
  await send('Page.navigate', { url: URL_ })
  await sleep(2500)
  // Dismiss nothing: the cookie banner is part of what visitors see.
}

const report = { consoleErrors, breakpoints: {}, axe: null, focus: [] }

for (const w of [320, 768, 1024, 1440]) {
  await load(w)
  report.breakpoints[w] = await evaluate(`(() => {
    const doc = document.documentElement
    const wide = [...document.querySelectorAll('body *')].filter(el => {
      const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1)
    }).filter(el => !el.closest('[aria-hidden="true"]') && getComputedStyle(el).position !== 'fixed')
      .slice(0, 8).map(el => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0,3).join('.') : '') + ' right=' + Math.round(el.getBoundingClientRect().right))
    return { scrollWidth: doc.scrollWidth, innerWidth, overflow: doc.scrollWidth > innerWidth, offenders: wide }
  })()`)
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  fs.writeFileSync(path.join(OUT, `bp-${w}.png`), Buffer.from(shot.result.data, 'base64'))
}

// Mobile menu at 320px: open, screenshot, Escape, focus must return to the menu button.
await load(320)
report.mobileMenu = await evaluate(
  `(() => { const b = document.querySelector('button[aria-controls="mobile-menu"]'); if (!b) return 'no menu button'; const r = b.getBoundingClientRect(); b.focus(); b.click(); return 'button at right=' + Math.round(r.right) + ' of ' + innerWidth })()`
)
await sleep(300)
{
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(OUT, 'bp-320-menu.png'), Buffer.from(shot.result.data, 'base64'))
}
await send('Input.dispatchKeyEvent', {
  type: 'keyDown',
  key: 'Escape',
  code: 'Escape',
  windowsVirtualKeyCode: 27,
})
await send('Input.dispatchKeyEvent', {
  type: 'keyUp',
  key: 'Escape',
  code: 'Escape',
  windowsVirtualKeyCode: 27,
})
await sleep(200)
report.mobileMenu +=
  ' | after Escape: menu ' +
  (await evaluate(`document.getElementById('mobile-menu') ? 'still open' : 'closed'`)) +
  ', focus on ' +
  (await evaluate(
    `document.activeElement.getAttribute('aria-label') || document.activeElement.tagName`
  ))

// Motion: reveals must finish, and with reduced motion nothing may stay hidden or load anime.js.
const hiddenProbe = `(() => { const els = [...document.querySelectorAll('[data-reveal], [data-diff-line]')]
  const hidden = els.filter(el => parseFloat(getComputedStyle(el).opacity) < 0.99)
  return { total: els.length, hidden: hidden.length, first: hidden[0] ? hidden[0].className.slice(0, 40) : null } })()`

await load(1440)
await evaluate(`window.scrollTo(0, document.body.scrollHeight)`)
await sleep(2500)
report.motion = {
  afterScroll: await evaluate(hiddenProbe),
  animeChunk: requests.some((u) => /chunks\/\d+\..*\.js/.test(u) && !u.includes('main')),
}

await load(1440, 900, { reducedMotion: true })
await sleep(1500)
report.motionReduced = {
  hidden: await evaluate(hiddenProbe),
  motionAttr: await evaluate(`document.documentElement.hasAttribute('data-motion')`),
  requestsAfterLoad: requests.filter((u) => u.includes('/_next/static/chunks/')).length,
}
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
})

// Cena 3D: frames por segundo com o hero à vista vs. no fundo da página, e LCP.
// Conta chamadas de desenho do WebGL (só a cena faz isto; o anime.js tem o seu próprio rAF).
const patchGl = `window.__draws = 0; for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
  for (const fn of ['drawArrays', 'drawElements']) { const o = proto[fn]; proto[fn] = function (...a) { window.__draws++; return o.apply(this, a) } }
} true`
await load(1440)
await sleep(3500)
report.lcp = await evaluate(
  `new Promise(res => { let v = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) v = e.startTime }).observe({ type: 'largest-contentful-paint', buffered: true }); setTimeout(() => res(Math.round(v)), 300) })`
)
await evaluate(patchGl)
await sleep(1000)
report.draws = { heroVisible: await evaluate('window.__draws') }
await evaluate(`window.scrollTo(0, document.body.scrollHeight); window.__draws = 0; true`)
await sleep(1200)
report.draws.scrolledAway = await evaluate('window.__draws')
await evaluate(`window.scrollTo(0, 0); window.__draws = 0; true`)
await sleep(1200)
report.draws.backToHero = await evaluate('window.__draws')

// Cena 3D: presente no desktop com WebGL, ausente em mobile e com movimento reduzido.
const sceneProbe = `!!document.querySelector('.gradient-panel canvas')`
await load(1440)
await sleep(3000)
report.scene = { desktop: await evaluate(sceneProbe) }
await load(360)
await sleep(3000)
report.scene.mobile = await evaluate(sceneProbe)
await load(1440, 900, { reducedMotion: true })
await sleep(3000)
report.scene.reducedMotion = await evaluate(sceneProbe)
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
})

// axe-core at desktop width
await load(1440)
await evaluate(
  `new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s) })`
)
report.axe = await evaluate(
  `axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }).then(r => r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 4).map(n => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\\n').slice(1, 2).join(' ').trim()) })))`
)

// Keyboard: Tab through the first 25 stops, record target and whether a focus indicator is visible.
await load(1440)
for (let i = 0; i < 25; i++) {
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Tab',
    code: 'Tab',
    windowsVirtualKeyCode: 9,
  })
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Tab',
    code: 'Tab',
    windowsVirtualKeyCode: 9,
  })
  await sleep(60)
  report.focus.push(
    await evaluate(`(() => {
    const el = document.activeElement; if (!el || el === document.body) return 'body'
    const cs = getComputedStyle(el)
    const visible = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none'
    const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40)
    return el.tagName.toLowerCase() + ' "' + label + '"' + (visible ? '' : '  <-- NO VISIBLE FOCUS')
  })()`)
  )
}

// ── Resumo ────────────────────────────────────────────────────────────────────

fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(report, null, 2))

const overflowing = Object.entries(report.breakpoints).filter(([, b]) => b.overflow)
const noFocus = report.focus.filter((f) => f.includes('NO VISIBLE FOCUS'))
const failures = []
if (report.consoleErrors.length)
  failures.push(`${report.consoleErrors.length} mensagens na consola`)
if (report.axe.length) failures.push(`${report.axe.length} violações axe`)
if (overflowing.length) failures.push(`overflow a ${overflowing.map(([w]) => w + 'px').join(', ')}`)
if (report.motion.afterScroll.hidden)
  failures.push(`${report.motion.afterScroll.hidden} elementos ficaram invisíveis`)
if (report.motionReduced.hidden.hidden)
  failures.push(`${report.motionReduced.hidden.hidden} invisíveis com movimento reduzido`)
if (report.scene.mobile) failures.push('cena 3D a carregar em mobile')
if (report.scene.reducedMotion) failures.push('cena 3D a carregar com movimento reduzido')

console.log(
  `consola: ${report.consoleErrors.length} · axe: ${report.axe.length} · LCP: ${report.lcp} ms`
)
console.log(
  `overflow: ${overflowing.length ? overflowing.map(([w]) => w + 'px').join(', ') : 'nenhum'}`
)
console.log(
  `animações: ${report.motion.afterScroll.hidden} invisíveis depois do scroll · movimento reduzido: ${report.motionReduced.hidden.hidden}`
)
console.log(
  `cena 3D: desktop ${report.scene.desktop} · mobile ${report.scene.mobile} · movimento reduzido ${report.scene.reducedMotion}`
)
console.log(
  `desenhos WebGL: ${report.draws.heroVisible} com o hero à vista, ${report.draws.scrolledAway} fora do ecrã`
)
console.log(`foco sem indicador: ${noFocus.length ? noFocus.join(' | ') : 'nenhum'}`)
console.log(`menu mobile: ${report.mobileMenu}`)
console.log(`detalhes e screenshots: ${OUT}`)

ws.close()
edge.kill()
if (failures.length) {
  console.error(`
FALHOU: ${failures.join('; ')}`)
  process.exit(1)
}
process.exit(0)
