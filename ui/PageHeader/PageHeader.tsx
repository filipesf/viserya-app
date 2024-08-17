import styled from 'styled-components';
import { Logo } from '@viserya/ui/Logo';

export const PageHeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl) var(--spacing-md);
  max-width: 960px;
  margin: 0 auto;
`;

export function PageHeader() {
  return (
    <PageHeaderStyled>
      <Logo />
    </PageHeaderStyled>
  );
}
