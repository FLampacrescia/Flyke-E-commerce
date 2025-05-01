import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import OrderProvider from './context/OrderContext.jsx';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
  <LanguageProvider>
  <OrderProvider>
    <StrictMode>
      <App />
      <Toaster position="bottom-center" />
    </StrictMode>
  </OrderProvider>
  </LanguageProvider>
  </UserProvider>
  </BrowserRouter>
)
