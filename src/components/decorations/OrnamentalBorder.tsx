interface OrnamentalBorderProps {
  className?: string
  tone?: 'burgundy' | 'cream' | 'leaf' | 'brown'
  inset?: 'sm' | 'md' | 'lg'
}

const tones = {
  burgundy: 'text-burgundy',
  cream: 'text-cream',
  leaf: 'text-leaf-deep',
  brown: 'text-brown',
}

const insets = {
  sm: 'inset-2',
  md: 'inset-3 sm:inset-5',
  lg: 'inset-4 sm:inset-6 lg:inset-8',
}

function CornerFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 76 76"
      className={`h-10 w-10 sm:h-14 sm:w-14 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 74V26C2 12.7 12.7 2 26 2h48"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.85"
      />
      <path
        d="M10 74V29C10 18.5 18.5 10 29 10h45"
        stroke="currentColor"
        strokeWidth="0.65"
        opacity="0.45"
      />
      <path
        d="M26 2c6 8 6 16 0 24-6-8-6-16 0-24Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M2 26c8 6 16 6 24 0-8-6-16-6-24 0Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M26 12c9 3 14 8 17 17-9-3-14-8-17-17Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M12 26c3 9 8 14 17 17-3-9-8-14-17-17Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <circle cx="26" cy="26" r="1.8" fill="currentColor" opacity="0.8" />
      <circle cx="40" cy="11" r="0.9" fill="currentColor" opacity="0.55" />
      <circle cx="11" cy="40" r="0.9" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

export function OrnamentalBorder({
  className = '',
  tone = 'burgundy',
  inset = 'md',
}: OrnamentalBorderProps) {
  return (
    <div
      className={`pointer-events-none absolute ${insets[inset]} ${tones[tone]} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 border border-current opacity-55" />
      <div className="absolute inset-1.5 border border-current opacity-20" />
      <CornerFlourish className="absolute -left-[1px] -top-[1px]" />
      <CornerFlourish className="absolute -right-[1px] -top-[1px] rotate-90" />
      <CornerFlourish className="absolute -bottom-[1px] -right-[1px] rotate-180" />
      <CornerFlourish className="absolute -bottom-[1px] -left-[1px] -rotate-90" />
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-current opacity-70" />
      <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rotate-45 border border-current opacity-70" />
      <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-current opacity-50" />
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rotate-45 border border-current opacity-50" />
    </div>
  )
}
