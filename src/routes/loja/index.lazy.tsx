import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/loja/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/loja/"!</div>
}
