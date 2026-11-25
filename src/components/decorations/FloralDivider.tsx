import { Blossom, Bloom, Bud, Leaf, Stem } from './floralParts'

interface FloralDividerProps {
  className?: string
}

export function FloralDivider({ className = '' }: FloralDividerProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 44"
        className="h-10 w-full max-w-[360px]"
        fill="none"
      >
        <Stem
          d="M6 22 C 70 22 110 22 142 22"
          color="#718B50"
          width={1.3}
          opacity={0.8}
        />
        <Stem
          d="M218 22 C 250 22 290 22 354 22"
          color="#718B50"
          width={1.3}
          opacity={0.8}
        />

        <Leaf x={66} y={22} rotate={-6} scale={0.55} tone="sage" />
        <Leaf x={106} y={22} rotate={184} scale={0.5} tone="forest" />
        <Leaf x={254} y={22} rotate={-6} scale={0.55} tone="forest" />
        <Leaf x={294} y={22} rotate={184} scale={0.5} tone="sage" />

        <Bloom variant="coral" x={180} y={22} scale={0.52} rotate={8} />
        <Blossom x={150} y={22} scale={0.5} rotate={-12} />
        <Blossom x={210} y={22} scale={0.5} rotate={16} variant="blush" />

        <Bud variant="burgundy" x={10} y={22} scale={0.5} rotate={-90} />
        <Bud variant="burgundy" x={350} y={22} scale={0.5} rotate={90} />
      </svg>
    </div>
  )
}
