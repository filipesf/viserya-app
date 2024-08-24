export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

export type TypeToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

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
