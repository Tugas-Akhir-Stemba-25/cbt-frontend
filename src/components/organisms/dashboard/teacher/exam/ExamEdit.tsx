'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebounceValue } from 'usehooks-ts'

import { getTestDetailKey, useGetTestDetail } from '@/http/test/get-test-detail'
import { useGetQuestionList } from '@/http/test/question/get-question-list'
import { useUpdateTest } from '@/http/test/update-test'

import useMaterialStore from '@/stores/useMaterialStore'

import { testDetailSchema, TestDetailType } from '@/validators/test/test-detail-validator'
import { testSettingSchema, TestSettingType } from '@/validators/test/test-setting-validator'

import BulkDeleteQuestionModal from '@/components/molecules/popup/question/BulkDeleteQuestionModal'
import DeleteQuestionModal from '@/components/molecules/popup/question/DeleteQuestionModal'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'
import { TabsContent } from '@/components/ui/tabs'

import { questionColumns } from '@/constants/columns/question-columns'
import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { QuestionList } from '@/types/question/question'
import { UpdateTestForm } from '@/types/test/test'

import ExamDetailForm from './ExamDetailForm'
import ExamSettingForm from './ExamSettingForm'
import ExamCreateTabs from './ExamTabs'

interface ExamEditProps {
  id: number
}

