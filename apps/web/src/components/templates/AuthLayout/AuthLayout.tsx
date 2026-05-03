import type { ReactNode } from 'react'

interface AuthLayoutProps {
  bannerSrc: string
  bannerAlt: string
  children: ReactNode
}

export function AuthLayout({ bannerSrc, bannerAlt, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-app)] p-4 sm:p-6">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-[var(--color-card)]">
        <img
          src={bannerSrc}
          alt={bannerAlt}
          className="hidden md:block w-[45%] object-cover"
        />
        <section className="flex-1 p-8 sm:p-10 overflow-y-auto">
          {children}
        </section>
      </div>
    </div>
  )
}
