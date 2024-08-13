import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 640px;
  gap: var(--spacing-6);
  width: 100%;
  padding: var(--spacing-6);
  border-radius: var(--border-radius-md);
  background-color: var(--card-background-color);
`;
