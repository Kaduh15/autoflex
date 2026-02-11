import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addProductRawMaterials } from '@/http/add-product-raw-materials'
import { createProduct } from '@/http/create-product'

type CreateProductPayload = {
  code: string
  name: string
  price: number
  rawMaterials: Array<{
    rawMaterialId: number
    quantity: number
  }>
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const { rawMaterials, ...productPayload } = payload
      const result = await createProduct(productPayload)

      if (rawMaterials.length > 0) {
        await addProductRawMaterials(result.data.id, rawMaterials)
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
