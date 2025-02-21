'use client'

import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const AvatarCustom = () => {
  const session = useSession()

  const handleLogout = () => {
    signOut({ redirectTo: '/login' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="grid cursor-pointer place-items-center">
          <AvatarImage src="" />
          <AvatarFallback>{session.data?.user.name[0] ?? 'A'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarCustom
