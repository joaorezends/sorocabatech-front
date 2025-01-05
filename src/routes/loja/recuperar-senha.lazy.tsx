import { createLazyFileRoute } from '@tanstack/react-router'

const RecoverPassword = () => {
  return (
    <div className="min-h-screen bg-tertiary">
      recuperar senha
    </div>
  )
}

export const Route = createLazyFileRoute('/loja/recuperar-senha')({
  component: RecoverPassword,
})
