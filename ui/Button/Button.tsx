import React from 'react';
import styled, { css } from 'styled-components';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $size?: ButtonSize;
  $variant?: ButtonVariant;
  $isLoading?: boolean;
};

const sizeStyles = {
  sm: css`
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--font-size-sm);
  `,
  md: css`
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-md);
  `,
  lg: css`
    padding: var(--spacing-3) var(--spacing-5);
    font-size: var(--font-size-lg);
  `,
};

const variantStyles = {
  default: css`
    background-color: var(--background-color);
    color: var(--text-color);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--text-color);
      color: var(--background-color);
    }
  `,
  primary: css`
    background-color: var(--primary-color);
    color: var(--text-color);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--secondary-color);
    }
  `,
  secondary: css`
    background-color: var(--secondary-color);
    color: var(--text-color);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--primary-color);
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
      opacity: 0.7;
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

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
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

  ${(props) =>
    props.$isLoading &&
    css`
      cursor: wait;
      position: relative;
      opacity: 0.7;
      pointer-events: none;

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

export const Button: React.FC<ButtonProps> = ({
  children,
  $size: size = 'md',
  $variant: variant = 'default',
  $isLoading: isLoading = false,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      $size={size}
      $variant={variant}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
