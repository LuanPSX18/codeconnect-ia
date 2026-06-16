import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface TextLinkProps {
  to: string
  children: ReactNode
  className?: string
}

export function TextLink({ to, children, className = '' }: TextLinkProps) {
  return (
    <Link
      to={to}
      className={`text-sm text-brand hover:underline focus-visible:underline ${className}`}
    >
      {children}
    </Link>
  )
}
