import type { ReactNode } from 'react'

type ListingHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function ListingHeader({ title, subtitle, action }: ListingHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle ? (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action ? (
        <div className="w-full sm:w-auto sm:shrink-0">{action}</div>
      ) : null}
    </div>
  )
}
