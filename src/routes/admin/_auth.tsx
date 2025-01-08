import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_auth')({
  beforeLoad: async ({ location }) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/users/auth/session', {
      credentials: 'include'
    })

    if (!response.ok) {
      throw redirect({
        to: '/admin/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

const menu = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>,
    name: 'Início',
    path: '/admin',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/></svg>,
    name: 'Produtos',
    children: [
      {
        name: 'Listar produtos',
        path: '/admin/catalog/product/list',
      },
      {
        name: 'Criar produto',
        path: '/admin/catalog/product/create',
      },
      {
        name: 'Categorias',
        path: '/admin/catalog/category/list',
      },
    ]
  },
]

function RouteComponent() {
  return (
    <>
      <header className="fixed top-0 start-0 z-10 flex items-center w-full h-16 px-8 bg-white shadow-lg">
        <span className="inline-block py-0.5 px-2 bg-primary-dark text-primary-light text-lg font-bold">
          sorocaba<span className="text-primary">.tech</span>
        </span>
      </header>
      <aside className="fixed top-16 bottom-0 start-0 z-10 w-64 py-2.5 bg-neutral-200">
        <ul>
          {menu.map((item, index) =>
            <li key={index}>
              <Link className="flex items-center gap-4 py-3 px-6 text-neutral-700 text-sm font-semibold" to={item.path ?? 'javascript:;'}>
                {item.icon}
                {item.name}

                {item.children?.length &&
                  <span className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </span>
                }
              </Link>

              {item.children &&
                <ul className="mb-1">
                  {item.children.map((subItem, i) =>
                    <li key={i} className="py-1 pe-6 ps-14">
                      <Link className="text-neutral-700 text-sm" to={subItem.path}>
                        {subItem.name}
                      </Link>
                    </li>
                  )}
                </ul>
              }
            </li>
          )}
        </ul>
      </aside>
      <main className="relative flex justify-center mt-16 ml-64 py-6 px-10 bg-neutral-100">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </>
  )
}
