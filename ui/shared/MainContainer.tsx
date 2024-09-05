import styled from 'styled-components';

export const MainContainer = styled.main`
  /* --text-color: var(--color-neutral-300); */

  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-md) var(--spacing-xl) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-rg);
  color: var(--color-neutral-200);


  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    color: var(--text-color);
  }

  ul {
    padding-left: var(--spacing-md);
    list-style-type: disc;
  }
`;
