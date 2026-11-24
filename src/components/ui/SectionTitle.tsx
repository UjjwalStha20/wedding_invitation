import { GoldDivider } from '../decorations/GoldDivider'
import { Reveal } from './Reveal'

interface SectionTitleProps {
  nepali: string
  title: string
  subtitle?: string
  tone?: 'light' | 'dark'
  headingId?: string
  className?: string
}

export function SectionTitle({
  nepali,
  title,
  subtitle,
  tone = 'dark',
  headingId,
  className = '',
}: SectionTitleProps) {
  const isLight = tone === 'light'

  return (
    <Reveal className={`text-center ${className}`}>
      <p
        lang="ne"
        className={`font-devanagari text-base tracking-[0.08em] ${
          isLight ? 'text-gold-light' : 'text-gold-deep'
        }`}
      >
        {nepali}
      </p>
      <h2
        id={headingId}
        className={`mt-2 font-display text-[clamp(1.85rem,4vw,2.8rem)] tracking-[0.04em] ${
          isLight ? 'text-ivory' : 'text-burgundy'
        }`}
      >
        {title}
      </h2>
      <GoldDivider className="mt-4" />
      {subtitle ? (
        <p
          className={`mx-auto mt-3 max-w-xl text-lg italic ${
            isLight ? 'text-ivory/70' : 'text-burgundy/70'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}