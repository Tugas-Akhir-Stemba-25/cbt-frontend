import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useAssignTeacherClass } from '@/http/teachers/assign-teacher'
import { getTeacherClassKey } from '@/http/teachers/get-teacher-class'

import useClassStore from '@/stores/useClassStore'

import { assignTeacherSchema, AssignTeacherType } from '@/validators/teacher/assign-teacher-validator'

import ClassCombobox from '@/components/atoms/combobox/ClassCombobox'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

interface AddDataModalProps {
  openModal: boolean
  setOpen: (open: boolean) => void
  data: number
}

const AssignTeacherModal = ({ openModal, setOpen, data }: AddDataModalProps) => {
  const { selectedClass } = useClassStore()
  const queryClient = useQueryClient()

  const form = useForm<AssignTeacherType>({
    defaultValues: {
      class_id: selectedClass ?? undefined
    },
    resolver: zodResolver(assignTeacherSchema),
    mode: 'onChange'
  })

  const { mutate, isPending } = useAssignTeacherClass({
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
      queryClient.invalidateQueries({ queryKey: getTeacherClassKey(data) })
    },
    onError: (error) => {
      setOpen(false)
      toast.error('Yahhh:(', {
        position: 'bottom-center',
        description: error.response?.data.meta.error,
        classNames: {
          toast: 'bg-destructive text-white',
          description: 'text-gray-200'
        }
      })
    }
  })
  useEffect(() => {
    if (selectedClass != null) {
      form.setValue('class_id', selectedClass, { shouldValidate: true })
    }
  }, [selectedClass, form])

  const onSubmit = (form: AssignTeacherType) => {
    mutate({ form, id: data })
  }
  return (
    <Dialog open={openModal} onOpenChange={setOpen}>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Penugasan Guru ke Kelas</DialogTitle>
        </DialogHeader>
        <div className="my-4 flex justify-center">
          <ClassCombobox />
        </div>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit)()
            }}
            className="space-y-4"
          >
            <DialogFooter className="flex items-center gap-4">
              <DialogClose asChild>
                <Button variant="subtle" className="w-full flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full flex-1 rounded-md"
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

export default AssignTeacherModal
