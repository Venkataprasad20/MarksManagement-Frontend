import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';   // ✅ IMPORT THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>       {/* ✅ WRAP YOUR APP */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
