import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { SushiProvider } from './context/SushiContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SushiProvider>
        <App />
      </SushiProvider>
    </BrowserRouter>
  </StrictMode>
);