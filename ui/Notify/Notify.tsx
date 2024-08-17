import styled from 'styled-components';

export const Notify = styled.div`
  --notify-translateY-in: calc(var(--spacing-10) * -1);
  --notify-translateY-out: calc(var(--spacing-16) * -1);

  position: absolute;
  left: 50%;
  padding: var(--spacing-xs) var(--spacing-3);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  line-height: 1;
  text-align: center;
  text-wrap: nowrap;
  color: var(--text-reverse-color);
  background-color: var(--background-reverse-color);
  animation: show 2000ms ease-in-out;
  transform: translateY(var(--notify-translateY-in)) translateX(-50%);
  opacity: 1;
  z-index: 1;

  @keyframes show {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(-50%);
    }
    25% {
      opacity: 1;
      transform: translateY(var(--notify-translateY-in)) translateX(-50%);
    }
    75% {
      opacity: 1;
      transform: translateY(var(--notify-translateY-in)) translateX(-50%);
    }
    100% {
      opacity: 0;
      transform: translateY(var(--notify-translateY-out)) translateX(-50%);
    }
  }
`;
