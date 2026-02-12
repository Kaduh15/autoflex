import { useQuery } from '@tanstack/react-query'

import { getProductionSuggestions } from '@/http/get-production-suggestions'

export function useProductionSuggestions() {
  return useQuery({
    queryKey: ['production-suggestions'],
    queryFn: getProductionSuggestions,
  })
}
