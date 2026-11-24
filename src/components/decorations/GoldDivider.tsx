import { motion, useReducedMotion } from 'framer-motion'

interface GoldDividerProps {
  className?: string
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`flex w-full items-center justify-center text-gold ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 300 30"
        className="h-6 w-full max-w-[300px]"
        fill="none"
      >
        <motion.path
          d="M6 15h98"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <motion.path
          d="M196 15h98"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <circle cx="112" cy="15" r="2.2" fill="currentColor" opacity="0.7" />
        <circle cx="188" cy="15" r="2.2" fill="currentColor" opacity="0.7" />
        <path
          d="M120 15c6-5 9-5 15 0-6 5-9 5-15 0Z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M165 15c6 5 9 5 15 0-6-5-9-5-15 0Z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M150 4.5 158 15l-8 10.5L142 15l8-10.5Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M150 9.5 154 15l-4 5.5-4-5.5 4-5.5Z"
          fill="currentColor"
          opacity="0.55"
        />
        <circle cx="130" cy="15" r="1.4" fill="currentColor" opacity="0.6" />
        <circle cx="170" cy="15" r="1.4" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  )
}