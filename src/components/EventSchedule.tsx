import { Flame, Flower2, Sun, UtensilsCrossed } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { weddingConfig, type EventIcon } from '../config/wedding'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const eventIcons: Record<EventIcon, LucideIcon> = {
  mehendi: Flower2,
  haldi: Sun,
  wedding: Flame,
  reception: UtensilsCrossed,
}

export function EventSchedule() {
  const events = weddingConfig.events.filter((event) => event.enabled)

  if (events.length === 0) return null

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-maroon py-20 text-ivory sm:py-28"
      aria-labelledby="events-heading"
    >
      <PaperPattern className="text-gold" opacity={0.18} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,18,27,0.22)_0%,rgba(53,18,27,0.55)_100%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <SectionTitle
          headingId="events-heading"
          tone="light"
          nepali="विवाहका कार्यक्रम"
          title="Wedding Celebrations"
          subtitle="Join us for the ceremonies that make our union complete"
        />

        <ol className="mt-12 space-y-6">
          {events.map((event, index) => {
            const Icon = eventIcons[event.icon]
            const isLast = index === events.length - 1

            return (
              <li key={event.id} className="relative">
                {!isLast ? (
                  <span
                    className="absolute bottom-[-1.5rem] left-6 top-12 w-px bg-gold/25"
                    aria-hidden="true"
                  />
                ) : null}

                <Reveal delay={index * 0.06}>
                  <div className="grid grid-cols-[3rem_1fr] items-start gap-4 sm:gap-6">
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/55 bg-maroon text-gold-light shadow-[0_0_0_5px_rgba(114,28,44,1)]">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <div className="relative border border-gold/30 bg-maroon-deep/85 px-5 py-5 sm:px-6 sm:py-6">
                      <span
                        className="absolute right-3 top-3 h-1.5 w-1.5 rotate-45 border border-gold/50"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="font-display text-xl tracking-[0.03em] text-ivory">
                            {event.name}
                          </h3>
                          <p
                            lang="ne"
                            className="mt-0.5 font-devanagari text-sm text-gold/75"
                          >
                            {event.nepaliName}
                          </p>
                        </div>
                        <p className="font-display text-[0.58rem] uppercase tracking-[0.17em] text-gold/85">
                          {event.date}
                        </p>
                      </div>

                      <p className="mt-1.5 font-body text-sm italic text-ivory/50">
                        {event.gregorianDate}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}