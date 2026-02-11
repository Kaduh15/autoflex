import { useQuery } from '@tanstack/react-query'

import { getRawMaterials } from '@/http/get-raw-materials'

export function useRawMaterials() {
  return useQuery({
    queryKey: ['raw-materials'],
    queryFn: getRawMaterials,
  })
}
