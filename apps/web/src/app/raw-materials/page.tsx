import { PlusIcon } from 'lucide-react'
import { Activity } from 'react'
import { ListingEmptyState } from '@/components/listing/listing-empty-state'
import { ListingHeader } from '@/components/listing/listing-header'
import { ListingPageLayout } from '@/components/listing/listing-layout'
import { ListingTable } from '@/components/listing/listing-table'
import { ListingToolbar } from '@/components/listing/listing-toolbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getRawMaterials } from '@/http/get-raw-materials'

export default async function RawMaterialsPage() {
  const { data } = await getRawMaterials()
  const columns = [
    { key: 'code', label: 'Código' },
    { key: 'name', label: 'Nome' },
    { key: 'stockQuantity', label: 'Estoque' },
    { key: 'actions', label: 'Ações', align: 'end' as const },
  ]

  return (
    <ListingPageLayout>
      <ListingHeader
        title="Matéria-prima"
        subtitle="Gerencie o estoque de matérias-primas"
        action={
          <Button variant="outline" size="sm">
            <PlusIcon className="size-4" />
            Adicionar Matéria-prima
          </Button>
        }
      />
      <div className="flex flex-col gap-8">
        <ListingToolbar
          searchPlaceholder="Buscar matérias-primas..."
          resultsText={`${data.length} resultados`}
        />
        <Activity mode={data.length > 0 ? 'visible' : 'hidden'}>
          <ListingTable
            columns={columns}
            rows={data}
            getRowKey={(row) => row.id}
            renderCell={(row, columnKey) => {
              if (columnKey === 'code') {
                return <span className="font-medium">{row.code}</span>
              }

              if (columnKey === 'name') {
                return row.name
              }

              if (columnKey === 'stockQuantity') {
                return (
                  <Badge className="text-accent font-semibold">
                    {row.stockQuantity}
                  </Badge>
                )
              }

              if (columnKey === 'actions') {
                return (
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm">Editar</Button>
                    <Button size="sm" variant="destructive">
                      Excluir
                    </Button>
                  </div>
                )
              }

              return null
            }}
          />
        </Activity>
        <Activity mode={data.length === 0 ? 'visible' : 'hidden'}>
          <ListingEmptyState message="Nenhuma matéria-prima encontrada." />
        </Activity>
      </div>
    </ListingPageLayout>
  )
}
