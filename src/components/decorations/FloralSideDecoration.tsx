import { Blossom, Bloom, Bud, Leaf, Stem } from './floralParts'

interface FloralSideDecorationProps {
  side?: 'left' | 'right'
  className?: string
  opacity?: number
}

export function FloralSideDecoration({
  side = 'left',
  className = '',
  opacity = 1,
}: FloralSideDecorationProps) {
  return (
    <div
      className={`pointer-events-none absolute z-0 ${
        side === 'left' ? 'left-0' : 'right-0'
      } ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}>
        <svg
          viewBox="0 0 180 760"
          className="h-auto w-full"
          fill="none"
          preserveAspectRatio="xMidYMin meet"
        >
          <Stem
            d="M92 0 C 64 70 56 146 76 222 C 96 298 112 376 90 456 C 70 528 64 620 88 760"
            color="#718B50"
            width={2.2}
            opacity={0.8}
          />
          <Stem
            d="M120 0 C 140 90 148 160 132 230 C 120 286 118 340 132 392"
            width={1.4}
            opacity={0.5}
          />
          <Stem
            d="M92 250 C 118 268 140 292 154 324"
            color="#718B50"
            width={1.3}
            opacity={0.55}
          />

          <Leaf x={94} y={36} rotate={-24} scale={0.7} tone="sage" />
          <Leaf x={80} y={86} rotate={196} scale={0.65} tone="forest" />
          <Leaf x={70} y={142} rotate={-30} scale={0.7} tone="sage" />
          <Leaf x={76} y={196} rotate={200} scale={0.6} tone="forest" />
          <Leaf x={90} y={250} rotate={-18} scale={0.65} tone="sage" />
          <Leaf x={102} y={306} rotate={188} scale={0.7} tone="forest" />
          <Leaf x={104} y={362} rotate={-22} scale={0.6} tone="sage" />
          <Leaf x={92} y={418} rotate={200} scale={0.65} tone="forest" />
          <Leaf x={80} y={474} rotate={-28} scale={0.7} tone="sage" />
          <Leaf x={74} y={530} rotate={196} scale={0.6} tone="forest" />
          <Leaf x={78} y={588} rotate={-24} scale={0.65} tone="sage" />
          <Leaf x={88} y={648} rotate={200} scale={0.7} tone="forest" />
          <Leaf x={90} y={706} rotate={-20} scale={0.6} tone="sage" />
          <Leaf x={126} y={62} rotate={-16} scale={0.55} tone="olive" />
          <Leaf x={138} y={120} rotate={204} scale={0.5} tone="sage" />
          <Leaf x={132} y={286} rotate={-20} scale={0.55} tone="olive" />
          <Leaf x={140} y={340} rotate={200} scale={0.5} tone="sage" />

          <Bloom variant="coral" x={84} y={136} scale={1} rotate={8} />
          <Bloom variant="violet" x={112} y={228} scale={0.5} rotate={16} />
          <Bloom variant="burgundy" x={102} y={330} scale={0.85} rotate={-12} />
          <Bloom variant="blush" x={78} y={500} scale={0.95} rotate={14} />
          <Bloom variant="ivory" x={100} y={650} scale={0.85} rotate={-8} />

          <Blossom x={60} y={400} scale={0.62} rotate={10} />
          <Blossom x={120} y={580} scale={0.58} rotate={-14} variant="blush" />
          <Blossom x={64} y={700} scale={0.55} rotate={22} />

          <Bud variant="burgundy" x={146} y={268} scale={0.7} rotate={36} />
          <Bud variant="coral" x={62} y={568} scale={0.7} rotate={-30} />
          <Bud variant="blush" x={116} y={736} scale={0.6} rotate={24} />
        </svg>
      </div>
    </div>
  )
}
