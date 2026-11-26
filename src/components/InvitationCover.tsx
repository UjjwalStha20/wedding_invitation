import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { FloralDivider } from './decorations/FloralDivider'
import { FloralSideDecoration } from './decorations/FloralSideDecoration'
import { FloatingPetals } from './decorations/FloatingPetals'
import { GaneshMotif } from './decorations/GaneshMotif'
import { Mandala } from './decorations/Mandala'
import { OrnamentalBorder } from './decorations/OrnamentalBorder'
import { PaperPattern } from './decorations/PaperPattern'
import { PeacockFeather } from './decorations/PeacockFeather'

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
  const weddingConfig = useWeddingConfig()
  const reduceMotion = useReducedMotion()
  const { groom, bride } = weddingConfig.couple

  return (
    <div
      className={`relative isolate overflow-hidden bg-peach text-burgundy paper-wash ${className}`}
    >
      <PaperPattern className="text-burgundy" opacity={0.11} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,230,0.72)_0%,rgba(255,224,173,0.15)_58%,rgba(248,212,165,0.55)_100%)]" />

      <Mandala
        className="pointer-events-none absolute left-1/2 top-[42%] w-[min(150vw,860px)] -translate-x-1/2 -translate-y-1/2 text-leaf opacity-[0.1]"
        speed={220}
      />

      <FloralCorner
        corner="top-left"
        className="w-[clamp(190px,32vw,440px)]"
        opacity={0.95}
      />
      <FloralCorner
        corner="top-right"
        className="w-[clamp(190px,32vw,440px)]"
        opacity={0.95}
      />
      <FloralCorner
        corner="bottom-left"
        className="w-[clamp(130px,20vw,290px)]"
        opacity={0.7}
      />
      <FloralCorner
        corner="bottom-right"
        className="w-[clamp(130px,20vw,290px)]"
        opacity={0.7}
      />

      <FloralSideDecoration
        side="left"
        className="top-[20%] hidden w-[clamp(58px,6vw,104px)] opacity-45 lg:block"
      />
      <FloralSideDecoration
        side="right"
        className="top-[20%] hidden w-[clamp(58px,6vw,104px)] opacity-45 lg:block"
      />

      <PeacockFeather
        className="pointer-events-none absolute right-[7%] top-[24%] hidden h-auto w-16 rotate-12 opacity-40 xl:block"
        opacity={1}
      />

      <OrnamentalBorder tone="burgundy" inset="lg" />
      <FloatingPetals className="opacity-80" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10 sm:py-28">
        <div
          className="relative mx-auto w-32 sm:w-40"
          role="img"
          aria-label="Decorative image of Lord Ganesha"
        >
          <div className="absolute -inset-4 rounded-full border border-burgundy/25" />
          <div className="absolute -inset-1 rounded-full border border-leaf/35" />
          <span className="absolute -left-2 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-blush/80" />
          <span className="absolute -right-2 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-blush/80" />
          <span className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-leaf/70" />
          <motion.div
            layoutId={ganeshLayoutId}
            transition={{
              layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{ opacity: ganeshVisible ? 1 : 0, willChange: 'transform' }}
            className="relative aspect-[13/15] w-full"
          >
            <GaneshMotif
              className={`h-full w-full ${ganeshLayoutId ? '' : 'drop-shadow-[0_8px_18px_rgba(143,17,22,0.12)]'}`}
            />
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
          className="mt-8 flex w-full flex-col items-center"
        >
          <p
            lang="sa"
            className="font-devanagari text-[clamp(0.95rem,2.4vw,1.2rem)] tracking-[0.06em] text-burgundy/70"
          >
            {weddingConfig.hero.sanskrit}
          </p>

          <h1
            id={titleId}
            tabIndex={-1}
            lang="ne"
            className="mt-3 font-devanagari text-[clamp(2.2rem,7vw,3.9rem)] leading-[1.32] tracking-[0.02em] text-burgundy outline-none"
          >
            {weddingConfig.hero.nepali}
          </h1>

          <p className="font-script mt-2 text-[clamp(2rem,6vw,3.4rem)] leading-none text-rose">
            {weddingConfig.hero.english}
          </p>

          <div className="w-full max-w-sm">
            <FloralDivider className="mt-4" />
          </div>

          <p className="font-script mt-2 text-[clamp(1.7rem,5vw,2.6rem)] leading-tight text-burgundy">
            {groom.name.split(' ')[0]}
            <span className="mx-2 text-blush">&amp;</span>
            {bride.name.split(' ')[0]}
          </p>

          <p className="mt-2 max-w-md font-body text-base italic text-brown/80 sm:text-lg">
            {weddingConfig.hero.greeting}
          </p>

          {showScrollCue ? (
            <div className="mt-12 flex flex-col items-center gap-2 text-leaf-deep/80">
              <span className="font-display text-[0.56rem] uppercase tracking-[0.3em]">
                Scroll down
              </span>
              <span className={reduceMotion ? undefined : 'animate-gentle-bob'}>
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  )
}
