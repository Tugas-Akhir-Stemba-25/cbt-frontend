import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useBulkDeleteTest } from '@/http/test/bulk-delete-test'
import { getTestCountKey } from '@/http/test/get-test-count'
import { getTestListKey, GetTestListParams } from '@/http/test/get-test-list'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface BulkDeleteTestModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  ids: number[]
  testKey: GetTestListParams
}

const BulkDeleteTestModal = ({ openModal, setOpen, ids, testKey }: BulkDeleteTestModalProps) => {
  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useBulkDeleteTest({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getTestListKey(testKey as GetTestListParams)
      })
      queryClient.invalidateQueries({
        queryKey: getTestCountKey({ material_id: testKey.material_id as number })
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

export default BulkDeleteTestModal
