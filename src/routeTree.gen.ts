/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LojaEntrarImport } from './routes/loja/entrar'
import { Route as LojaAuthImport } from './routes/loja/_auth'
import { Route as AdminLoginImport } from './routes/admin/login'
import { Route as AdminAuthImport } from './routes/admin/_auth'

// Create Virtual Routes

const LojaImport = createFileRoute('/loja')()
const AdminImport = createFileRoute('/admin')()
const IndexLazyImport = createFileRoute('/')()
const LojaIndexLazyImport = createFileRoute('/loja/')()
const LojaRecuperarSenhaLazyImport = createFileRoute('/loja/recuperar-senha')()
const LojaCadastrarLazyImport = createFileRoute('/loja/cadastrar')()
const AdminAuthIndexLazyImport = createFileRoute('/admin/_auth/')()
const LojaAuthContaIndexLazyImport = createFileRoute('/loja/_auth/conta/')()
const AdminAuthCatalogCategoryListLazyImport = createFileRoute(
  '/admin/_auth/catalog/category/list',
)()
const AdminAuthCatalogCategoryCreateLazyImport = createFileRoute(
  '/admin/_auth/catalog/category/create',
)()

// Create/Update Routes

const LojaRoute = LojaImport.update({
  id: '/loja',
  path: '/loja',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const LojaIndexLazyRoute = LojaIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LojaRoute,
} as any).lazy(() => import('./routes/loja/index.lazy').then((d) => d.Route))

const LojaRecuperarSenhaLazyRoute = LojaRecuperarSenhaLazyImport.update({
  id: '/recuperar-senha',
  path: '/recuperar-senha',
  getParentRoute: () => LojaRoute,
} as any).lazy(() =>
  import('./routes/loja/recuperar-senha.lazy').then((d) => d.Route),
)

const LojaCadastrarLazyRoute = LojaCadastrarLazyImport.update({
  id: '/cadastrar',
  path: '/cadastrar',
  getParentRoute: () => LojaRoute,
} as any).lazy(() =>
  import('./routes/loja/cadastrar.lazy').then((d) => d.Route),
)

const LojaEntrarRoute = LojaEntrarImport.update({
  id: '/entrar',
  path: '/entrar',
  getParentRoute: () => LojaRoute,
} as any)

const LojaAuthRoute = LojaAuthImport.update({
  id: '/_auth',
  getParentRoute: () => LojaRoute,
} as any)

const AdminLoginRoute = AdminLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAuthRoute = AdminAuthImport.update({
  id: '/_auth',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAuthIndexLazyRoute = AdminAuthIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AdminAuthRoute,
} as any).lazy(() =>
  import('./routes/admin/_auth.index.lazy').then((d) => d.Route),
)

const LojaAuthContaIndexLazyRoute = LojaAuthContaIndexLazyImport.update({
  id: '/conta/',
  path: '/conta/',
  getParentRoute: () => LojaAuthRoute,
} as any).lazy(() =>
  import('./routes/loja/_auth/conta/index.lazy').then((d) => d.Route),
)

