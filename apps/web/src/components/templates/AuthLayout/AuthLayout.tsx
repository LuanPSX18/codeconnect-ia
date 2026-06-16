import type { ReactNode } from 'react'

interface AuthLayoutProps {
  bannerSrc: string
  bannerAlt: string
  bannerWebpSrc?: string
  bannerWidth?: number
  bannerHeight?: number
  children: ReactNode
}

export function AuthLayout({
  bannerSrc,
  bannerAlt,
  bannerWebpSrc,
  bannerWidth,
  bannerHeight,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 sm:p-6">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-card">
        <picture className="hidden md:block w-[45%]">
          {bannerWebpSrc && <source srcSet={bannerWebpSrc} type="image/webp" />}
          <img
            src={bannerSrc}
            alt={bannerAlt}
            width={bannerWidth}
            height={bannerHeight}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        <section className="flex-1 p-8 sm:p-10 overflow-y-auto">
          {children}
        </section>
      </div>
    </div>
  )
}
