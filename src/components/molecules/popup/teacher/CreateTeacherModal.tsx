'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { usePostTeacherData } from '@/http/teachers/createTeacher'
import { TEACHER_COUNT_QUERY_KEY } from '@/http/teachers/get-teacher-count'
import { getTeacherKey } from '@/http/teachers/get-teacher-list'

import { createTeacherSchema, CreateTeacherType } from '@/validators/teacher/create-teacher-validator'

import { PasswordInput } from '@/components/atoms/input/PasswordInput'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { TeacherParams } from '@/types/query_key/teacher'

interface AddDataModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  teacherKey: TeacherParams
}

const CreateTeacherModal = ({ openModal, setOpen, teacherKey }: AddDataModalProps) => {
  const form = useForm<CreateTeacherType>({
    defaultValues: {
      name: '',
      username: '',
      password: ''
    },
    resolver: zodResolver(createTeacherSchema),
    mode: 'onChange'
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = usePostTeacherData({
    onSuccess: (newTeacher) => {
      setOpen(false)
      toast.success('Selamat', {
        position: 'bottom-center',
        description: newTeacher.meta.message,
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

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof CreateTeacherType, {
            type: 'manual',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const onSubmit = (form: CreateTeacherType) => {
    mutate({
      form
    })
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Tambah Data Guru</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit)()
            }}
            className="space-y-4"
          >
            {/* Input Nama */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Guru" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Masukkan password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex items-center gap-4">
              <DialogClose asChild>
                <Button variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1 rounded-md"
                isLoading={isPending}
                disabled={!form.formState.isValid}
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

export default CreateTeacherModal
