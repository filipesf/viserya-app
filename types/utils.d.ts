export interface ActionExecution {
  type: string;
  parameters?: Record<string, string>;
  response: string;
}

export interface Action {
  action: string;
  description: string;
  command: string;
  execution: ActionExecution;
}

export interface ActionsConfig {
  actions: Action[];
}

export type ContentSelectorButtons = {
  emoji: string;
  label: ContentTypes;
};

export type CharacterAttributes = {
  [key: string]: number;
};
