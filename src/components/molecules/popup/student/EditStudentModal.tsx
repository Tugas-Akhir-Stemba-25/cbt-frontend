'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { STUDENT_COUNT_QUERY_KEY } from '@/http/student/get-student-count'
import { getStudentKey, StudentParams } from '@/http/student/get-student-list'
import { useUpdateStudent } from '@/http/student/update-student'

// import useClassStore from '@/stores/useClassStore'

import { editStudentSchema, EditStudentType } from '@/validators/student/edit-student-validator'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Student } from '@/types/student/student-list'

interface EditStudentModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  studentKey: StudentParams
  data: Student | null
}

const EditStudentModal = ({ openModal, setOpen, studentKey, data }: EditStudentModalProps) => {
  // Form

  const form = useForm<EditStudentType>({
    defaultValues: {
      name: '',
      username: '',
      year_join: ''
    },
    resolver: zodResolver(editStudentSchema),
    mode: 'onChange'
  })

  // const { selectedClass: class_id } = useClassStore()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useUpdateStudent({
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
      form.reset()
    },
    onError: (err) => {
      toast.error('Yahhh:(', {
        position: 'bottom-center',
        description: err.response?.data.meta.error,
        classNames: {
          toast: 'bg-error text-white',
          description: 'text-gray-200',
          title: 'text-[#FF0000]',
          icon: 'text-[#FF0000]'
        }
      })

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof EditStudentType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const handleSubmit = (form: EditStudentType) => {
    mutate({
      form,
      id: data?.id as number
    })
  }

  useEffect(() => {
    form.reset({
      name: data?.name ?? '',
      username: data?.username ?? '',
      year_join: String(data?.year_join) ?? String(new Date().getFullYear())
    })
  }, [data, form])

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Ubah Data Siswa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(handleSubmit)()
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Nama Siswa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year_join"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Masuk</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Tahun Masuk" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex gap-2">
              <DialogClose asChild>
                <Button variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
                  Batal
                </Button>
              </DialogClose>
              <Button
                variant="default"
                type="submit"
                disabled={!form.formState.isValid}
                isLoading={isPending}
                className="flex-1"
              >
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditStudentModal
