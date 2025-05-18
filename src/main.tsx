import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GenreProvider } from './contexts/GenreContext'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GenreProvider>
        <App />
      </GenreProvider>
    </BrowserRouter>
  </StrictMode>,
)
