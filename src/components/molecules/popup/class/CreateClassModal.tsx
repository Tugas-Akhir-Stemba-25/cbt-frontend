'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateClass } from '@/http/class/create-class'
import { getClassCountKey } from '@/http/class/get-class-count'
import { getClassKey, GetClassListParams } from '@/http/class/get-class-list'

import useMajorStore from '@/stores/useMajorStore'

import { createClassSchema, CreateClassType } from '@/validators/class/create-class-validator'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateClassModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  classKey: GetClassListParams
}

const CreateClassModal = ({ openModal, setOpen, classKey }: CreateClassModalProps) => {
  // Form
  const form = useForm<CreateClassType>({
    defaultValues: {
      name: '',
      grad_year: String(new Date().getFullYear())
    },
    resolver: zodResolver(createClassSchema),
    mode: 'onChange'
  })

  const { selectedMajor: major_id } = useMajorStore()

  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useCreateClass({
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
        description: err.response?.data.meta.message || err.response?.data.meta.error
      })

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof CreateClassType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const onSubmit = (form: CreateClassType) => {
    mutate({
      form,
      major_id: major_id as number
    })
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Tambah Data Kelas</DialogTitle>
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
                  <FormLabel>Tahun Lulus</FormLabel>
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

export default CreateClassModal
