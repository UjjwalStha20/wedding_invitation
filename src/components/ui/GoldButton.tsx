import type { ReactNode } from 'react'

interface GoldButtonProps {
  href: string
  target?: string
  rel?: string
  variant?: 'solid' | 'quiet' | 'dark'
  className?: string
  children?: ReactNode
}

export function GoldLink({
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  variant = 'solid',
  className = '',
  children,
}: GoldButtonProps) {
  const variantClasses = {
    solid: 'border border-burgundy bg-burgundy text-cream shadow-soft hover:bg-burgundy-deep',
    quiet: 'border border-burgundy/40 bg-cream/70 text-burgundy hover:border-burgundy hover:bg-cream',
    dark: 'border border-brown bg-brown text-cream hover:bg-burgundy',
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${variantClasses[variant]} ${className} inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-display text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-300`}
    >
      {children}
    </a>
  )
}

export function GoldButton({
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  variant = 'solid',
  className = '',
  children,
}: GoldButtonProps) {
  const variantClasses = {
    solid: 'border border-burgundy bg-burgundy text-cream shadow-soft hover:bg-burgundy-deep',
    quiet: 'border border-burgundy/40 bg-cream/70 text-burgundy hover:border-burgundy hover:bg-cream',
    dark: 'border border-brown bg-brown text-cream hover:bg-burgundy',
  }

  const classes = variantClasses[variant as keyof typeof variantClasses] || variantClasses.solid

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${classes} ${className} inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-display text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-300`}
    >
      {children}
    </a>
  )
}