import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { FloralDivider } from './decorations/FloralDivider'
import { FloralWreath } from './decorations/FloralWreath'
import { Monogram } from './decorations/Monogram'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function CoupleSection() {
  const reduceMotion = useReducedMotion()
  const [photoFailed, setPhotoFailed] = useState(false)
  const weddingConfig = useWeddingConfig()
  const { groom, bride, blessing, invitationLine } = weddingConfig.couple
  const photo = weddingConfig.photos?.couple

  return (
    <section
      id="couple"
      className="relative overflow-hidden border-y border-burgundy/15 bg-peach py-16 sm:py-24"
      aria-labelledby="couple-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.11} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,235,216,0.65)_0%,rgba(255,224,173,0)_60%)]" />
      <FloralCorner
        corner="top-right"
        className="hidden w-[clamp(140px,22vw,300px)] sm:block"
        opacity={0.6}
      />
      <FloralCorner
        corner="bottom-left"
        className="hidden w-[clamp(140px,22vw,300px)] sm:block"
        opacity={0.55}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-script text-[clamp(1.4rem,3.6vw,2rem)] text-rose">
            {blessing}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <FloralWreath className="mx-auto aspect-square w-[min(82vw,21rem)] sm:w-[23rem]">
            {photo && !photoFailed ? (
              <div className="relative border border-burgundy/50 bg-cream p-1.5 shadow-card">
                <div className="border border-blush/60">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    onError={() => setPhotoFailed(true)}
                    className="aspect-[4/5] w-36 object-cover sm:w-44"
                  />
                </div>
              </div>
            ) : (
              <Monogram
                groomName={groom.name}
                brideName={bride.name}
                className="w-[54%]"
              />
            )}
          </FloralWreath>
        </Reveal>

        <h2 id="couple-heading" className="sr-only">
          {groom.name} and {bride.name}
        </h2>

        <motion.div
          aria-hidden="true"
          variants={containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
          className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-[19rem] sm:flex-1 sm:text-right"
          >
            <p className="font-display text-[clamp(1.75rem,4.6vw,2.8rem)] leading-tight tracking-[0.02em] text-burgundy">
              {groom.name}
            </p>
            <p
              lang="ne"
              className="mt-1.5 font-devanagari text-lg text-leaf-deep"
            >
              {groom.nepaliName}
            </p>
            <p className="mx-auto mt-2 max-w-[15rem] font-display text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-brown/65 sm:ml-auto sm:mr-0">
              {groom.parents}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-1 text-blush sm:mt-3"
          >
            <span className="h-8 w-px bg-burgundy/25" />
            <span className="font-script text-4xl leading-none text-rose">
              &amp;
            </span>
            <span className="h-8 w-px bg-burgundy/25" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-[19rem] sm:flex-1 sm:text-left"
          >
            <p className="font-display text-[clamp(1.75rem,4.6vw,2.8rem)] leading-tight tracking-[0.02em] text-burgundy">
              {bride.name}
            </p>
            <p
              lang="ne"
              className="mt-1.5 font-devanagari text-lg text-leaf-deep"
            >
              {bride.nepaliName}
            </p>
            <p className="mx-auto mt-2 max-w-[15rem] font-display text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-brown/65 sm:mr-auto sm:ml-0">
              {bride.parents}
            </p>
          </motion.div>
        </motion.div>

        <Reveal delay={0.15} className="mt-6">
          <p className="mx-auto max-w-lg font-body text-xl text-brown/85 sm:text-2xl">
            {invitationLine}
          </p>
          <FloralDivider className="mt-4" />
        </Reveal>
      </div>
    </section>
  )
}
