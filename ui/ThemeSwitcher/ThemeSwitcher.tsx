'use client';

import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@viserya/contexts';
import { Icon } from '@viserya/ui/Icon';

const ThemeSwitcherStyled = styled.button<{ $currentTheme: 'light' | 'dark' }>`
  position: fixed;
  right: var(--spacing-sm);
  bottom: var(--spacing-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-sm);
  width: var(--spacing-10);
  height: var(--spacing-10);
  border-radius: var(--spacing-md);
  cursor: pointer;
  fill: ${(props) => (props.$currentTheme === 'light' ? 'black' : 'white')};
  background-color: var(--background-color);
`;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcherStyled
      $currentTheme={theme}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Icon name="Moon" size={32} weight="fill" />
      ) : (
        <Icon name="Sun" size={32} weight="fill" />
      )}
    </ThemeSwitcherStyled>
  );
}
