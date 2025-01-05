import { createLazyFileRoute } from '@tanstack/react-router'

const Index = () => {
  return (
    <div className="min-h-screen bg-tertiary">
      loja
    </div>
  )
}

export const Route = createLazyFileRoute('/loja/')({
  component: Index,
})
