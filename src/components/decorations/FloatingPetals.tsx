import { motion, useReducedMotion } from 'framer-motion'

interface FloatingPetalsProps {
  className?: string
}

const petals = [
  { left: '8%', top: '18%', size: 18, duration: 20, delay: 0, drift: 14 },
  { left: '18%', top: '68%', size: 12, duration: 17, delay: 2.5, drift: -10 },
  { left: '33%', top: '28%', size: 9, duration: 24, delay: 1.2, drift: 18 },
  { left: '67%', top: '16%', size: 11, duration: 22, delay: 3.4, drift: -16 },
  { left: '81%', top: '58%', size: 17, duration: 19, delay: 0.8, drift: 12 },
  { left: '92%', top: '34%', size: 10, duration: 26, delay: 4.1, drift: -8 },
  { left: '48%', top: '82%', size: 8, duration: 18, delay: 2, drift: 20 },
]

export function FloatingPetals({ className = '' }: FloatingPetalsProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal, index) => (
        <motion.span
          key={`${petal.left}-${petal.top}`}
          className="absolute text-gold"
          style={{
            left: petal.left,
            top: petal.top,
            opacity: index % 2 === 0 ? 0.3 : 0.18,
          }}
          animate={{
            y: [0, -22, 0],
            x: [0, petal.drift, 0],
            rotate: [0, 14, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2c5.5 6 8 11 0 20-8-9-5.5-14 0-20Z"
              fill="currentColor"
              fillOpacity="0.22"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <path d="M12 6v12" stroke="currentColor" strokeWidth="0.6" />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}