import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { Loader2 } from 'lucide-react'

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

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1),
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const submitHandler = useCallback(async (credentials: z.infer<typeof formSchema>) => {
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
  }, [navigate, search.redirect])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const { formState } = form
  const { isDirty, isValid, isSubmitting } = formState

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
            <Form {...form}>
              <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(submitHandler)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Entre em sua conta</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Digite seu e-mail abaixo para entrar em sua conta
                  </p>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" {...field} />
                        </FormControl>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel>Senha</FormLabel>
                          <Link
                            to="/loja/recuperar-senha"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Esqueceu sua senha?
                          </Link>
                        </div>
                        <FormControl>
                          <Input id="password" type="password" {...field} />
                        </FormControl>
                      </div>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={!isDirty || !isValid || isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Entrar'}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Não tem uma conta?{" "}
                  <Link to="/loja/cadastrar" className="underline underline-offset-4">
                    Inscrever-se
                  </Link>
                </div>
              </form>
            </Form>
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
