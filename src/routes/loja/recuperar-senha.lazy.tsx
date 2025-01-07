import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/loja/recuperar-senha')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/loja/recuperar-senha"!</div>
}
