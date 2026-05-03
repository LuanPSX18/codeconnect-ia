import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'
  endIcon?: ReactNode
  children: ReactNode
}

export function Button({ variant = 'primary', endIcon, children, className = '', ...props }: ButtonProps) {
  const base = 'w-full flex items-center justify-center gap-2 rounded-lg py-3 px-6 font-semibold text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[var(--color-brand)] text-[#0d0e12] hover:bg-[var(--color-brand-hover)] focus-visible:outline-[var(--color-brand)]',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {endIcon && <span aria-hidden="true">{endIcon}</span>}
    </button>
  )
}
