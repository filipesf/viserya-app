import { ASSISTANT_ID } from './constants';

interface AssistantConfig {
  [key: string]: string;
}

export const assistantIds: AssistantConfig = {
  dm: ASSISTANT_ID as string,
};
