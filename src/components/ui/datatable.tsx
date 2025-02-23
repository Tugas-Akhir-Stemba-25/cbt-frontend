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
import {
  ChevronsUpDown,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  SquarePen,
  Trash,
  Search,
  Ellipsis
} from 'lucide-react'

import EditModal from '@/components/molecules/popup/EditRow'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

const DataTable = <TData extends Record<string, any>>({ columns, data }: DataTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [editingRow, setEditingRow] = React.useState<TData | null>(null)

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
    setEditingRow(row)
    setIsEditModalOpen(true)
  }

  const handleDelete = (row: TData) => {
    console.log('Deleted:', row)
  }

  const handleSave = (_updatedRow: TData) => {
    setIsEditModalOpen(false)
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
    <div className="w-full rounded-lg border shadow-xl">
      <div className="p-5">
        <div className="flex justify-between">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform" size={16} color="#6B7280" />
            <Input
              type="text"
              placeholder="Cari Data"
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="outline">
              Unduh
              <Download size={20} />
            </Button>
            <Button className="bg-blue-600 font-medium text-white">
              Tambah Data
              <Plus size={24} color="#ffffff" />
            </Button>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse rounded-lg">
        <thead className="border-t bg-[#F3F4F699] dark:bg-[#11182799]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="w-10 p-3">
                <Checkbox
                  className="h-4 w-4 border-2 border-[#0307121A] bg-[#FFFFFF] dark:border-[#FFFFFF29] dark:bg-[#030712]"
                  checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                  onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                  aria-label="Select all"
                />
              </th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-5 font-normal text-[#4B5563]">
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
                backgroundColor: row.getIsSelected() ? '#F3F4F6' : 'transparent'
              }}
            >
              <td className="w-10 border-inherit p-3">
                <Checkbox
                  className="h-4 w-4 border-2 border-[#0307121A] bg-[#FFFFFF] dark:border-[#FFFFFF29] dark:bg-[#030712]"
                  checked={row.getIsSelected()}
                  onCheckedChange={(value) => row.toggleSelected(!!value)}
                  aria-label="Select row"
                />
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-5 font-[#030712] font-normal">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="flex gap-3 p-5">
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
      <div className="flex items-center justify-between border-t p-5 font-medium text-[#4B5563]">
        {table.getSelectedRowModel().rows.length > 0 ? (
          <div className="flex items-center gap-2">
            <span>
              {table.getSelectedRowModel().rows.length} of {table.getRowModel().rows.length} row selected
            </span>
            <select className="rounded border p-2">
              <option value="unduh data">Unduh data</option>
              <option value="hapus">Hapus data</option>
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded border p-2"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span>per page</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="link"
            onClick={() => table.getCanPreviousPage() && table.previousPage()}
            aria-disabled={!table.getCanPreviousPage()}
            className={`flex items-center gap-2 text-[#4B5563] ${!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ChevronLeft size={20} color="#6B7280" strokeWidth={1.5} />
            Previous
          </Button>

          {renderPageNumbers()}
          {table.getPageCount() > 3 && table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
            <div>
              <Button
                variant="link"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="flex items-center gap-2 p-2"
              >
                <Ellipsis size={20} color="#6B7280" strokeWidth={1.5} />
              </Button>
            </div>
          )}
          <Button
            variant="link"
            onClick={() => table.getCanNextPage() && table.nextPage()}
            aria-disabled={!table.getCanNextPage()}
            className={`flex items-center gap-2 text-[#4B5563] ${!table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''}`}
          >
            Next
            <ChevronRight size={20} color="#6B7280" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      {isEditModalOpen && editingRow && (
        <EditModal<TData>
          row={editingRow}
          headers={table.getHeaderGroups().flatMap((group) => group.headers)}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default DataTable
