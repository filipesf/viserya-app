'use client';

import React from 'react';
import { AppProvider, ThemeProvider } from '@viserya/contexts';
import { GlobalStyles, ResetStyles, MainContainer } from '@viserya/ui';
import { PageHeader } from '@viserya/ui/PageHeader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeProvider>
        <ResetStyles />
        <GlobalStyles />
        <PageHeader />
        <MainContainer>{children}</MainContainer>
      </ThemeProvider>
    </AppProvider>
  );
}
