import { ASSISTANT_ID_DM } from './constants';

interface AssistantConfig {
  [key: string]: string;
}

export const assistantIds: AssistantConfig = {
  dm: ASSISTANT_ID_DM as string,
};
