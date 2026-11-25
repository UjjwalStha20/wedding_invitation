import { useId } from 'react'

interface PaperPatternProps {
  className?: string
  opacity?: number
}

export function PaperPattern({
  className = '',
  opacity = 0.16,
}: PaperPatternProps) {
  const patternId = useId().replaceAll(':', '')

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={patternId}
          width="140"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity={opacity}
          >
            <path d="M18 118C36 92 58 74 92 60c14-6 24-14 32-26" />
            <path d="M44 98c-10-2-16-8-18-18 10 2 16 8 18 18Z" />
            <path d="M62 82c2-10 8-16 18-18-2 10-8 16-18 18Z" />
            <path d="M80 70c-8-4-12-10-12-20 9 4 13 10 12 20Z" />
            <path d="M98 60c2-9 8-14 17-15-2 9-8 14-17 15Z" />
            <path d="M70 52c5-5 11-6 17-3-5 5-11 6-17 3Z" />
            <circle cx="70" cy="52" r="2.1" />
            <circle cx="108" cy="44" r="1.5" />
            <path d="M20 26c6-4 12-4 18 0-6 4-12 4-18 0Z" />
            <path d="M29 26c3-5 8-7 13-5-3 5-8 7-13 5Z" />
            <circle cx="29" cy="26" r="1.6" />
            <path d="M118 108c-4 6-4 12 0 18" opacity="0.7" />
            <circle cx="118" cy="108" r="1.4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
