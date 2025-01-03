import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Linktree from './pages/Linktree.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Linktree />
  </StrictMode>,
)
