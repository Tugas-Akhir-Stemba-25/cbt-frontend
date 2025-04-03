'use client'

import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getTeacherKey } from '@/http/teachers/get-teacher-list'
import { useUpdateTeacher } from '@/http/teachers/update-teacher'

import { editTeacherSchema, EditTeacherType } from '@/validators/teacher/edit-teacher-validator'

import { PasswordInput } from '@/components/atoms/input/PasswordInput'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { TeacherParams } from '@/types/query_key/teacher'
import { Teacher } from '@/types/teacher/teacher'

interface EditModalProps {
  data: Teacher | null
  openModal: boolean
  setOpen: (open: boolean) => void
  teacherKey: TeacherParams
}

const EditTeacherDialog = ({ data, openModal, setOpen, teacherKey }: EditModalProps) => {
  //form
  const form = useForm<EditTeacherType>({
    defaultValues: {
      name: data?.name ?? '',
      username: data?.username ?? '',
      password: data?.password ?? ''
    },
    resolver: zodResolver(editTeacherSchema),
    mode: 'onChange'
  })

  //query client

  const queryClient = useQueryClient()

  const { mutate, isPending } = useUpdateTeacher({
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
      form.reset()
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

        for (const key in errors) {
          form.setError(key as keyof EditTeacherType, {
            type: 'manual',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const handleSave = (form: EditTeacherType) => {
    mutate({
      id: data?.id as number,
      form
    })
  }

  React.useEffect(() => {
    form.reset({
      name: data?.name ?? '',
      username: data?.username ?? '',
      password: data?.password ?? ''
    })
  }, [data, form])

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Edit Data Guru</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(handleSave)()
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
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
                isLoading={isPending}
                disabled={!form.formState.isValid}
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

export default EditTeacherDialog
