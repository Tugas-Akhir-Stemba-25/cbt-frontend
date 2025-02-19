'use client'

import * as React from 'react'

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  RowSelectionState
} from '@tanstack/react-table'
import { ChevronsUpDown, Download, Plus, ChevronLeft, ChevronRight, SquarePen, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

const DataTable = <TData,>({ columns, data }: DataTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      rowSelection
    },
    onRowSelectionChange: setRowSelection
  })

  const handleEdit = (row: TData) => {
    console.log('Edit:', row)
  }

  const handleDelete = (row: TData) => {
    console.log('Deleted:', row)
  }

  const renderPageNumbers = () => {
    const totalPages = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex
    const pages = []

    if (totalPages <= 3) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
      }
    } else {
      if (currentPage <= 1) {
        pages.push(1, 2, 3)
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(currentPage, currentPage + 1, currentPage + 2)
      }
    }

    return pages.map((page) => (
      <Button
        className="text-gray-400"
        key={page}
        variant={currentPage + 1 === page ? 'outline' : 'link'}
        onClick={() => table.setPageIndex(page - 1)}
      >
        {page}
      </Button>
    ))
  }

  return (
    <div className="w-full rounded-lg border bg-white shadow-sm">
      <div className="p-4 pb-0">
        <div className="mb-4 flex justify-between">
          <Input
            placeholder="🔍 Cari Guru"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-1/3"
          />
          <div className="flex gap-4">
            <Button variant="outline">
              Unduh
              <Download size={20} />
            </Button>
            <Button className="bg-blue-600 text-white">
              Tambah Data
              <Plus size={20} color="#ffffff" />
            </Button>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse rounded-lg">
        <thead className="border-gray-950 bg-gray-100 text-sm text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="w-10 border-inherit p-3">
                <Checkbox
                  className="h-4 w-4 border-2 border-[#0307121A]"
                  checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                  onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                  aria-label="Select all"
                />
              </th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3">
                  {header.isPlaceholder ? null : (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center"
                      disabled={!header.column.getCanSort()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <>
                          <ChevronsUpDown size={16} className="ml-1 h-4 w-4" />
                          {header.column.getIsSorted() === 'asc'}
                          {header.column.getIsSorted() === 'desc'}
                        </>
                      )}
                    </button>
                  )}
                </th>
              ))}
              <th className="w-16 p-3"></th>
              <th className="w-16 p-3"></th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t"
              style={{
                backgroundColor: row.getIsSelected() ? '#F3F4F6' : 'transparent',
                borderBottomColor: row.getIsSelected() ? '#0307121A' : 'transparent'
              }}
            >
              <td className="p-3">
                <Checkbox
                  className="h-4 w-4 border-2 border-[#0307121A]"
                  checked={row.getIsSelected()}
                  onCheckedChange={(value) => row.toggleSelected(!!value)}
                  aria-label="Select row"
                />
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="flex gap-3 p-3">
                <button onClick={() => handleEdit(row.original)}>
                  <SquarePen size={16} color="#4F46E5" strokeWidth={1.5} />
                </button>
                <button onClick={() => handleDelete(row.original)}>
                  <Trash size={16} color="#EF1A07" strokeWidth={1.5} />
                </button>
              </td>
              <th></th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between p-4 text-gray-400">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded border p-1"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>per page</span>
        </div>
        <div className="flex items-center gap-2">
          <ChevronLeft size={20} color="#6B7280" strokeWidth={1.5} />
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage}>
            Previous
          </button>
          {renderPageNumbers()}
          {table.getPageCount() > 3 && table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
            <span>...</span>
          )}
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage}>
            Previous
          </button>
          <ChevronRight size={20} color="#6B7280" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}

export default DataTable
