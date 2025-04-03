'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { PlusIcon, School } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { useGetTestCount } from '@/http/test/get-test-count'
import { useGetTestList } from '@/http/test/get-test-list'

import useMaterialStore from '@/stores/useMaterialStore'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import MaterialCombobox from '@/components/atoms/combobox/MaterialCombobox'
import BulkDeleteClassModal from '@/components/molecules/popup/class/BulkDeleteClassModal'
import DeleteClassModal from '@/components/molecules/popup/class/DeleteClassModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { testColumns } from '@/constants/columns/test-columns'
import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { Test } from '@/types/test/test-list'

const ExamContent = () => {
  const router = useRouter()

  // Zustand Store
  const { selectedMaterial } = useMaterialStore()

  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  // Table State
  const [search, setSearch] = useDebounceValue<string>('', 250)
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  // Modal State
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState<boolean>(false)

  // Selected Data
  const [selectedData, setSelectedData] = useState<Test | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Get Class
  const { data: exams, isLoading: examsLoading } = useGetTestList(
    {
      material_id: selectedMaterial as number,
      search,
      page,
      per_page: perPage
    },
    {
      enabled: !!selectedMaterial
    }
  )

  // Get Class Count
  const { data: count, isLoading: countLoading } = useGetTestCount(
    {
      material_id: selectedMaterial as number
    },
    {
      enabled: !!selectedMaterial
    }
  )

  const handleEditModal = (_modalOpen: boolean, id?: number) => {
    router.push(`/dashboard/admin/exam/${id}/edit`)
  }

  const handleDeleteModal = (modalOpen: boolean, id?: number) => {
    setOpenDeleteModal(modalOpen)
    setSelectedData(exams?.data.find((classData) => classData.id === id) ?? null)
  }

  const handleBulkDeleteModal = (modalOpen: boolean, ids?: number[]) => {
    setSelectedIds(exams?.data.filter((cls, idx) => ids?.includes(idx)).map((cls) => cls.id) ?? [])
    setOpenBulkDeleteModal(modalOpen)
  }

  const handleDetail = (_modelOpen: boolean, id?: number) => {
    router.push(`/dashboard/admin/exam/${id}`)
  }

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Master Data',
        href: '/dashboard/admin'
      },
      {
        label: 'Ujian',
        href: '/dashboard/admin/exam'
      }
    ])
  }, [setBreadcrumbs])

  return (
    <>
      <div>
        <p>Data Ujian</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <CardStatistic
          title="Total Ujian"
          value={selectedMaterial ? count?.data.count : '-'}
          icon={School}
          variant="primary"
          isLoading={countLoading}
        />

        {/* datatable */}
        <DataTable
          columns={testColumns}
          data={exams?.data ?? []}
          placeholder="Cari Ujian"
          showDetail={true}
          setOpenDetailModal={handleDetail}
          filter={
            <>
              <MaterialCombobox />
            </>
          }
          setSearch={setSearch}
          pagination={exams?.meta.pagination}
          setPage={setPage}
          setPerPage={setPerPage}
          isLoading={examsLoading}
          setOpenEditModal={handleEditModal}
          setOpenDeleteModal={handleDeleteModal}
          setOpenBulkDeleteModal={handleBulkDeleteModal}
          action={
            <>
              <Button asChild>
                <Link href={`/dashboard/admin/exam/create`}>
                  <PlusIcon className="h-4 w-4" />
                  Tambah Data
                </Link>
              </Button>
            </>
          }
        />
      </div>
      <DeleteClassModal
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedData?.id as number}
        classKey={{
          major_id: selectedMaterial as number,
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
          major_id: selectedMaterial as number,
          page,
          per_page: perPage,
          search
        }}
      />
    </>
  )
}

export default ExamContent
