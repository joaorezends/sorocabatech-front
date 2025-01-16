import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { Credentials } from '../../types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/admin/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ search }) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + '/users/auth/session',
      {
        credentials: 'include',
      },
    )

    if (response.ok) {
      throw redirect({ to: search.redirect || '/admin' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch()

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/users/auth/login',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(credentials),
        },
      )
      
      if (response.ok) {
        await navigate({ to: search.redirect || '/admin' })
      }
    },
  })

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onBlur: z.object({
        email: z.string().email('E-mail inválido'),
        password: z.string(),
      }),
    },
    onSubmit: async ({ value }) => mutate(value),
  })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="self-center font-medium">
          sorocaba.tech
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
              }}
            >
              <div className="grid gap-6">
                <Field
                  name="email"
                  children={(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        name={field.name}
                        value={field.state.value}
                        required
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
                <Field
                  name="password"
                  children={(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        required
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />
                <Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" className="w-full" disabled={!canSubmit || isPending}>
                      {isSubmitting || isPending ? '...' : 'Entrar'}
                    </Button>
                  )}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
