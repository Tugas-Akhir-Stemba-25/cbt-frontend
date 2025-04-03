'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateTest } from '@/http/test/create-test'

import useMaterialStore from '@/stores/useMaterialStore'

import { testDetailSchema, TestDetailType } from '@/validators/test/test-detail-validator'
import { testSettingSchema, TestSettingType } from '@/validators/test/test-setting-validator'

import { TabsContent } from '@/components/ui/tabs'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { CreateTestForm } from '@/types/test/test'

import ExamDetailForm from './ExamDetailForm'
import ExamSettingForm from './ExamSettingForm'
import ExamCreateTabs from './ExamTabs'

const ExamCreate = () => {
  // Router
  const router = useRouter()

  const { selectedMaterial } = useMaterialStore()

  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  // Tab Value
  const [tab, setTab] = useState<string>('detail')

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
  const { mutate: createTest, isPending: createTestPending } = useCreateTest({
    onSuccess: (data) => {
      formDetail.reset()
      formSetting.reset()
      setTab('detail')
      toast.success('Sukses', {
        description: data.meta.message
      })
      router.push(`/dashboard/admin/exam/${data.data.id}/edit`)
    },
    onError: () => {
      toast.error('Gagal', {
        description: 'Gagal membuat data ujian'
      })
    }
  })

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Master Data',
        href: '/dashboard/admin'
      },
      {
        label: 'Ujian',
        href: '/dashboard/admin/exam'
      },
      {
        label: 'Buat Ujian',
        href: '/dashboard/admin/exam/create'
      }
    ])
  }, [setBreadcrumbs])

  // Submit Handler
  const onSubmit = async () => {
    const detail = formDetail.getValues()
    const setting = formSetting.getValues()
    const payload: CreateTestForm = {
      name: detail.name,
      is_show_grade: setting.is_show_grade,
      is_show_answer: setting.is_show_answer,
      is_randomize_question: setting.is_randomize_question,
      is_randomize_answer: setting.is_randomize_answer,
      start_time: new Date(`${detail.date} ${detail.start_time}`).toISOString(),
      end_time: new Date(`${detail.date} ${detail.end_time}`).toISOString()
    }

    createTest({
      form: payload,
      material_id: selectedMaterial as number
    })
  }

  const handleSubmitDetail = () => {
    setTab('settings')
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <Link href="/dashboard/admin/exam" className="flex items-center gap-2 text-sm text-[#4B5563]">
          <ArrowLeft className="h-4 w-4 text-[#4B5563]" />
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-[18px] font-semibold">Buat Ujian</h3>
        <ExamCreateTabs
          activeTab={tab}
          setTab={setTab}
          trigger={[
            { label: 'Detail Ujian', value: 'detail' },
            { label: 'Pengaturan Ujian', value: 'settings', disabled: !formDetail.formState.isValid }
          ]}
          content={
            <>
              <TabsContent value="detail">
                <ExamDetailForm form={formDetail} onSubmit={handleSubmitDetail} />
              </TabsContent>
              <TabsContent value="settings">
                <ExamSettingForm form={formSetting} onSubmit={onSubmit} submitLoading={createTestPending} />
              </TabsContent>
            </>
          }
        />
      </div>
    </div>
  )
}

export default ExamCreate
