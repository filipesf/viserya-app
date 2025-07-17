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
  primary: css`
    --button-background-color: var(--primary-background-color);
    --button-background-color-hover: var(--primary-background-color-hover);
    --button-border-color: var(--primary-border-color);
    --button-border-color-hover: var(--primary-border-color-hover);
    --button-text-color: var(--primary-text-color);
    --button-text-color-hover: var(--primary-text-color-hover);
  `,

  secondary: css`
    --button-background-color: var(--secondary-background-color);
    --button-background-color-hover: var(--secondary-background-color-hover);
    --button-border-color: var(--secondary-border-color);
    --button-border-color-hover: var(--secondary-border-color-hover);
    --button-text-color: var(--secondary-text-color);
    --button-text-color-hover: var(--secondary-text-color-hover);
  `,

  info: css`
    --button-background-color: var(--info-background-color);
    --button-background-color-hover: var(--info-background-color-hover);
    --button-border-color: var(--info-border-color);
    --button-border-color-hover: var(--info-border-color-hover);
    --button-text-color: var(--info-text-color);
    --button-text-color-hover: var(--info-text-color-hover);
  `,

  success: css`
    --button-background-color: var(--success-background-color);
    --button-background-color-hover: var(--success-background-color-hover);
    --button-border-color: var(--success-border-color);
    --button-border-color-hover: var(--success-border-color-hover);
    --button-text-color: var(--success-text-color);
    --button-text-color-hover: var(--success-text-color-hover);
  `,

  warning: css`
    --button-background-color: var(--warning-background-color);
    --button-background-color-hover: var(--warning-background-color-hover);
    --button-border-color: var(--warning-border-color);
    --button-border-color-hover: var(--warning-border-color-hover);
    --button-text-color: var(--warning-text-color);
    --button-text-color-hover: var(--warning-text-color-hover);
  `,

  danger: css`
    --button-background-color: var(--danger-background-color);
    --button-background-color-hover: var(--danger-background-color-hover);
    --button-border-color: var(--danger-border-color);
    --button-border-color-hover: var(--danger-border-color-hover);
    --button-text-color: var(--danger-text-color);
    --button-text-color-hover: var(--danger-text-color-hover);
  `,
};

export const linkStyles = css`
  background-color: transparent;
  color: var(--link-text-color);
  text-decoration: underline;
  padding: 0;
  border: none;

  &:hover,
  &:active,
  &:focus {
    background-color: transparent;
    color: var(--link-text-color-hover);
    text-decoration: none;
  }
`;

export const outlinedStyles = css`
  background-color: var(--button-outlined-background-color);
  border-color: var(--button-outlined-border-color);
  color: var(--button-outlined-text-color);

  &:hover,
  &:active,
  &:focus {
    background-color: var(--button-outlined-background-color-hover);
    border-color: var(--button-outlined-border-color-hover);
    color: var(--button-outlined-text-color-hover);
  }
`;

export const verticalStyles = css`
  flex-direction: column;
`;

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
  --button-background-color: var(--background-reverse-color);
  --button-background-color-hover: var(--background-color);
  --button-border-color: var(--button-background-color);
  --button-border-color-hover: var(--button-background-color-hover);
  --button-text-color: var(--text-reverse-color);
  --button-text-color-hover: var(--text-color);

  --button-outlined-background-color: transparent;
  --button-outlined-background-color-hover: var(--button-background-color);
  --button-outlined-border-color: var(--button-border-color);
  --button-outlined-border-color-hover: var(
    --button-outlined-background-color-hover
  );
  --button-outlined-text-color: var(--button-background-color);
  --button-outlined-text-color-hover: var(--button-text-color);

  --link-text-color: var(--button-background-color);
  --link-text-color-hover: var(--button-background-color);

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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-color: var(--button-background-color);
  border-color: var(--button-border-color);
  color: var(--button-text-color);

  &:hover,
  &:active,
  &:focus {
    background-color: var(--button-background-color-hover);
    border-color: var(--button-border-color-hover);
    color: var(--button-text-color-hover);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover,
    &:active,
    &:focus {
      background-color: var(--button-background-color);
      border-color: var(--button-border-color);
      color: var(--button-text-color);
    }
  }

  ${(props) => sizeStyles[props.$size || 'md']}
  ${(props) => props.$outlined && outlinedStyles}
  ${(props) => props.href && linkStyles}
  ${(props) => props.$variant && variantStyles[props.$variant]}
  ${(props) => props.$vertical && verticalStyles}

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
  ${(props) => iconSizeStyles[props.$size || 'md']}
  ${(props) => props.$outlined && outlinedStyles}
  ${(props) => props.href && linkStyles}
  ${(props) => props.$variant && variantStyles[props.$variant]}
`;
