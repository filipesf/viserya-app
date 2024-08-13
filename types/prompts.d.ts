export type PromptAndTemplate = {
  prompt: string;
  template: string;
};

export type Song = {
  prompt: string;
  template: string;
};

export type SongSubject = 'event' | 'tale' | 'place' | 'adventure';

export type SongTemplate = {
  [key in SongSubject]: string;
};
export type DescriptionSubTypes = {
  character: string;
  object: string;
  scene: string;
};
