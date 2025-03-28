import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useDeleteMaterial } from '@/http/materials/delete-material'
import { getMaterialCountKey } from '@/http/materials/get-material-count'
import { getMaterialKey, GetMaterialListParams } from '@/http/materials/get-material-list'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DeleteMaterialModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  id: number
  materialKey: GetMaterialListParams
}

const DeleteMaterialModal = ({ openModal, setOpen, id, materialKey }: DeleteMaterialModalProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useDeleteMaterial({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getMaterialKey(materialKey as GetMaterialListParams)
      })
      queryClient.invalidateQueries({
        queryKey: getMaterialCountKey({ class_id: materialKey.class_id as number })
      })
    },
    onError: (err) => {
      toast.error('Error', {
        description: err.response?.data.meta.message
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

export default DeleteMaterialModal
