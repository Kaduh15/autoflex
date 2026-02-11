import { z } from 'zod'

export const rawMaterialSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  stockQuantity: z.number(),
})
