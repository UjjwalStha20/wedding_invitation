import { motion, useReducedMotion } from 'framer-motion'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { getDisplayGuestName } from '../utils/invitation'
import { FloralCorner } from './decorations/FloralCorner'
import { FloralDivider } from './decorations/FloralDivider'
import { FloatingPetals } from './decorations/FloatingPetals'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'

interface GuestGreetingProps {
  guestName: string | null
}

export function GuestGreeting({ guestName }: GuestGreetingProps) {
  const reduceMotion = useReducedMotion()
  const weddingConfig = useWeddingConfig()
  const displayName = getDisplayGuestName(
    guestName,
    weddingConfig.messages.genericGuestName,
  )

  return (
    <section
      id="greeting"
      className="relative overflow-hidden bg-cream py-16 text-burgundy sm:py-20"
      aria-labelledby="greeting-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.13} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,230,0.8)_0%,rgba(248,212,165,0.35)_100%)]" />
      <FloralCorner
        corner="top-left"
        className="hidden w-[clamp(120px,18vw,240px)] sm:block"
        opacity={0.55}
      />
      <FloralCorner
        corner="bottom-right"
        className="hidden w-[clamp(120px,18vw,240px)] sm:block"
        opacity={0.5}
      />
      <FloatingPetals className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p
            lang="ne"
            className="font-devanagari text-base tracking-[0.08em] text-leaf-deep"
          >
            आदरणीय अतिथि
          </p>
          <p className="eyebrow mt-2 text-brown/70">A personal invitation</p>
        </Reveal>

        <motion.h2
          id="greeting-heading"
          className="mt-4 flex flex-col items-center leading-[1.12]"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.22 } },
          }}
        >
          <motion.span
            className="font-script text-[clamp(2rem,5vw,2.8rem)] text-rose"
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
            className="mt-1 max-w-full break-words px-1 font-display text-[clamp(1.95rem,6vw,3.35rem)] tracking-[0.02em] text-burgundy [overflow-wrap:anywhere]"
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

        <Reveal delay={0.15} className="mt-4">
          <FloralDivider />
          <p className="mx-auto mt-3 max-w-2xl font-body text-xl leading-relaxed text-brown/85 sm:text-2xl">
            {weddingConfig.messages.guestInvitation}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
