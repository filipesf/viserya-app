import * as Icons from '@phosphor-icons/react';
import { IconProps as PhosphorIconProps } from '@phosphor-icons/react';

export type IconName = keyof typeof Icons;

type IconProps = PhosphorIconProps & {
  name: IconName;
};

export const Icon = ({ name, ...rest }: IconProps) => {
  const IconComponent = Icons[name] as React.FC<PhosphorIconProps>;
  return <IconComponent weight="fill" {...rest} />;
};
