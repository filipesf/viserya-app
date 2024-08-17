import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const LogoStyled = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
`;

const LogoLabel = styled.figcaption`
  font-size: var(--font-size-lg);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -1px;
`;

export function Logo() {
  return (
    <Link href={'/'}>
      <LogoStyled>
        <Image
          src="/viserya.svg"
          alt="viserya logo"
          width={72}
          height={72}
          priority
        />
        <LogoLabel>ViseryaApp</LogoLabel>
      </LogoStyled>
    </Link>
  );
}
