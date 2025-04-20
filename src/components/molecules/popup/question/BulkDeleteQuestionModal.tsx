import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useBulkDeleteQuestion } from '@/http/test/question/bulk-delete-question'
import { getQuestionListKey, GetQuestionListParams } from '@/http/test/question/get-question-list'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface BulkDeleteQuestionModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  ids: number[]
  questionKey: GetQuestionListParams
}

const BulkDeleteQuestionModal = ({ openModal, setOpen, ids, questionKey }: BulkDeleteQuestionModalProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useBulkDeleteQuestion({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getQuestionListKey(questionKey as GetQuestionListParams)
      })
    },
    onError: (err) => {
      if (typeof err.response?.data.meta.error === 'string') {
        toast.error('Error', {
          description: err.response?.data.meta.message || err.response?.data.meta.error
        })
      }

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          toast.error('Error', {
            description: errors[key]
          })
        }
      }
    }
  })

  // Handle Submit
  const handleSubmit = () => {
    mutate({ ids })
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Data</DialogTitle>
          <DialogDescription className="text-fooreground">
            Anda yakin ingin menghapus {ids.length} data sekaligus?. Dengan melakukan tindakan ini, data yang sudah
            dihapus tidak dapat dipulihkan kembali.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
              Batal
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            form="passwordForm"
            type="submit"
            className="flex-1"
            isLoading={isPending}
            onClick={handleSubmit}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BulkDeleteQuestionModal
