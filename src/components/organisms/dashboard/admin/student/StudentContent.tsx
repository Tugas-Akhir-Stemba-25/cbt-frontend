'use client'

import React, { useEffect, useState } from 'react'

import { PlusIcon, Users } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { useStudentCount } from '@/http/student/get-student-count'
import { useGetStudentList } from '@/http/student/get-student-list'

import useClassStore from '@/stores/useClassStore'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import ClassCombobox from '@/components/atoms/combobox/ClassCombobox'
import BulkDeleteStudentModal from '@/components/molecules/popup/student/BulkDeleteStudentModal'
import CreateStudentModal from '@/components/molecules/popup/student/CreateStudentModal'
import DeleteStudentModal from '@/components/molecules/popup/student/DeleteStudentModal'
import EditStudentModal from '@/components/molecules/popup/student/EditStudentModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { studentColumns } from '@/constants/columns/student-columns'
import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { Student } from '@/types/student/student-list'

const StudentContent = () => {
  const { selectedClass } = useClassStore()

  const [search, setSearch] = useDebounceValue<string>('', 250)
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  const { data: studentCount, isLoading: studentCountLoading } = useStudentCount({
    enabled: !!selectedClass
  })
  const { data: students, isLoading: studentLoading } = useGetStudentList(
    {
      per_page: perPage,
      classId: selectedClass as number,
      search,
      page
    },
    {
      enabled: !!selectedClass
    }
  )

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState<boolean>(false)

  const [selectedData, setSelectedData] = useState<Student | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleEditModal = (modalOpen: boolean, id?: number) => {
    setOpenEditModal(modalOpen)
    setSelectedData(students?.data.find((student) => student.id === id) ?? null)
  }

  const handleDeleteModal = (modalOpen: boolean, id?: number) => {
    setOpenDeleteModal(modalOpen)
    setSelectedData(students?.data.find((student) => student.id === id) ?? null)
  }
  const handleBulkDeleteModal = (modalOpen: boolean, ids?: number[]) => {
    setOpenBulkDeleteModal(modalOpen)
    setSelectedIds(students?.data.filter((cls, idx) => ids?.includes(idx)).map((cls) => cls.id) ?? [])
  }

  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Master Data', href: '/dashboard/admin' },
      { label: 'Siswa', href: '/dashboard/admin/siswa' }
    ])
  }, [])

  const cardColors = ['secondary', 'destructive', 'biru', 'success']
  const colorClasses: Record<string, string> = {
    secondary: 'text-secondary',
    destructive: 'text-destructive',
    biru: 'text-blue-500',
    success: 'text-success'
  }

  const studentCountByYear = studentCount?.data.count.per_year.slice(-4)

  return (
    <>
      <div>
        <p>Data Siswa</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <CardStatistic
          title="Total Siswa"
          value={studentCount?.data.count.total ?? 0}
          icon={Users}
          variant="primary"
          isLoading={studentCountLoading}
        />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {studentCountByYear?.map((item: any, index) => (
            <div
              key={item.year_group}
              className={`flex justify-between rounded-xl border-2 border-solid p-5 shadow-md`}
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm">Siswa masuk tahun {item.year_group}</p>
                <span className={`text-3xl font-semibold ${colorClasses[cardColors[index]]}`}>{item.count}</span>
              </div>
              <div className="icon">
                <Users size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* datatable */}
        <div className="overflow-x-auto">
          <DataTable
            columns={studentColumns}
            data={students?.data ?? []}
            setSearch={setSearch}
            setPage={setPage}
            setPerPage={setPerPage}
            pagination={students?.meta.pagination}
            isLoading={studentLoading}
            setOpenEditModal={handleEditModal}
            setOpenDeleteModal={handleDeleteModal}
            setOpenBulkDeleteModal={handleBulkDeleteModal}
            placeholder="Cari dari nama, kelas, atau tahun masuk"
            filter={
              <>
                <ClassCombobox />
              </>
            }
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
      </div>

      <EditStudentModal
        data={selectedData}
        openModal={openEditModal}
        setOpen={setOpenEditModal}
        studentKey={{
          classId: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
      />

      <BulkDeleteStudentModal
        openModal={openBulkDeleteModal}
        setOpen={setOpenBulkDeleteModal}
        studentKey={{
          classId: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
        ids={selectedIds}
      />

      <DeleteStudentModal
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        studentKey={{
          classId: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
        id={selectedData?.id as number}
      />
      <CreateStudentModal
        openModal={openCreateModal}
        setOpen={setOpenCreateModal}
        studentKey={{
          classId: selectedClass as number,
          page,
          per_page: perPage,
          search
        }}
      />
    </>
  )
}

export default StudentContent
