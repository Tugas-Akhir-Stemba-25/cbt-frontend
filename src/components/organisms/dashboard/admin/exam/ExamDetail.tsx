'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { ArrowLeft, Calendar, User } from 'lucide-react'

import { useGetTestDetail } from '@/http/test/get-test-detail'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

import ExamOverview from './ExamOverview'
import ExamResult from './ExamResult'
import { triggerClassName } from './ExamTabs'

interface ExamDetailProps {
  id: number
}

const statusMap: Record<
  number,
  {
    text: string
    variant: 'primary' | 'success' | 'destructive'
  }
> = {
  1: {
    text: 'Belum Dimulai',
    variant: 'destructive'
  },
  2: {
    text: 'Berlangsung',
    variant: 'primary'
  },
  3: {
    text: 'Selesai',
    variant: 'success'
  }
}

const ExamDetail = ({ id }: ExamDetailProps) => {
  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  const { data: detailTest } = useGetTestDetail({
    testId: id
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
        label: 'Detail Ujian',
        href: `/dashboard/admin/exam/${id}`
      }
    ])
  }, [setBreadcrumbs, id])

  return (
    <div className="flex flex-col gap-5 px-1 py-5 md:px-5">
      <div>
        <Link href="/dashboard/admin/exam" className="flex items-center gap-2 text-sm text-[#4B5563]">
          <ArrowLeft className="h-4 w-4 text-[#4B5563]" />
          Back
        </Link>
      </div>
      <Tabs className="flex w-full flex-col gap-6" defaultValue="overview">
        <div className="flex flex-col gap-8">
          <h3 className="text-base font-semibold md:text-lg">Detail Ujian</h3>
          <div className="flex h-full w-full flex-col gap-8 rounded-xl border border-[rgba(3,7,18,0.10)] p-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-end">
                {detailTest?.data.status && (
                  <Badge variant={statusMap[detailTest?.data.status as number].variant}>
                    {statusMap[detailTest?.data.status as number].text}
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-semibold md:text-2xl">{detailTest?.data.name}</h3>
              <h5 className="text-base md:text-lg">{detailTest?.data.material.name}</h5>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <p className="flex items-center gap-2">
                <User className="mr-2 inline h-4 w-4" />
                {detailTest?.data.material.teaching_teacher}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="mr-2 inline h-4 w-4" />
                {detailTest?.data?.start_time
                  ? new Date(detailTest?.data.start_time).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : '-'}
              </p>
            </div>
            <TabsList className="w-max justify-stretch rounded-none border-b border-disabled bg-transparent px-0 text-sm">
              <TabsTrigger value="overview" className={triggerClassName}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="question" className={triggerClassName}>
                Dokumen Soal
              </TabsTrigger>
              <TabsTrigger value="result" className={triggerClassName}>
                Hasil Ujian
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <div className="flex w-full rounded-xl border border-[rgba(3,7,18,0.10)] p-5">
          <TabsContent value="overview" className="mt-0 w-full p-0">
            <ExamOverview id={id} />
          </TabsContent>
          <TabsContent value="result" className="mt-0 w-full p-0">
            <ExamResult id={id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default ExamDetail
