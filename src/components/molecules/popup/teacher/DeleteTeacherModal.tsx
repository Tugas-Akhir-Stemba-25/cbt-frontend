import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useDeleteTeacher } from '@/http/teachers/delete-teacher'
import { TEACHER_COUNT_QUERY_KEY } from '@/http/teachers/get-teacher-count'
import { getTeacherKey } from '@/http/teachers/get-teacher-list'

import { deleteTeacherSchema, DeleteTeacherType } from '@/validators/teacher/delete-teacher-validator'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { TeacherParams } from '@/types/query_key/teacher'

interface DeleteDialogProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  id: number
  teacherKey: TeacherParams
  expectedUsn: string
}

const DeleteTeacherDialog = ({ openModal, setOpen, id, teacherKey, expectedUsn }: DeleteDialogProps) => {
  const form = useForm<DeleteTeacherType>({
    resolver: zodResolver(deleteTeacherSchema),
    defaultValues: { username: '' }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useDeleteTeacher({
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
        queryKey: getTeacherKey(teacherKey as TeacherParams)
      })
      queryClient.invalidateQueries({
        queryKey: TEACHER_COUNT_QUERY_KEY
      })
      form.reset()
    },
    onError: (err) => {
      toast.error('Yahhh:(', {
        position: 'bottom-center',
        description: err.response?.data.meta.message,
        classNames: {
          toast: 'bg-destructive text-white',
          description: 'text-gray-200'
        }
      })
    }
  })

  const onSubmitUsername = (data: DeleteTeacherType) => {
    if (data.username === expectedUsn) {
      mutate({ id })
    } else {
      toast.error('Username tidak sesuai', {
        position: 'bottom-center',
        description: 'Username yang Anda masukkan salah, mohon periksa kembali'
      })
      form.setError('username', { type: 'manual', message: 'Username yang Anda masukkan tidak sesuai!' })
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Data</DialogTitle>
          <DialogDescription className="text-fooreground">
            Masukkan username Anda untuk mengonfirmasi penghapusan data. Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Form {...form}>
            <form id="usernameForm" onSubmit={form.handleSubmit(onSubmitUsername)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
              Batal
            </Button>
          </DialogClose>
          <Button variant="destructive" className="flex-1" isLoading={isPending} form="usernameForm" type="submit">
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteTeacherDialog
