/**
 * Converte uma cor CSS (incluindo `oklch()`, que o THREE.Color não entende) para
 * três componentes 0–1, desenhando um píxel num canvas 2D e lendo-o de volta.
 * Devolve `null` se a cor não for reconhecida pelo browser.
 */
export function cssColorToRgb(color: string): [number, number, number] | null {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  // fillStyle rejeita valores inválidos em silêncio: comparar com o valor por defeito deteta isso.
  ctx.fillStyle = '#000000'
  ctx.fillStyle = color
  if (ctx.fillStyle === '#000000' && color.trim() !== '#000000') {
    // Pode ser mesmo preto; só desistimos se o browser também não pintar nada.
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    return a === 0 ? null : [r / 255, g / 255, b / 255]
  }

  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r / 255, g / 255, b / 255]
}

/** Lê uma custom property do `<html>` e converte-a. `fallback` é usado se falhar. */
export function cssVarToRgb(
  name: string,
  fallback: [number, number, number]
): [number, number, number] {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name)
  return (value && cssColorToRgb(value)) || fallback
}
