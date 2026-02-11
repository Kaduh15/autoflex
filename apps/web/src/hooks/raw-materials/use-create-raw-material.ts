import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createRawMaterial } from '@/http/create-raw-material'

type CreateRawMaterialPayload = {
  code: string
  name: string
  stockQuantity: number
}

export function useCreateRawMaterial() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateRawMaterialPayload) =>
      createRawMaterial(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['raw-materials'] })
    },
  })
}
