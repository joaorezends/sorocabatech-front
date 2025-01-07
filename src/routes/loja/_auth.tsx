import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/loja/_auth')({
  beforeLoad: async ({ location }) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + '/customers/auth/session',
      {
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw redirect({
        to: '/loja/entrar',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
