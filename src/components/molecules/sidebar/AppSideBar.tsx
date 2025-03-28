'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Book, BookOpen, Files, FilesIcon, Folders, LayoutGrid, LucideIcon, School, User, Users } from 'lucide-react'

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
        path: '/dashboard/admin',
        icon: LayoutGrid,
        roles: ['admin']
      },
      {
        title: 'Dashboard',
        path: '/dashboard/teacher',
        icon: LayoutGrid,
        roles: ['teacher']
      },
      {
        title: 'Dashboard',
        path: '/dashboard/student',
        icon: LayoutGrid,
        roles: ['student']
      }
    ]
  },

  {
    label: 'Master Data',
    roles: ['admin'],
    items: [
      {
        title: 'Guru',
        path: '/dashboard/admin/teacher',
        icon: User,
        roles: ['admin']
      },
      {
        title: 'Siswa',
        path: '/dashboard/admin/student',
        icon: User,
        roles: ['admin']
      },
      {
        title: 'Jurusan',
        path: '/dashboard/admin/major',
        icon: Folders,
        roles: ['admin']
      },
      {
        title: 'Kelas',
        path: '/dashboard/admin/class',
        icon: School,
        roles: ['admin']
      },
      {
        title: 'Mata Pelajaran',
        path: '/dashboard/admin/material',
        icon: BookOpen,
        roles: ['admin']
      },
      {
        title: 'Ujian',
        path: '/dashboard/admin/exam',
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
        path: '/dashboard/teacher/class',
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
        path: 'dashboard/student/materials',
        icon: Book,
        roles: ['student']
      },
      {
        title: 'Ujian',
        path: 'dashboard/student/materials',
        icon: Files,
        roles: ['student']
      }
    ]
  }
]

const AppSidebar = ({ role }: { role: string }) => {
  const pathname = usePathname()

  const isActive = (pathname: string, path: string) => {
    if (pathname === path) return true
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center text-center">
        <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
        <p className="font-semibold text-primary">LuminaQA</p>
      </SidebarHeader>
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
                            <SidebarMenuButton asChild isActive={isActive(pathname, item.path)}>
                              <Link href={item.path}>
                                <item.icon
                                  className={` ${
                                    isActive(pathname, item.path) ? 'text-primary-icon' : 'text-foreground'
                                  }`}
                                />

                                <span
                                  className={`${isActive(pathname, item.path) ? 'text-primary' : 'text-foreground'}`}
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
