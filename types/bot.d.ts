import { TypeToCamelCase } from './utils';

export type SessionRecordParams = {
  params: Partial<TypeToCamelCase<SessionsRecord>>;
};

export type ChatMessageType = 'decision' | 'history';

export type ChatMessageRole = 'user' | 'assistant' | 'code';

export type BaseRecord = {
  id: string;
  thread_id: string;
  channel_id: string;
  user_id: string;
};

export type SessionsRecord = BaseRecord & {
  start_time: Date;
  end_time: Date | null;
  status: string;
};

export type MessagesRecord = BaseRecord & {
  type: ChatMessageType;
  role: ChatMessageRole;
  text: string;
  created_at: Date;
  edited_at: Date | null;
};
