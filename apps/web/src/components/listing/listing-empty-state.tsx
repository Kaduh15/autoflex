type ListingEmptyStateProps = {
  message: string
}

export function ListingEmptyState({ message }: ListingEmptyStateProps) {
  return <p className="mx-auto text-sm text-muted-foreground">{message}</p>
}
