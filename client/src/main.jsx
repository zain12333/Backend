import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppcontextProvider } from './context/Appcontext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppcontextProvider>
    {/* // ya backend ka lya use karna hai jo ky  app ka routes ko set kaya gy */}
   <App />
  </AppcontextProvider>
  </BrowserRouter>,
)
