import { FloralDivider } from '../decorations/FloralDivider'
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
          isLight ? 'text-blush' : 'text-leaf-deep'
        }`}
      >
        {nepali}
      </p>
      <h2
        id={headingId}
        className={`mt-2 font-display text-[clamp(1.85rem,4vw,2.8rem)] tracking-[0.03em] ${
          isLight ? 'text-cream' : 'text-burgundy'
        }`}
      >
        {title}
      </h2>
      <FloralDivider className="mt-3" />
      {subtitle ? (
        <p
          className={`mx-auto mt-2 max-w-xl font-body text-lg italic ${
            isLight ? 'text-cream/75' : 'text-brown/80'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
