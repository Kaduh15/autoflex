'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Activity, useMemo, useState } from 'react'
import { ListingEmptyState } from '@/components/listing/listing-empty-state'
import { ListingHeader } from '@/components/listing/listing-header'
import { ListingPageLayout } from '@/components/listing/listing-layout'
import { ListingTable } from '@/components/listing/listing-table'
import { ListingToolbar } from '@/components/listing/listing-toolbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRawMaterials } from '@/hooks/raw-materials/use-raw-materials'

export default function RawMaterialsPage() {
  const [search, setSearch] = useState('')
  const rawMaterialsQuery = useRawMaterials()
  const data = rawMaterialsQuery.data?.data ?? []
  const columns = [
    { key: 'code', label: 'Código' },
    { key: 'name', label: 'Nome' },
    { key: 'stockQuantity', label: 'Estoque' },
    { key: 'actions', label: 'Ações', align: 'end' as const },
  ]

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) {
      return data
    }

    return data.filter((rawMaterial) => {
      return (
        rawMaterial.code.toLowerCase().includes(normalizedSearch) ||
        rawMaterial.name.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [data, search])

  return (
    <ListingPageLayout>
      <ListingHeader
        title="Matéria-prima"
        subtitle="Gerencie o estoque de matérias-primas"
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/raw-materials/create">
              <PlusIcon className="size-4" />
              Adicionar Matéria-prima
            </Link>
          </Button>
        }
      />
      <div className="flex flex-col gap-8">
        <ListingToolbar
          searchPlaceholder="Buscar matérias-primas..."
          resultsText={`${filteredData.length} resultados`}
          searchValue={search}
          onSearchChange={setSearch}
        />
        <Activity
          mode={
            filteredData.length > 0 && !rawMaterialsQuery.isLoading
              ? 'visible'
              : 'hidden'
          }
        >
          <ListingTable
            columns={columns}
            rows={filteredData}
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
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
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
        <Activity
          mode={
            data.length === 0 && !rawMaterialsQuery.isLoading
              ? 'visible'
              : 'hidden'
          }
        >
          <ListingEmptyState message="Nenhuma matéria-prima encontrada." />
        </Activity>
        <Activity mode={rawMaterialsQuery.isLoading ? 'visible' : 'hidden'}>
          <ListingEmptyState message="Carregando matérias-primas..." />
        </Activity>
        <Activity mode={rawMaterialsQuery.isError ? 'visible' : 'hidden'}>
          <ListingEmptyState message="Falha ao carregar matérias-primas." />
        </Activity>
      </div>
    </ListingPageLayout>
  )
}
