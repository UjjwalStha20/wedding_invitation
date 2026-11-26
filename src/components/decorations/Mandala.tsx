import { useReducedMotion } from 'framer-motion'

interface MandalaProps {
  className?: string
  speed?: number
}

const outerPetals = Array.from({ length: 24 }, (_, index) => index)
const innerPetals = Array.from({ length: 12 }, (_, index) => index)
const lotusPetals = Array.from({ length: 8 }, (_, index) => index)

export function Mandala({ className = '', speed = 160 }: MandalaProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`pointer-events-none aspect-square ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 480"
        className={
          reduceMotion ? 'h-full w-full' : 'h-full w-full animate-mandala-spin'
        }
        style={{ animationDuration: `${speed}s` }}
        fill="none"
      >
        <circle
          cx="240"
          cy="240"
          r="228"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 9"
          opacity="0.45"
        />
        <circle
          cx="240"
          cy="240"
          r="216"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />

        <g opacity="0.55">
          {outerPetals.map((index) => (
            <path
              key={`outer-${index}`}
              d="M240 26c10 20 10 34 0 52-10-18-10-32 0-52Z"
              stroke="currentColor"
              strokeWidth="0.85"
              transform={`rotate(${index * 15} 240 240)`}
            />
          ))}
        </g>

        <circle
          cx="240"
          cy="240"
          r="178"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.4"
        />

        <g opacity="0.65">
          {innerPetals.map((index) => (
            <path
              key={`inner-${index}`}
              d="M240 78c8 16 8 28 0 42-8-14-8-26 0-42Z"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${index * 30} 240 240)`}
            />
          ))}
        </g>

        <circle
          cx="240"
          cy="240"
          r="132"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <circle
          cx="240"
          cy="240"
          r="120"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="4 7"
          opacity="0.4"
        />

        <g opacity="0.7">
          {lotusPetals.map((index) => (
            <path
              key={`lotus-${index}`}
              d="M240 160c12 22 12 36 0 58-12-22-12-36 0-58Z"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${index * 45} 240 240)`}
            />
          ))}
        </g>

        <circle
          cx="240"
          cy="240"
          r="48"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.65"
        />
        <circle
          cx="240"
          cy="240"
          r="36"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.45"
        />
        <circle cx="240" cy="240" r="4" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
  )
}
