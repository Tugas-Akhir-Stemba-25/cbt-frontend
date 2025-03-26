'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateMajor } from '@/http/major/create-major'
import { MAJOR_COUNT_QUERY_KEY } from '@/http/major/get-major-count'
import { getMajorKey, GetMajorListParams } from '@/http/major/get-major-list'

import { createMajorSchema, CreateMajorType } from '@/validators/major/create-major-validator'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateMajorModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  majorKey: GetMajorListParams
}

const CreateMajorModal = ({ openModal, setOpen, majorKey }: CreateMajorModalProps) => {
  // Form
  const form = useForm<CreateMajorType>({
    defaultValues: {
      name: '',
      short_name: ''
    },
    resolver: zodResolver(createMajorSchema),
    mode: 'onChange'
  })

  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useCreateMajor({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getMajorKey(majorKey as GetMajorListParams)
      })
      queryClient.invalidateQueries({
        queryKey: MAJOR_COUNT_QUERY_KEY
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
          form.setError(key as keyof CreateMajorType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const onSubmit = (form: CreateMajorType) => {
    mutate({
      form
    })
  }

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

export default CreateMajorModal
