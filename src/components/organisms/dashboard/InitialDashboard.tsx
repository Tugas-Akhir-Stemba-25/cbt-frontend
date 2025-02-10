'use client'

import { signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

const InitialDashboard = () => {
  const session = useSession()
  return (
    <div>
      <p>{session?.data?.user.name}</p>

      <Button
        variant={'destructive'}
        onClick={() =>
          signOut({
            redirectTo: '/login'
          })
        }
      >
        Logout
      </Button>
    </div>
  )
}

export default InitialDashboard
