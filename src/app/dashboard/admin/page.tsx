import { Metadata } from 'next'

import { defineMetadata } from '@/lib/metadata'

import ContentDashboard from '@/components/organisms/dashboard/admin/ContentDashboard'

import LayoutAdmin from './layout'

export const metadata: Metadata = defineMetadata({
  title: 'Dashboard Admin'
})

export default async function Test() {
  return (
    <LayoutAdmin>
      <ContentDashboard />
    </LayoutAdmin>
  )
}
