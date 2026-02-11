import { SearchIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

type ListingToolbarProps = {
  searchPlaceholder?: string
  resultsText?: string
}

export function ListingToolbar({
  searchPlaceholder = 'Buscar...',
  resultsText,
}: ListingToolbarProps) {
  return (
    <div className="flex gap-4 items-center">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder={searchPlaceholder} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {resultsText ? (
          <InputGroupAddon align="inline-end">{resultsText}</InputGroupAddon>
        ) : null}
      </InputGroup>
    </div>
  )
}
