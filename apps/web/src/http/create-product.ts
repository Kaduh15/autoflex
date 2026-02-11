import { z } from 'zod'

import { env } from '@/env'
import { productSchema } from '@/schemas/products'

const responseSchema = z.object({
  message: z.string(),
  data: productSchema,
})

type CreateProductPayload = {
  code: string
  name: string
  price: number
}

export async function createProduct(payload: CreateProductPayload) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar produto')
  }

  const result = await response.json()

  return responseSchema.parse(result)
}
