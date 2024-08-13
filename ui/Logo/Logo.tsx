'use client';

import Image from 'next/image';
import styled from 'styled-components';

const LogoStyled = styled.figure`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`;

const LogoLabel = styled.figcaption`
  font-size: var(--font-size-lg);
  font-weight: 700;
  line-height: 1;
  text-transform: capitalize;
  letter-spacing: -1px;
`;

export function Logo() {
  return (
    <LogoStyled>
      <Image src="/viserya.svg" alt="viserya logo" width={48} height={48} />
      <LogoLabel>Viserya App</LogoLabel>
    </LogoStyled>
  );
}
