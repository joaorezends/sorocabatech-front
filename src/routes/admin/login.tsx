import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'

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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch()

  const submitHandler = useCallback(async (credentials: z.infer<typeof formSchema>) => {
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitHandler)}>
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
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input id="password" type="password" {...field} />
                        </FormControl>
                      </div>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={!isDirty || !isValid || isSubmitting}>
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    Entrar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
