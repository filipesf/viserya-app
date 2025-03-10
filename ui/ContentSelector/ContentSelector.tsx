import styled from 'styled-components';
import { ContentSelectorButtons, ContentTypes } from '@viserya/types';
import { Button } from '@viserya/ui/Button';
import { Emoji } from '@viserya/ui/Emoji';

const ContentSelectorStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(var(--spacing-24), 1fr));
  gap: var(--spacing-xs);
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  max-width: 688px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(var(--spacing-24), 1fr));
    gap: var(--spacing-rg);
    align-items: center;
    justify-content: center;
  }
`;

const ContentSelectorLabel = styled.span`
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: capitalize;
`;

type ContentSelectorProps = {
  getContent: (endpoint: ContentTypes) => Promise<void>;
  isLoading: boolean;
};

const contentSelectorButtons: ContentSelectorButtons[] = [
  { emoji: '🧙‍♂️', label: 'character' },
  { emoji: '🏰', label: 'location' },
  { emoji: '👹', label: 'monster' },
  { emoji: '🪄', label: 'item' },
  { emoji: '⚒️', label: 'organisation' },
  { emoji: '📜', label: 'adventure' },
  { emoji: '🍻', label: 'tavern' },
];

export function ContentSelector({
  getContent,
  isLoading = false,
}: ContentSelectorProps) {
  return (
    <ContentSelectorStyled>
      {contentSelectorButtons.map(({ emoji, label }) => (
        <Button
          $isLoading={isLoading}
          disabled={isLoading}
          $variant="secondary"
          $vertical
          key={label}
          onClick={() => getContent(label)}
        >
          <Emoji>{emoji}</Emoji>
          <ContentSelectorLabel>{label}</ContentSelectorLabel>
        </Button>
      ))}
    </ContentSelectorStyled>
  );
}
