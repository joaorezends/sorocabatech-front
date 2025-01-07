import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/loja/_auth/conta/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/loja/conta/"!</div>
}
