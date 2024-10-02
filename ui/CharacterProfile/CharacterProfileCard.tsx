import styled from 'styled-components';

export const CharacterProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: start;
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--card-background-color);

  hr {
    margin: var(--spacing-rg) 0;
  }
`;
