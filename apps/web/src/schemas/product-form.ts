import { z } from 'zod/v3'

export const createProductSchema = z.object({
  code: z.string().min(1, 'Informe o código'),
  name: z.string().min(1, 'Informe o nome'),
  price: z.coerce.number().positive('Informe um valor valido'),
  rawMaterials: z.array(
    z.object({
      rawMaterialId: z.coerce
        .number()
        .int('Informe o ID da matéria-prima')
        .positive('Informe o ID da matéria-prima'),
      quantity: z.coerce
        .number()
        .int('Informe a quantidade')
        .positive('Informe a quantidade'),
    }),
  ),
})

export type CreateProductFormValues = z.infer<typeof createProductSchema>
