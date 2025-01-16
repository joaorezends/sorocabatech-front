import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import z from 'zod'
import { Credentials } from '../../types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/loja/entrar')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ search }) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + '/customers/auth/session',
      {
        credentials: 'include',
      },
    )

    if (response.ok) {
      throw redirect({ to: search.redirect || '/loja' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/customers/auth/login',
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
        await navigate({ to: search.redirect || '/loja' })
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
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="font-medium">
            sorocaba.tech
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Entre em sua conta</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Digite seu e-mail abaixo para entrar em sua conta
                </p>
              </div>
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
                      <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        <Link
                          to="/loja/recuperar-senha"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Esqueceu sua senha?
                        </Link>
                      </div>
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
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link to="/loja/cadastrar" className="underline underline-offset-4">
                  Inscrever-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  )
}
