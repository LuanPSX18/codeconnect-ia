import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ id, className = '', ...props }, ref) {
  return (
    <input
      id={id}
      ref={ref}
      className={`w-full rounded-lg bg-[var(--color-input)] border border-[var(--color-border-subtle)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand)] transition-colors ${className}`}
      {...props}
    />
  )
})
