import { z } from 'zod'

import { env } from '@/env'
import { productionSuggestDataSchema } from '@/schemas/production-suggestions'

const responseSchema = z.object({
  message: z.string(),
  data: productionSuggestDataSchema,
})

export async function getProductionSuggestions() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/production/suggestion`,
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar sugestões de produção')
  }

  const result = await response.json()

  return responseSchema.parse(result)
}
