import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { Loader, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteTeacherClass } from '@/http/teachers/delete-teacher-class'
import { getTeacherClassKey, useGetTeacherClass } from '@/http/teachers/get-teacher-class'

// import { useDeleteTeacherClass } from '@/http/teachers/use-delete-teacher-class';
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Class } from '@/types/class/class-list'

interface DetailTeacherModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  id: number // teacherId
}

const DetailTeacherModal = ({ openModal, setOpen, id: teacherId }: DetailTeacherModalProps) => {
  const qc = useQueryClient()
  const {
    data: resp,
    isLoading,
    isError,
    error
  } = useGetTeacherClass({ teacherid: teacherId }, { enabled: !!teacherId }) as {
    data: any
    isLoading: boolean
    isError: boolean
    error: { response: { data: { meta: { error: string } } } }
  }

  const { mutate: deleteClass, isPending: deleteLoading } = useDeleteTeacherClass({
    onSuccess: (res) => {
      toast.success('Selamat', {
        position: 'bottom-center',
        description: res.meta.message,
        classNames: {
          toast: 'bg-success text-white',
          description: 'text-gray-200',
          title: 'text-[#56E038]',
          icon: 'text-[#56E038]'
        }
      })
      qc.invalidateQueries({ queryKey: getTeacherClassKey(teacherId) })
    },
    onError: (error) => {
      toast.error('Yahhh:(', {
        position: 'bottom-center',
        description: error.response?.data.meta.message,
        classNames: {
          toast: 'bg-destructive text-white',
          description: 'text-gray-200'
        }
      })
    }
  })

  const errorMessage = error?.response?.data?.meta.error

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Data</DialogTitle>
          <DialogDescription className="text-foreground">Detail Penugasan:</DialogDescription>
        </DialogHeader>

        {isLoading && <Loader className="h-4 w-4 animate-spin" />}
        {isError && <div className="p-4 text-center text-sm text-destructive">{errorMessage}</div>}
        {!isLoading && !isError && resp && (
          <ScrollArea className="max-h-64">
            {resp.data.map((cls: Class) => (
              <div key={cls.id} className="mb-2 flex items-center justify-between rounded-md border p-3 shadow-sm">
                <span className="text-sm font-medium">{cls.name}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => deleteClass({ teacherId, classId: cls.id })}
                  disabled={deleteLoading}
                  isLoading={deleteLoading}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        )}

        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
              Batal
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DetailTeacherModal
