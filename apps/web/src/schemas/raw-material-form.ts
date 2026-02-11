import { z } from 'zod/v3'

export const createRawMaterialSchema = z.object({
  code: z.string().min(1, 'Informe o código'),
  name: z.string().min(1, 'Informe o nome'),
  stockQuantity: z.coerce
    .number()
    .int('Informe a quantidade')
    .nonnegative('Informe a quantidade'),
})

export type CreateRawMaterialFormValues = z.infer<
  typeof createRawMaterialSchema
>
