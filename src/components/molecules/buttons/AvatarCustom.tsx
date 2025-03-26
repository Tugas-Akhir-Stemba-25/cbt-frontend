'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

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
      <DropdownMenuContent side="left">
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
          {/* <Button variant={'destructive'} size={'sm'}> */}
          <LogOutIcon size={16} />
          Logout
          {/* </Button> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarCustom
