'use client'

import { useEffect, useState } from 'react'

import { GraduationCap, PlusIcon } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

import { useGetMajorCount } from '@/http/major/get-major-count'
import { useGetMajorList } from '@/http/major/get-major-list'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import { majorColumns } from '@/components/constants/columns/major-columns'
import EditMajorModal from '@/components/molecules/popup/major/EditMajorModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { Major } from '@/types/major/major-list'

export default function MajorContent() {
  // Table State
  const [search, setSearch] = useDebounceValue<string>('', 250)
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  // Modal State
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  // Selected Data
  const [selectedData, setSelectedData] = useState<Major | null>(null)

  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  // Get Major Count
  const { data: majorCount, isLoading: majorCountLoading } = useGetMajorCount()

  // Get Major List
  const { data: majors, isLoading: majorsLoading } = useGetMajorList({
    per_page: perPage,
    search,
    page
  })

  // Handle Edit Modal
  const handleEditModal = (modalOpen: boolean, id?: number) => {
    setSelectedData(majors?.data.find((major) => major.id === id) ?? null)
    setOpenEditModal(modalOpen)
  }

  // Set breadcrumb
  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Dashboard',
        href: '/dashboard'
      },
      {
        label: 'Jurusan',
        href: '/dashboard/admin/major'
      }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <p>Data Jurusan</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <CardStatistic
          title="Total Jurusan"
          value={majorCount?.data.count}
          icon={GraduationCap}
          variant="primary"
          isLoading={majorCountLoading}
        />

        {/* datatable */}
        <DataTable
          columns={majorColumns}
          data={majors?.data ?? []}
          placeholder="Cari Jurusan"
          setSearch={setSearch}
          pagination={majors?.meta.pagination}
          setPage={setPage}
          setPerPage={setPerPage}
          isLoading={majorsLoading}
          setOpenEditModal={handleEditModal}
          action={
            <>
              <Button>
                <PlusIcon className="h-4 w-4" />
                Tambah Data
              </Button>
            </>
          }
        />
      </div>
      <EditMajorModal
        data={selectedData as Major}
        openModal={openEditModal}
        setOpen={setOpenEditModal}
        majorKey={{ page, per_page: perPage, search }}
      />
    </>
  )
}
