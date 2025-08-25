// Forzar tema claro por defecto antes de montar la app
(function () {
  const key = 'vb-theme';
  const theme = localStorage.getItem(key) || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, theme);
  }
})();

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@styles/variables.css';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
