import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { FloatingPetals } from './decorations/FloatingPetals'
import { GaneshMotif } from './decorations/GaneshMotif'
import { GoldDivider } from './decorations/GoldDivider'
import { Mandala } from './decorations/Mandala'
import { OrnamentalFrame } from './decorations/OrnamentalFrame'
import { PaperPattern } from './decorations/PaperPattern'

interface InvitationCoverProps {
  titleId: string
  ganeshLayoutId?: string
  showScrollCue?: boolean
  contentVisible?: boolean
  ganeshVisible?: boolean
  className?: string
}

export function InvitationCover({
  titleId,
  ganeshLayoutId,
  showScrollCue = true,
  contentVisible = true,
  ganeshVisible = true,
  className = '',
}: InvitationCoverProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`relative isolate overflow-hidden bg-maroon-deep text-ivory ${className}`}
    >
      <PaperPattern className="text-gold" opacity={0.18} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,30,45,0.24)_0%,rgba(53,18,27,0.62)_100%)]" />
      <OrnamentalFrame />

      <Mandala
        className="pointer-events-none absolute left-1/2 top-[22%] w-[min(135vw,740px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        speed={180}
      />
      <FloatingPetals />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-28">
        <div
          className="relative mx-auto w-36 sm:w-44"
          role="img"
          aria-label="Ornamental illustration of Lord Ganesha"
        >
          <div className="absolute inset-0 -z-10 rounded-full border border-gold/30" />
          <div className="absolute inset-3 -z-10 rounded-full border border-gold/20" />
          <motion.div
            layoutId={ganeshLayoutId}
            transition={{
              layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{ opacity: ganeshVisible ? 1 : 0 }}
            className="relative aspect-[13/15] w-full"
          >
            <GaneshMotif className="h-full w-full drop-shadow-[0_0_24px_rgba(198,161,91,0.12)]" />
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{
            duration: 0.6,
            delay: contentVisible ? 0.5 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 flex w-full flex-col items-center"
        >
          <p
            lang="sa"
            className="font-devanagari text-[clamp(1rem,2.6vw,1.3rem)] tracking-[0.06em] text-gold-light"
          >
            {weddingConfig.hero.sanskrit}
          </p>

          <h1
            id={titleId}
            tabIndex={-1}
            lang="ne"
            className="mt-3 font-devanagari text-[clamp(2.2rem,7vw,3.9rem)] leading-[1.35] tracking-[0.02em] text-ivory outline-none"
          >
            {weddingConfig.hero.nepali}
          </h1>

          <p className="eyebrow mt-5 text-gold/80">
            {weddingConfig.hero.english}
          </p>

          <div className="w-full max-w-sm">
            <GoldDivider className="mt-6" />
          </div>

          <p className="mt-3 max-w-md text-lg italic text-ivory/70 sm:text-xl">
            {weddingConfig.hero.greeting}
          </p>

          {showScrollCue ? (
            <div className="mt-14 flex flex-col items-center gap-2 text-gold/65">
              <span className="font-display text-[0.56rem] uppercase tracking-[0.3em]">
                Scroll to celebrate
              </span>
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, 5, 0], opacity: [0.55, 1, 0.55] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  )
}