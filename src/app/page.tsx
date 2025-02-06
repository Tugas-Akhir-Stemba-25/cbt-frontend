import Breadcrumb from '@/components/atoms/Breadcrumbs'
import InitialComponent from '@/components/organisms/InitialComponent'

export default function ProductsPage() {
  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components' }]} />
      <InitialComponent />
    </div>
  )
}
