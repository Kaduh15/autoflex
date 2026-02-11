import type { ReactNode } from 'react'

type ListingPageLayoutProps = {
  children: ReactNode
}

export function ListingPageLayout({ children }: ListingPageLayoutProps) {
  return <div className="flex flex-col gap-6">{children}</div>
}
