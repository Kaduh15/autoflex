'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

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
import { useCreateRawMaterial } from '@/hooks/raw-materials/use-create-raw-material'
import {
  type CreateRawMaterialFormValues,
  createRawMaterialSchema,
} from '@/schemas/raw-material-form'

export default function RawMaterialsCreatePage() {
  const router = useRouter()
  const mutation = useCreateRawMaterial()
  const form = useForm<CreateRawMaterialFormValues>({
    resolver: zodResolver(createRawMaterialSchema),
    defaultValues: {
      code: '',
      name: '',
      stockQuantity: 0,
    },
  })

  const onSubmit = async (values: CreateRawMaterialFormValues) => {
    await mutation.mutateAsync(values)
    router.push('/raw-materials')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Cadastrar matéria-prima</h1>
          <p className="text-sm text-muted-foreground">
            Registre uma nova matéria-prima no estoque
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
                    <Input placeholder="EX: MP-001" {...field} />
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
                    <Input placeholder="Nome da matéria-prima" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvando...' : 'Cadastrar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/raw-materials')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
