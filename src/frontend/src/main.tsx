import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App';
import './index.css';

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>
);
