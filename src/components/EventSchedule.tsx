import {
  Clock3,
  Flame,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { EventIcon } from '../config/wedding'
import { useWeddingConfig } from '../hooks/useWeddingConfig'
import { FloralCorner } from './decorations/FloralCorner'
import { PaperPattern } from './decorations/PaperPattern'
import { Reveal } from './ui/Reveal'
import { SectionTitle } from './ui/SectionTitle'

const eventIcons: Record<EventIcon, LucideIcon> = {
  wedding: Flame,
  reception: UtensilsCrossed,
}

export function EventSchedule() {
  const weddingConfig = useWeddingConfig()
  const events = weddingConfig.events.filter((event) => event.enabled)
  const receptionOnly = weddingConfig.invitationType === 'reception'

  if (events.length === 0) return null

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-cream py-16 text-burgundy sm:py-24"
      aria-labelledby="events-heading"
    >
      <PaperPattern className="text-burgundy" opacity={0.1} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,230,0.75)_0%,rgba(248,212,165,0.3)_100%)]" />
      <FloralCorner
        corner="top-right"
        className="hidden w-[clamp(120px,18vw,240px)] sm:block"
        opacity={0.45}
      />
      <FloralCorner
        corner="bottom-left"
        className="w-[clamp(120px,18vw,240px)]"
        opacity={0.4}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <SectionTitle
          headingId="events-heading"
          nepali={receptionOnly ? 'रिसेप्सन समारोह' : 'विवाहका कार्यक्रम'}
          title={receptionOnly ? 'Reception Celebration' : 'Wedding Events'}
          subtitle={
            receptionOnly
              ? 'Join us for an evening of celebration.'
              : 'Join us to celebrate our wedding.'
          }
        />

        <ol className="mt-9 space-y-5">
          {events.map((event, index) => {
            const Icon = eventIcons[event.icon]
            const isLast = index === events.length - 1

            return (
              <li key={event.id} className="relative">
                {!isLast ? (
                  <span
                    className="absolute bottom-[-1.5rem] left-6 top-12 w-px bg-burgundy/20"
                    aria-hidden="true"
                  />
                ) : null}

                <Reveal delay={index * 0.06}>
                  <div className="grid grid-cols-[3rem_1fr] items-start gap-4 sm:gap-6">
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-burgundy/30 bg-burgundy text-cream shadow-[0_0_0_5px_var(--color-cream)]">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <div className="relative overflow-hidden border border-burgundy/30 bg-cream/95 px-5 py-4 shadow-soft sm:px-6 sm:py-5">
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-burgundy"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute right-3 top-3 h-1.5 w-1.5 rotate-45 border border-leaf/60"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="font-display text-xl tracking-[0.02em] text-burgundy">
                            {event.name}
                          </h3>
                          <p
                            lang="ne"
                            className="mt-0.5 font-devanagari text-sm text-leaf-deep"
                          >
                            {event.nepaliName}
                          </p>
                        </div>
                        <div>
                          <p className="w-fit bg-burgundy px-3 py-1 font-display text-[0.55rem] uppercase tracking-[0.16em] text-cream">
                            {event.date}
                          </p>
                          {event.dateNepali ? (
                            <p
                              lang="ne"
                              className="mt-1 font-devanagari text-xs text-leaf-deep"
                            >
                              {event.dateNepali}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <p className="mt-2 font-body text-sm italic text-brown/75">
                        {event.gregorianDate}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-body text-sm text-brown/80">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3
                            className="h-3.5 w-3.5 text-rose"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          {event.time}
                        </span>
                        {event.id === 'wedding' ? (
                          <>
                            <a
                              href="https://maps.app.goo.gl/R47wHNB7HfFymFsV8"
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Open Balkhu, Kathmandu in Google Maps"
                              className="inline-flex min-w-0 items-center gap-1.5 text-brown/80 underline decoration-burgundy/30 underline-offset-2 hover:text-burgundy"
                            >
                              <MapPin
                                className="h-3.5 w-3.5 shrink-0 text-rose"
                                strokeWidth={1.6}
                                aria-hidden="true"
                              />
                              Balkhu, Kathmandu
                            </a>
                            <span aria-hidden="true">→</span>
                            <a
                              href="https://google.com/maps/place/himalayan+durbar+hetauda/data=!4m2!3m1!1s0x39eb490051e041b3:0xe3a7e8e47d0e6789?sa=X&ved=1t:242&ictx=111"
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Open Himalayan Durbar Banquet, Hetauda in Google Maps"
                              className="inline-flex min-w-0 items-center text-brown/80 underline decoration-burgundy/30 underline-offset-2 hover:text-burgundy"
                            >
                              Himalayan Durbar Banquet, Hetauda
                            </a>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin
                              className="h-3.5 w-3.5 shrink-0 text-rose"
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />
                            {event.venue}
                          </span>
                        )}
                      </div>
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
