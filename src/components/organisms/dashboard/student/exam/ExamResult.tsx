'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { useGetStudentTestDetailByHash } from '@/http/test/get-student-test-detail-by-hash'
import { useGetWorkResult } from '@/http/work/get-work-result'

import { formatSeconds } from '@/utils/time'

import CardExamResultNumber from '@/components/atoms/card/CardExamResultNumber'
import CardExamResultStatistic from '@/components/atoms/card/CardExamResultStatistic'

import ExamDetailCard from '../../../../atoms/card/ExamDetailCard'
import { ExamDetailSkeleton } from './ExamDetail'

interface ExamResultProps {
  hash: string
}

const ExamResult = ({ hash }: ExamResultProps) => {
  const router = useRouter()

  const { data: testDetail, isLoading: isTestDetailLoading } = useGetStudentTestDetailByHash(
    {
      hash
    },
    {
      enabled: !!hash
    }
  )

  const {
    data: workResult,
    isLoading: workResultLoading,
    isFetched: workResultFetched
  } = useGetWorkResult(
    {
      hash
    },
    {
      enabled: !!hash
    }
  )

  useEffect(() => {
    if (!workResultLoading && workResultFetched && workResult?.data.status && workResult?.data.status != 3) {
      toast.error('Error', {
        description: 'Ujian belum selesai dikerjakan'
      })
      router.push(`/dashboard/student/exam/${testDetail?.data.id}`)
    }
  }, [workResult, testDetail, workResultLoading, workResultFetched, router])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link href="/dashboard/student/exam" className="text-subtle flex items-center gap-2 text-sm">
          <ArrowLeft className="text-subtle h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-[18px] font-semibold">Hasil Ujian</h3>
        {isTestDetailLoading ? (
          <ExamDetailSkeleton />
        ) : (
          testDetail?.data && <ExamDetailCard withBadge={false} data={testDetail.data} />
        )}
        <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
          {workResult?.data.is_show_grade && (
            <CardExamResultStatistic
              variant="primary"
              label="Nilai"
              percent={workResult?.data.grade ?? 0}
              value={workResult?.data.grade ?? 0}
              footer={<p className="text-sm text-muted">Poin keseluruhan : 100</p>}
            />
          )}
          <CardExamResultStatistic
            variant="success"
            label="Waktu"
            percent={((workResult?.data.working_time ?? 0) / (workResult?.data.duration ?? 1)) * 100}
            value={formatSeconds(workResult?.data.working_time ?? 0, true)}
            footer={
              <p className="text-sm text-muted">
                Rata-rata {((workResult?.data.working_time ?? 0) / (testDetail?.data.question_count ?? 1)).toFixed(2)}{' '}
                detik/soal
              </p>
            }
          />
          <CardExamResultStatistic
            variant="secondary"
            label="Ditandai"
            percent={((workResult?.data.flagged ?? 0) / (workResult?.data.answered ?? 1)) * 100}
            value={workResult?.data.flagged ?? 0}
            footer={
              <div className="flex w-full items-center justify-between text-sm text-muted">
                <p>Ditandai: {workResult?.data.flagged}</p>
                <p>Dijawab: {workResult?.data.total}</p>
              </div>
            }
          />
          {workResult?.data.is_show_answer ? (
            <CardExamResultStatistic
              variant="destructive"
              label="Total Soal"
              percent={((workResult?.data.correct_answer ?? 0) / (workResult?.data.total ?? 1)) * 100}
              value={workResult?.data.total ?? 0}
              footer={
                <div className="flex w-full items-center justify-between text-sm text-muted">
                  <p>Benar: {workResult?.data.correct_answer}</p>
                  <p>Salah: {workResult?.data.total - (workResult?.data.correct_answer ?? 0)}</p>
                </div>
              }
            />
          ) : (
            <CardExamResultStatistic
              variant="destructive"
              label="Total Soal"
              percent={((workResult?.data.answered ?? 0) / (workResult?.data.total ?? 1)) * 100}
              value={workResult?.data.answered ?? 0}
              footer={
                <div className="flex w-full items-center justify-between text-sm text-muted">
                  <p>Dijawab: {workResult?.data.answered}</p>
                  <p>Tidak dijawab: {workResult?.data.not_answered}</p>
                </div>
              }
            />
          )}
        </div>
        <CardExamResultNumber hash={hash} />
      </div>
    </div>
  )
}

export default ExamResult
