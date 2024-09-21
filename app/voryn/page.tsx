import { Metadata } from 'next';
import Link from 'next/link';
import { Button, Emoji, SectionContainer } from '@viserya/ui';

export const metadata: Metadata = {
  title: `Voryn's Manual - ViseryaApp`,
};

export default function Voryn() {
  return (
    <SectionContainer $gap="xl">
      <Button as={Link} href="/voryn/pt">
        <Emoji size="3xl">🇧🇷</Emoji>
      </Button>
      <Button as={Link} href="/voryn/en">
        <Emoji size="3xl">🇬🇧</Emoji>
      </Button>
    </SectionContainer>
  );
}
