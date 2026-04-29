import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')!

document.body.classList.add('iqb-app-body')
rootElement.classList.add('iqb-app-root')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
