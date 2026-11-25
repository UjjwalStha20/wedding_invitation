import { useId } from 'react'

interface GaneshMotifProps {
  className?: string
  tone?: 'burgundy' | 'cream'
}

const haloPetals = Array.from({ length: 12 }, (_, index) => index)

export function GaneshMotif({
  className = '',
  tone = 'burgundy',
}: GaneshMotifProps) {
  const gradientId = `ganesh-${tone}-${useId().replaceAll(':', '')}`
  const stroke = `url(#${gradientId})`
  const stops =
    tone === 'cream'
      ? ['#FFF7EA', '#F8D4A5', '#E9A5A1']
      : ['#D98A8E', '#8F1116', '#6E0C10']

  return (
    <svg
      viewBox="0 0 260 300"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="30"
          y1="18"
          x2="228"
          y2="286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.48" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
      </defs>

      <g stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <g opacity="0.35" strokeWidth="0.65">
          <circle cx="130" cy="132" r="112" strokeDasharray="2 8" />
          <circle cx="130" cy="132" r="103" />
          {haloPetals.map((index) => (
            <path
              key={`halo-${index}`}
              d="M130 22c7 12 7 22 0 34-7-12-7-22 0-34Z"
              transform={`rotate(${index * 30} 130 132)`}
            />
          ))}
          <circle cx="130" cy="132" r="74" strokeWidth="0.8" />
        </g>

        <g strokeWidth="1.6">
          <path d="M130 29c4 6 4 11 0 17-4-6-4-11 0-17Z" />
          <circle cx="130" cy="51" r="1.8" fill={stroke} stroke="none" />

          <path d="M112 84c0-15 7-26 18-38 11 12 18 23 18 38" />
          <path d="M104 84c3-22 14-38 26-50 12 12 23 28 26 50" />
          <path d="M104 84h52" strokeWidth="1.2" />
          <path d="M108 78c5 7 10 7 15 0 4 6 10 6 14 0 5 7 10 7 15 0" />
          <path d="M118 62c4-5 8-5 12 0-4 5-8 5-12 0Z" opacity="0.8" />
          <path d="M132 58c4-5 7-5 11 0-4 4-7 4-11 0Z" opacity="0.8" />
          <circle cx="112" cy="72" r="1.1" fill={stroke} stroke="none" />
          <circle cx="148" cy="72" r="1.1" fill={stroke} stroke="none" />
        </g>

        <g strokeWidth="1.7">
          <path d="M108 86c-16-12-38-8-50 8-12 18-6 40 10 50 14 9 31 3 40-9" />
          <path d="M104 93c-13-9-29-5-37 7-8 14-2 29 11 36 10 5 21 1 27-8" opacity="0.7" strokeWidth="1.1" />
          <path d="M152 86c16-12 38-8 50 8 12 18 6 40-10 50-14 9-31 3-40-9" />

          <circle cx="61" cy="142" r="3.2" strokeWidth="1.1" />
          <circle cx="199" cy="142" r="3.2" strokeWidth="1.1" />
          <path d="M61 146v7M199 146v7" strokeWidth="0.8" opacity="0.7" />
        </g>

        <g strokeWidth="1.6">
          <path d="M106 84c-2 20 1 37 7 49 5 11 12 18 17 19 5-1 12-8 17-19 6-12 9-29 7-49" />
          <path d="M116 90c-1 6-1 12 0 18M144 90c1 6 1 12 0 18" strokeWidth="1" opacity="0.7" />
        </g>

        <g strokeWidth="1.3">
          <path d="M111 100c5 5 11 5 16 0" />
          <path d="M133 100c5 5 11 5 16 0" />
          <path d="M112 106c5 5 10 5 15 0" opacity="0.7" strokeWidth="1" />
          <path d="M133 106c5 5 10 5 15 0" opacity="0.7" strokeWidth="1" />
          <path d="M130 87v8" strokeWidth="1.1" />
          <circle cx="130" cy="98" r="1.4" fill={stroke} stroke="none" />
          <path d="M123 90c-2 3-2 5 0 8M137 90c2 3 2 5 0 8" strokeWidth="0.8" opacity="0.6" />
        </g>

        <g strokeWidth="1.5">
          <path
            d="M118 114c-2 22 4 40 0 56-5 18-20 29-34 23-13-5-14-19-3-25 9-5 18 2 16 11-2 8-10 8-11 3 5 12 22 7 30-6 8-15 12-34 14-56Z"
            fill={stroke}
            fillOpacity="0.07"
          />
          <path d="M95 174c3 3 4 6 2 9" strokeWidth="1" opacity="0.65" />
          <path d="M112 134c-10 8-16 18-18 28 8-4 17-10 25-18" strokeWidth="1.4" />
          <path d="M148 134c10 8 16 18 18 28-8-4-17-10-25-18" strokeWidth="1.4" />
          <path d="M116 139c-8 5-13 11-16 17 7-3 14-7 20-13Z" fill={stroke} fillOpacity="0.1" strokeWidth="1" />
          <path d="M144 139c8 5 13 11 16 17-7-3-14-7-20-13Z" fill={stroke} fillOpacity="0.1" strokeWidth="1" />
        </g>

        <g strokeWidth="1" opacity="0.8">
          <path d="M102 122c7 13 19 20 28 20s21-7 28-20" />
          <circle cx="112" cy="132" r="1.2" fill={stroke} stroke="none" />
          <circle cx="122" cy="137" r="1.2" fill={stroke} stroke="none" />
          <circle cx="138" cy="137" r="1.2" fill={stroke} stroke="none" />
          <circle cx="148" cy="132" r="1.2" fill={stroke} stroke="none" />
        </g>

        <g strokeWidth="1.4">
          <path d="M130 262c-10-16-10-30 0-46 10 16 10 30 0 46Z" />
          <path d="M108 260c-8-12-5-27 8-37 1 15-2 28-8 37Z" />
          <path d="M152 260c8-12 5-27-8-37-1 15 2 28 8 37Z" />
          <path d="M88 256c-6-11 1-24 15-32-1 14-6 26-15 32Z" opacity="0.8" />
          <path d="M172 256c6-11-1-24-15-32 1 14 6 26 15 32Z" opacity="0.8" />
          <path d="M72 262c8 9 27 14 58 14s50-5 58-14" />
          <path d="M82 272c11 7 27 10 48 10s37-3 48-10" opacity="0.6" strokeWidth="1" />
          <circle cx="130" cy="256" r="1.6" fill={stroke} stroke="none" />
        </g>

        <g strokeWidth="1.4">
          <path d="M130 262c-10-16-10-30 0-46 10 16 10 30 0 46Z" />
          <path d="M108 260c-8-12-5-27 8-37 1 15-2 28-8 37Z" />
          <path d="M152 260c8-12 5-27-8-37-1 15 2 28 8 37Z" />
          <path d="M88 256c-6-11 1-24 15-32-1 14-6 26-15 32Z" opacity="0.8" />
          <path d="M172 256c6-11-1-24-15-32 1 14 6 26 15 32Z" opacity="0.8" />
          <path d="M72 262c8 9 27 14 58 14s50-5 58-14" />
          <path d="M82 272c11 7 27 10 48 10s37-3 48-10" opacity="0.6" strokeWidth="1" />
          <circle cx="130" cy="256" r="1.6" fill={stroke} stroke="none" />
        </g>
      </g>
    </svg>
  )
}