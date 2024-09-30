import { TypeToCamelCase } from './utils';

export type SessionRecordParams = {
  params: Partial<TypeToCamelCase<SessionsRecord>>;
};

export type MessageRecordParams = {
  params: {
    messageId: string;
  };
};

export type ChatMessageRole = 'user' | 'assistant' | 'code';

export type BaseRecord = {
  id: string;
  thread_id: string;
  channel_id: string;
  user_id: string;
};

export type SessionsRecord = BaseRecord & {
  status: string;
  type: string;
  language: string;
  name: string;
  summary: string;
  start_time: Date;
  end_time: Date | null;
};

export type MessagesRecord = BaseRecord & {
  text: string;
  created_at: Date;
  edited_at: Date | null;
};

export type ChatMessage = Partial<TypeToCamelCase<MessagesRecord>>;
