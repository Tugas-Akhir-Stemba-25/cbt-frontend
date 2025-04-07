'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import Breadcrumb from '@/components/atoms/breadcrumb'
import AvatarCustom from '@/components/molecules/buttons/AvatarCustom'
import AppSidebar from '@/components/molecules/sidebar/AppSideBar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const InitialDashboard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const router = useRouter()

  if (!session.data?.user) return router.push('/login')

  const role = session?.data?.user.role

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={role || 'siswa'} />
        <SidebarInset>
          <div>
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumb className="hidden sm:block" />
              </div>

              <div className="text-md block text-center font-bold md:hidden">
                <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
              </div>

              <div className="flex items-center gap-2">
                <ButtonToggleTheme />
                <AvatarCustom />
              </div>
            </header>
            <main className="px-6 pt-16">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default InitialDashboard
