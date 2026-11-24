import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { weddingConfig } from '../config/wedding'
import { GoldDivider } from './decorations/GoldDivider'
import { Monogram } from './decorations/Monogram'
import { PaperPattern } from './decorations/PaperPattern'
import { TempleArch } from './decorations/TempleArch'
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
  const { groom, bride, blessing, invitationLine } = weddingConfig.couple
  const photo = weddingConfig.photos?.couple

  return (
    <section
      id="couple"
      className="relative overflow-hidden border-y border-gold/20 bg-ivory py-20 sm:py-28"
      aria-labelledby="couple-heading"
    >
      <PaperPattern className="text-gold" opacity={0.17} />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mx-auto max-w-xl font-body text-lg italic text-gold-deep sm:text-xl">
            {blessing}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="relative mx-auto w-fit">
            {photo && !photoFailed ? (
              <div className="relative">
                <TempleArch className="pointer-events-none absolute -inset-x-7 -top-7 h-[calc(100%+4.5rem)] w-[calc(100%+3.5rem)] opacity-30" />
                <div className="relative border border-gold/60 bg-ivory p-1.5 shadow-card">
                  <div className="border border-gold/25">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      onError={() => setPhotoFailed(true)}
                      className="aspect-[4/5] w-44 object-cover sm:w-56"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Monogram
                groomName={groom.name}
                brideName={bride.name}
                className="w-40 sm:w-52"
              />
            )}
          </div>
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
          className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center sm:gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-[19rem] sm:flex-1 sm:text-right"
          >
            <p className="font-display text-[clamp(1.75rem,4.6vw,2.8rem)] leading-tight tracking-[0.035em] text-burgundy">
              {groom.name}
            </p>
            <p
              lang="ne"
              className="mt-1.5 font-devanagari text-lg text-gold-deep"
            >
              {groom.nepaliName}
            </p>
            <p className="mx-auto mt-2 max-w-[15rem] font-display text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-burgundy/55 sm:ml-auto sm:mr-0">
              {groom.parents}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-1 text-gold sm:mt-3"
          >
            <span className="h-8 w-px bg-gold/35" />
            <span className="font-body text-3xl italic leading-none">&</span>
            <span className="h-8 w-px bg-gold/35" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-[19rem] sm:flex-1 sm:text-left"
          >
            <p className="font-display text-[clamp(1.75rem,4.6vw,2.8rem)] leading-tight tracking-[0.035em] text-burgundy">
              {bride.name}
            </p>
            <p
              lang="ne"
              className="mt-1.5 font-devanagari text-lg text-gold-deep"
            >
              {bride.nepaliName}
            </p>
            <p className="mx-auto mt-2 max-w-[15rem] font-display text-[0.58rem] uppercase leading-relaxed tracking-[0.16em] text-burgundy/55 sm:mr-auto sm:ml-0">
              {bride.parents}
            </p>
          </motion.div>
        </motion.div>

        <Reveal delay={0.15} className="mt-8">
          <p className="mx-auto max-w-lg font-body text-xl text-burgundy/80 sm:text-2xl">
            {invitationLine}
          </p>
          <GoldDivider className="mt-6" />
        </Reveal>
      </div>
    </section>
  )
}