import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useDeleteClass } from '@/http/class/delete-class'
import { getClassCountKey } from '@/http/class/get-class-count'
import { getClassKey, GetClassListParams } from '@/http/class/get-class-list'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DeleteClassModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  id: number
  classKey: GetClassListParams
}

const DeleteClassModal = ({ openModal, setOpen, id, classKey }: DeleteClassModalProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useDeleteClass({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getClassKey(classKey as GetClassListParams)
      })
      queryClient.invalidateQueries({
        queryKey: getClassCountKey({ major_id: classKey.major_id as number })
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
    mutate({ id })
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Data</DialogTitle>
          <DialogDescription className="text-fooreground">
            Dengan melakukan tindakan ini, data yang sudah dihapus tidak dapat dipulihkan kembali.
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

export default DeleteClassModal
