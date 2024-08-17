'use client';

import React from 'react';
import { AppProvider, ThemeProvider } from '@viserya/contexts';
import { PageHeader } from '@viserya/ui/PageHeader';
import { GlobalStyles, ResetStyles } from '@viserya/ui/shared';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeProvider>
        <ResetStyles />
        <GlobalStyles />
        <PageHeader />
        {children}
      </ThemeProvider>
    </AppProvider>
  );
}
