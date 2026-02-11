import { z } from 'zod'
import { env } from '@/env'
import { productSchema } from '@/schemas/products'

const responseSchema = z.object({
  message: z.string(),
  data: productSchema.extend({
    rawMaterial: z.object({
      id: z.number(),
      code: z.string(),
      name: z.string(),
      quantityRequired: z.number(),
      stockQuantity: z.number(),
    }).array(),
  }).array(),
  })

export async function getProducts() {
  const res = await fetch(`${env.API_URL}/products`)

  if (!res.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  const data = await res.json()

  return responseSchema.parse(data)
}
