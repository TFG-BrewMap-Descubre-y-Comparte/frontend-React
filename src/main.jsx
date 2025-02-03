import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouteForm from '../components/Routes/RouteForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteForm />
  </StrictMode>,
)
