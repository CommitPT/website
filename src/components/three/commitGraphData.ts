// ── Commit graph ──────────────────────────────────────────────────────────────
//
// Gera um histórico de git plausível: a linha `main` sempre a avançar, branches que
// saem dela, vivem alguns commits e voltam a fazer merge. Só dados — o desenho está
// em CommitGraph.tsx, e assim isto é testável e barato de gerar.

export interface GraphNode {
  x: number
  y: number
  z: number
  /** 0 = main; 1+ = lanes de branch (definem a cor). */
  lane: number
}

export interface GraphEdge {
  from: number
  to: number
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  /** Comprimento total em unidades de mundo, para o loop horizontal. */
  length: number
}

/** PRNG com semente: o mesmo grafo em todos os renders do mesmo carregamento. */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const LANE_Y = [0, 0.34, -0.32, 0.66, -0.62]
const SPACING = 0.22

export function buildCommitGraph(steps = 56, seed = 7): Graph {
  const random = mulberry32(seed)
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const halfLength = (steps * SPACING) / 2

  /** Índice do último nó de cada lane; null = lane livre. */
  const openBranches = new Map<number, { last: number; life: number }>()
  let previousMain: number | null = null

  const push = (step: number, lane: number): number => {
    nodes.push({
      x: step * SPACING - halfLength,
      y: LANE_Y[lane],
      z: (random() - 0.5) * 0.25,
      lane,
    })
    return nodes.length - 1
  }

  for (let step = 0; step < steps; step++) {
    const main = push(step, 0)
    if (previousMain !== null) edges.push({ from: previousMain, to: main })

    // Cada branch aberto ganha um commit; ao fim da sua vida, faz merge de volta ao main.
    for (const [lane, branch] of openBranches) {
      if (branch.life === 0) {
        edges.push({ from: branch.last, to: main })
        openBranches.delete(lane)
        continue
      }
      const node = push(step, lane)
      edges.push({ from: branch.last, to: node })
      openBranches.set(lane, { last: node, life: branch.life - 1 })
    }

    // Abrir um branch novo numa lane livre.
    const freeLane = LANE_Y.findIndex((_, lane) => lane > 0 && !openBranches.has(lane))
    if (freeLane > 0 && random() < 0.3) {
      const node = push(step, freeLane)
      edges.push({ from: main, to: node })
      openBranches.set(freeLane, { last: node, life: 2 + Math.floor(random() * 5) })
    }

    previousMain = main
  }

  return { nodes, edges, length: steps * SPACING }
}
