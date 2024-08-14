import { SongTemplate, SongSubject } from '@viserya/types';

const promptTemplate: SongTemplate = {
  event:
    'Focus on a pivotal moment that changed the course of history or deeply impacted its inhabitants. Structure the song using **Intro**, **Verse**, **Chorus**, and **Outro** tags, and incorporate a **Bridge** to transition between contrasting sections. Consider using **Build** and **Peak** tags to highlight the climax of the event, and include a **Drop** for moments of realization or aftermath. Use simple language and avoid complex or mouthful words/phrases. Employ fresh imagery and innovative narrative techniques, avoiding overused phrases and repetition.',
  tale: 'Begin with an **Intro** to set the scene, followed by **Verses** that develop the story. Use the **Chorus** to reinforce the main theme, and consider a **Bridge** to shift the narrative tone. An **Outro** should conclude the tale. Use a **Hook** to make the song memorable, and consider a **Solo** or **Break** to add depth to the musical composition. Use simple language and avoid complex or mouthful words/phrases. Avoid repetitive phrases; instead, use varied descriptions and fresh imagery.',
  place:
    'Focusing on its distinct features, history, and ambiance. Structure the song with **Intro**, **Verse**, **Chorus**, and **Outro** tags, and incorporate a **Bridge** to transition between different aspects of the place. Use **Dynamic Tags** like **Chill** or **Acoustic** to set the mood and atmosphere. Use simple language and avoid complex or mouthful words/phrases. Avoid relying on common symbols; instead, innovate with fresh perspectives and lesser-used descriptive techniques. Include a **Breakdown** or **Syncopation** to enhance the musical experience.',
  adventure:
    "Write a song that recounts this adventurous journey. Start with an **Intro** to introduce the journey, followed by **Verses** detailing the challenges and growth. Use the **Chorus** to emphasize the adventure's core theme, and a **Bridge** to change the mood or perspective. Conclude with an **Outro** that reflects on the journey. Include **Situational Tags** like **Build**, **Peak**, and **Drop** to highlight key moments. Consider a **Solo** or **Break** to showcase instrumental storytelling. Use simple language and avoid complex or mouthful words/phrases. Avoid predictable narrative arcs by using non-linear or unique storytelling techniques.",
};

export function getSongTemplate(subject: SongSubject): string {
  return promptTemplate[subject];
}
