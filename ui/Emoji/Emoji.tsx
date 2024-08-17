import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ContentTypes } from '@viserya/types';
import { getEmoji } from '@viserya/utils/getEmoji';

interface EmojiProps extends PropsWithChildren {
  size?: 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl';
  name?: ContentTypes;
}

export const EmojiStyled = styled.span<EmojiProps>`
  display: block;
  font-size: var(--font-size-${({ size = 'lg' }) => size});
  line-height: 1;
`;

export const Emoji = ({ children, size, name }: EmojiProps) => (
  <EmojiStyled size={size}>{name ? getEmoji(name) : children}</EmojiStyled>
);
