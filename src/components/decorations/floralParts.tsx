import { useId } from 'react'

export type BloomVariant = 'coral' | 'burgundy' | 'ivory' | 'blush' | 'violet'
export type LeafTone = 'sage' | 'forest' | 'olive'

interface Palette {
  light: string
  mid: string
  deep: string
  core: string
  stamen?: string
}

const palettes: Record<BloomVariant, Palette> = {
  coral: {
    light: '#F9CFC9',
    mid: '#E9A5A1',
    deep: '#C9666A',
    core: '#9E3B44',
    stamen: '#E8C25B',
  },
  burgundy: {
    light: '#B52B35',
    mid: '#8F1116',
    deep: '#6E0C10',
    core: '#480709',
  },
  ivory: {
    light: '#FFFDF8',
    mid: '#FFEBD8',
    deep: '#F1D2AE',
    core: '#D9A96C',
    stamen: '#E8C25B',
  },
  blush: {
    light: '#FBE2DD',
    mid: '#E9A5A1',
    deep: '#D47F7C',
    core: '#A94C55',
  },
  violet: {
    light: '#B79BE6',
    mid: '#7545B9',
    deep: '#5A2F94',
    core: '#3F1F6E',
    stamen: '#E8C25B',
  },
}

const leafPalettes: Record<LeafTone, { light: string; mid: string; deep: string }> = {
  sage: { light: '#A8BC86', mid: '#8AA267', deep: '#5F7842' },
  forest: { light: '#8AA267', mid: '#718B50', deep: '#44592F' },
  olive: { light: '#B3BE86', mid: '#8C9A5E', deep: '#64703C' },
}

interface BloomProps {
  variant?: BloomVariant
  x?: number
  y?: number
  scale?: number
  rotate?: number
  opacity?: number
  petals?: number
}

const petalPath =
  'M0 0 C -17 -7 -23 -23 -12 -35 C -4 -43 4 -43 12 -35 C 23 -23 17 -7 0 0 Z'
const violetPetalPath =
  'M0 0 C -11 -10 -13 -26 0 -38 C 13 -26 11 -10 0 0 Z'

export function Bloom({
  variant = 'coral',
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  opacity = 1,
  petals = 8,
}: BloomProps) {
  const uid = useId().replaceAll(':', '')
  const palette = palettes[variant]
  const isViolet = variant === 'violet'
  const shape = isViolet ? violetPetalPath : petalPath
  const count = isViolet ? 5 : petals
  const step = 360 / count
  const outer = Array.from({ length: count }, (_, index) => index)
  const middle = Array.from({ length: count }, (_, index) => index)
  const inner = Array.from({ length: Math.max(5, count - 2) }, (_, index) => index)
  const stamens = Array.from({ length: 8 }, (_, index) => index)

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      <defs>
        <radialGradient
          id={`${uid}-petal`}
          gradientUnits="userSpaceOnUse"
          cx="0"
          cy="0"
          r="46"
        >
          <stop offset="0" stopColor={palette.core} />
          <stop offset="0.36" stopColor={palette.deep} />
          <stop offset="0.74" stopColor={palette.mid} />
          <stop offset="1" stopColor={palette.light} />
        </radialGradient>
        <radialGradient id={`${uid}-centre`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={palette.core} />
          <stop offset="0.7" stopColor={palette.deep} />
          <stop offset="1" stopColor={palette.mid} />
        </radialGradient>
      </defs>

      <g opacity={0.96}>
        {outer.map((index) => (
          <path
            key={`outer-${index}`}
            d={shape}
            transform={`rotate(${index * step})`}
            fill={`url(#${uid}-petal)`}
            stroke={palette.deep}
            strokeWidth="0.7"
            strokeOpacity="0.28"
            opacity={index % 2 === 0 ? 1 : 0.9}
          />
        ))}
      </g>

      <g opacity={0.98}>
        {middle.map((index) => (
          <path
            key={`middle-${index}`}
            d={shape}
            transform={`rotate(${index * step + step / 2}) scale(0.68)`}
            fill={`url(#${uid}-petal)`}
            stroke={palette.deep}
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
        ))}
      </g>

      <g>
        {inner.map((index) => (
          <path
            key={`inner-${index}`}
            d={shape}
            transform={`rotate(${index * (360 / inner.length) + step / 3}) scale(0.42)`}
            fill={`url(#${uid}-petal)`}
            stroke={palette.deep}
            strokeWidth="1"
            strokeOpacity="0.32"
          />
        ))}
      </g>

      {variant === 'coral' || variant === 'ivory' ? (
        <g>
          <circle r="6.5" fill={`url(#${uid}-centre)`} opacity={0.85} />
          {stamens.map((index) => {
            const angle = (index / stamens.length) * Math.PI * 2
            const radius = index % 2 === 0 ? 7.5 : 5.5
            return (
              <circle
                key={`stamen-${index}`}
                cx={Math.cos(angle) * radius}
                cy={Math.sin(angle) * radius}
                r="1.5"
                fill={palette.stamen}
                opacity={0.9}
              />
            )
          })}
          <circle r="2.6" fill={palette.stamen} />
        </g>
      ) : isViolet ? (
        <g>
          <circle r="4" fill={palette.stamen} />
          <circle r="1.6" fill={palette.core} />
        </g>
      ) : (
        <g>
          <circle r="5" fill={`url(#${uid}-centre)`} />
          <path
            d="M0 6.5 C -7 7 -11 -1 -4 -6 C 3 -10 10 -4 9 3 C 8 10 0 13 -6 9"
            stroke={palette.light}
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
            opacity={0.55}
          />
          <path
            d="M0 2.5 C -3 2 -4 -1 -1 -2.5 C 2 -4 4 -1 3 1"
            stroke={palette.light}
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            opacity={0.45}
          />
        </g>
      )}

      <path
        d="M-18 -30 C -12 -38 12 -38 18 -30"
        stroke="#FFFFFF"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity={0.16}
      />
    </g>
  )
}

