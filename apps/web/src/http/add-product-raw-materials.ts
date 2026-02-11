import { z } from 'zod'

import { env } from '@/env'
import { productSchema } from '@/schemas/products'
import { rawMaterialSchema } from '@/schemas/raw-materials'

const lomItemSchema = z.object({
  id: z.number(),
  product: productSchema,
  rawMaterial: rawMaterialSchema,
  quantityRequired: z.number(),
})

const responseSchema = z.object({
  message: z.string(),
  data: z.array(lomItemSchema),
})

type LomItemPayload = {
  rawMaterialId: number
  quantity: number
}

export async function addProductRawMaterials(
  productId: number,
  payload: LomItemPayload[],
) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products/${productId}/lom/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )

  if (!response.ok) {
    throw new Error('Erro ao associar matérias-primas')
  }

  const result = await response.json()

  return responseSchema.parse(result)
}
