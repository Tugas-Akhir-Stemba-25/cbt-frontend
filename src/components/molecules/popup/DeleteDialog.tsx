import { useEffect, useState } from 'react'

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

interface DeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  authRequired: boolean
  expectedUsn: string
  expectedPw: string
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  authRequired,
  expectedPw = '',
  expectedUsn = ''
}) => {
  const [step, setStep] = useState<'username' | 'password'>('username')

  const usernameSchema = z.object({
    username: z
      .string()
      .min(1, { message: 'Username harus diisi' })
      .refine((val) => val === expectedUsn, {
        message: 'Username yang anda masukkan tidak sesuai!'
      })
  })

  const passwordSchema = z.object({
    password: z
      .string()
      .min(1, { message: 'Password harus diisi' })
      .refine((val) => val === expectedPw, {
        message: 'Password yang anda masukkan tidak sesuai!'
      })
  })

  const usernameForm = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: '' }
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' }
  })

  useEffect(() => {
    if (!isOpen) {
      setStep('username')
      usernameForm.reset()
      passwordForm.reset()
    }
  }, [isOpen, usernameForm, passwordForm])

  const onSubmitUsername = (_data: z.infer<typeof usernameSchema>) => {
    setStep('password')
  }

  const onSubmitPassword = (_data: z.infer<typeof passwordSchema>) => {
    // dibuat toast
    // toast.success("Selamat", {
    //   position: "bottom-center",
    //   description:"Berhasil menghapus data guru",
    //   classNames: {
    //     toast: "bg-success text-white", // Ubah warna background toast
    //     description: "text-gray-200",
    //     title: 'text-[#56E038]',
    //     icon:'text-[#56E038]'
    //   },
    // });
    toast.error('Yahhh:(', {
      position: 'bottom-center',
      description: 'Gagal menambahkan data guru, coba periksa data yang Anda masukkan',
      classNames: {
        toast: 'bg-destructive text-white', // Ubah warna background toast
        description: 'text-gray-200'
      }
    })

    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-destructive">Konfirmasi Hapus Data</DialogTitle>
          <DialogDescription className="text-fooreground">
            Dengan melakukan tindakan ini, data yang sudah dihapus tidak dapat dipulihkan kembali.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          {authRequired ? (
            step === 'username' ? (
              <Form key={'username'} {...usernameForm}>
                <form id="usernameForm" onSubmit={usernameForm.handleSubmit(onSubmitUsername)}>
                  <FormField
                    control={usernameForm.control}
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
                </form>
              </Form>
            ) : (
              <Form key={'password'} {...passwordForm}>
                <form id="passwordForm" onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
                  <FormField
                    control={passwordForm.control}
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
                </form>
              </Form>
            )
          ) : (
            <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus data ini?</p>
          )}
        </div>
        <DialogFooter className="gap-4">
          <Button onClick={onClose} variant="subtle" className="flex-1 rounded-md px-4 py-2 dark:bg-tableColour">
            Batal
          </Button>
          {!authRequired ? (
            <Button variant="destructive" onClick={onConfirm} className="flex-1">
              Hapus
            </Button>
          ) : step === 'username' ? (
            <Button variant="destructive" form="usernameForm" type="submit" className="flex-1">
              Lanjutkan
            </Button>
          ) : (
            <Button variant="destructive" form="passwordForm" type="submit" className="flex-1">
              Hapus
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
