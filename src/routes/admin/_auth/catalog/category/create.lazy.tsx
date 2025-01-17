import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useForm } from '@tanstack/react-form'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Category } from '../../../../../types'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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
      description: '',
      seoTitle: '',
      seoDescription: '',
    },
    validators: {
      onBlur: z.object({
        name: z.string(),
        description: z.string().max(4000),
        seoTitle: z.string().max(70),
        seoDescription: z.string().max(250),
      }),
    },
    onSubmit: async ({ value }) => mutate(value),
  })

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/catalog/category/list">
                    Categorias
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Criar categoria</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <form
          className="flex flex-1 flex-col gap-4 p-4 pt-0"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Informações principais</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Field
                name="name"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da categoria *</Label>
                    <Input
                      id="name"
                      name={field.name}
                      value={field.state.value}
                      required
                      placeholder="Ex. Carregadores"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <Field
                name="description"
                children={(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="description">Descrição</Label>
                      <span className="ml-auto text-sm">{field.state.value.length} de 4000 caracteres</span>
                    </div>
                    <Textarea
                      id="description"
                      name={field.name}
                      value={field.state.value}
                      maxLength={4000}
                      rows={3}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Field
                name="seoTitle"
                children={(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="seoTitle">Tag Title</Label>
                      <span className="ml-auto text-sm">{field.state.value.length} de 70 caracteres</span>
                    </div>
                    <Input
                      id="seoTitle"
                      name={field.name}
                      value={field.state.value}
                      maxLength={70}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <Field
                name="seoDescription"
                children={(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="seoDescription">Meta Tag Description</Label>
                      <span className="ml-auto text-sm">{field.state.value.length} de 250 caracteres</span>
                    </div>
                    <Textarea
                      id="seoDescription"
                      name={field.name}
                      value={field.state.value}
                      maxLength={250}
                      rows={3}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </CardContent>
          </Card>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" asChild>
              <Link to="/admin/catalog/category/list">
                  Cancelar
              </Link>
            </Button>
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isPending}
                >
                  {isSubmitting || isPending ? '...' : 'Criar categoria'}
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
