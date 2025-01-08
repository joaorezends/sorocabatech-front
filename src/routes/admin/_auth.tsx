import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import Icon from '../../components/Icon'

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
    icon: <Icon name="house" />,
    name: 'Início',
    path: '/admin',
  },
  {
    icon: <Icon name="box" />,
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
                    <Icon name="chevronDown" width={14} height={14} />
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
