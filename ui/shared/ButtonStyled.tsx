import styled, { css } from 'styled-components';
import { ButtonProps } from '@viserya/ui/Button';

export const sizeStyles = {
  sm: css`
    --button-icon-size: var(--font-size-md);
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  `,
  md: css`
    --button-icon-size: var(--font-size-lg);
    padding: var(--spacing-sm) var(--spacing-rg);
    font-size: var(--font-size-md);
  `,
  lg: css`
    --button-icon-size: var(--font-size-xl);
    padding: var(--spacing-rg) var(--spacing-md);
    font-size: var(--font-size-lg);
  `,
  xl: css`
    --button-icon-size: var(--font-size-xl);
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-xl);
  `,
};

export const variantStyles = {
  default: css`
    background-color: var(--background-color);
    color: var(--text-color);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--background-reverse-color);
      color: var(--text-reverse-color);
    }
  `,

  primary: css`
    background-color: var(--primary-color);
    color: var(--text-color);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--primary-color-hover);
    }
  `,

  secondary: css`
    background-color: var(--secondary-color);
    color: var(--text-color);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--secondary-color-hover);
    }
  `,

  outline: css`
    background-color: transparent;
    color: var(--text-color);
    border: 2px solid var(--border-color);

    &:hover,
    &:active,
    &:focus {
      border-color: var(--border-color-hover);
    }
  `,

  link: css`
    background-color: transparent;
    color: var(--primary-color);
    text-decoration: underline;
    padding: 0;
    border: none;

    &:hover,
    &:active,
    &:focus {
      color: var(--secondary-color);
      text-decoration: none;
    }
  `,
};

export const iconSizeStyles = {
  sm: css`
    padding: var(--spacing-xs);
  `,
  md: css`
    padding: var(--spacing-sm);
  `,
  lg: css`
    padding: var(--spacing-rg);
  `,
  xl: css`
    padding: var(--spacing-md);
  `,
};

export const ButtonStyled = styled.button<ButtonProps<any>>`
  --button-icon-size: 1em;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin: 0;
  border: 2px solid transparent;
  border-radius: var(--border-radius-sm);
  text-align: center;
  text-decoration: none;
  line-height: 1.5;
  cursor: pointer;
  outline: none;
  transition: box-shadow var(--transition-speed);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) => sizeStyles[props.$size || 'md']}
  ${(props) => variantStyles[props.$variant || 'default']}

  & > svg {
    width: var(--button-icon-size);
    height: var(--button-icon-size);
  }

  ${(props) =>
    props.$isLoading &&
    css`
      color: transparent;
      cursor: wait;
      position: relative;
      opacity: 0.7;
      pointer-events: none;

      > svg {
        opacity: 0;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1em;
        height: 1em;
        border: 2px solid var(--text-color);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        transform: translate(-50%, -50%);
      }

      @keyframes spin {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    `}
`;

export const ButtonIconStyled = styled(ButtonStyled)`
  ${(props) => variantStyles[props.$variant || 'default']}
  ${(props) => iconSizeStyles[props.$size || 'md']}
`;
