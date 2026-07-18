import type { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="pb-[72px] md:pb-0">
      {children}
    </div>
  )
}
