import { FloralCluster } from './floralParts'

export type FloralCornerPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

interface FloralCornerProps {
  corner: FloralCornerPosition
  className?: string
  opacity?: number
}

const placements: Record<FloralCornerPosition, string> = {
  'top-left': 'left-0 top-0',
  'top-right': 'right-0 top-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
}

const flips: Record<FloralCornerPosition, string | undefined> = {
  'top-left': undefined,
  'top-right': 'scaleX(-1)',
  'bottom-left': 'scaleY(-1)',
  'bottom-right': 'scale(-1, -1)',
}

export function FloralCorner({
  corner,
  className = 'w-[clamp(180px,28vw,360px)]',
  opacity = 1,
}: FloralCornerProps) {
  return (
    <div
      className={`pointer-events-none absolute z-0 ${placements[corner]} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div style={{ transform: flips[corner] }}>
        <FloralCluster className="h-auto w-full" />
      </div>
    </div>
  )
}
