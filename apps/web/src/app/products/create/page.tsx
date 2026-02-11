'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateProduct } from '@/hooks/products/use-create-product'
import { useRawMaterials } from '@/hooks/raw-materials/use-raw-materials'
import {
  type CreateProductFormValues,
  createProductSchema,
} from '@/schemas/product-form'

export default function ProductsCreatePage() {
  const router = useRouter()
  const mutation = useCreateProduct()
  const rawMaterialsQuery = useRawMaterials()
  const rawMaterials = rawMaterialsQuery.data?.data ?? []
  const rawMaterialsStatus = rawMaterialsQuery.isLoading
    ? 'loading'
    : rawMaterialsQuery.isError
      ? 'error'
      : rawMaterials.length === 0
        ? 'empty'
        : 'ready'

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rawMaterials',
  })

  const onSubmit = async (values: CreateProductFormValues) => {
    await mutation.mutateAsync(values)
    router.push('/products')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Cadastrar produto</h1>
          <p className="text-sm text-muted-foreground">
            Crie um produto e associe matérias-primas
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder="EX: PROD-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Matérias-primas</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ rawMaterialId: 0, quantity: 1 })}
              >
                <PlusIcon className="size-4" />
                Adicionar matéria-prima
              </Button>
            </div>

            {fields.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma matéria-prima adicionada.
              </p>
            ) : null}

            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-4 md:grid-cols-[1fr_1fr_auto] items-end"
                >
                  <FormField
                    control={form.control}
                    name={`rawMaterials.${index}.rawMaterialId`}
                    render={({ field: rawField }) => (
                      <FormItem>
                        <FormLabel>Matéria-prima</FormLabel>
                        <Select
                          value={rawField.value ? String(rawField.value) : ''}
                          onValueChange={(value) => {
                            rawField.onChange(value ? Number(value) : 0)
                          }}
                          disabled={rawMaterialsStatus === 'loading'}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {rawMaterialsStatus === 'loading' ? (
                              <SelectItem value="__loading" disabled>
                                Carregando...
                              </SelectItem>
                            ) : null}
                            {rawMaterialsStatus === 'error' ? (
                              <SelectItem value="__error" disabled>
                                Falha ao carregar matérias-primas
                              </SelectItem>
                            ) : null}
                            {rawMaterialsStatus === 'empty' ? (
                              <SelectItem value="__empty" disabled>
                                Nenhuma matéria-prima encontrada
                              </SelectItem>
                            ) : null}
                            {rawMaterialsStatus === 'ready'
                              ? rawMaterials.map((rawMaterial) => (
                                  <SelectItem
                                    key={rawMaterial.id}
                                    value={String(rawMaterial.id)}
                                  >
                                    {rawMaterial.name}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`rawMaterials.${index}.quantity`}
                    render={({ field: qtyField }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...qtyField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvando...' : 'Cadastrar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/products')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
