import type { ReactNode } from 'react'

type ListingHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function ListingHeader({ title, subtitle, action }: ListingHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle ? (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
