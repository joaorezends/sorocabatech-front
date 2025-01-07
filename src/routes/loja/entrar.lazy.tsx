import logo from '/logo.svg';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Credentials } from '../../types';

export const Route = createLazyFileRoute('/loja/entrar')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate } = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/customers/auth/login', {
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
    <div className="flex justify-center items-center min-h-screen bg-primary-light">
      <div className="flex flex-col max-w-md py-16 px-20 bg-white shadow">
        <img className="mx-auto rounded-full w-24 h-24" src={logo} alt="sorocaba.tech logo" width="96" height="96" />
        <form
          className="flex flex-col mt-7"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Field
            name="email"
            children={(field) => (
              <input
                className="input mb-3"
                type="email"
                name={field.name}
                value={field.state.value}
                placeholder="Insira aqui seu e-mail"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <Field
            name="password"
            children={(field) => (
              <input
                className="input mb-3"
                type="password"
                name={field.name}
                value={field.state.value}
                placeholder="Senha"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <Link className="block mb-6 text-secondary text-xs" to="/loja/recuperar-senha">
            Esqueci minha senha
          </Link>
          <button className="button button-secondary" type="submit">
            Entrar
          </button>
        </form>
      </div>
      <footer className="absolute bottom-2 start-0 w-full text-sm text-neutral-500 text-center">
        © {(new Date()).getFullYear()} sorocaba.tech - Brasil - Todos os direitos reservados
      </footer>
    </div>
  )
}
