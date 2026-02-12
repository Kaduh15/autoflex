'use client'

import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

type ListingToolbarProps = {
  searchPlaceholder?: string
  resultsText?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function ListingToolbar({
  searchPlaceholder = 'Buscar...',
  resultsText,
  searchValue,
  onSearchChange,
}: ListingToolbarProps) {
  const [internalValue, setInternalValue] = useState('')
  const value = searchValue ?? internalValue

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <InputGroup className="w-full sm:max-w-xs">
        <InputGroupInput
          placeholder={searchPlaceholder}
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value
            setInternalValue(nextValue)
            onSearchChange?.(nextValue)
          }}
        />
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
