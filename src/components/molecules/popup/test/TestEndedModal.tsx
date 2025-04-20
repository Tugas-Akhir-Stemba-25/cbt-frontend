import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useGetWorkDetail } from '@/http/work/get-work-detail'

import useWorkHashStore from '@/stores/useWorkHashStore'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface TestEndedModalProps {}

const TestEndedModal = ({}: TestEndedModalProps) => {
  const [open, setOpen] = useState(false)

  const { hash } = useWorkHashStore()

  const { data, isLoading, isFetched } = useGetWorkDetail(
    {
      hash: hash as string
    },
    {
      enabled: !!hash
    }
  )

  useEffect(() => {
    if (data?.data && !isLoading && isFetched && data.data.status === '3') {
      setOpen(true)
    }
  }, [data, isLoading, isFetched])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">Ujian telah dikerjakan</AlertDialogTitle>
          <div className="flex w-full justify-center">
            <Image
              alt="akhiri ujian"
              src={'/assets/images/exam-finish.svg'}
              width={300}
              height={300}
              className="w-1/4"
            />
          </div>
          <div className="flex flex-col gap-5 text-sm text-foreground">
            <p>Ujian telah dikerjakan, silahkan klik tombol dibawah untuk melihat hasil ujian.</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <Button disabled={!hash} className="w-full" asChild>
            <Link href={`/dashboard/student/work/${hash}`}>Lihat Hasil</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TestEndedModal
