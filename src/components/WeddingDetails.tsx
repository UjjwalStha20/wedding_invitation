import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { GoldDivider } from './decorations/GoldDivider'
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
      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/55 bg-ivory text-gold-deep">
        <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <p className="eyebrow mt-3 text-[0.55rem] text-gold-deep">{label}</p>
      <p
        lang="ne"
        className="mt-0.5 font-devanagari text-xs text-burgundy/55"
      >
        {nepali}
      </p>
      <p className="mt-1.5 max-w-full break-words font-display text-[0.82rem] leading-snug tracking-[0.03em] text-burgundy">
        {value}
      </p>
      {secondary ? (
        <p className="mt-1 max-w-full break-words font-body text-sm text-burgundy/60">
          {secondary}
        </p>
      ) : null}
    </div>
  )
}

export function WeddingDetails() {
  const { date, venue } = weddingConfig

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-ivory py-20 sm:py-28"
      aria-labelledby="details-heading"
    >
      <PaperPattern className="text-gold" opacity={0.16} />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle
          headingId="details-heading"
          nepali="शुभ दिन"
          title="The Auspicious Day"
          subtitle="An invitation to share in our sacred moment"
        />

        <Reveal delay={0.12} className="mt-10">
          <div className="relative mx-auto max-w-3xl border border-gold/55 bg-ivory-soft px-5 py-8 shadow-card sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute inset-2 border border-gold/20" />
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/60 bg-ivory" />
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 border border-gold/60 bg-ivory" />

            <div className="relative text-center">
              <p className="eyebrow text-gold-deep">Bikram Sambat</p>
              <p className="mt-2 font-display text-[clamp(1.7rem,5vw,2.65rem)] leading-tight tracking-[0.04em] text-maroon">
                {date.bs}
              </p>
              <p
                lang="ne"
                className="mt-1 font-devanagari text-lg text-gold-deep"
              >
                {date.bsNepali}
              </p>

              <GoldDivider className="mt-5" />

              <time
                dateTime={date.isoDate}
                className="mt-4 block font-body text-xl italic text-burgundy/75 sm:text-2xl"
              >
                {date.gregorian}
              </time>
            </div>

            <div className="relative mt-8 grid gap-6 border-t border-gold/25 pt-7 sm:grid-cols-3 sm:gap-4">
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
                secondary="Kathmandu, Nepal"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}