'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

interface AddDataModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { name: string; username: string; password: string }) => void
  expectedName: string
  expectedUsername: string
}

const AddDataModal: React.FC<AddDataModalProps> = ({ isOpen, onClose, onConfirm, expectedName, expectedUsername }) => {
  // Schema validasi dengan Zod
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

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast.success('Data berhasil ditambahkan', {
      description: `${data.name} - ${data.username}`,
      position: 'bottom-center',
      style: { backgroundColor: '#16A34A', color: 'white' }
    })
    onConfirm(data)
    onClose()
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
            <DialogFooter className="gap-4">
              <Button onClick={onClose} variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
                Batal
              </Button>
              <Button type="submit" variant="destructive" className="flex-1 rounded-md">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDataModal
