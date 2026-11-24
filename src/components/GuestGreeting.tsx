import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../config/wedding'
import { getDisplayGuestName } from '../utils/invitation'
import { FloatingPetals } from './decorations/FloatingPetals'
import { GoldDivider } from './decorations/GoldDivider'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'

interface GuestGreetingProps {
  guestName: string | null
}

export function GuestGreeting({ guestName }: GuestGreetingProps) {
  const reduceMotion = useReducedMotion()
  const displayName = getDisplayGuestName(guestName)

  return (
    <section
      id="greeting"
      className="relative overflow-hidden bg-royal py-20 text-ivory sm:py-24"
      aria-labelledby="greeting-heading"
    >
      <PaperPattern className="text-gold" opacity={0.2} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.08)_0%,rgba(53,18,27,0.3)_100%)]" />
      <FloatingPetals className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p
            lang="ne"
            className="font-devanagari text-base tracking-[0.08em] text-gold-light"
          >
            आदरणीय अतिथि
          </p>
          <p className="eyebrow mt-2 text-gold/70">A personal invitation</p>
        </Reveal>

        <motion.h2
          id="greeting-heading"
          className="mt-6 flex flex-col items-center font-display leading-[1.15]"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.22 } },
          }}
        >
          <motion.span
            className="font-body text-[clamp(1.5rem,3.8vw,2.15rem)] italic text-ivory/70"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            Dear
          </motion.span>
          <motion.span
            className="mt-1 max-w-full break-words px-1 text-[clamp(1.95rem,6vw,3.35rem)] tracking-[0.025em] text-gold-light [overflow-wrap:anywhere]"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {displayName},
          </motion.span>
        </motion.h2>

        <Reveal delay={0.15} className="mt-6">
          <GoldDivider />
          <p className="mx-auto mt-5 max-w-2xl font-body text-xl leading-relaxed text-ivory/85 sm:text-2xl">
            {weddingConfig.messages.guestInvitation}
          </p>
        </Reveal>
      </div>
    </section>
  )
}