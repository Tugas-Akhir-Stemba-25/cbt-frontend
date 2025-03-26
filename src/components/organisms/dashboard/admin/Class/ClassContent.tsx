'use client'

import { useState } from 'react'

import { PlusIcon, School } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { useGetClassCount } from '@/http/class/get-class-count'
import { useClassList } from '@/http/class/get-class-list'

import useMajorStore from '@/stores/useMajorStore'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import MajorCombobox from '@/components/atoms/combobox/MajorCombobox'
import BulkDeleteClassModal from '@/components/molecules/popup/class/BulkDeleteClassModal'
import CreateClassModal from '@/components/molecules/popup/class/CreateClassModal'
import DeleteClassModal from '@/components/molecules/popup/class/DeleteClassModal'
import EditClassModal from '@/components/molecules/popup/class/EditClassModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { classColumns } from '@/constants/columns/class-columns'
import { Class } from '@/types/class/class-list'

const ClassContent = () => {
  // Zustand Store
  const { selectedMajor } = useMajorStore()

  // Table State
  const [search, setSearch] = useDebounceValue<string>('', 250)
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  // Modal State
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)

  // Selected Data
  const [selectedData, setSelectedData] = useState<Class | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Get Class
  const { data: classes, isLoading: classesLoading } = useClassList(
    {
      major_id: selectedMajor as number,
      search,
      page,
      per_page: perPage
    },
    {
      enabled: !!selectedMajor
    }
  )

  // Get Class Count
  const { data: count, isLoading: countLoading } = useGetClassCount(
    {
      major_id: selectedMajor as number
    },
    {
      enabled: !!selectedMajor
    }
  )

  const handleEditModal = (modalOpen: boolean, id?: number) => {
    setOpenEditModal(modalOpen)
    setSelectedData(classes?.data.find((classData) => classData.id === id) ?? null)
  }

  const handleDeleteModal = (modalOpen: boolean, id?: number) => {
    setOpenDeleteModal(modalOpen)
    setSelectedData(classes?.data.find((classData) => classData.id === id) ?? null)
  }

  const handleBulkDeleteModal = (modalOpen: boolean, ids?: number[]) => {
    setSelectedIds(classes?.data.filter((cls, idx) => ids?.includes(idx)).map((cls) => cls.id) ?? [])
    setOpenBulkDeleteModal(modalOpen)
  }

  return (
    <>
      <div>
        <p>Data Kelas</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <CardStatistic
          title="Total Kelas"
          value={selectedMajor ? count?.data.count : '-'}
          icon={School}
          variant="primary"
          isLoading={countLoading}
        />

        {/* datatable */}
        <DataTable
          columns={classColumns}
          data={classes?.data ?? []}
          placeholder="Cari Jurusan"
          filter={
            <>
              <MajorCombobox />
            </>
          }
          setSearch={setSearch}
          pagination={classes?.meta.pagination}
          setPage={setPage}
          setPerPage={setPerPage}
          isLoading={classesLoading}
          setOpenEditModal={handleEditModal}
          setOpenDeleteModal={handleDeleteModal}
          setOpenBulkDeleteModal={handleBulkDeleteModal}
          action={
            <>
              <Button onClick={() => setOpenCreateModal(true)} disabled={!selectedMajor}>
                <PlusIcon className="h-4 w-4" />
                Tambah Data
              </Button>
            </>
          }
        />
      </div>
      <CreateClassModal
        classKey={{
          major_id: selectedMajor as number,
          page,
          per_page: perPage,
          search
        }}
        openModal={openCreateModal}
        setOpen={setOpenCreateModal}
      />
      <EditClassModal
        data={selectedData}
        openModal={openEditModal}
        setOpen={setOpenEditModal}
        classKey={{
          major_id: selectedMajor as number,
          page,
          per_page: perPage,
          search
        }}
      />
      <DeleteClassModal
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedData?.id as number}
        classKey={{
          major_id: selectedMajor as number,
          page,
          per_page: perPage,
          search
        }}
      />
      <BulkDeleteClassModal
        openModal={openBulkDeleteModal}
        setOpen={setOpenBulkDeleteModal}
        ids={selectedIds}
        classKey={{
          major_id: selectedMajor as number,
          page,
          per_page: perPage,
          search
        }}
      />
    </>
  )
}

export default ClassContent
