import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css';
import { CartProvider } from "./context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="646428028394-gp3mhtk8tvb45rov640k2d11m6qsfpcc.apps.googleusercontent.com">
      <CartProvider>
        <App />
      </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
