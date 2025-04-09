'use client'

import { useState } from 'react'

import { DialogClose } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { exportResultTest } from '@/http/test/export-test-result'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

interface ExportResultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: number
}

const ExportResultModal = ({ open, onOpenChange, testId }: ExportResultDialogProps) => {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      await exportResultTest(testId)
      toast.success('Berhasil', {
        description: 'Hasil ujian berhasil diekspor.'
      })
      onOpenChange(false)
    } catch (err: any) {
      toast.error('Gagal', {
        description:
          err?.response?.data?.meta?.message ||
          err?.response?.data?.meta?.error ||
          'Terjadi kesalahan saat mengekspor hasil ujian'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Export Hasil Ujian</DialogTitle>
          <DialogDescription className="text-foreground">
            Dengan melakukan tindakan ini, data yang sudah dihapus tidak dapat dipulihkan kembali.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
              Batal
            </Button>
          </DialogClose>
          <Button className="flex-1" onClick={handleExport} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengekspor...
              </>
            ) : (
              'Export'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExportResultModal
