import React from 'react';
import { ButtonProps } from '@viserya/ui/Button';
import { Icon, IconName } from '@viserya/ui/Icon';
import { ButtonIconStyled } from '@viserya/ui/shared';

type ButtonIconProps<C extends React.ElementType = 'button'> =
  ButtonProps<C> & {
    icon: IconName;
  };

export const ButtonIcon = <C extends React.ElementType = 'button'>({
  icon,
  ...rest
}: ButtonIconProps<C>) => {
  return (
    <ButtonIconStyled {...rest}>
      <Icon name={icon} />
    </ButtonIconStyled>
  );
};
