'use client'

import { usePathname } from 'next/navigation'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'

import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import Breadcrumb from '@/components/atoms/breadcrumb'
import AppSidebar from '@/components/molecules/sidebar/AppSideBar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = [{ label: 'Home', href: '/' }]
  let cumulativePath = ''
  let labelName = ''

  segments.forEach((segment) => {
    switch (segment) {
      case 'teacher':
        labelName = 'guru'
        break
      case 'student':
        labelName = 'siswa'
        break
      case 'admin':
        labelName = 'admin'
        break
      default:
        labelName = 'dashboard'
        break
    }

    cumulativePath += `/${segment}`
    const label = labelName.charAt(0).toUpperCase() + labelName.slice(1)
    breadcrumbs.push({ label, href: cumulativePath })
  })

  return breadcrumbs
}

const InitialDashboard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const role = session?.data?.user.role
  const pathname = usePathname()

  const breadcrumbItems = generateBreadcrumbs(pathname)

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={role || 'siswa'} />
        <SidebarInset>
          <div>
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumb className="hidden sm:block" items={breadcrumbItems} />
              </div>

              <div className="text-md block text-center font-bold md:hidden">LOGO</div>

              <div className="flex items-center gap-2">
                <ButtonToggleTheme />
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>User Profile</AvatarFallback>
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

export default InitialDashboard
