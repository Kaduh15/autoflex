import { z } from 'zod'

export const productionSuggestionItemSchema = z.object({
  productId: z.number(),
  code: z.string(),
  name: z.string(),
  price: z.number(),
  maxQuantity: z.number(),
  totalValue: z.number(),
})

export const productionSuggestDataSchema = z.object({
  suggestions: z.array(productionSuggestionItemSchema),
  totalProductionValue: z.number(),
})