const ExamEdit = ({ id }: ExamEditProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Router
  const router = useRouter()

  // Modal State
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState<boolean>(false)

  // Selected Data
  const [selectedData, setSelectedData] = useState<QuestionList | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Zustand Store
  const { setSelectedMaterial } = useMaterialStore()

  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  // Tab Value
  const [tab, setTab] = useState<string>('detail')

  // Table State
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  // Form
  const formDetail = useForm<TestDetailType>({
    defaultValues: {
      name: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      start_time: '',
      end_time: '',
      duration: 0,
      material: 0
      // Set default end time to 1 hour from now
    },
    mode: 'onChange',
    resolver: zodResolver(testDetailSchema)
  })

  const formSetting = useForm<TestSettingType>({
    mode: 'onChange',
    defaultValues: {
      is_randomize_answer: false,
      is_randomize_question: false,
      is_show_answer: false,
      is_show_grade: false
    },
    resolver: zodResolver(testSettingSchema)
  })

  // Mutation Create
  const { mutate: updateTest, isPending: updateTestPending } = useUpdateTest({
    onSuccess: (data) => {
      toast.success('Sukses', {
        description: data.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getTestDetailKey({ testId: id })
      })
    },
    onError: () => {
      toast.error('Gagal', {
        description: 'Gagal memperbarui data ujian'
      })
    }
  })

  const { data: test, isLoading: testLoading } = useGetTestDetail({
    testId: id
  })

  const { data: question, isLoading: questionLoading } = useGetQuestionList({
    testId: id,
    page,
    per_page: perPage
  })

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Master Data',
        href: '/dashboard/teacher'
      },
      {
        label: 'Ujian',
        href: '/dashboard/teacher/exam'
      },
      {
        label: 'Edit Ujian',
        href: `/dashboard/teacher/exam/${id}/edit`
      }
    ])
  }, [setBreadcrumbs, id])

  useEffect(() => {
    if (test && !testLoading) {
      formDetail.reset({
        name: test?.data.name,
        date: format(new Date(test?.data.start_time as string), 'yyyy-MM-dd'),
        start_time: format(new Date(test?.data.start_time as string), 'HH:mm:ss'),
        end_time: format(new Date(test?.data.end_time as string), 'HH:mm:ss'),
        duration: test?.data.duration,
        material: test?.data.material.id
      })
      formSetting.reset({
        is_randomize_answer: test.data.is_randomize_answer,
        is_randomize_question: test.data.is_randomize_question,
        is_show_answer: test.data.is_show_answer,
        is_show_grade: test.data.is_show_grade
      })
      setSelectedMaterial(test?.data.material.id as number)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, testLoading])

  // Submit Handler
  const onSubmit = async () => {
    const setting = formSetting.getValues()
    const payload: UpdateTestForm = {
      is_show_grade: setting.is_show_grade,
      is_show_answer: setting.is_show_answer,
      is_randomize_question: setting.is_randomize_question,
      is_randomize_answer: setting.is_randomize_answer
    }

    updateTest({
      form: payload,
      test_id: id
    })
  }

  const handleSubmitDetail = () => {
    const detail = formDetail.getValues()

    const payload: UpdateTestForm = {
      name: detail.name,
      start_time: new Date(`${detail.date} ${detail.start_time}`).toISOString(),
      end_time: new Date(`${detail.date} ${detail.end_time}`).toISOString(),
      material_id: detail.material
    }

    updateTest({
      form: payload,
      test_id: id
    })
  }

  const handleEdit = (_open: boolean, questionId: number) => {
    router.push(`/dashboard/teacher/exam/${id}/question/${questionId}/edit`)
  }

  const handleDeleteModal = (modalOpen: boolean, id?: number) => {
    setOpenDeleteModal(modalOpen)
    setSelectedData(question?.data.find((question) => question.id === id) ?? null)
  }

  const handleBulkDeleteModal = (modalOpen: boolean, ids?: number[]) => {
    setSelectedIds(question?.data.filter((cls, idx) => ids?.includes(idx)).map((cls) => cls.id) ?? [])
    setOpenBulkDeleteModal(modalOpen)
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        <div>
          <Link href="/dashboard/teacher/exam" className="text-subtle flex items-center gap-2 text-sm">
            <ArrowLeft className="text-subtle h-4 w-4" />
            Back
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="text-[18px] font-semibold">Edit Ujian</h3>
          <ExamCreateTabs
            activeTab={tab}
            setTab={setTab}
            trigger={[
              { label: 'Detail Ujian', value: 'detail' },
              { label: 'Pengaturan Ujian', value: 'settings' },
              { label: 'Dokumen Soal', value: 'questions' }
            ]}
            content={
              <>
                <TabsContent value="detail">
                  <ExamDetailForm
                    isEdit={true}
                    form={formDetail}
                    onSubmit={handleSubmitDetail}
                    fetchLoading={testLoading}
                    submitLoading={updateTestPending}
                  />
                </TabsContent>
                <TabsContent value="settings">
                  <ExamSettingForm
                    form={formSetting}
                    onSubmit={onSubmit}
                    submitLoading={updateTestPending}
                    isEdit={true}
                  />
                </TabsContent>
                <TabsContent value="questions">
                  <DataTable
                    columns={questionColumns}
                    withSearch={false}
                    data={question?.data ?? []}
                    isLoading={questionLoading}
                    placeholder="Cari Soal"
                    showDetail={false}
                    setSearch={() => {}}
                    pagination={question?.meta.pagination}
                    setPage={setPage}
                    setOpenEditModal={handleEdit}
                    setPerPage={setPerPage}
                    setOpenDeleteModal={handleDeleteModal}
                    setOpenBulkDeleteModal={handleBulkDeleteModal}
                    action={
                      <>
                        <Button asChild>
                          <Link href={`/dashboard/teacher/exam/${id}/question/create`} className="btn-primary">
                            Tambah Soal
                          </Link>
                        </Button>
                      </>
                    }
                  />
                </TabsContent>
              </>
            }
          />
        </div>
      </div>
      <DeleteQuestionModal
        questionKey={{
          testId: id,
          page,
          per_page: perPage
        }}
        openModal={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedData?.id as number}
      />
      <BulkDeleteQuestionModal
        questionKey={{
          testId: id,
          page,
          per_page: perPage
        }}
        openModal={openBulkDeleteModal}
        setOpen={setOpenBulkDeleteModal}
        ids={selectedIds}
      />
    </>
  )
}

export default ExamEdit
