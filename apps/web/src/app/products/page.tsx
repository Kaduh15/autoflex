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
import { useProducts } from '@/hooks/products/use-products'
import { formatCurrency } from '@/utils/format-currency'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const productsQuery = useProducts()
  const data = productsQuery.data?.data ?? []
  const columns = [
    { key: 'code', label: 'Código' },
    { key: 'name', label: 'Nome' },
    { key: 'price', label: 'Valor' },
    { key: 'rawMaterial', label: 'Matéria-prima' },
    { key: 'actions', label: 'Ações', align: 'end' as const },
  ]

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) {
      return data
    }

    return data.filter((product) => {
      return (
        product.code.toLowerCase().includes(normalizedSearch) ||
        product.name.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [data, search])

  return (
    <ListingPageLayout>
      <ListingHeader
        title="Produtos"
        subtitle="Gerencie produtos e suas listas de materiais"
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/products/create">
              <PlusIcon className="size-4" />
              Adicionar Produto
            </Link>
          </Button>
        }
      />
      <div className="flex flex-col gap-8">
        <div>
          <ListingToolbar
            searchPlaceholder="Buscar produtos..."
            resultsText={`${filteredData.length} resultados`}
            searchValue={search}
            onSearchChange={setSearch}
          />
        </div>
        <Activity
          mode={
            filteredData.length > 0 && !productsQuery.isLoading
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

              if (columnKey === 'price') {
                return formatCurrency(row.price)
              }

              if (columnKey === 'rawMaterial') {
                return (
                  <Badge className="text-accent font-semibold">
                    + {row.rawMaterial.length}
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
            data.length === 0 && !productsQuery.isLoading ? 'visible' : 'hidden'
          }
        >
          <ListingEmptyState message="Nenhum produto encontrado." />
        </Activity>
        <Activity mode={productsQuery.isLoading ? 'visible' : 'hidden'}>
          <ListingEmptyState message="Carregando produtos..." />
        </Activity>
        <Activity mode={productsQuery.isError ? 'visible' : 'hidden'}>
          <ListingEmptyState message="Falha ao carregar produtos." />
        </Activity>
      </div>
    </ListingPageLayout>
  )
}
