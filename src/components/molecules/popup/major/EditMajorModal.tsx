'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getMajorKey, GetMajorListParams } from '@/http/major/get-major-list'
import { useUpdateMajor } from '@/http/major/update-major'

import { editMajorSchema, EditMajorType } from '@/validators/major/edit-major-validator'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Major } from '@/types/major/major-list'

interface EditMajorModalProps {
  data: Major | null
  openModal: boolean
  setOpen: (open: boolean) => void
  majorKey: GetMajorListParams
}

const EditMajorModal = ({ data, openModal, setOpen, majorKey }: EditMajorModalProps) => {
  // Form
  const form = useForm<EditMajorType>({
    defaultValues: {
      name: data?.name ?? '',
      short_name: data?.short_name ?? ''
    },
    resolver: zodResolver(editMajorSchema),
    mode: 'onChange'
  })

  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useUpdateMajor({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      console.log(getMajorKey(majorKey as GetMajorListParams))
      queryClient.invalidateQueries({
        queryKey: getMajorKey(majorKey as GetMajorListParams)
      })
    },
    onError: (err) => {
      toast.error('Error', {
        description: err.response?.data.meta.message
      })

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof EditMajorType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const onSubmit = (form: EditMajorType) => {
    mutate({
      id: data?.id as number,
      form
    })
  }

  useEffect(() => {
    form.reset({
      name: data?.name ?? '',
      short_name: data?.short_name ?? ''
    })
  }, [data, form])

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
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
              name="short_name"
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

export default EditMajorModal
