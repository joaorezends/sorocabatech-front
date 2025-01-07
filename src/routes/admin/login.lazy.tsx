import { useForm } from '@tanstack/react-form';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Credentials } from '../../types';
import { useMutation } from '@tanstack/react-query';
import Icon from '../../components/Icon';
import { useCallback, useState } from 'react';

export const Route = createLazyFileRoute('/admin/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword])

  const { mutate } = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/users/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      console.log(response);
    },
    onSuccess: () => {
    },
  })

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => mutate(value),
  })
  
  return (
    <main className="flex justify-center w-2/5 min-h-screen">
      <div className="flex flex-col w-96 py-14">
        <header className="mb-20">
          <h1 className="inline-block py-0.5 px-2 bg-primary-dark text-primary-light text-lg font-bold">
            sorocaba<span className="text-primary">.tech</span>
          </h1>
        </header>

        <section>
          <h2 className="text-primary-dark text-2xl font-semibold">Bem-vindo!</h2>

          <form
            className="mt-14"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <div className="mb-5">
              <label className="label" htmlFor="email">
                E-mail *
              </label>
              <Field
                name="email"
                children={(field) => (
                  <input
                    id="email"
                    className="input"
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    autoComplete="username"
                    placeholder="Digite seu e-mail"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
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
                    <input
                      id="password"
                      className="input"
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={field.state.value}
                      autoComplete="password"
                      placeholder="Digite sua senha"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
                <button className="absolute top-1/2 end-3 opacity-50 -translate-y-1/2" type="button" tabIndex={-1} onClick={() => toggleShowPassword()}>
                  {!showPassword && <Icon name="eye" width={20} height={20} />}
                  {showPassword && <Icon name="eyeSlash" width={20} height={20} />}
                </button>
              </div>
            </div>

            <button className="button button-primary w-full" type="submit">
              Entrar
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
