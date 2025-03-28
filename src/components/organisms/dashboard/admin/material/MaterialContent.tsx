'use client'

import { useState } from 'react'

import { PlusIcon, School } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { useGetMaterialCount } from '@/http/materials/get-material-count'
import { useGetMaterialList } from '@/http/materials/get-material-list'

import useClassStore from '@/stores/useClassStore'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import ClassCombobox from '@/components/atoms/combobox/ClassCombobox'
import BulkDeleteMaterialModal from '@/components/molecules/popup/material/BulkDeleteMaterialModal'
import CreateMaterialModal from '@/components/molecules/popup/material/CreateMaterialModal'
import DeleteMaterialModal from '@/components/molecules/popup/material/DeleteMaterialModal'
import EditMaterialModal from '@/components/molecules/popup/material/EditMaterialModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { materialColumns } from '@/constants/columns/material-columns'
import { Material } from '@/types/material/material-list'

const ClassContent = () => {
  // Zustand Store
  const { selectedClass } = useClassStore()

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
  const [selectedData, setSelectedData] = useState<Material | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Get Material List
  const { data: materials, isLoading: materialsLoading } = useGetMaterialList(
    {
      class_id: selectedClass as number,
      page,
      per_page: perPage,
      search
    },
    {
      enabled: !!selectedClass
    }
  )

  // Get Class Count
  const { data: count, isLoading: countLoading } = useGetMaterialCount(
    {
      class_id: selectedClass as number
    },
    {
      enabled: !!selectedClass
    }
  )

  const handleEditModal = (modalOpen: boolean, id?: number) => {
    setOpenEditModal(modalOpen)
    setSelectedData(materials?.data.find((material) => material.id === id) ?? null)
  }

  const handleDeleteModal = (modalOpen: boolean, id?: number) => {
    setOpenDeleteModal(modalOpen)
    setSelectedData(materials?.data.find((material) => material.id === id) ?? null)
  }

  const handleBulkDeleteModal = (modalOpen: boolean, ids?: number[]) => {
    setSelectedIds(materials?.data.filter((cls, idx) => ids?.includes(idx)).map((cls) => cls.id) ?? [])
    setOpenBulkDeleteModal(modalOpen)
  }

  return (
    <>
      <div>
        <p>Data Mata Pelajaran</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <CardStatistic
          title="Total Mata Pelajaran"
          value={selectedClass ? count?.data.count : '-'}
          icon={School}
          variant="primary"
          isLoading={countLoading}
        />

        {/* datatable */}
        <DataTable
          columns={materialColumns}
          data={materials?.data ?? []}
          placeholder="Cari Mata Pelajaran"
          filter={
            <>
              <ClassCombobox />
            </>
          }
          setSearch={setSearch}
          pagination={materials?.meta.pagination}
          setPage={setPage}
          setPerPage={setPerPage}
          isLoading={materialsLoading}
          setOpenEditModal={handleEditModal}
          setOpenDeleteModal={handleDeleteModal}
          setOpenBulkDeleteModal={handleBulkDeleteModal}
          action={
            <>
              <Button onClick={() => setOpenCreateModal(true)} disabled={!selectedClass}>
                <PlusIcon className="h-4 w-4" />
                Tambah Data
              </Button>
            </>
          }
        />
      </div>
      <CreateMaterialModal
        materialKey={{
          class_id: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
        openModal={openCreateModal}
        setOpen={setOpenCreateModal}
      />
      <EditMaterialModal
        data={selectedData}
        openModal={openEditModal}
        setOpen={setOpenEditModal}
        materialKey={{
          class_id: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
      />
      <DeleteMaterialModal
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedData?.id as number}
        materialKey={{
          class_id: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
      />
      <BulkDeleteMaterialModal
        openModal={openBulkDeleteModal}
        setOpen={setOpenBulkDeleteModal}
        ids={selectedIds}
        materialKey={{
          class_id: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
      />
    </>
  )
}

export default ClassContent
