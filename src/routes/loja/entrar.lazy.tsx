import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import z from 'zod'
import Icon from '../../components/Icon'
import { Credentials } from '../../types'

export const Route = createLazyFileRoute('/loja/entrar')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  const { mutate } = useMutation({
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
      console.log(response)
    },
    onSuccess: () => {},
  })

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onBlur: z.object({
        email: z.string({ required_error: 'E-mail é obrigatório.' }).email({ message: 'E-mail inválido.' }),
        password: z.string({ required_error: 'Senha é obrigatório.' }),
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
              <div className="mb-5">
                <label className="label" htmlFor="email">
                  E-mail *
                </label>
                <Field
                  name="email"
                  children={(field) => (
                    <>
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
                          {[...field.state.meta.errors, ...field.state.meta.errors].map((error) => <>{error}<br /></>)}
                        </em>
                      ) : null}
                    </>
                  )}
                />
              </div>

              <div className="mb-5">
                <label className="label" htmlFor="password">
                  Senha *
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    children={(field) => (
                      <>
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
                            {[...field.state.meta.errors, ...field.state.meta.errors].map((error) => <>{error}<br /></>)}
                          </em>
                        ) : null}
                      </>
                    )}
                  />
                  <button
                    className="absolute top-1/2 end-3 opacity-50 -translate-y-1/2"
                    type="button"
                    tabIndex={-1}
                    onClick={() => toggleShowPassword()}
                  >
                    {!showPassword && <Icon name="eye" width={20} height={20} />}
                    {showPassword && (
                      <Icon name="eyeSlash" width={20} height={20} />
                    )}
                  </button>
                </div>
              </div>

              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button className="button button-primary w-full" type="submit" disabled={!canSubmit}>
                    {isSubmitting ? '...' : 'Entrar'}
                  </button>
                )}
              />

              <Link className="block mt-4 text-primary text-sm text-center font-semibold hover:text-primary-dark" to="/loja/recuperar-senha">
                Esqueceu sua senha?
              </Link>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
