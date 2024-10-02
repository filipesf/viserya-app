import styled from 'styled-components';

export const CharacterProfileAvatar = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-rg);
  flex-shrink: 0;
  max-width: 256px;

  img {
    display: inline-block;
    border: 3px solid var(--quote-border-color);
    border-radius: var(--border-radius-md);
    width: 100%;
  }
`;
