import { z } from 'zod'

export const envSchema = z.object({
  API_URL: z.url(),
})

export const env = envSchema.parse(process.env)
