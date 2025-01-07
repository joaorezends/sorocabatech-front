import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_auth')({
  beforeLoad: async ({ location }) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/users/auth/session', {
      credentials: 'include'
    })

    if (!response.ok) {
      throw redirect({
        to: '/admin/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
