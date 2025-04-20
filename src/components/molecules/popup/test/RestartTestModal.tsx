'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { useRestartTest } from '@/http/test/get-test-restart'
import { getTestResultKey } from '@/http/test/get-test-result'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface RestartTestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: number
  userId: number
  onSuccess?: () => void
}

const RestartTestDialog = ({ open, onOpenChange, testId, userId, onSuccess }: RestartTestDialogProps) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useRestartTest({
    onSuccess: (res) => {
      toast.success('Sukses', {
        description: res.meta.message
      })

      queryClient.invalidateQueries({
        queryKey: getTestResultKey({ test_id: testId })
      })

      onOpenChange(false)
      onSuccess?.()
    },
    onError: (err) => {
      toast.error('Gagal', {
        description:
          err.response?.data?.meta?.message ||
          err.response?.data?.meta?.error ||
          'Terjadi kesalahan saat merestart ujian'
      })
    }
  })

  const handleRestart = () => {
    mutate({ testId, userId })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin me-restart ujian?</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="text-sm text-muted">
          Data jawaban sebelumnya akan dihapus dan siswa dapat mengerjakan ulang.
        </div>

        <AlertDialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button disabled={isPending} onClick={handleRestart}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              'Restart'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RestartTestDialog