const AdminAuthCatalogCategoryListLazyRoute =
  AdminAuthCatalogCategoryListLazyImport.update({
    id: '/catalog/category/list',
    path: '/catalog/category/list',
    getParentRoute: () => AdminAuthRoute,
  } as any).lazy(() =>
    import('./routes/admin/_auth/catalog/category/list.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthCatalogCategoryCreateLazyRoute =
  AdminAuthCatalogCategoryCreateLazyImport.update({
    id: '/catalog/category/create',
    path: '/catalog/category/create',
    getParentRoute: () => AdminAuthRoute,
  } as any).lazy(() =>
    import('./routes/admin/_auth/catalog/category/create.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/_auth': {
      id: '/admin/_auth'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAuthImport
      parentRoute: typeof AdminRoute
    }
    '/admin/login': {
      id: '/admin/login'
      path: '/login'
      fullPath: '/admin/login'
      preLoaderRoute: typeof AdminLoginImport
      parentRoute: typeof AdminImport
    }
    '/loja': {
      id: '/loja'
      path: '/loja'
      fullPath: '/loja'
      preLoaderRoute: typeof LojaImport
      parentRoute: typeof rootRoute
    }
    '/loja/_auth': {
      id: '/loja/_auth'
      path: '/loja'
      fullPath: '/loja'
      preLoaderRoute: typeof LojaAuthImport
      parentRoute: typeof LojaRoute
    }
    '/loja/entrar': {
      id: '/loja/entrar'
      path: '/entrar'
      fullPath: '/loja/entrar'
      preLoaderRoute: typeof LojaEntrarImport
      parentRoute: typeof LojaImport
    }
    '/loja/cadastrar': {
      id: '/loja/cadastrar'
      path: '/cadastrar'
      fullPath: '/loja/cadastrar'
      preLoaderRoute: typeof LojaCadastrarLazyImport
      parentRoute: typeof LojaImport
    }
    '/loja/recuperar-senha': {
      id: '/loja/recuperar-senha'
      path: '/recuperar-senha'
      fullPath: '/loja/recuperar-senha'
      preLoaderRoute: typeof LojaRecuperarSenhaLazyImport
      parentRoute: typeof LojaImport
    }
    '/loja/': {
      id: '/loja/'
      path: '/'
      fullPath: '/loja/'
      preLoaderRoute: typeof LojaIndexLazyImport
      parentRoute: typeof LojaImport
    }
    '/admin/_auth/': {
      id: '/admin/_auth/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminAuthIndexLazyImport
      parentRoute: typeof AdminAuthImport
    }
    '/loja/_auth/conta/': {
      id: '/loja/_auth/conta/'
      path: '/conta'
      fullPath: '/loja/conta'
      preLoaderRoute: typeof LojaAuthContaIndexLazyImport
      parentRoute: typeof LojaAuthImport
    }
    '/admin/_auth/catalog/category/create': {
      id: '/admin/_auth/catalog/category/create'
      path: '/catalog/category/create'
      fullPath: '/admin/catalog/category/create'
      preLoaderRoute: typeof AdminAuthCatalogCategoryCreateLazyImport
      parentRoute: typeof AdminAuthImport
    }
    '/admin/_auth/catalog/category/list': {
      id: '/admin/_auth/catalog/category/list'
      path: '/catalog/category/list'
      fullPath: '/admin/catalog/category/list'
      preLoaderRoute: typeof AdminAuthCatalogCategoryListLazyImport
      parentRoute: typeof AdminAuthImport
    }
  }
}

// Create and export the route tree

interface AdminAuthRouteChildren {
  AdminAuthIndexLazyRoute: typeof AdminAuthIndexLazyRoute
  AdminAuthCatalogCategoryCreateLazyRoute: typeof AdminAuthCatalogCategoryCreateLazyRoute
  AdminAuthCatalogCategoryListLazyRoute: typeof AdminAuthCatalogCategoryListLazyRoute
}

const AdminAuthRouteChildren: AdminAuthRouteChildren = {
  AdminAuthIndexLazyRoute: AdminAuthIndexLazyRoute,
  AdminAuthCatalogCategoryCreateLazyRoute:
    AdminAuthCatalogCategoryCreateLazyRoute,
  AdminAuthCatalogCategoryListLazyRoute: AdminAuthCatalogCategoryListLazyRoute,
}

const AdminAuthRouteWithChildren = AdminAuthRoute._addFileChildren(
  AdminAuthRouteChildren,
)

interface AdminRouteChildren {
  AdminAuthRoute: typeof AdminAuthRouteWithChildren
  AdminLoginRoute: typeof AdminLoginRoute
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminAuthRoute: AdminAuthRouteWithChildren,
  AdminLoginRoute: AdminLoginRoute,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

interface LojaAuthRouteChildren {
  LojaAuthContaIndexLazyRoute: typeof LojaAuthContaIndexLazyRoute
}

const LojaAuthRouteChildren: LojaAuthRouteChildren = {
  LojaAuthContaIndexLazyRoute: LojaAuthContaIndexLazyRoute,
}

const LojaAuthRouteWithChildren = LojaAuthRoute._addFileChildren(
  LojaAuthRouteChildren,
)

interface LojaRouteChildren {
  LojaAuthRoute: typeof LojaAuthRouteWithChildren
  LojaEntrarRoute: typeof LojaEntrarRoute
  LojaCadastrarLazyRoute: typeof LojaCadastrarLazyRoute
  LojaRecuperarSenhaLazyRoute: typeof LojaRecuperarSenhaLazyRoute
  LojaIndexLazyRoute: typeof LojaIndexLazyRoute
}

const LojaRouteChildren: LojaRouteChildren = {
  LojaAuthRoute: LojaAuthRouteWithChildren,
  LojaEntrarRoute: LojaEntrarRoute,
  LojaCadastrarLazyRoute: LojaCadastrarLazyRoute,
  LojaRecuperarSenhaLazyRoute: LojaRecuperarSenhaLazyRoute,
  LojaIndexLazyRoute: LojaIndexLazyRoute,
}

const LojaRouteWithChildren = LojaRoute._addFileChildren(LojaRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminAuthRouteWithChildren
  '/admin/login': typeof AdminLoginRoute
  '/loja': typeof LojaAuthRouteWithChildren
  '/loja/entrar': typeof LojaEntrarRoute
  '/loja/cadastrar': typeof LojaCadastrarLazyRoute
  '/loja/recuperar-senha': typeof LojaRecuperarSenhaLazyRoute
  '/loja/': typeof LojaIndexLazyRoute
  '/admin/': typeof AdminAuthIndexLazyRoute
  '/loja/conta': typeof LojaAuthContaIndexLazyRoute
  '/admin/catalog/category/create': typeof AdminAuthCatalogCategoryCreateLazyRoute
  '/admin/catalog/category/list': typeof AdminAuthCatalogCategoryListLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminAuthIndexLazyRoute
  '/admin/login': typeof AdminLoginRoute
  '/loja': typeof LojaIndexLazyRoute
  '/loja/entrar': typeof LojaEntrarRoute
  '/loja/cadastrar': typeof LojaCadastrarLazyRoute
  '/loja/recuperar-senha': typeof LojaRecuperarSenhaLazyRoute
  '/loja/conta': typeof LojaAuthContaIndexLazyRoute
  '/admin/catalog/category/create': typeof AdminAuthCatalogCategoryCreateLazyRoute
  '/admin/catalog/category/list': typeof AdminAuthCatalogCategoryListLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/_auth': typeof AdminAuthRouteWithChildren
  '/admin/login': typeof AdminLoginRoute
  '/loja': typeof LojaRouteWithChildren
  '/loja/_auth': typeof LojaAuthRouteWithChildren
  '/loja/entrar': typeof LojaEntrarRoute
  '/loja/cadastrar': typeof LojaCadastrarLazyRoute
  '/loja/recuperar-senha': typeof LojaRecuperarSenhaLazyRoute
  '/loja/': typeof LojaIndexLazyRoute
  '/admin/_auth/': typeof AdminAuthIndexLazyRoute
  '/loja/_auth/conta/': typeof LojaAuthContaIndexLazyRoute
  '/admin/_auth/catalog/category/create': typeof AdminAuthCatalogCategoryCreateLazyRoute
  '/admin/_auth/catalog/category/list': typeof AdminAuthCatalogCategoryListLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/admin'
    | '/admin/login'
    | '/loja'
    | '/loja/entrar'
    | '/loja/cadastrar'
    | '/loja/recuperar-senha'
    | '/loja/'
    | '/admin/'
    | '/loja/conta'
    | '/admin/catalog/category/create'
    | '/admin/catalog/category/list'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/admin'
    | '/admin/login'
    | '/loja'
    | '/loja/entrar'
    | '/loja/cadastrar'
    | '/loja/recuperar-senha'
    | '/loja/conta'
    | '/admin/catalog/category/create'
    | '/admin/catalog/category/list'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/admin/_auth'
    | '/admin/login'
    | '/loja'
    | '/loja/_auth'
    | '/loja/entrar'
    | '/loja/cadastrar'
    | '/loja/recuperar-senha'
    | '/loja/'
    | '/admin/_auth/'
    | '/loja/_auth/conta/'
    | '/admin/_auth/catalog/category/create'
    | '/admin/_auth/catalog/category/list'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AdminRoute: typeof AdminRouteWithChildren
  LojaRoute: typeof LojaRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AdminRoute: AdminRouteWithChildren,
  LojaRoute: LojaRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/admin",
        "/loja"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/admin": {
      "filePath": "admin",
      "children": [
        "/admin/_auth",
        "/admin/login"
      ]
    },
    "/admin/_auth": {
      "filePath": "admin/_auth.tsx",
      "parent": "/admin",
      "children": [
        "/admin/_auth/",
        "/admin/_auth/catalog/category/create",
        "/admin/_auth/catalog/category/list"
      ]
    },
    "/admin/login": {
      "filePath": "admin/login.tsx",
      "parent": "/admin"
    },
    "/loja": {
      "filePath": "loja",
      "children": [
        "/loja/_auth",
        "/loja/entrar",
        "/loja/cadastrar",
        "/loja/recuperar-senha",
        "/loja/"
      ]
    },
    "/loja/_auth": {
      "filePath": "loja/_auth.tsx",
      "parent": "/loja",
      "children": [
        "/loja/_auth/conta/"
      ]
    },
    "/loja/entrar": {
      "filePath": "loja/entrar.tsx",
      "parent": "/loja"
    },
    "/loja/cadastrar": {
      "filePath": "loja/cadastrar.lazy.tsx",
      "parent": "/loja"
    },
    "/loja/recuperar-senha": {
      "filePath": "loja/recuperar-senha.lazy.tsx",
      "parent": "/loja"
    },
    "/loja/": {
      "filePath": "loja/index.lazy.tsx",
      "parent": "/loja"
    },
    "/admin/_auth/": {
      "filePath": "admin/_auth.index.lazy.tsx",
      "parent": "/admin/_auth"
    },
    "/loja/_auth/conta/": {
      "filePath": "loja/_auth/conta/index.lazy.tsx",
      "parent": "/loja/_auth"
    },
    "/admin/_auth/catalog/category/create": {
      "filePath": "admin/_auth/catalog/category/create.lazy.tsx",
      "parent": "/admin/_auth"
    },
    "/admin/_auth/catalog/category/list": {
      "filePath": "admin/_auth/catalog/category/list.lazy.tsx",
      "parent": "/admin/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
