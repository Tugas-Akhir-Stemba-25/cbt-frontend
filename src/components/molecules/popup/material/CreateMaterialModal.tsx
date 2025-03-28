'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateMaterial } from '@/http/materials/create-material'
import { getMaterialCountKey } from '@/http/materials/get-material-count'
import { getMaterialKey, GetMaterialListParams } from '@/http/materials/get-material-list'

import { createMaterialSchema, CreateMaterialType } from '@/validators/material/create-material-validator'

import TeacherCombobox from '@/components/atoms/combobox/TeacherCombobox'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateMaterialModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  materialKey: GetMaterialListParams
}

const CreateMaterialModal = ({ openModal, setOpen, materialKey }: CreateMaterialModalProps) => {
  // Form
  const form = useForm<CreateMaterialType>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(createMaterialSchema),
    mode: 'onChange'
  })

  // Query Client
  const queryClient = useQueryClient()

  // Mutation
  const { mutate, isPending } = useCreateMaterial({
    onSuccess: (res) => {
      setOpen(false)
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getMaterialKey(materialKey as GetMaterialListParams)
      })
      queryClient.invalidateQueries({
        queryKey: getMaterialCountKey({ class_id: materialKey.class_id as number })
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
          form.setError(key as keyof CreateMaterialType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  const onSubmit = (form: CreateMaterialType) => {
    mutate({
      form,
      class_id: materialKey.class_id as number
    })
  }

  const handleSelectTeacher = (data: string) => {
    form.setValue('user_id', Number(data))
    form.trigger('user_id')
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Tambah Data Mata Pelajaran</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit, (e) => console.error(e))()
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
              name="user_id"
              render={() => (
                <FormItem className="relative flex w-full flex-col gap-2">
                  <FormLabel>Guru Pengampu</FormLabel>
                  <FormControl>
                    <TeacherCombobox selectData={handleSelectTeacher} />
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

export default CreateMaterialModal
