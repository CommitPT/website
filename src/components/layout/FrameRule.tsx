/**
 * Linha horizontal que atravessa o ecrã inteiro, colada ao fundo do elemento
 * pai (que tem de ser `relative`). Separa secções dentro e fora da moldura.
 */
export default function FrameRule() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border"
    />
  )
}
