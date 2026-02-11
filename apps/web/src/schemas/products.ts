import z from 'zod'

export const productSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  price: z.number(),
})
