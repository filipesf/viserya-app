import styled, { css } from 'styled-components';
import { CharacterAttributes } from '@viserya/types';
import { Icon } from '../Icon/Icon';

type ScoreContainerProps = {
  $columns?: number;
  $justify?: 'start' | 'center' | 'space-between' | 'space-around' | 'end';
};

type AbilityScoresProps = ScoreContainerProps & {
  scores: CharacterAttributes;
};

export const AbilityScoresGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: var(--spacing-rg);

  @media screen and (max-width: 768px) {
    gap: var(--spacing-lg);
    justify-content: center;
  }
`;

const ScoresContainer = styled.div<ScoreContainerProps>`
  --score-item-size: var(--spacing-18);

  display: grid;
  align-items: center;
  justify-content: space-around;
  grid-template-columns: repeat(
    ${({ $columns }) => $columns ?? 6},
    var(--score-item-size)
  );
  gap: var(--spacing-md);

  @media screen and (max-width: 768px) {
    /* --score-item-size: var(--spacing-12); */

    grid-template-columns: repeat(
      ${({ $columns }) => $columns ? $columns / 2 : 3},
      var(--score-item-size)
    );

    justify-content: ${({ $justify }) => $justify ?? 'center'};
  }
`;

const ScoreItem = styled.div<{ $variant?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  width: var(--score-item-size);
  height: var(--score-item-size);
  /* border: 3px solid var(--border-color); */
  border-radius: var(--border-radius-sm);
  flex-shrink: 0;

  ${({ $variant }) =>
    ($variant === 'hp' || $variant === 'ac') &&
    css`
      border: none;

      ${ScoreLabel} {
        display: none;
      }

      ${ScoreValue} {
        font-size: var(--font-size-md);
        font-weight: 700;
        line-height: 1;
      }

      > svg {
        position: absolute;
        top: -9px;
        fill: var(--border-color);
      }
    `}
`;

const ScoreLabel = styled.span`
  font-size: var(--font-size-rg);
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  opacity: 0.65;

  /* @media screen and (max-width: 768px) {
    font-size: var(--font-size-xs);
  } */
`;

const ScoreValue = styled.span`
  font-size: var(--font-size-md);
  font-weight: 600;
  line-height: 1;

  /* @media screen and (max-width: 768px) {
    font-size: var(--font-size-sm);
  } */
`;

export function AbilityScores({ scores, $columns }: AbilityScoresProps) {
  return (
    <ScoresContainer $columns={$columns ?? Object.entries(scores).length}>
      {Object.entries(scores).map(([key, value]) => (
        <ScoreItem key={key} $variant={key}>
          {key === 'ac' && <Icon name="Shield" weight="light" size={64} />}
          {key === 'hp' && <Icon name="Heart" weight="light" size={64} />}
          <ScoreLabel>{key}</ScoreLabel>
          <ScoreValue>{value}</ScoreValue>
        </ScoreItem>
      ))}
    </ScoresContainer>
  );
}
