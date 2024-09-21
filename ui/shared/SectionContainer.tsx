import styled from 'styled-components';

export const SectionContainer = styled.section<{
  $gap?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl';
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-${({ $gap }) => $gap || '3'});
  width: 100%;

  a {
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
`;
