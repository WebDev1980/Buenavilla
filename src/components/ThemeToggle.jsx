import React, { useEffect, useState } from 'react';
import styles from '@styles/ThemeToggle.module.css';

const STORAGE_KEY = 'vb-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  return (
    <button
      className={styles.fab}
      aria-label="Cambiar tema claro/oscuro"
      onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
      title="Alternar tema"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
