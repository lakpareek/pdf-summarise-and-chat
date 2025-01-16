import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarToggleProvider } from './context/SidebarToggleContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarToggleProvider>
      <App />
    </SidebarToggleProvider>
  </StrictMode>
)

