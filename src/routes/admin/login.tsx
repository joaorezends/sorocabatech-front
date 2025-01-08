import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import z from 'zod'
import { Credentials } from '../../types'

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
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

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
    <div className="bg-primary-dark">
      <main className="flex justify-center w-2/5 min-h-screen bg-white">
        <div className="flex flex-col w-96 py-14">
          <header className="mb-20">
            <h1 className="inline-block py-0.5 px-2 bg-primary-dark text-primary-light text-lg font-bold">
              sorocaba<span className="text-primary">.tech</span>
            </h1>
          </header>

          <section>
            <h2 className="text-primary-dark text-2xl font-semibold">
              Bem-vindo!
            </h2>

            <form
              className="mt-14"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
              }}
            >
              <Field
                name="email"
                children={(field) => (
                  <div className="mb-5">
                    <label className="label" htmlFor="email">
                      E-mail *
                    </label>
                    <input
                      id="email"
                      className="input"
                      type="email"
                      name={field.name}
                      value={field.state.value}
                      required
                      autoComplete="username"
                      placeholder="Digite seu e-mail"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length ? (
                      <em className="block text-red-500 text-sm mt-0.5">
                        {field.state.meta.errors.join(' ')}
                      </em>
                    ) : null}
                  </div>
                )}
              />

              <Field
                name="password"
                children={(field) => (
                  <div className="mb-5">
                    <label className="label" htmlFor="password">
                      Senha *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        className="input"
                        type={showPassword ? 'text' : 'password'}
                        name={field.name}
                        value={field.state.value}
                        required
                        autoComplete="password"
                        placeholder="Digite sua senha"
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.length ? (
                        <em className="block text-red-500 text-sm mt-0.5">
                          {field.state.meta.errors.join(' ')}
                        </em>
                      ) : null}
                      <button
                        className="absolute top-1/2 end-3 opacity-50 -translate-y-1/2"
                        type="button"
                        tabIndex={-1}
                        onClick={() => toggleShowPassword()}
                      >
                        {!showPassword && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg>
                        )}
                        {showPassword && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              />

              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    className="button button-primary w-full"
                    type="submit"
                    disabled={!canSubmit || isPending}
                  >
                    {isSubmitting || isPending ? '...' : 'Entrar'}
                  </button>
                )}
              />
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
