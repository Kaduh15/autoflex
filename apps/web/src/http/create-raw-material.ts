import { z } from 'zod'

import { env } from '@/env'
import { rawMaterialSchema } from '@/schemas/raw-materials'

const responseSchema = z.object({
  message: z.string(),
  data: rawMaterialSchema,
})

type CreateRawMaterialPayload = {
  code: string
  name: string
  stockQuantity: number
}

export async function createRawMaterial(payload: CreateRawMaterialPayload) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/raw-materials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar matéria-prima')
  }

  const result = await response.json()

  return responseSchema.parse(result)
}
