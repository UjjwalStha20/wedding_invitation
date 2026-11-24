import { useId } from 'react'

interface PaperPatternProps {
  className?: string
  opacity?: number
}

export function PaperPattern({
  className = '',
  opacity = 0.22,
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
          width="160"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.65"
            opacity={opacity}
          >
            <path d="M80 54c8.5 10 8.5 18 0 28-8.5-10-8.5-18 0-28Z" />
            <path d="M80 78c8.5 10 8.5 18 0 28-8.5-10-8.5-18 0-28Z" />
            <path d="M54 80c10-8.5 18-8.5 28 0-10 8.5-18 8.5-28 0Z" />
            <path d="M78 80c10-8.5 18-8.5 28 0-10 8.5-18 8.5-28 0Z" />
            <circle cx="80" cy="80" r="2.2" />
            <path d="M80 42v10M80 108v10M42 80h10M108 80h10" />
            <path d="M0 0l8 8M160 0l-8 8M0 160l8-8M160 160l-8-8" />
            <circle cx="0" cy="80" r="1.5" />
            <circle cx="160" cy="80" r="1.5" />
            <circle cx="80" cy="0" r="1.5" />
            <circle cx="80" cy="160" r="1.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}