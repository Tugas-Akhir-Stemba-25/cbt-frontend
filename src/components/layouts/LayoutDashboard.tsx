import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth, signOut } from '@/lib/auth'

import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import Breadcrumb from '@/components/atoms/breadcrumb'
import AppSidebar from '@/components/molecules/sidebar/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import AvatarCustom from '../molecules/buttons/AvatarCustom'

const LayoutDashboard = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user) {
    signOut()
    return redirect('/login')
  }

  const role = session?.user.role

  return (
    // <div>
    <SidebarProvider>
      <AppSidebar role={role || 'siswa'} />
      {/* <SidebarInset> */}
      <div className="relative w-full @container">
        <header className="sticky left-0 right-0 top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Breadcrumb className="hidden md:block" />
          </div>

          <div className="text-md block text-center font-bold md:hidden">
            <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
          </div>

          <div className="flex items-center gap-2">
            <ButtonToggleTheme />
            <AvatarCustom />
          </div>
        </header>
        <main className="w-full p-5">
          <Breadcrumb className="block md:hidden" />

          {children}
        </main>
      </div>
      {/* </SidebarInset> */}
    </SidebarProvider>
    // </div>
  )
}

export default LayoutDashboard
