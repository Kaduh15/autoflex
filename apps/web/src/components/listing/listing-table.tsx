import type { ReactNode } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type ListingColumn<_T> = {
  key: string
  label: string
  className?: string
  align?: 'start' | 'end'
}

type ListingTableProps<T> = {
  columns: Array<ListingColumn<T>>
  rows: T[]
  renderCell: (row: T, columnKey: string) => ReactNode
  getRowKey?: (row: T) => React.Key
}

export function ListingTable<T>({
  columns,
  rows,
  renderCell,
  getRowKey,
}: ListingTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={`${
                column.align === 'end' ? 'text-end' : 'text-start'
              } ${column.className ?? ''}`.trim()}
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={getRowKey ? getRowKey(row) : index}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                className={column.align === 'end' ? 'text-end' : undefined}
              >
                {renderCell(row, column.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
