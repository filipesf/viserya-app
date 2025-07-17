import styled from 'styled-components';

export const SectionContainer = styled.section<{
  $gap?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl';
  $justify?: 'start' | 'center' | 'space-between' | 'end';
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $justify }) => $justify || 'center'};
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
