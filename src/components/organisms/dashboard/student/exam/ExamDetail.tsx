'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ArrowLeft, Calendar, Clock, Files, User } from 'lucide-react'

import { useGetStudentTestDetail } from '@/http/test/get-student-test-detail'

import { formatSeconds } from '@/utils/time'

import TestStatusBadge from '@/components/atoms/column/badge/TestStatusBadge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

interface ExamDetailProps {
  id: number
}

const ExamDetail = ({ id: testId }: ExamDetailProps) => {
  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Ujian',
        href: '/dashboard/student/exam'
      },
      {
        label: 'Detail Ujian',
        href: `/dashboard/student/exam/${testId}`
      }
    ])
  }, [setBreadcrumbs, testId])

  // Fetch data here using id
  const { data: testDetail, isLoading } = useGetStudentTestDetail(
    { id: testId },
    {
      enabled: !!testId
    }
  )

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link href="/dashboard/student/exam" className="flex items-center gap-2 text-sm text-[#4B5563]">
          <ArrowLeft className="h-4 w-4 text-[#4B5563]" />
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-[18px] font-semibold">Detail Ujian</h3>
        {isLoading ? (
          <ExamDetailSkeleton />
        ) : (
          <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-[rgba(3,7,18,0.10)] p-5">
            <div className="space-y-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold md:text-2xl">{testDetail?.data.name}</h1>
                <TestStatusBadge status={testDetail?.data.status ?? 1} />
              </div>
              <p className="text-lg">{testDetail?.data.material.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm @lg:grid-cols-2">
              <p className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{testDetail?.data.material.teaching_teacher}</span>
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{formatSeconds(testDetail?.data.duration || 0, true)}</span>
              </p>
              <p className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(testDetail?.data.start_time || ''), 'dd MMMM yyyy, HH:mm', {
                    locale: id
                  })}
                </span>
              </p>
              <p className="flex items-center">
                <Files className="mr-2 h-4 w-4" />
                <span>{testDetail?.data.question_count} Soal</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        {testDetail?.data.history ? (
          <Button disabled={testDetail?.data.status === 1} asChild={testDetail?.data.status !== 1}>
            <Link href={`/dashboard/student/works/${testDetail.data.history.hash}`}>
              {testDetail.data.history.status === 2 ? 'Lanjut Kerjakan' : 'Lihat Hasil'}
            </Link>
          </Button>
        ) : (
          <Button disabled={testDetail?.data.status !== 2} asChild={testDetail?.data.status === 2}>
            <Link href={`/dashboard/student/exam/${testId}/start`}>
              {testDetail?.data.status === 2
                ? 'Kerjakan'
                : testDetail?.data.status === 3
                  ? 'Ujian Sudah Selesai'
                  : 'Ujian Belum Dimulai'}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export const ExamDetailSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-[rgba(3,7,18,0.10)] p-5">
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3 md:h-8" /> {/* Judul */}
        <Skeleton className="h-6 w-1/4" /> {/* Nama materi */}
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <Skeleton className="col-span-1 h-6 w-full" /> {/* Guru Pengampu */}
        <Skeleton className="col-span-1 h-6 w-full" /> {/* Durasi */}
        <Skeleton className="col-span-1 h-6 w-full" /> {/* Tanggal */}
        <Skeleton className="col-span-1 h-6 w-full" /> {/* Jumlah soal */}
      </div>
    </div>
  )
}

export default ExamDetail
