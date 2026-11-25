import { motion, useReducedMotion } from 'framer-motion'
import { Flame, UtensilsCrossed } from 'lucide-react'
import { useWeddingConfig } from '../../hooks/useWeddingConfig'
import { FloatingPetals } from '../decorations/FloatingPetals'
import { GoldDivider } from '../decorations/GoldDivider'
import { PaperPattern } from '../decorations/PaperPattern'
import { SectionTitle } from '../ui/SectionTitle'

export function CenterPanel({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const weddingConfig = useWeddingConfig()
  const eventIcons = {
    wedding: Flame,
    reception: UtensilsCrossed,
  }

  return (
    <section
      className={`relative bg-ivory overflow-hidden min-h-[400px] py-8 sm:py-12 border-y border-burgundy/30 border-x border-burgundy/20 ${className}`}
      aria-label="Center of the invitation"
    >
      <PaperPattern className="text-gold" opacity={0.15} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <FloatingPetals className="opacity-50" />
        <SectionTitle headingId="invitation-heading" nepali="श्री गणेशाय नमः:" title="Shubh Vivah" subtitle="Please join us to celebrate our wedding." tone="light" />
        <div className="mt-8 space-y-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.6 }}>
            <span lang="ne" className="font-devanagari text-base tracking-[0.05em] text-maroon">{weddingConfig.hero.nepali}</span>
          </motion.p>
          <motion.h2 id="invitation-heading" className="font-display text-[clamp(2rem,6vw,3.2rem)] leading-[1.2] tracking-[0.04em] text-maroon" animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Celebration of Marriage
          </motion.h2>
          <GoldDivider className="my-4" />
          <motion.p lang="ne" className="font-body text-lg leading-relaxed text-maroon/70" animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {weddingConfig.messages.guestInvitation}
          </motion.p>
          <div className="border rounded-xl bg-maroon-deep p-4 sm:p-6 mb-6">
            <p className="font-display text-sm uppercase tracking-[0.1em] text-maroon/60 mb-3">Wedding Events</p>
            <div className="space-y-4">
              {weddingConfig.events.filter((event) => event.enabled).map((event) => {
                const Icon = eventIcons[event.icon]
                return (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/55 bg-maroon text-gold-light shadow-[0_0_0_5px_rgba(114,28,44,1)]">
                    <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl tracking-[0.03em] text-ivory">{event.name}</h3>
                    <p lang="ne" className="mt-0.5 font-devanagari text-sm text-gold/75">{event.nepaliName}</p>
                    <p className="font-display text-[0.58rem] uppercase tracking-[0.17em] text-gold/85">{event.date}</p>
                    <p className="font-body text-sm italic text-ivory/50">{event.gregorianDate}</p>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
          <div className="border rounded-xl bg-maroon-deep p-4 sm:p-6 mb-6">
            <p className="font-display text-sm uppercase tracking-[0.1em] text-maroon/60 mb-3">Wedding Ceremony</p>
            <p className="mt-1 font-body text-base text-maroon">Time: {weddingConfig.date.muhurta}</p>
            <p className="mt-2 font-body text-base text-maroon">{weddingConfig.date.day}, {weddingConfig.date.gregorian}</p>
          </div>
          <div className="border rounded-xl bg-maroon-deep p-4 sm:p-6 mb-6">
            <p className="font-display text-sm uppercase tracking-[0.1em] text-maroon/60 mb-3">Reception</p>
            <p className="mt-1 font-body text-base text-maroon">6:00 PM onwards, {weddingConfig.date.gregorian}</p>
          </div>
          <div className="border rounded-xl bg-maroon-deep p-4 sm:p-6">
            <p className="font-display text-sm uppercase tracking-[0.1em] text-maroon/60 mb-3">From our families</p>
            <p className="mt-2 font-body text-base text-maroon/70">Please join us and bless our new life together.</p>
          </div>
          <div className="relative mt-8 pt-8 border-t border-burgundy/20">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-maroon/70">Contact</p>
            <p className="mt-1 font-body text-base text-maroon">+977-9808113156</p>
          </div>
          <div className="mt-8 text-center">
            <div className="relative inline-block">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200" fill="none">
                <path d="M60 80 C 40 100, 40 160, 80 180 C 120 160, 160 100, 160 80 C 160 60, 120 40, 80 40 Z" fill="#721c2c" />
                <circle cx="80" cy="80" r="12" fill="#c6a15b" />
                <circle cx="120" cy="80" r="12" fill="#c6a15b" />
                <path d="M80 100 L120 100" stroke="#c6a15b" strokeWidth="2" />
                <path d="M100 80 L100 120" stroke="#c6a15b" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-24 w-24 text-maroon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l5 5-1.4 1.4L12 12l-5.7 2.6L2 9l11 5 2-8Z" /></svg>
              </div>
              <div className="relative w-32 h-32 rounded-full bg-maroon/10 flex items-center justify-center">
                <svg className="h-16 w-16 text-maroon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v7H4V4ZM4 12h16v7H4V12ZM4 20h16v7H4v-7Z" /></svg>
              </div>
            </div>
            <p className="mt-4 text-lg font-display text-maroon">{weddingConfig.couple.groom.name} & {weddingConfig.couple.bride.name}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
