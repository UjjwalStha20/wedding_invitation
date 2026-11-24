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
    solid: 'border border-gold bg-gold text-ivory hover:bg-gold/90',
    quiet: 'border border-gold/30 bg-ivory text-gold-hover hover:text-gold-deep',
    dark: 'border border-gold bg-maroon text-gold-light hover:bg-maroon-deep',
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${variantClasses[variant]} ${className} inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors`}
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
    solid: 'border border-gold bg-gold text-ivory hover:bg-gold/90',
    quiet: 'border border-gold/30 bg-ivory text-gold-hover hover:text-gold-deep',
    dark: 'border border-gold bg-maroon text-gold-light hover:bg-maroon-deep',
  }

  const classes = variantClasses[variant as keyof typeof variantClasses] || variantClasses.solid

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${classes} ${className} inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors`}
    >
      {children}
    </a>
  )
}