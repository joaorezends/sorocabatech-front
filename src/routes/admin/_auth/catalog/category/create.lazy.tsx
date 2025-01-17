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
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

export const Route = createLazyFileRoute('/admin/_auth/catalog/category/create')({
  component: RouteComponent,
})

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().max(4000).optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(250).optional(),
})

function RouteComponent() {
  const navigate = Route.useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
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
      
      if (response.ok) {
        await navigate({ to: '/admin/catalog/category/list' })
      }
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      seoTitle: '',
      seoDescription: '',
    }
  })

  const { handleSubmit, formState } = form
  const { isDirty, isValid } = formState

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link to="/admin/catalog/category/list">
                  Categorias
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Criar categoria</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <Form {...form}>
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <div className="flex flex-1 justify-center p-4">
            <div className="flex w-full max-w-4xl flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações principais</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <FormLabel>Nome da categoria *</FormLabel>
                        <FormControl>
                          <Input id="name" {...field} />
                        </FormControl>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel>Descrição</FormLabel>
                          <span className="ml-auto text-sm">{field.value?.length} de 4000 caracteres</span>
                        </div>
                        <FormControl>
                          <Textarea id="description" maxLength={4000} rows={3} {...field} />
                        </FormControl>
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
                  <FormField
                    control={form.control}
                    name="seoTitle"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel>Tag Title</FormLabel>
                          <span className="ml-auto text-sm">{field.value?.length} de 70 caracteres</span>
                        </div>
                        <FormControl>
                          <Input id="seoTitle" maxLength={70} {...field} />
                        </FormControl>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seoDescription"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel>Meta Tag Description</FormLabel>
                          <span className="ml-auto text-sm">{field.value?.length} de 250 caracteres</span>
                        </div>
                        <FormControl>
                          <Textarea id="seoDescription" maxLength={250} rows={3} {...field} />
                        </FormControl>
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
                <Button type="submit" disabled={!isDirty || !isValid || isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : 'Criar categoria'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
