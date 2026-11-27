import { useId, type ReactNode } from 'react'

interface WaxSealProps {
  children?: ReactNode
  className?: string
}

const rimPetals = [0, 45, 90, 135, 180, 225, 270, 315]

export function WaxSeal({ children, className = '' }: WaxSealProps) {
  const uid = useId().replaceAll(':', '')
  const waxId = `wax-${uid}`
  const sheenId = `wax-sheen-${uid}`
  const outline =
    'M100 11c17 0 27 12 39 14 15 2 27 11 31 25 4 14 15 23 13 39-2 16 5 28-5 40-10 12-20 14-28 26-8 12-21 20-35 20-14 0-22 12-36 8-14-4-20-16-32-22-12-6-24-14-26-28-2-14-12-22-8-36 4-14 2-26 12-38 10-12 20-14 28-26 8-12 25-22 47-22Z'

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full drop-shadow-[0_14px_28px_rgba(72,7,9,0.45)]"
        fill="none"
      >
        <defs>
          <radialGradient id={waxId} cx="38%" cy="30%" r="78%">
            <stop offset="0" stopColor="#d45158" />
            <stop offset="0.42" stopColor="#9a161c" />
            <stop offset="1" stopColor="#5a0a0d" />
          </radialGradient>
          <linearGradient
            id={sheenId}
            x1="40"
            y1="20"
            x2="160"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#480709" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <path
          d={outline}
          fill={`url(#${waxId})`}
          stroke="#480709"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
        <path d={outline} fill={`url(#${sheenId})`} opacity="0.8" />

        <circle
          cx="100"
          cy="100"
          r="70"
          stroke="#f8d4a5"
          strokeOpacity="0.32"
          strokeWidth="1.1"
        />
        <circle
          cx="100"
          cy="100"
          r="62"
          stroke="#fff7ea"
          strokeOpacity="0.18"
          strokeWidth="0.8"
          strokeDasharray="1.5 5"
        />

        {rimPetals.map((angle) => (
          <path
            key={angle}
            d="M100 22c3 5 3 9 0 14-3-5-3-9 0-14Z"
            stroke="#ffe0ad"
            strokeOpacity="0.28"
            strokeWidth="0.8"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}

        <path
          d="M54 64c10-12 24-19 40-21"
          stroke="#ffe0ad"
          strokeOpacity="0.42"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M146 136c-10 12-24 19-40 21"
          stroke="#480709"
          strokeOpacity="0.35"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
