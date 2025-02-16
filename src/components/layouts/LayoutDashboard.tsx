import { AvatarFallback } from '@radix-ui/react-avatar'

import { auth } from '@/lib/auth'

import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import Breadcrumb from '@/components/atoms/breadcrumb'
import AppSidebar from '@/components/molecules/sidebar/AppSideBar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const LayoutDashboard = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const role = session?.user.role

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

              <div className="text-md block text-center font-bold md:hidden">LOGO</div>

              <div className="flex items-center gap-2">
                <ButtonToggleTheme />
                <Avatar className="grid place-items-center">
                  <AvatarImage src="" />
                  <AvatarFallback>{session?.user?.name[0] ?? 'A'}</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="px-6 pt-16">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default LayoutDashboard
