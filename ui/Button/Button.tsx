import React from 'react';
import { ButtonStyled } from '@viserya/ui/shared';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'link';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type ButtonProps<C extends React.ElementType> = AsProp<C> & {
  $size?: ButtonSize;
  $variant?: ButtonVariant;
  $isLoading?: boolean;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof AsProp<C>>;

// The polymorphic Button component
export const Button = <C extends React.ElementType = 'button'>({
  children,
  as,
  $size: size = 'md',
  $variant: variant = 'default',
  $isLoading: isLoading = false,
  disabled,
  ...rest
}: ButtonProps<C>) => {
  return (
    <ButtonStyled
      as={as || 'button'}
      $size={size}
      $variant={variant}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
};
