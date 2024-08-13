'use client';

import React from 'react';
import { AppProvider, ThemeProvider } from '@viserya/contexts';
import { GlobalStyles, ResetStyles } from '@viserya/ui/shared';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeProvider>
        <ResetStyles />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppProvider>
  );
}
