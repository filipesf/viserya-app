import styled from 'styled-components';
import { CharacterAttributes } from '@viserya/types';

type AbilityScoresProps = {
  scores: CharacterAttributes;
};

const ScoresContainer = styled.div`
  --score-item-size: var(--spacing-12);

  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(6, var(--score-item-size));
  gap: var(--spacing-rg);
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, var(--score-item-size));
  }
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  width: var(--score-item-size);
  height: var(--score-item-size);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  flex-shrink: 0;
`;

const ScoreLabel = styled.span`
  font-size: var(--font-size-xs);
  font-weight: 600;
  line-height: 1;
  opacity: 0.65;
`;

const ScoreValue = styled.span`
  font-size: var(--font-size-sm);
  font-weight: 600;
  line-height: 1;
`;

export function AbilityScores({ scores }: AbilityScoresProps) {
  return (
    <ScoresContainer>
      {Object.entries(scores).map(([key, value]) => (
        <ScoreItem key={key}>
          <ScoreLabel>{key}</ScoreLabel>
          <ScoreValue>{value}</ScoreValue>
        </ScoreItem>
      ))}
    </ScoresContainer>
  );
}
