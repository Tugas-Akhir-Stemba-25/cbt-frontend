'use client'

import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface AvatarCustomProps {
  withName?: boolean
}

const AvatarCustom = ({ withName = false }: AvatarCustomProps) => {
  const session = useSession()

  const handleLogout = () => {
    signOut({ redirectTo: '/login' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <Avatar className="grid cursor-pointer place-items-center bg-primary">
          <AvatarImage src="" />
          <AvatarFallback className="text-white">{session.data?.user.name[0] ?? 'A'}</AvatarFallback>
        </Avatar>
        {withName && (
          <p className="hidden font-semibold text-muted md:block">{session.data?.user.name ?? 'Anonymous'}</p>
        )}
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
