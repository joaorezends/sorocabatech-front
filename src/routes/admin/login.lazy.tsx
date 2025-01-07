import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/login"!</div>
}
