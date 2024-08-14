import styled from 'styled-components';
import { ContentSelectorButtons, ContentTypes } from '@viserya/types';
import { Button } from '@viserya/ui/Button';
import { Emoji } from '@viserya/ui/Emoji';

const ContentSelectorStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(6, minmax(var(--spacing-24), 1fr));
  gap: var(--spacing-1);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(var(--spacing-24), 1fr));
    gap: var(--spacing-4);
    align-items: center;
    justify-content: center;
  }
`;

const ContentSelectorButton = styled(Button)`
  padding: var(--spacing-1);
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
`;

const ContentSelectorLabel = styled.span`
  font-size: var(--font-size-sm);
  line-height: 1;
  opacity: 0.8;
  text-transform: capitalize;
`;

type ContentSelectorProps = {
  getContent: (endpoint: ContentTypes) => Promise<void>;
};

const contentSelectorButtons: ContentSelectorButtons[] = [
  { emoji: '🧙‍♂️', label: 'character' },
  { emoji: '🏰', label: 'location' },
  { emoji: '👹', label: 'monster' },
  { emoji: '🪄', label: 'item' },
  { emoji: '⚒️', label: 'organisation' },
  { emoji: '📜', label: 'adventure' },
];

export function ContentSelector({ getContent }: ContentSelectorProps) {
  return (
    <ContentSelectorStyled>
      {contentSelectorButtons.map(({ emoji, label }) => (
        <ContentSelectorButton key={label} onClick={() => getContent(label)}>
          <Emoji>{emoji}</Emoji>
          <ContentSelectorLabel>{label}</ContentSelectorLabel>
        </ContentSelectorButton>
      ))}
    </ContentSelectorStyled>
  );
}
