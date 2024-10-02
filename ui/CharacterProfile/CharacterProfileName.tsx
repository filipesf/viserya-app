import styled from 'styled-components';

export const CharacterProfileName = styled.p`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--heading-text-color);

  small {
    font-size: var(--font-size-rg);
    font-weight: 400;
    color: var(--text-color);
  }
`;
