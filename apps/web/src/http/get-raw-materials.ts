import { z } from 'zod'

import { env } from '@/env'
import { rawMaterialSchema } from '@/schemas/raw-materials'

const responseSchema = z.object({
  message: z.string(),
  data: z.array(rawMaterialSchema),
})

export async function getRawMaterials() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/raw-materials`)

  if (!response.ok) {
    throw new Error('Falha ao buscar matérias-primas')
  }

  const result = await response.json()

  return responseSchema.parse(result)
}
