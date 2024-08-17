import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
  width: 100%;
  max-width: 640px;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--card-background-color);
`;
