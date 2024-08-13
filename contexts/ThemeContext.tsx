'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LOCAL_STORAGE_THEME } from '@viserya/config/constants';
import { ThemeSwitcher } from '@viserya/ui/ThemeSwitcher';

const ThemeContext = createContext<
  | { theme: 'light' | 'dark'; setTheme: (theme: 'light' | 'dark') => void }
  | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME) as
      | 'light'
      | 'dark';

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
      localStorage.setItem(LOCAL_STORAGE_THEME, systemTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeSwitcher />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
