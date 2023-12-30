import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { FiltersProvider } from './contexts/filters.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </StrictMode>
);
