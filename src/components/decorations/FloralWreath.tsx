import type { ReactNode } from 'react'
import { Blossom, Bloom, Bud, Leaf, type LeafTone } from './floralParts'

interface FloralWreathProps {
  children?: ReactNode
  className?: string
}

interface WreathLeaf {
  x: number
  y: number
  rotate: number
  scale: number
  tone: LeafTone
}

const outerLeaves: WreathLeaf[] = Array.from({ length: 32 }, (_, index) => {
  const angle = (index / 32) * 360
  const radians = (angle * Math.PI) / 180
  return {
    x: 200 + Math.cos(radians) * 150,
    y: 200 + Math.sin(radians) * 150,
    rotate: angle + (index % 2 === 0 ? 62 : 118),
    scale: index % 2 === 0 ? 0.55 : 0.48,
    tone: index % 3 === 0 ? 'forest' : 'sage',
  }
})

const innerLeaves: WreathLeaf[] = Array.from({ length: 20 }, (_, index) => {
  const angle = (index / 20) * 360 + 9
  const radians = (angle * Math.PI) / 180
  return {
    x: 200 + Math.cos(radians) * 120,
    y: 200 + Math.sin(radians) * 120,
    rotate: angle + (index % 2 === 0 ? 242 : 298),
    scale: 0.4,
    tone: index % 2 === 0 ? 'olive' : 'forest',
  }
})

export function FloralWreath({
  children,
  className = '',
}: FloralWreathProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r="150"
          stroke="#718B50"
          strokeWidth="1.1"
          strokeDasharray="1 7"
          opacity="0.35"
        />
        <circle
          cx="200"
          cy="200"
          r="122"
          stroke="#718B50"
          strokeWidth="0.8"
          opacity="0.18"
        />

        {outerLeaves.map((leaf, index) => (
          <Leaf
            key={`outer-${index}`}
            x={leaf.x}
            y={leaf.y}
            rotate={leaf.rotate}
            scale={leaf.scale}
            tone={leaf.tone}
          />
        ))}
        {innerLeaves.map((leaf, index) => (
          <Leaf
            key={`inner-${index}`}
            x={leaf.x}
            y={leaf.y}
            rotate={leaf.rotate}
            scale={leaf.scale}
            tone={leaf.tone}
          />
        ))}

        <Bloom variant="coral" x={200} y={52} scale={0.95} rotate={6} />
        <Bloom variant="burgundy" x={348} y={200} scale={0.82} rotate={-12} />
        <Bloom variant="ivory" x={200} y={348} scale={0.88} rotate={8} />
        <Bloom variant="blush" x={52} y={200} scale={0.9} rotate={-6} />
        <Bloom variant="violet" x={306} y={306} scale={0.48} rotate={16} />

        <Blossom x={306} y={94} scale={0.6} rotate={12} />
        <Blossom x={94} y={306} scale={0.55} rotate={-16} variant="blush" />
        <Blossom x={94} y={94} scale={0.5} rotate={22} />

        <Bud variant="burgundy" x={150} y={54} scale={0.55} rotate={-34} />
        <Bud variant="coral" x={252} y={54} scale={0.5} rotate={32} />
        <Bud variant="blush" x={346} y={258} scale={0.5} rotate={42} />
        <Bud variant="burgundy" x={52} y={148} scale={0.5} rotate={-42} />
      </svg>

      <div className="relative z-10 grid h-full w-full place-items-center">
        {children}
      </div>
    </div>
  )
}
