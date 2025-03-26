'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getClassCountKey } from '@/http/class/get-class-count'
import { getClassKey, GetClassListParams } from '@/http/class/get-class-list'
import { useUpdateClass } from '@/http/class/update-class'

import useMajorStore from '@/stores/useMajorStore'

import { editClassSchema, EditClassType } from '@/validators/class/edit-class-validator'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Class } from '@/types/class/class-list'

interface EditClassModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  classKey: GetClassListParams
  data: Class | null
}

const EditClassModal = ({ openModal, setOpen, classKey, data }: EditClassModalProps) => {
  // Form
  const form = useForm<EditClassType>({
    defaultValues: {
      name: '',
      grad_year: String(new Date().getFullYear())
    },
    resolver: zodResolver(editClassSchema),
    mode: 'onChange'
  })

  const { selectedMajor: major_id } = useMajorStore()

  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useUpdateClass({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getClassKey(classKey as GetClassListParams)
      })
      queryClient.invalidateQueries({
        queryKey: getClassCountKey({ major_id: major_id as number })
      })
      form.reset()
    },
    onError: (err) => {
      toast.error('Error', {
        description: err.response?.data.meta.message
      })

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof EditClassType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const onSubmit = (form: EditClassType) => {
    mutate({
      form,
      id: data?.id as number
    })
  }

  useEffect(() => {
    form.reset({
      name: data?.name ?? '',
      grad_year: String(data?.grad_year) ?? String(new Date().getFullYear())
    })
  }, [data, form])

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Tambah Data Jurusan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit)()
            }}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grad_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Singkat</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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

export default EditClassModal
