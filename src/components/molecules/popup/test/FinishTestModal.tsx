import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface FinishTestModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isTimeout?: boolean
}

const FinishTestModal = ({ isOpen, onOpenChange, isTimeout = false }: FinishTestModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">
            {isTimeout ? 'Waktu Ujian Habis' : 'Selesaikan Ujian'}
          </AlertDialogTitle>
          <div className="flex w-full justify-center">
            <Image
              alt="akhiri ujian"
              src={isTimeout ? '/assets/images/time-limit.webp' : '/assets/images/exam-finish.svg'}
              width={300}
              height={300}
              className="w-1/4"
            />
          </div>
          <div className="flex flex-col gap-5 text-sm text-foreground">
            {isTimeout ? (
              <>
                <p>Waktu ujian kamu sudah habis. </p>
                <p>
                  Dengan memilih submit, jawaban kamu otomatis terekap sebagai penilaian.Ujian tidak dapat diulang
                  kembali.
                </p>
              </>
            ) : (
              <>
                <p>
                  Dengan memilih submit, jawaban kamu otomatis terekap sebagai penilaian.Ujian tidak dapat diulang
                  kembali.
                </p>
                <p>Pastikan semua soal sudah terjawab, yaa.</p>
              </>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <Button className="w-full">Submit</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FinishTestModal
