import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/"!</div>
}
