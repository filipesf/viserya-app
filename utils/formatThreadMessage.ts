import { MessagesRecord } from '@viserya/types';

export const formatThreadMessage = (content: MessagesRecord[]) => {
  return content.map((message: MessagesRecord) => {
    const { text } = message;
    return { text, type: 'text' };
  });
};
