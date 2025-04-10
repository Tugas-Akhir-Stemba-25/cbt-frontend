'use client'

import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useDeleteStudent } from '@/http/student/delete-student'
import { STUDENT_COUNT_QUERY_KEY } from '@/http/student/get-student-count'
import { getStudentKey, StudentParams } from '@/http/student/get-student-list'

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

interface DeleteStudentModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  id: number
  studentKey: StudentParams
}
const DeleteStudentModal = ({ openModal, setOpen, id, studentKey }: DeleteStudentModalProps) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useDeleteStudent({
    onSuccess: (res) => {
      setOpen(false)
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
      queryClient.invalidateQueries({
        queryKey: getStudentKey(studentKey as StudentParams)
      })
      queryClient.invalidateQueries({
        queryKey: STUDENT_COUNT_QUERY_KEY
      })
    },
    onError: (err) => {
      toast.error('Yahhh:(', {
        position: 'bottom-center',
        description: err.response?.data.meta.error,
        classNames: {
          toast: 'bg-destructive text-white',
          description: 'text-gray-200'
        }
      })
    }
  })

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

export default DeleteStudentModal
