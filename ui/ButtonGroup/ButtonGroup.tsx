import styled from 'styled-components';

type ButtonGroupProps = {
  $gap?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl';
  $justify?: 'start' | 'center' | 'space-between' | 'end';
  $width?: string;
};

export const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-${({ $gap }) => $gap || '3'});
  justify-content: ${({ $justify }) => $justify || 'center'};
  width: ${({ $width }) => $width || 'auto'};
`;
