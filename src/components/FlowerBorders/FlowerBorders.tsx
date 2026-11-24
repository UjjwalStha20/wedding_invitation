import { motion, useReducedMotion } from 'framer-motion'

interface FlowerBordersProps {
  className?: string
}

export function FlowerBorders({ className = '' }: FlowerBordersProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  const leftFlowers = [
    { left: '4%', top: '20%', size: 16, color: 'maroon' },
    { left: '10%', top: '50%', size: 14, color: 'pink' },
    { left: '18%', top: '30%', size: 12, color: 'cream' },
    { left: '25%', top: '65%', size: 18, color: 'purple' },
    { left: '32%', top: '45%', size: 10, color: 'green' },
  ]

  const rightFlowers = [
    { right: '4%', top: '20%', size: 16, color: 'maroon' },
    { right: '10%', top: '50%', size: 14, color: 'pink' },
    { right: '18%', top: '30%', size: 12, color: 'cream' },
    { right: '25%', top: '65%', size: 18, color: 'purple' },
    { right: '32%', top: '45%', size: 10, color: 'green' },
  ]

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div className="absolute left-0 top-1/2 -translate-y-1/2">
        {leftFlowers.map((flower, index) => (
          <motion.span
            key={`left-${index}`}
            className="absolute flex items-center justify-center"
            style={{
              left: flower.left,
              bottom: 'auto',
              top: flower.top,
              width: flower.size,
              height: flower.size,
              opacity: 0.5 + index * 0.05,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 12 + index * 2,
              delay: index * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width={flower.size} height={flower.size} viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z"
                fill={flower.color === 'green' ? '#388e3c' : flower.color === 'purple' ? '#6b3fa0' : '#e8d5a7'}
              />
            </svg>
          </motion.span>
        ))}
      </motion.div>

      <motion.div className="absolute right-0 top-1/2 -translate-y-1/2">
        {rightFlowers.map((flower, index) => (
          <motion.span
            key={`right-${index}`}
            className="absolute flex items-center justify-center"
            style={{
              right: flower.right,
              bottom: 'auto',
              top: flower.top,
              width: flower.size,
              height: flower.size,
              opacity: 0.5 + index * 0.05,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 13 + index * 2,
              delay: index * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width={flower.size} height={flower.size} viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z"
                fill={flower.color === 'green' ? '#388e3c' : flower.color === 'purple' ? '#6b3fa0' : '#e8d5a7'}
              />
            </svg>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
