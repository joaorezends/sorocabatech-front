import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/"!</div>
}
