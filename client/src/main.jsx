import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { SidebarToggleProvider } from './context/SidebarToggleContext';
import { AuthProvider } from './context/AuthContext.jsx';
import { CurrentConversationProvider } from './context/CurrentConversationContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CurrentConversationProvider>
          <SidebarToggleProvider>
            <App />
          </SidebarToggleProvider>
        </CurrentConversationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)

