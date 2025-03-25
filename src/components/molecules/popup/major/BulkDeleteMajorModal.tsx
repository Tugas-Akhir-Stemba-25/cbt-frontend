import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useBulkDeleteMajor } from '@/http/major/bulk-delete-major'
import { MAJOR_COUNT_QUERY_KEY } from '@/http/major/get-major-count'
import { getMajorKey, GetMajorListParams } from '@/http/major/get-major-list'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface BulkDeleteMajorModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  ids: number[]
  majorKey: GetMajorListParams
}

const BulkDeleteMajorModal = ({ openModal, setOpen, ids, majorKey }: BulkDeleteMajorModalProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useBulkDeleteMajor({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getMajorKey(majorKey as GetMajorListParams)
      })
      queryClient.invalidateQueries({
        queryKey: MAJOR_COUNT_QUERY_KEY
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

export default BulkDeleteMajorModal
