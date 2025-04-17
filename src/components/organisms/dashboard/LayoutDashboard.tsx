'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import Breadcrumb from '@/components/atoms/breadcrumb'
import AvatarCustom from '@/components/molecules/buttons/AvatarCustom'
import AppSidebar from '@/components/molecules/sidebar/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const InitialDashboard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const router = useRouter()

  if (!session.data?.user) return router.push('/login')

  const role = session?.data?.user.role

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={role || 'siswa'} />
        <div className="relative w-full @container">
          <header className="sticky left-0 right-0 top-0 z-30 grid h-16 shrink-0 grid-cols-3 items-center border-b bg-background px-4 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Breadcrumb className="hidden sm:block" />
            </div>

            <div className="text-md block justify-self-center text-center font-bold md:hidden">
              <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
            </div>

            <div className="flex items-center gap-2 justify-self-end">
              <ButtonToggleTheme />
              <AvatarCustom />
            </div>
          </header>
          <main className="px-6 pt-16">
            <Breadcrumb className="block md:hidden" />

            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default InitialDashboard
