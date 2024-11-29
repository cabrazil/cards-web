import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
import CreditCardBlog from './components/CreditCardBlog.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CreditCardBlog />
  </StrictMode>
)
