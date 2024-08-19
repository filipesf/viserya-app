import React from 'react';
import { Icon, IconName } from '@viserya/ui/Icon';
import { ButtonStyled } from '@viserya/ui/shared';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type ButtonProps<C extends React.ElementType> = AsProp<C> & {
  $size?: ButtonSize;
  $icon?: IconName;
  $variant?: ButtonVariant;
  $outlined?: boolean;
  $vertical?: boolean;
  $isLoading?: boolean;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof AsProp<C>>;

// The polymorphic Button component
export const Button = <C extends React.ElementType = 'button'>({
  children,
  as,
  $size: size = 'md',
  $icon: icon = undefined,
  $variant: variant,
  $vertical: vertical =  false,
  $isLoading: isLoading = false,
  disabled,
  ...rest
}: ButtonProps<C>) => {
  return (
    <ButtonStyled
      as={as || 'button'}
      $size={size}
      $variant={variant}
      $vertical={vertical}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {children}
    </ButtonStyled>
  );
};
