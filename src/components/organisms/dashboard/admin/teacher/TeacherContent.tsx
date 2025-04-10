'use client'

import { useEffect, useState } from 'react'

import { PlusIcon, Users } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { useGetTeacherCount } from '@/http/teachers/get-teacher-count'
import { useGetTeacherList } from '@/http/teachers/get-teacher-list'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import BulkDeleteTeacherModal from '@/components/molecules/popup/teacher/BulkDeleteTeacherModal'
import CreateTeacherModal from '@/components/molecules/popup/teacher/CreateTeacherModal'
import DeleteTeacherDialog from '@/components/molecules/popup/teacher/DeleteTeacherModal'
import EditTeacherDialog from '@/components/molecules/popup/teacher/EditTeacherModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { teacherColumns } from '@/constants/columns/teacher-columns'
import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { Teacher } from '@/types/teacher/teacher'

export default function TeacherContent() {
  const [search, setSearch] = useDebounceValue<string>('', 250)
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  // panggil API dengan parameter terbaru
  const { data: teachers, isLoading: teacherLoading } = useGetTeacherList({
    per_page: perPage,
    search,
    page
  })

  const [selectedData, setSelectedData] = useState<Teacher | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // count teacher
  const { data: teacherCount, isLoading: teacherCountLoading } = useGetTeacherCount()

  //modal handler
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState<boolean>(false)

  const handleDeleteModal = (modalOpen: boolean, id?: number) => {
    setSelectedData(teachers?.data.find((major) => major.id === id) ?? null)
    setOpenDeleteModal(modalOpen)
  }

  const handleEditModal = (modalOpen: boolean, id?: number) => {
    setSelectedData(teachers?.data.find((teacher) => teacher.id === id) ?? null)
    setOpenEditModal(modalOpen)
  }

  const handleBulkDeleteModal = (modalOpen: boolean, ids?: number[]) => {
    setSelectedIds(teachers?.data.filter((teacher) => ids?.includes(teacher.id)).map((teacher) => teacher.id) ?? [])
    setOpenBulkDeleteModal(modalOpen)
  }

  // Breadcrumb dan columns tidak berubah
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Master Data', href: '/dashboard/admin' },
      { label: 'Guru', href: '/dashboard/admin/guru' }
    ])
  }, [setBreadcrumbs])

  return (
    <>
      <div>
        <p>Data Guru</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <CardStatistic
          title="Total Guru"
          value={teacherCount?.data.count ?? 0}
          icon={Users}
          variant="primary"
          isLoading={teacherCountLoading}
        />

        {/* datatable */}
        <DataTable
          columns={teacherColumns}
          data={teachers?.data ?? []}
          isLoading={teacherLoading}
          placeholder="Cari Guru"
          setSearch={setSearch}
          pagination={teachers?.meta?.pagination}
          setPage={setPage}
          setPerPage={setPerPage}
          setOpenDeleteModal={handleDeleteModal}
          setOpenEditModal={handleEditModal}
          setOpenBulkDeleteModal={handleBulkDeleteModal}
          action={
            <>
              <Button onClick={() => setOpenCreateModal(true)}>
                <PlusIcon className="h-4 w-4" />
                Tambah Data
              </Button>
            </>
          }
        />
      </div>
      <CreateTeacherModal
        openModal={openCreateModal}
        setOpen={setOpenCreateModal}
        teacherKey={{ page, per_page: perPage, search }}
      />

      <DeleteTeacherDialog
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedData?.id as number}
        teacherKey={{ page, per_page: perPage, search }}
        expectedUsn={selectedData?.username as string}
      />

      <EditTeacherDialog
        openModal={openEditModal}
        setOpen={setOpenEditModal}
        teacherKey={{ page, per_page: perPage, search }}
        data={selectedData as Teacher}
      />

      <BulkDeleteTeacherModal
        setOpen={setOpenBulkDeleteModal}
        ids={selectedIds}
        openModal={openBulkDeleteModal}
        teacherKey={{ page, per_page: perPage, search }}
      />
    </>
  )
}
