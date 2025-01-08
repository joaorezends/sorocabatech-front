import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_auth/catalog/category/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_auth/catalog/category"!</div>
}
