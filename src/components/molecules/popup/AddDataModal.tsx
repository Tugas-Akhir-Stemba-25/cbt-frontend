'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { usePostTeacherData } from '@/http/teachers/createTeacher'

import { PasswordInput } from '@/components/atoms/input/PasswordInput'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { TeacherResponse } from '@/types/common/teacherResponse'

interface AddDataModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (response: TeacherResponse) => void
  expectedName: string
  expectedUsername: string
}

const AddDataModal: React.FC<AddDataModalProps> = ({ isOpen, onClose, onConfirm, expectedName, expectedUsername }) => {
  const { mutate, isPending } = usePostTeacherData({
    onSuccess: (newTeacher) => {
      toast.success('Selamat', {
        position: 'bottom-center',
        description: `Berhasil menambahkan data guru`,
        classNames: {
          toast: 'bg-success text-white',
          description: 'text-gray-200',
          title: 'text-[#56E038]',
          icon: 'text-[#56E038]'
        }
      })
      onConfirm(newTeacher)
      onClose()
    },
    onError: () => {
      toast.error('Yahhh:(', {
        position: 'bottom-center',
        description: 'Gagal menambahkan data guru, coba periksa data yang Anda masukkan',
        classNames: {
          toast: 'bg-destructive text-white',
          description: 'text-gray-200'
        }
      })
    }
  })

  const schema = z.object({
    name: z
      .string()
      .min(1, { message: 'Nama harus diisi' })
      .refine((val) => val !== expectedName, {
        message: 'Nama sudah pernah ditambahkan!'
      }),
    username: z
      .string()
      .min(1, { message: 'Username harus diisi' })
      .refine((val) => val !== expectedUsername, {
        message: 'Username sudah pernah ditambahkan!'
      }),
    password: z.string().min(1, { message: 'Password harus diisi' })
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      password: ''
    }
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  const onSubmit = (data: { name: string; username: string; password: string }) => {
    mutate(data, {
      onSuccess: () => console.log('Mutation success!'),
      onError: (error) => console.error('Mutation error:', error),
      onSettled: () => console.log('Mutation selesai')
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Tambah Data</DialogTitle>
          <DialogDescription>Masukkan data baru untuk menambahkan pengguna.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Nama */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
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
                    <Input placeholder="Masukkan username" {...field} />
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
              {isPending ? (
                <Button isLoading={isPending} />
              ) : (
                <>
                  <Button
                    onClick={onClose}
                    variant="subtle"
                    className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour"
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="flex-1 rounded-md">
                    Simpan
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDataModal
