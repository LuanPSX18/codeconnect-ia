import type { ReactNode } from 'react'

interface DividerProps {
  children?: ReactNode
}

export function Divider({ children }: DividerProps) {
  return (
    <div className="flex items-center gap-3">
      <hr className="flex-1 border-border-subtle" />
      {children && (
        <span className="text-xs text-text-muted whitespace-nowrap">{children}</span>
      )}
      <hr className="flex-1 border-border-subtle" />
    </div>
  )
}
