import { useForm } from '@tanstack/react-form'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Category } from '../../../../../types'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export const Route = createLazyFileRoute('/admin/_auth/catalog/category/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<Category>) => {
      (Object.keys(data) as (keyof Category)[]).forEach((key) => {
        if (data[key] === '') {
          delete data[key]
        }
      })

      const response = await fetch(
        import.meta.env.VITE_API_URL + '/catalog/categories',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      
      console.log(response)
    },
  })

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      name: '',
      seoTitle: '',
      seoDescription: '',
    },
    validators: {
      onBlur: z.object({
        name: z.string(),
        seoTitle: z.string().max(70, 'A string deve conter no máximo 70 caracteres'),
        seoDescription: z.string().max(250, 'A string deve conter no máximo 250 caracteres'),
      }),
    },
    onSubmit: async ({ value }) => mutate(value),
  })

  return (
    <>
      <h1 className="flex items-center mb-8 text-primary-dark font-semibold">
        <Link className="flex items-center gap-2.5 text-xl" to="/admin/catalog/category/list">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
          Categorias
        </Link>
        <span className="px-2">/</span>
        <span className="text-2xl">Criar categoria</span>
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit()
        }}
      >
        <section className="bg-white border rounded">
          <header className="py-6 px-10 border-b">
            <h2 className="text-neutral-700 text-xl font-semibold">
              Informações principais
            </h2>
          </header>

          <div className="py-6 px-10">
            <Field
              name="name"
              children={(field) => (
                <div className="mb-5">
                  <label className="label" htmlFor="name">
                    Nome da categoria *
                  </label>
                  <input
                    id="name"
                    className="input"
                    name={field.name}
                    value={field.state.value}
                    required
                    placeholder="Ex. Carregadores"
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
          </div>
        </section>

        <section className="mt-10 bg-white border rounded">
          <header className="py-6 px-10 border-b">
            <h2 className="text-neutral-700 text-xl font-semibold">
              SEO
            </h2>
          </header>

          <div className="w-2/3 py-6 px-10">
            <Field
              name="seoTitle"
              children={(field) => (
                <div className="mb-5">
                  <div className="flex items-center justify-between">
                    <label className="label" htmlFor="seoTitle">
                      Tag Title
                    </label>
                    <span className="text-xs">{field.state.value.length} de 70 caracteres</span>
                  </div>
                  <input
                    id="seoTitle"
                    className="input"
                    name={field.name}
                    value={field.state.value}
                    maxLength={70}
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
              name="seoDescription"
              children={(field) => (
                <div className="mb-5">
                  <div className="flex items-center justify-between">
                    <label className="label" htmlFor="seoDescription">
                      Meta Tag Description
                    </label>
                    <span className="text-xs">{field.state.value.length} de 250 caracteres</span>
                  </div>
                  <textarea
                    id="seoDescription"
                    className="textarea"
                    name={field.name}
                    value={field.state.value}
                    maxLength={250}
                    rows={3}
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
          </div>
        </section>

        <div className="absolute top-full end-0 start-0 flex justify-center py-3 px-10 bg-white">
          <div className="flex justify-end gap-4 w-full max-w-4xl">
            <Link className="button button-outline-primary-dark" to="/admin/catalog/category/list">
                Cancelar
            </Link>

            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={!canSubmit || isPending}
                >
                  {isSubmitting || isPending ? '...' : 'Criar categoria'}
                </button>
              )}
            />
          </div>
        </div>
      </form>
    </>
  )
}