interface BlossomProps {
  x?: number
  y?: number
  scale?: number
  rotate?: number
  opacity?: number
  variant?: 'ivory' | 'blush' | 'violet'
}

const blossomPath =
  'M0 0 C -8 -6 -9 -16 0 -20 C 9 -16 8 -6 0 0 Z'

export function Blossom({
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  opacity = 1,
  variant = 'ivory',
}: BlossomProps) {
  const uid = useId().replaceAll(':', '')
  const palette = palettes[variant]
  const petals = Array.from({ length: 5 }, (_, index) => index)

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      <defs>
        <radialGradient
          id={`${uid}-blossom`}
          gradientUnits="userSpaceOnUse"
          cx="0"
          cy="0"
          r="22"
        >
          <stop offset="0" stopColor={palette.core} />
          <stop offset="0.55" stopColor={palette.mid} />
          <stop offset="1" stopColor={palette.light} />
        </radialGradient>
      </defs>
      {petals.map((index) => (
        <path
          key={index}
          d={blossomPath}
          transform={`rotate(${index * 72})`}
          fill={`url(#${uid}-blossom)`}
          stroke={palette.deep}
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
      ))}
      <circle r="3.4" fill="#E8C25B" />
      <circle r="1.2" fill="#B98A3E" />
    </g>
  )
}

interface LeafProps {
  x?: number
  y?: number
  scale?: number
  rotate?: number
  opacity?: number
  tone?: LeafTone
}

export function Leaf({
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  opacity = 1,
  tone = 'sage',
}: LeafProps) {
  const uid = useId().replaceAll(':', '')
  const palette = leafPalettes[tone]

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      <defs>
        <linearGradient id={`${uid}-leaf`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={palette.deep} />
          <stop offset="0.45" stopColor={palette.mid} />
          <stop offset="1" stopColor={palette.light} />
        </linearGradient>
      </defs>
      <path
        d="M0 0 C 12 -9 30 -11 46 -2 C 30 8 12 7 0 0 Z"
        fill={`url(#${uid}-leaf)`}
        stroke={palette.deep}
        strokeWidth="0.7"
        strokeOpacity="0.55"
      />
      <path
        d="M1 0 C 16 0 32 -1 44 -2"
        stroke={palette.deep}
        strokeWidth="0.8"
        strokeOpacity="0.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13 -1 L19 -6 M23 -1 L29 -6 M33 -1 L38 -5 M18 1 L22 4 M28 1 L32 4"
        stroke={palette.deep}
        strokeWidth="0.5"
        strokeOpacity="0.45"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  )
}

interface BudProps {
  x?: number
  y?: number
  scale?: number
  rotate?: number
  variant?: BloomVariant
}

