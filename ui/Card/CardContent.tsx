import styled from 'styled-components';

export const CardContent = styled.p`
  font-style: italic;
  font-size: var(--font-size-lg);
  line-height: 1.333;
  letter-spacing: -0.3px;
  text-align: center;
  text-wrap: pretty;

  &::first-letter {
    text-transform: capitalize;
  }
`;
