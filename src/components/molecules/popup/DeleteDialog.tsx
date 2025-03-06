import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

interface DeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  role: 'admin' | 'teacher' | 'student'
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, onConfirm, role }) => {
  const [username, setUsername] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Data</DialogTitle>
          <DialogDescription className="text-fooreground">
            Dengan melakukan tindakan ini, data yang sudah dihapus tidak dapat dipulihkan kembali.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          {role === 'teacher' ? (
            <>
              <p className="text-sm text-gray-600">Masukkan username Anda untuk mengonfirmasi penghapusan:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full border p-2"
                placeholder="Masukkan username"
              />
            </>
          ) : (
            <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus data ini?</p>
          )}
        </div>
        <DialogFooter className="flex">
          <Button onClick={onClose} variant="subtle" className="rounded-md px-4 py-2">
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (role === 'teacher' && username.trim() === '') {
                alert('Username harus diisi!')
                return
              }
              onConfirm()
            }}
            className="rounded-md px-4 py-2 text-white"
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
