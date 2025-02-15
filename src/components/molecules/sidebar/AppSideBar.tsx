import { Book, Files, FilesIcon, Folders, LayoutGrid, User, Users } from 'lucide-react'

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
  icon: React.ComponentType
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
        roles: ['admin', 'guru', 'siswa']
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
    roles: ['guru'],
    items: [
      {
        title: 'Kelas',
        path: '/dashboard/kelas',
        icon: Users,
        roles: ['guru']
      },
      {
        title: 'Ujian',
        path: '/dashboard/ujian',
        icon: FilesIcon,
        roles: ['guru']
      }
    ]
  },

  {
    label: 'Menu Siswa',
    roles: ['siswa'],
    items: [
      {
        title: 'Mata Pelajaran',
        path: '/dashboard/mata-pelajaran',
        icon: Book,
        roles: ['siswa']
      },
      {
        title: 'Ujian',
        path: '/dashboard/ujian',
        icon: Files,
        roles: ['siswa']
      }
    ]
  }
]

const AppSidebar = ({ role }: { role: string }) => {
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
                {group.label && <SidebarGroupLabel>Master Data</SidebarGroupLabel>}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map(
                      (item, itemIndex) =>
                        item.roles.includes(role) && (
                          <SidebarMenuItem key={`item-${itemIndex}`}>
                            <SidebarMenuButton asChild>
                              <a href={item.path}>
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
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
