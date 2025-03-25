'use client'

import * as React from 'react'

import { flexRender, getCoreRowModel, useReactTable, ColumnDef, RowSelectionState } from '@tanstack/react-table'
import { ChevronsUpDown, ChevronLeft, ChevronRight, SquarePen, Trash, Ellipsis } from 'lucide-react'

import { SearchInput } from '@/components/atoms/input/SearchInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { Pagination } from '@/types/common/metadata'

import FilterDropdown from '../atoms/dropdowns/FilterClass'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Skeleton } from './skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  placeholder: string
  showFilter?: boolean
  action?: React.ReactNode
  setSearch?: (value: string) => void
  pagination?: Pagination
  setPerPage?: (value: number) => void
  setPage?: (value: number) => void
  isLoading?: boolean
  setOpenEditModal?: (value: boolean, id: number) => void
  setOpenDeleteModal?: (value: boolean, id: number) => void
}

const DataTable = <TData extends Record<string, any>>({
  columns: columnsProps,
  data: dataProps,
  placeholder,
  showFilter = false,
  action,
  setSearch,
  pagination = { current_page: 1, per_page: 10, total_pages: 1, total: 1 },
  setPerPage,
  setPage,
  isLoading: isLoad = false,
  setOpenEditModal,
  setOpenDeleteModal
}: DataTableProps<TData>) => {
  const data = React.useMemo(() => (isLoad ? Array(10).fill({}) : dataProps), [isLoad, dataProps])

  const columns = React.useMemo(
    () =>
      isLoad
        ? columnsProps.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-6 w-32" />
          }))
        : columnsProps,
    [columnsProps, isLoad]
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const renderRowSelectionActions = () => (
    <Select
      onValueChange={(value) => {
        if (value === 'unduh') {
          console.log('Unduh data terpilih:', table.getSelectedRowModel().rows)
        }
        if (value === 'hapus') {
          console.log('Hapus data terpilih:', table.getSelectedRowModel().rows)
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Aksi" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unduh">Unduh data</SelectItem>
        <SelectItem value="hapus">Hapus data</SelectItem>
      </SelectContent>
    </Select>
  )

  const renderPageSizeSelect = () => (
    <Select
      value={`${pagination?.per_page}`}
      onValueChange={(value) => {
        setPerPage?.(parseInt(value))
      }}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={pagination?.per_page} />
      </SelectTrigger>
      <SelectContent>
        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection
  })

  const handleEdit = (row: TData) => {
    setOpenEditModal?.(true, row.id)
  }

  const handleDelete = (row: TData) => {
    setOpenDeleteModal?.(true, row.id)
  }

  // const handleSave = (_updatedRow: TData) => {
  //   setIsEditModalOpen(false)
  // }

  const renderPageNumbers = () => {
    const totalPages = pagination?.total_pages || 1
    const currentPage = (pagination?.current_page || 1) - 1
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
        className="text-gray-700"
        key={page}
        variant={currentPage + 1 === page ? 'outline' : 'link'}
        onClick={() => setPage?.(page)}
      >
        {page}
      </Button>
    ))
  }

  React.useEffect(() => {
    if (setSearch) {
      setSearch(globalFilter)
    }
  }, [globalFilter, setSearch])

  return (
    <div className="w-full overflow-x-auto rounded-lg border shadow-xl">
      <div className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between lg:gap-0">
          <div className="flex gap-4 md:w-2/3">
            <div className="relative w-full">
              <SearchInput
                placeholder={placeholder}
                value={globalFilter}
                onChange={(e) => setGlobalFilter?.(e.target.value)}
              />
            </div>
            <div className="relative w-full">{showFilter && <FilterDropdown />}</div>
          </div>

          <div className="flex gap-4">{action}</div>
        </div>
      </div>
      <div className="min-w-[800px] overflow-x-auto md:min-w-full">
        <Table className="w-full border-collapse whitespace-nowrap rounded-lg">
          <TableHeader className="w- border-t bg-tableColour">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="w-10 p-3">
                  <Checkbox
                    className="border-muted/1 h-4 w-4 border-2 bg-transparent"
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-5 font-normal text-muted">
                    {header.isPlaceholder ? null : (
                      <Button
                        onClick={header.column.getToggleSortingHandler()}
                        className="font flex items-center p-0 text-center text-base"
                        variant="ghost"
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
                      </Button>
                    )}
                  </TableHead>
                ))}
                <TableHead className="w-16 p-3"></TableHead>
                <TableHead className="w-16 p-3"></TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`border-t ${row.getIsSelected() ? 'bg-tableColour-selected' : 'bg-transparent'}`}
              >
                <TableCell className="w-10 border-inherit p-3">
                  <Checkbox
                    className="border-muted/1 h-4 w-4 border-2 bg-transparent text-center"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                  />
                </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-5 font-normal text-foreground">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="flex gap-3 p-5">
                  <Button variant="ghost" onClick={() => handleEdit(row.original)}>
                    <SquarePen size={16} className="text-primary" strokeWidth={1.5} />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(row.original)}>
                    <Trash size={16} className="text-destructive" strokeWidth={1.5} />
                  </Button>
                </TableCell>
                <TableHead></TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t p-5 font-medium text-[#4B5563]">
        {table.getSelectedRowModel().rows.length > 0 ? (
          <div className="flex items-center gap-2">
            <span>
              {table.getSelectedRowModel().rows.length} dari {table.getRowModel().rows.length} baris dipilih
            </span>
            {renderRowSelectionActions()}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Tampilkan</span>
            {renderPageSizeSelect()}
            <span>per page</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="link"
            onClick={() => setPage && setPage((pagination?.current_page || 1) - 1)}
            aria-disabled={pagination?.current_page === 1}
            className={`flex items-center gap-2 text-[#4B5563] ${pagination?.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ChevronLeft size={20} color="#6B7280" strokeWidth={1.5} />
            Sebelumnya
          </Button>

          {renderPageNumbers()}
          {pagination?.total_pages > 3 && pagination?.current_page < pagination?.total_pages - 1 && (
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
            onClick={() => setPage && setPage((pagination?.current_page || 1) + 1)}
            aria-disabled={pagination?.current_page === pagination?.total_pages || pagination?.total_pages === 0}
            className={`flex items-center gap-2 text-[#4B5563] ${pagination?.current_page === pagination?.total_pages || pagination?.total_pages === 0 ? 'pointer-events-none opacity-50' : ''}`}
          >
            Selanjutnya
            <ChevronRight size={20} color="#6B7280" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataTable
