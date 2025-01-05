import logo from '/logo.svg';
import { useForm } from '@tanstack/react-form';
import { createLazyFileRoute, Link } from '@tanstack/react-router'

const SignIn = () => {
  const { handleSubmit, Field } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-tertiary">
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

export const Route = createLazyFileRoute('/loja/entrar')({
  component: SignIn,
})
