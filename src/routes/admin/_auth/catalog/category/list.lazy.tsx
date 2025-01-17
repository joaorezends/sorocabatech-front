import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Category } from "@/types"
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react"

export const Route = createLazyFileRoute('/admin/_auth/catalog/category/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const [categories, setCategories] = useState<Category[]>([])
  
  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/catalog/categories',
        { credentials: 'include' }
      )

      if (response.ok) {
        setCategories(await response.json())
      }
    }

    load();
  }, [])

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Categorias</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4 pt-0">
          <Card>
            <CardHeader>
              <CardTitle>Listagem de categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                {!categories.length && <TableCaption>Sem resultados.</TableCaption>}
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da categoria</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map(category => (
                    <TableRow>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.active ? 'Ativo' : 'Inativo'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
