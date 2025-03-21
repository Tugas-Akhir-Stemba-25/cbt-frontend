'use client'

import * as React from 'react'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  RowSelectionState
} from '@tanstack/react-table'
import { ChevronsUpDown, Download, Plus, ChevronLeft, ChevronRight, SquarePen, Trash, Loader } from 'lucide-react'

import { SearchInput } from '@/components/atoms/input/SearchInput'
import EditModal from '@/components/molecules/popup/EditRow'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import FilterDropdown from '../atoms/dropdowns/FilterClass'
import AddDataModal from '../molecules/popup/AddDataModal'
import DeleteDialog from '../molecules/popup/DeleteDialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  placeholder: string
  expectedUsername?: string
  role: string
  isLoading?: boolean
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSearchChange: (search: string) => void
}

const DataTable = <TData extends Record<string, any>>({
  columns,
  data,
  placeholder,
  role,
  isLoading = false,
  onSearchChange,
  onPageChange,
  currentPage,
  totalPages,
  pageSize,
  onPageSizeChange
}: DataTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [editingRow, setEditingRow] = React.useState<TData | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [authRequired, setAuthRequired] = React.useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [users, setUser] = React.useState([
    { id: 1, name: 'John Doe', username: 'johndoe' },
    { id: 2, name: 'Jane Smith', username: 'janesmith' }
  ])

  const renderRowSelectionActions = () => (
    <Select
      onValueChange={(value) => {
        if (value === 'unduh') {
          console.log('Unduh data terpilih:', table.getSelectedRowModel().rows)
        }
        if (value === 'hapus') {
          console.log('Hapus data terpilih:', table.getSelectedRowModel().rows)
          setIsDeleteDialogOpen(true)
          setAuthRequired(false)
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
    <Select value={`${pageSize}`} onValueChange={(value) => onPageSizeChange(Number(value))}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={`${pageSize}`} />
      </SelectTrigger>
      <SelectContent>
        {[10, 20, 30, 40, 50].map((size) => (
          <SelectItem key={size} value={`${size}`}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  const table = useReactTable({
    columns,
    data,
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      rowSelection
    },
    onRowSelectionChange: setRowSelection
  })

  const handleNewData = () => {
    console.log('New data:', editingRow)
    setIsCreateDialogOpen(true)
  }

  const handleEdit = (row: TData) => {
    setEditingRow(row)
    setIsEditModalOpen(true)
  }

  const handleDelete = (row: TData) => {
    console.log('Deleted:', row)
    setIsDeleteDialogOpen(true)
    setAuthRequired(true)
  }

  const handleSave = (_updatedRow: TData) => {
    setIsEditModalOpen(false)
  }

  const getPageNumbers = (): number[] => {
    let pages: number[] = []
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        pages = [1, 2, 3]
      } else if (currentPage >= totalPages - 1) {
        pages = [totalPages - 2, totalPages - 1, totalPages]
      } else {
        pages = [currentPage - 1, currentPage, currentPage + 1]
      }
    }
    return pages
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border shadow-xl">
      <div className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between lg:gap-0">
          {role === 'teacher' ? (
            <div className="flex gap-4 md:w-1/3">
              <div className="relative w-full">
                <SearchInput
                  placeholder={placeholder}
                  value={globalFilter}
                  onChange={(e) => {
                    setGlobalFilter(e.target.value)
                    onSearchChange(e.target.value)
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-4 md:w-1/2">
              <div className="relative w-full">
                <SearchInput
                  placeholder={placeholder}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
              <div className="relative w-full">
                <FilterDropdown />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button variant="outline" className="light:border-muted border-2 dark:border-foreground">
              Unduh
              <Download size={20} />
            </Button>
            <Button className="bg-primary font-medium" onClick={() => handleNewData()}>
              Tambah Data
              <Plus size={24} />
            </Button>
          </div>
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
                        className="flex items-center p-0 text-center text-base"
                        variant="ghost"
                        disabled={!header.column.getCanSort()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            <ChevronsUpDown size={16} className="ml-1 h-4 w-4" />
                            {header.column.getIsSorted() === 'asc' && ' 🔼'}
                            {header.column.getIsSorted() === 'desc' && ' 🔽'}
                          </>
                        )}
                      </Button>
                    )}
                  </TableHead>
                ))}
                <TableHead className="w-16 p-3" />
                <TableHead className="w-16 p-3" />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="p-5 text-center">
                  <Loader className="mr-2 inline-block animate-spin" size={20} />
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
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
                  <TableHead />
                </TableRow>
              ))
            )}
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
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} /> Previous
          </Button>

          {getPageNumbers().map((page) => (
            <Button key={page} variant={currentPage === page ? 'outline' : 'link'} onClick={() => onPageChange(page)}>
              {page}
            </Button>
          ))}
          <Button
            variant="link"
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      <AddDataModal
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onConfirm={(data) => {
          const newUser = { id: users.length + 1, ...data }
          setUser([...users, newUser])
          setIsCreateDialogOpen(false)
        }}
        expectedName="name"
        expectedUsername="username"
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
        }}
        onConfirm={() => {
          const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
          console.log('Selected rows:', selectedRows)
          setIsDeleteDialogOpen(false)
        }}
        authRequired={authRequired}
        expectedUsn="username"
        expectedPw="password"
      />

      {isEditModalOpen && editingRow && (
        <EditModal<TData>
          row={editingRow}
          headers={table.getHeaderGroups().flatMap((group) => group.headers)}
          extraFields={[{ id: 'password', label: 'Password', type: 'password' }]}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default DataTable
