import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useDeleteQuestionImage } from '@/http/test/question/delete-question-image'
import { getQuestionDetailKey, GetQuestionDetailParams } from '@/http/test/question/get-question-detail'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DeleteQuestionImageModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  id: number
  questionKey: GetQuestionDetailParams
}

const DeleteQuestionImageModal = ({ openModal, setOpen, id, questionKey }: DeleteQuestionImageModalProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useDeleteQuestionImage({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getQuestionDetailKey({ questionId: questionKey.questionId as number })
      })
    },
    onError: (err) => {
      toast.error('Error', {
        description: err.response?.data.meta.message || err.response?.data.meta.error
      })
    }
  })

  // Handle Submit
  const handleSubmit = () => {
    mutate({ questionId: id })
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Gambar</DialogTitle>
          <DialogDescription className="text-fooreground">
            Dengan melakukan tindakan ini, gambar yang sudah dihapus tidak dapat dipulihkan kembali meskipun anda batal
            melakukan edit soal
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

export default DeleteQuestionImageModal
