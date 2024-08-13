import { SongSubject, Song } from '@viserya/types';
import { getSongTemplate } from '@viserya/utils/generators/getSongTemplate';

/**
 * Writes a song based on a given prompt and subject.
 *
 * @param prompt - A string representing the initial idea or inspiration for the song. This could be a theme, a line, or a concept around which the song will be written.
 * @param subject - A value of type SongSubject that represents the subject or theme of the song. The subject determines which template from the SongTemplate object will be used for structuring the song.
 *
 * @returns A Song object containing the provided prompt and the corresponding song template based on the given subject.
 */
export const writeSong = (prompt: string, subject: SongSubject): Song => {
  const template = getSongTemplate(subject);

  console.log(`Song written: ${prompt}`);

  return {
    prompt,
    template,
  };
};
