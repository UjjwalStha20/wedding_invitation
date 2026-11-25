import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { FloralDivider } from './decorations/FloralDivider'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

interface DetailItemProps {
  icon: LucideIcon
  label: string
  nepali: string
  value: string
  secondary?: string
}

function DetailItem({
  icon: Icon,
  label,
  nepali,
  value,
  secondary,
}: DetailItemProps) {
  return (
    <div className="flex flex-col items-center px-1 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-burgundy/40 bg-cream text-burgundy">
        <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <p className="eyebrow mt-3 text-[0.55rem] text-brown/70">{label}</p>
      <p
        lang="ne"
        className="mt-0.5 font-devanagari text-xs text-leaf-deep"
      >
        {nepali}
      </p>
      <p className="mt-1.5 max-w-full break-words font-display text-[0.82rem] leading-snug tracking-[0.03em] text-burgundy">
        {value}
      </p>
      {secondary ? (
        <p className="mt-1 max-w-full break-words font-body text-sm text-brown/70">
          {secondary}
        </p>
      ) : null}
    </div>
  )
}

export function WeddingDetails() {
  const weddingConfig = useWeddingConfig()
  const { date, venue } = weddingConfig

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-peach py-16 sm:py-24"
      aria-labelledby="details-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.11} />
      <FloralCorner corner="top-left" className="w-[clamp(120px,18vw,240px)]" opacity={0.45} />
      <FloralCorner corner="bottom-right" className="w-[clamp(120px,18vw,240px)]" opacity={0.4} />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle
          headingId="details-heading"
          nepali="शुभ दिन"
          title="Wedding Day"
          subtitle="Join us to celebrate our wedding."
        />

        <Reveal delay={0.12} className="mt-8">
          <div className="relative mx-auto max-w-3xl border border-burgundy/40 bg-cream/90 px-5 py-7 shadow-card sm:px-10 sm:py-8">
            <div className="pointer-events-none absolute inset-2 border border-blush/50" />
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-burgundy/50 bg-cream" />
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 border border-burgundy/50 bg-cream" />

            <div className="relative text-center">
              <p className="eyebrow text-brown/70">Bikram Sambat</p>
              <p className="mt-2 font-display text-[clamp(1.7rem,5vw,2.65rem)] leading-tight tracking-[0.04em] text-burgundy">
                {date.bs}
              </p>
              <p
                lang="ne"
                className="mt-1 font-devanagari text-lg text-leaf-deep"
              >
                {date.bsNepali}
              </p>

              <FloralDivider className="mt-4" />

              <time
                dateTime={date.isoDate}
                className="mt-4 block font-body text-xl italic text-brown/85 sm:text-2xl"
              >
                {date.gregorian}
              </time>
            </div>

            <div className="relative mt-6 grid gap-5 border-t border-burgundy/15 pt-6 sm:grid-cols-3 sm:gap-4">
              <DetailItem
                icon={Clock3}
                label="Muhurta"
                nepali="मुहूर्त"
                value={date.muhurta}
                secondary={date.muhurtaNepali}
              />
              <DetailItem
                icon={CalendarDays}
                label="Day"
                nepali="बार"
                value={date.day}
                secondary={date.dayNepali}
              />
              <DetailItem
                icon={MapPin}
                label="Venue"
                nepali="स्थल"
                value={venue.name}
                secondary="Dhulikhel, Nepal"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}