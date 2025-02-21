'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Book, Files, FilesIcon, Folders, LayoutGrid, LucideIcon, User, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

type MenuItem = {
  title: string
  path: string
  icon: LucideIcon
  roles: string[]
}

type MenuGroup = {
  label?: string
  items: MenuItem[]
  roles?: string[]
}

const sidebarMenuConfig: MenuGroup[] = [
  {
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard/',
        icon: LayoutGrid,
        roles: ['admin', 'teacher', 'student']
      }
    ]
  },

  {
    label: 'Master Data',
    roles: ['admin'],
    items: [
      {
        title: 'Guru',
        path: '/dashboard/guru',
        icon: User,
        roles: ['admin']
      },
      {
        title: 'Siswa',
        path: '/dashboard/siswa',
        icon: User,
        roles: ['admin']
      },
      {
        title: 'Jurusan',
        path: '/dashboard/jurusan',
        icon: Folders,
        roles: ['admin']
      },
      {
        title: 'Ujian',
        path: '/dashboard/ujian',
        icon: Files,
        roles: ['admin']
      }
    ]
  },

  {
    label: 'Menu Guru',
    roles: ['teacher'],
    items: [
      {
        title: 'Kelas',
        path: 'dashboard/teacher/class',
        icon: Users,
        roles: ['teacher']
      },
      {
        title: 'Ujian',
        path: 'dashboard/teacher/exam',
        icon: FilesIcon,
        roles: ['teacher']
      }
    ]
  },

  {
    label: 'Menu Siswa',
    roles: ['student'],
    items: [
      {
        title: 'Mata Pelajaran',
        path: 'dashboard/student/mata-pelajaran',
        icon: Book,
        roles: ['student']
      },
      {
        title: 'Ujian',
        path: '/dashboard/ujian',
        icon: Files,
        roles: ['student']
      }
    ]
  }
]

const AppSidebar = ({ role }: { role: string }) => {
  const pathname = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>LOGO</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarMenuConfig.map((group, index) => {
            const shouldShowGroup = !group.roles || group.roles.includes(role)

            if (!shouldShowGroup) return null

            return (
              <SidebarGroup key={`group-${index}`}>
                {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map(
                      (item, itemIndex) =>
                        item.roles.includes(role) && (
                          <SidebarMenuItem key={`item-${itemIndex}`}>
                            <SidebarMenuButton asChild isActive={pathname.includes(item.path)}>
                              <Link href={item.path}>
                                <item.icon
                                  className={` ${
                                    pathname.includes(item.path) ? 'text-primary-icon' : 'text-foreground'
                                  }`}
                                />

                                <span
                                  className={`${pathname.includes(item.path) ? 'text-primary' : 'text-foreground'}`}
                                >
                                  {item.title}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
