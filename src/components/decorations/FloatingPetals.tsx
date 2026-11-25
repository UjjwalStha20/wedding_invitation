import { motion, useReducedMotion } from 'framer-motion'

interface FloatingPetalsProps {
  className?: string
}

const petals = [
  { left: '5%', size: 18, start: -10, duration: 26, delay: 0, drift: 22, color: '#E9A5A1', opacity: 0.6 },
  { left: '14%', size: 13, start: -46, duration: 31, delay: 2.4, drift: -18, color: '#FFF4E6', opacity: 0.7 },
  { left: '26%', size: 10, start: -78, duration: 24, delay: 1.1, drift: 26, color: '#B52B35', opacity: 0.38 },
  { left: '38%', size: 15, start: -26, duration: 29, delay: 3.6, drift: -24, color: '#E9A5A1', opacity: 0.5 },
  { left: '52%', size: 11, start: -62, duration: 34, delay: 0.6, drift: 20, color: '#F8D4A5', opacity: 0.65 },
  { left: '64%', size: 16, start: -18, duration: 27, delay: 4.2, drift: -26, color: '#B52B35', opacity: 0.32 },
  { left: '74%', size: 12, start: -88, duration: 23, delay: 1.8, drift: 18, color: '#FFF4E6', opacity: 0.6 },
  { left: '84%', size: 19, start: -38, duration: 32, delay: 2.9, drift: -20, color: '#E9A5A1', opacity: 0.55 },
  { left: '93%', size: 13, start: -70, duration: 28, delay: 0.3, drift: 16, color: '#8F1116', opacity: 0.32 },
  { left: '45%', size: 9, start: -104, duration: 36, delay: 5.1, drift: 24, color: '#E9A5A1', opacity: 0.45 },
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
          key={`${petal.left}-${petal.start}`}
          className="absolute top-0"
          style={{ left: petal.left, opacity: petal.opacity }}
          animate={{
            y: [
              `${petal.start}vh`,
              `${petal.start + 42}vh`,
              `${petal.start + 84}vh`,
              '118vh',
            ],
            x: [0, petal.drift, -petal.drift * 0.6, 0],
            rotate: [0, 140, 280, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
          >
            <path
              d="M12 2C19 8 21 18 12 30 3 18 5 8 12 2Z"
              fill={petal.color}
              fillOpacity={index % 3 === 0 ? 0.72 : 0.55}
              stroke={petal.color}
              strokeOpacity="0.5"
              strokeWidth="0.7"
            />
            <path
              d="M12 5.5C12.5 12 12.5 20 12 27"
              stroke="#FFF4E6"
              strokeOpacity="0.4"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}
