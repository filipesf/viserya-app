import styled from 'styled-components';

const BaseButton = styled.button`
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-4);
  margin: 0;
  border: 2px solid transparent;
  border-radius: var(--border-radius-sm);
  text-align: center;
  text-decoration: none;
  font-size: var(--font-size-md);
  line-height: 1.5;
  cursor: pointer;
  outline: none;
  transition: box-shadow var(--transition-speed);
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  appearance: none;

  @media screen and (forced-colors: active) {
    border-color: ButtonText;
  }

  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Button = styled(BaseButton)`
  color: var(--text-color);
  background-color: var(--background-color);

  &:hover,
  &:active,
  &:focus {
    background-color: var(--secondary-color);
  }
`;

export const ButtonPrimary = styled(BaseButton)`
  color: var(--text-color);
  background-color: var(--primary-color);

  &:hover,
  &:active,
  &:focus {
    background-color: var(--secondary-color);
  }
`;

export const ButtonOutline = styled(BaseButton)`
  color: var(--text-color);
  border-color: var(--border-color);

  &:hover,
  &:active,
  &:focus {
    border-color: var(--border-color);
  }
`;
