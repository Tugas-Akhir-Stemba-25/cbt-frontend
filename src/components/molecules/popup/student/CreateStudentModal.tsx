import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateStudent } from '@/http/student/create-student'
import { STUDENT_COUNT_QUERY_KEY } from '@/http/student/get-student-count'
import { getStudentKey, StudentParams } from '@/http/student/get-student-list'

import { createStudentSchema, CreateStudentType } from '@/validators/student/create-student-validator'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateStudentModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  studentKey: StudentParams
}

const CreateStudentModal = ({ openModal, setOpen, studentKey }: CreateStudentModalProps) => {
  const form = useForm<CreateStudentType>({
    defaultValues: {
      name: '',
      username: '',
      year_join: ''
    },
    resolver: zodResolver(createStudentSchema),
    mode: 'onChange'
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreateStudent({
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: getStudentKey(studentKey as StudentParams) })
      queryClient.invalidateQueries({
        queryKey: STUDENT_COUNT_QUERY_KEY
      })
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
      form.reset()
      setOpen(false)
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
      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error
        Object.keys(errors).forEach((key) => {
          form.setError(key as keyof CreateStudentType, { message: errors[key] })
        })
      }
    }
  })

  const handleSubmit = (form: CreateStudentType) => {
    console.log(studentKey.classId)

    mutate({
      form,
      class_id: studentKey.classId as number
    })
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Tambah Data Siswa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(handleSubmit)()
            }}
            className="space-y-6"
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
                className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour"
                disabled={!form.formState.isValid}
                isLoading={isPending}
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

export default CreateStudentModal
