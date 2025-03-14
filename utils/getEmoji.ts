import { ContentTypes } from '@viserya/types';

const contentEmojis: Partial<Record<ContentTypes, string>> = {
  character: '🧙‍♂️',
  location: '🏰',
  monster: '👹',
  item: '🪄',
  organisation: '⚒️',
  adventure: '📜',
  tavern: '🍻',
};

export function getEmoji(type: ContentTypes): string {
  return contentEmojis[type] ?? '';
}