export function Bud({
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  variant = 'burgundy',
}: BudProps) {
  const uid = useId().replaceAll(':', '')
  const palette = palettes[variant]

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <defs>
        <linearGradient id={`${uid}-bud`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={palette.deep} />
          <stop offset="0.6" stopColor={palette.mid} />
          <stop offset="1" stopColor={palette.light} />
        </linearGradient>
      </defs>
      <path
        d="M0 2 C -8 -2 -11 -9 -8 -16 C -3 -12 -1 -6 0 2 Z"
        fill="#718B50"
        opacity={0.9}
      />
      <path
        d="M0 2 C 8 -2 11 -9 8 -16 C 3 -12 1 -6 0 2 Z"
        fill="#5F7842"
        opacity={0.9}
      />
      <path
        d="M0 0 C -6 -7 -6 -18 0 -25 C 6 -18 6 -7 0 0 Z"
        fill={`url(#${uid}-bud)`}
        stroke={palette.deep}
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
      <path
        d="M0 -4 C -2 -10 -1 -16 0 -20"
        stroke={palette.light}
        strokeWidth="0.7"
        strokeOpacity="0.45"
        fill="none"
      />
    </g>
  )
}

interface StemProps {
  d: string
  color?: string
  width?: number
  opacity?: number
}

export function Stem({
  d,
  color = '#75513C',
  width = 1.6,
  opacity = 1,
}: StemProps) {
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      fill="none"
      opacity={opacity}
    />
  )
}

export function FloralCluster({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 340"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g>
        <Stem
          d="M6 42 C 72 16 152 16 226 34 C 278 46 312 70 334 104"
          color="#718B50"
          width={2.2}
          opacity={0.8}
        />
        <Stem
          d="M24 96 C 6 164 10 238 42 306"
          color="#718B50"
          width={2}
          opacity={0.75}
        />
        <Stem d="M44 26 C 92 64 128 100 172 128" width={1.7} opacity={0.65} />
        <Stem
          d="M20 118 C 74 146 134 164 206 172"
          width={1.5}
          opacity={0.55}
        />
        <Stem d="M58 44 C 64 92 66 150 54 210" width={1.4} opacity={0.5} />
        <Stem
          d="M38 244 C 80 264 132 274 190 270"
          color="#718B50"
          width={1.6}
          opacity={0.6}
        />

        <Leaf x={38} y={34} rotate={-18} scale={1} tone="sage" />
        <Leaf x={92} y={24} rotate={-8} scale={0.9} tone="forest" />
        <Leaf x={150} y={20} rotate={6} scale={0.85} tone="sage" />
        <Leaf x={210} y={30} rotate={18} scale={1} tone="forest" />
        <Leaf x={262} y={48} rotate={28} scale={0.9} tone="sage" />
        <Leaf x={300} y={78} rotate={38} scale={0.8} tone="forest" />
        <Leaf x={18} y={98} rotate={70} scale={1} tone="sage" />
        <Leaf x={14} y={152} rotate={80} scale={0.9} tone="forest" />
        <Leaf x={18} y={206} rotate={88} scale={0.95} tone="sage" />
        <Leaf x={30} y={260} rotate={100} scale={0.85} tone="forest" />
        <Leaf x={58} y={300} rotate={112} scale={0.8} tone="sage" />
        <Leaf x={108} y={286} rotate={126} scale={0.8} tone="forest" />
        <Leaf x={152} y={268} rotate={140} scale={0.75} tone="sage" />
      </g>

      <Bloom variant="coral" x={104} y={118} scale={1.55} rotate={6} />
      <Bloom variant="burgundy" x={208} y={92} scale={1.08} rotate={-14} />
      <Bloom variant="blush" x={86} y={226} scale={1.02} rotate={18} />
      <Bloom variant="ivory" x={210} y={196} scale={0.92} rotate={-6} />
      <Bloom variant="violet" x={274} y={142} scale={0.62} rotate={16} />

      <Blossom x={144} y={58} scale={0.72} rotate={12} />
      <Blossom x={54} y={148} scale={0.6} rotate={-16} variant="blush" />
      <Blossom x={250} y={264} scale={0.66} rotate={24} />
      <Blossom x={306} y={212} scale={0.5} rotate={-8} variant="violet" />

      <Bud variant="burgundy" x={304} y={176} scale={0.9} rotate={30} />
      <Bud variant="blush" x={154} y={302} scale={0.8} rotate={-28} />
      <Bud variant="coral" x={322} y={132} scale={0.7} rotate={44} />

      <Leaf x={140} y={150} rotate={-32} scale={0.82} tone="forest" />
      <Leaf x={246} y={222} rotate={22} scale={0.78} tone="sage" />
      <Leaf x={186} y={252} rotate={160} scale={0.7} tone="forest" />
    </svg>
  )
}
