import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Separator } from './components/separator.tsx'
import './index.css'
import Zerofee from './components/zerofee.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Separator />
    <Zerofee />
  </StrictMode>
)
