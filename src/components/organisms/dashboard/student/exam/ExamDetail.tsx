'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { useGetStudentTestDetail } from '@/http/test/get-student-test-detail'
import { useStartTest } from '@/http/test/start-test'

import ExamDetailCard from '@/components/atoms/card/ExamDetailCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

interface ExamDetailProps {
  id: number
}

const ExamDetail = ({ id: testId }: ExamDetailProps) => {
  const router = useRouter()

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

  // Mutation
  const { mutate: startTest, isPending: startTestLoading } = useStartTest({
    onSuccess: (data) => {
      router.push(`/works/${data.data.hash}`)
    },
    onError: (error) => {
      console.error('Error starting test:', error)

      toast.error('Error', {
        description: error.response?.data.error || error.response?.data.message
      })
    }
  })

  const handleStartTest = () => {
    if (testDetail?.data.status === 2) {
      startTest({ testId })
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link href="/dashboard/student/exam" className="text-subtle flex items-center gap-2 text-sm">
          <ArrowLeft className="text-subtle h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-[18px] font-semibold">Detail Ujian</h3>
        {isLoading ? (
          <ExamDetailSkeleton />
        ) : isLoading ? (
          <ExamDetailSkeleton />
        ) : (
          testDetail?.data && <ExamDetailCard withBadge={false} data={testDetail.data} />
        )}
      </div>
      <div className="flex justify-center">
        {testDetail?.data.history ? (
          testDetail.data.history.status === 2 ? (
            <Button disabled={testDetail?.data.status === 1} asChild={testDetail?.data.status !== 1}>
              <Link href={`/dashboard/student/works/${testDetail.data.history.hash}`}>Lanjut Kerjakan</Link>
            </Button>
          ) : (
            <Button disabled={testDetail?.data.status === 1} asChild={testDetail?.data.status !== 1}>
              <Link href={`/dashboard/student/work/${testDetail.data.history.hash}`}>Lanjut hasil</Link>
            </Button>
          )
        ) : testDetail?.data.status === 2 ? (
          <Button onClick={handleStartTest} isLoading={startTestLoading}>
            Kerjakan
          </Button>
        ) : (
          <Button disabled={true}>
            {testDetail?.data.status === 1 ? 'Ujian Belum Dimulai' : 'Ujian Sudah Selesai'}
          </Button>
        )}
      </div>
    </div>
  )
}

export const ExamDetailSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-neutral-800/10 p-5 dark:border-neutral-50/15">
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
