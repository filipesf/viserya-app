export type SessionsParams = {
  params: {
    threadId?: string;
    channelId: string;
    userId?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
  };
};

export type ChatMessage = {
  role: 'user' | 'assistant' | 'code';
  text: string;
};
