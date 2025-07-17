type Attribute = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

type Answer = {
  attribute: Attribute;
  text: string;
};

export type Question = {
  attribute: Attribute;
  category: 'Physical' | 'Mental';
  text: string;
  answers: Answer[];
};

export const STR_QUESTIONS: Question[] = [
  {
    attribute: 'STR',
    category: 'Physical',
    text: 'What was your character’s greatest childhood achievement?',
    answers: [
      { attribute: 'STR', text: 'Defeating a rival in a physical competition.' },
      { attribute: 'DEX', text: 'Successfully sneaking into a forbidden area.' },
      { attribute: 'CON', text: 'Surviving a dangerous illness or trial.' },
      { attribute: 'INT', text: 'Solving a difficult puzzle.' },
      { attribute: 'WIS', text: 'Understanding an important lesson from an elder.' },
      { attribute: 'CHA', text: 'Winning over others with charm or wit.' },
    ],
  },
  {
    attribute: 'STR',
    category: 'Physical',
    text: 'How does your character contribute to a group?',
    answers: [
      { attribute: 'STR', text: 'By providing physical protection.' },
      { attribute: 'DEX', text: 'By scouting and sneaking ahead.' },
      { attribute: 'CON', text: 'By enduring long, difficult tasks.' },
      { attribute: 'INT', text: 'By offering clever strategies.' },
      { attribute: 'WIS', text: 'By offering wise counsel.' },
      { attribute: 'CHA', text: 'By inspiring and rallying others.' },
    ],
  },
  {
    attribute: 'STR',
    category: 'Physical',
    text: 'What type of challenge does your character excel at?',
    answers: [
      { attribute: 'STR', text: 'Lifting, pushing, or breaking things.' },
      { attribute: 'DEX', text: 'Avoiding traps or dodging blows.' },
      { attribute: 'CON', text: 'Withstanding pain or exhaustion.' },
      { attribute: 'INT', text: 'Deciphering riddles or patterns.' },
      { attribute: 'WIS', text: 'Noticing small but critical details.' },
      { attribute: 'CHA', text: 'Negotiating or persuading others.' },
    ],
  },
  {
    attribute: 'STR',
    category: 'Physical',
    text: 'How does your character face adversity?',
    answers: [
      { attribute: 'STR', text: 'With brute strength and force.' },
      { attribute: 'DEX', text: 'With quick reactions and agility.' },
      { attribute: 'CON', text: 'With resilience and endurance.' },
      { attribute: 'INT', text: 'By carefully planning ahead.' },
      { attribute: 'WIS', text: 'By trusting their instincts.' },
      { attribute: 'CHA', text: 'By rallying support from others.' },
    ],
  },
  {
    attribute: 'STR',
    category: 'Physical',
    text: 'What is your character’s role in a fight?',
    answers: [
      { attribute: 'STR', text: 'The front-line brawler or defender.' },
      { attribute: 'DEX', text: 'The agile skirmisher or archer.' },
      { attribute: 'CON', text: 'The stalwart tank or guard.' },
      { attribute: 'INT', text: 'The tactician, guiding the group.' },
      { attribute: 'WIS', text: 'The scout, alerting to danger.' },
      { attribute: 'CHA', text: 'The motivator, boosting morale.' },
    ],
  },
  {
    attribute: 'STR',
    category: 'Physical',
    text: 'What motivates your character to train their body?',
    answers: [
      { attribute: 'STR', text: 'To be the strongest and most powerful.' },
      { attribute: 'DEX', text: 'To achieve agility and speed.' },
      { attribute: 'CON', text: 'To endure the most grueling challenges.' },
      { attribute: 'INT', text: 'To improve their understanding of combat.' },
      { attribute: 'WIS', text: 'To discipline their mind and body.' },
      { attribute: 'CHA', text: 'To impress or inspire others.' },
    ],
  },
];

export const DEX_QUESTIONS: Question[] = [
  {
    attribute: 'DEX',
    category: 'Physical',
    text: 'How does your character handle danger?',
    answers: [
      { attribute: 'STR', text: 'Confronting it head-on with raw power.' },
      { attribute: 'DEX', text: 'Dodging or outmaneuvering the threat.' },
      { attribute: 'CON', text: 'Standing firm and enduring the challenge.' },
      { attribute: 'INT', text: 'Analyzing and outsmarting the problem.' },
      { attribute: 'WIS', text: 'Trusting instincts to find the safest path.' },
      { attribute: 'CHA', text: 'Persuading others to handle the danger.' },
    ],
  },
  {
    attribute: 'DEX',
    category: 'Physical',
    text: 'What is your character’s biggest strength in combat?',
    answers: [
      { attribute: 'STR', text: 'Overwhelming force and power.' },
      { attribute: 'DEX', text: 'Precision and quick reflexes.' },
      { attribute: 'CON', text: 'Unyielding durability.' },
      { attribute: 'INT', text: 'Strategic thinking.' },
      { attribute: 'WIS', text: 'Reading the flow of the fight.' },
      { attribute: 'CHA', text: 'Commanding or inspiring allies.' },
    ],
  },
  {
    attribute: 'DEX',
    category: 'Physical',
    text: 'What would your character do in a chase?',
    answers: [
      { attribute: 'STR', text: 'Plow through obstacles to keep up.' },
      { attribute: 'DEX', text: 'Weave through and outrun the pursuer.' },
      { attribute: 'CON', text: 'Outlast them in endurance.' },
      { attribute: 'INT', text: 'Outsmart them with clever tactics.' },
      { attribute: 'WIS', text: 'Anticipate their next move.' },
      { attribute: 'CHA', text: 'Distract or confuse them.' },
    ],
  },
  {
    attribute: 'DEX',
    category: 'Physical',
    text: 'What skill does your character pride themselves on?',
    answers: [
      { attribute: 'STR', text: 'Feats of strength.' },
      { attribute: 'DEX', text: 'Graceful acrobatics or nimbleness.' },
      { attribute: 'CON', text: 'Unwavering endurance.' },
      { attribute: 'INT', text: 'Their intellect and cunning.' },
      { attribute: 'WIS', text: 'Their keen observation.' },
      { attribute: 'CHA', text: 'Their ability to charm or lead.' },
    ],
  },
  {
    attribute: 'DEX',
    category: 'Physical',
    text: 'How does your character approach a locked door?',
    answers: [
      { attribute: 'STR', text: 'Smash it open with brute force.' },
      { attribute: 'DEX', text: 'Pick the lock with finesse.' },
      { attribute: 'CON', text: 'Bash it repeatedly until it breaks.' },
      { attribute: 'INT', text: 'Find a clever workaround.' },
      { attribute: 'WIS', text: 'Search for hidden keys or clues.' },
      { attribute: 'CHA', text: 'Convince someone else to open it.' },
    ],
  },
  {
    attribute: 'DEX',
    category: 'Physical',
    text: 'What makes your character stand out in a crowd?',
    answers: [
      { attribute: 'STR', text: 'Their powerful and imposing presence.' },
      { attribute: 'DEX', text: 'Their graceful and agile movements.' },
      { attribute: 'CON', text: 'Their steady and reliable demeanor.' },
      { attribute: 'INT', text: 'Their sharp wit and cleverness.' },
      { attribute: 'WIS', text: 'Their ability to notice the unnoticed.' },
      { attribute: 'CHA', text: 'Their charm and charisma.' },
    ],
  },
];

export const CON_QUESTIONS: Question[] = [
  {
    attribute: 'CON',
    category: 'Physical',
    text: 'What sustains your character through adversity?',
    answers: [
      { attribute: 'STR', text: 'Their physical endurance.' },
      { attribute: 'DEX', text: 'Their adaptability and speed.' },
      { attribute: 'CON', text: 'Their unyielding resilience.' },
      { attribute: 'INT', text: 'Their logical planning.' },
      { attribute: 'WIS', text: 'Their spiritual or intuitive strength.' },
      { attribute: 'CHA', text: 'Their ability to inspire others.' },
    ],
  },
  {
    attribute: 'CON',
    category: 'Physical',
    text: 'What is your character’s reaction to exhaustion?',
    answers: [
      { attribute: 'STR', text: 'They push through with brute force.' },
      { attribute: 'DEX', text: 'They pace themselves carefully.' },
      { attribute: 'CON', text: 'They endure until the end.' },
      { attribute: 'INT', text: 'They strategise to conserve energy.' },
      { attribute: 'WIS', text: 'They listen to their body’s limits.' },
      { attribute: 'CHA', text: 'They encourage others to keep going.' },
    ],
  },
  {
    attribute: 'CON',
    category: 'Physical',
    text: 'How does your character handle pain?',
    answers: [
      { attribute: 'STR', text: 'By ignoring it and pushing forward.' },
      { attribute: 'DEX', text: 'By avoiding situations that cause it.' },
      { attribute: 'CON', text: 'By enduring without complaint.' },
      { attribute: 'INT', text: 'By focusing on a solution.' },
      { attribute: 'WIS', text: 'By using their experience to adapt.' },
      { attribute: 'CHA', text: 'By using it to connect with others.' },
    ],
  },
  {
    attribute: 'CON',
    category: 'Physical',
    text: 'What motivates your character to keep going?',
    answers: [
      { attribute: 'STR', text: 'The need to prove their strength.' },
      { attribute: 'DEX', text: 'The promise of reaching their goal faster.' },
      { attribute: 'CON', text: 'The belief that they must endure.' },
      { attribute: 'INT', text: 'The knowledge of what lies ahead.' },
      { attribute: 'WIS', text: 'The understanding that persistence pays off.' },
      { attribute: 'CHA', text: 'The responsibility to inspire others.' },
    ],
  },
  {
    attribute: 'CON',
    category: 'Physical',
    text: 'What does your character value most in their physical health?',
    answers: [
      { attribute: 'STR', text: 'The ability to perform powerful feats.' },
      { attribute: 'DEX', text: 'Being quick and agile.' },
      { attribute: 'CON', text: 'Having the stamina to outlast others.' },
      { attribute: 'INT', text: 'Understanding how to maintain it.' },
      { attribute: 'WIS', text: 'The balance of mind and body.' },
      { attribute: 'CHA', text: 'Looking and feeling their best.' },
    ],
  },
  {
    attribute: 'CON',
    category: 'Physical',
    text: 'How does your character prepare for hardship?',
    answers: [
      { attribute: 'STR', text: 'They train their muscles for endurance.' },
      { attribute: 'DEX', text: 'They practice flexibility and speed.' },
      { attribute: 'CON', text: 'They build their stamina and resilience.' },
      { attribute: 'INT', text: 'They study and plan ahead.' },
      { attribute: 'WIS', text: 'They mentally prepare themselves.' },
      { attribute: 'CHA', text: 'They encourage others to stand strong.' },
    ],
  },
];

export const INT_QUESTIONS: Question[] = [
  {
    attribute: 'INT',
    category: 'Mental',
    text: 'How does your character solve problems?',
    answers: [
      { attribute: 'STR', text: 'Through brute force and action.' },
      { attribute: 'DEX', text: 'With clever, unconventional methods.' },
      { attribute: 'CON', text: 'By enduring until a solution appears.' },
      { attribute: 'INT', text: 'Through careful analysis and reasoning.' },
      { attribute: 'WIS', text: 'By relying on intuition.' },
      { attribute: 'CHA', text: 'By negotiating or debating.' },
    ],
  },
  {
    attribute: 'INT',
    category: 'Mental',
    text: 'How does your character approach learning?',
    answers: [
      { attribute: 'STR', text: 'Through hands-on experience.' },
      { attribute: 'DEX', text: 'By experimenting creatively.' },
      { attribute: 'CON', text: 'With steady, consistent effort.' },
      { attribute: 'INT', text: 'By studying and analysing deeply.' },
      { attribute: 'WIS', text: 'By observing and reflecting.' },
      { attribute: 'CHA', text: 'By engaging in discussions and debates.' },
    ],
  },
  {
    attribute: 'INT',
    category: 'Mental',
    text: 'What does your character value most in others?',
    answers: [
      { attribute: 'STR', text: 'Their physical strength.' },
      { attribute: 'DEX', text: 'Their skill or agility.' },
      { attribute: 'CON', text: 'Their reliability and resilience.' },
      { attribute: 'INT', text: 'Their intelligence and cleverness.' },
      { attribute: 'WIS', text: 'Their wisdom and insight.' },
      { attribute: 'CHA', text: 'Their charm and persuasiveness.' },
    ],
  },
  {
    attribute: 'INT',
    category: 'Mental',
    text: 'What role does your character play in a group?',
    answers: [
      { attribute: 'STR', text: 'The physical powerhouse.' },
      { attribute: 'DEX', text: 'The agile scout or skirmisher.' },
      { attribute: 'CON', text: 'The steadfast guardian.' },
      { attribute: 'INT', text: 'The strategist and planner.' },
      { attribute: 'WIS', text: 'The trusted advisor.' },
      { attribute: 'CHA', text: 'The leader or motivator.' },
    ],
  },
  {
    attribute: 'INT',
    category: 'Mental',
    text: 'What type of problem excites your character most?',
    answers: [
      { attribute: 'STR', text: 'One that requires brute strength.' },
      { attribute: 'DEX', text: 'One that involves precision or speed.' },
      { attribute: 'CON', text: 'One that requires endurance.' },
      { attribute: 'INT', text: 'A complex or intricate puzzle.' },
      { attribute: 'WIS', text: 'A moral or philosophical dilemma.' },
      { attribute: 'CHA', text: 'A negotiation or social challenge.' },
    ],
  },
  {
    attribute: 'INT',
    category: 'Mental',
    text: 'What motivates your character to seek knowledge?',
    answers: [
      { attribute: 'STR', text: 'To improve their physical skills.' },
      { attribute: 'DEX', text: 'To outwit their opponents.' },
      { attribute: 'CON', text: 'To become more self-reliant.' },
      { attribute: 'INT', text: 'To understand and master the world.' },
      { attribute: 'WIS', text: 'To seek truth and meaning.' },
      { attribute: 'CHA', text: 'To gain influence and power.' },
    ],
  },
];

export const WIS_QUESTIONS: Question[] = [
  {
    attribute: 'WIS',
    category: 'Mental',
    text: 'What guides your character’s decisions?',
    answers: [
      { attribute: 'STR', text: 'Their instincts to protect others.' },
      { attribute: 'DEX', text: 'Their ability to adapt and react quickly.' },
      { attribute: 'CON', text: 'Their steadfast determination.' },
      { attribute: 'INT', text: 'Their logical reasoning.' },
      { attribute: 'WIS', text: 'Their deep intuition or spiritual beliefs.' },
      { attribute: 'CHA', text: 'Their understanding of people and their needs.' },
    ],
  },
  {
    attribute: 'WIS',
    category: 'Mental',
    text: 'What does your character notice first in new places?',
    answers: [
      { attribute: 'STR', text: 'Potential physical dangers.' },
      { attribute: 'DEX', text: 'Paths or exits for movement.' },
      { attribute: 'CON', text: 'Safe or stable areas.' },
      { attribute: 'INT', text: 'Details others might miss.' },
      { attribute: 'WIS', text: 'The atmosphere and subtle cues.' },
      { attribute: 'CHA', text: 'The people and their behaviour.' },
    ],
  },
  {
    attribute: 'WIS',
    category: 'Mental',
    text: 'How does your character treat others?',
    answers: [
      { attribute: 'STR', text: 'They protect them physically.' },
      { attribute: 'DEX', text: 'They help them navigate or escape.' },
      { attribute: 'CON', text: 'They stand by them through hardship.' },
      { attribute: 'INT', text: 'They provide logical advice.' },
      { attribute: 'WIS', text: 'They listen and offer guidance.' },
      { attribute: 'CHA', text: 'They charm or inspire them.' },
    ],
  },
  {
    attribute: 'WIS',
    category: 'Mental',
    text: 'What is your character’s greatest strength in leadership?',
    answers: [
      { attribute: 'STR', text: 'Their physical power and bravery.' },
      { attribute: 'DEX', text: 'Their quick decision-making.' },
      { attribute: 'CON', text: 'Their steadfastness in crisis.' },
      { attribute: 'INT', text: 'Their logical planning.' },
      { attribute: 'WIS', text: 'Their understanding of others.' },
      { attribute: 'CHA', text: 'Their charisma and inspiration.' },
    ],
  },
  {
    attribute: 'WIS',
    category: 'Mental',
    text: 'How does your character interpret failure?',
    answers: [
      { attribute: 'STR', text: 'As a sign they need to train harder.' },
      { attribute: 'DEX', text: 'As a lesson in adaptability.' },
      { attribute: 'CON', text: 'As a challenge to overcome.' },
      { attribute: 'INT', text: 'As a puzzle to solve next time.' },
      { attribute: 'WIS', text: 'As a learning experience.' },
      { attribute: 'CHA', text: 'As an opportunity to connect with others.' },
    ],
  },
  {
    attribute: 'WIS',
    category: 'Mental',
    text: 'What is most important to your character in life?',
    answers: [
      { attribute: 'STR', text: 'Protecting those they love.' },
      { attribute: 'DEX', text: 'Freedom to explore and move.' },
      { attribute: 'CON', text: 'Surviving and thriving.' },
      { attribute: 'INT', text: 'Understanding and knowledge.' },
      { attribute: 'WIS', text: 'Finding peace and truth.' },
      { attribute: 'CHA', text: 'Building meaningful relationships.' },
    ],
  },
];

export const CHA_QUESTIONS: Question[] = [
  {
    attribute: 'CHA',
    category: 'Mental',
    text: 'What is your character’s most defining social trait?',
    answers: [
      { attribute: 'STR', text: 'Their intimidating presence.' },
      { attribute: 'DEX', text: 'Their charm through skillful actions.' },
      { attribute: 'CON', text: 'Their reliability and steadiness.' },
      { attribute: 'INT', text: 'Their articulate and thoughtful speech.' },
      { attribute: 'WIS', text: 'Their empathetic understanding.' },
      { attribute: 'CHA', text: 'Their charisma and magnetic personality.' },
    ],
  },
  {
    attribute: 'CHA',
    category: 'Mental',
    text: 'How does your character win others over?',
    answers: [
      { attribute: 'STR', text: 'By showing their strength.' },
      { attribute: 'DEX', text: 'By displaying their skill.' },
      { attribute: 'CON', text: 'By proving their reliability.' },
      { attribute: 'INT', text: 'By demonstrating their intelligence.' },
      { attribute: 'WIS', text: 'By understanding their needs.' },
      { attribute: 'CHA', text: 'By using their charm and wit.' },
    ],
  },
  {
    attribute: 'CHA',
    category: 'Mental',
    text: 'How does your character react to disagreements?',
    answers: [
      { attribute: 'STR', text: 'By asserting their dominance.' },
      { attribute: 'DEX', text: 'By deflecting and finding compromise.' },
      { attribute: 'CON', text: 'By staying calm and steady.' },
      { attribute: 'INT', text: 'By presenting logical arguments.' },
      { attribute: 'WIS', text: 'By understanding the other perspective.' },
      { attribute: 'CHA', text: 'By persuading others to their side.' },
    ],
  },
  {
    attribute: 'CHA',
    category: 'Mental',
    text: 'What role does your character take in conversations?',
    answers: [
      { attribute: 'STR', text: 'The strong, silent type.' },
      { attribute: 'DEX', text: 'The quick and witty interjector.' },
      { attribute: 'CON', text: 'The steady listener and observer.' },
      { attribute: 'INT', text: 'The intellectual, offering insights.' },
      { attribute: 'WIS', text: 'The empathetic voice of reason.' },
      { attribute: 'CHA', text: 'The charismatic leader of the discussion.' },
    ],
  },
  {
    attribute: 'CHA',
    category: 'Mental',
    text: 'What makes your character memorable to others?',
    answers: [
      { attribute: 'STR', text: 'Their physical power.' },
      { attribute: 'DEX', text: 'Their agility and grace.' },
      { attribute: 'CON', text: 'Their steadfast nature.' },
      { attribute: 'INT', text: 'Their brilliant mind.' },
      { attribute: 'WIS', text: 'Their wisdom and insight.' },
      { attribute: 'CHA', text: 'Their charm and magnetism.' },
    ],
  },
  {
    attribute: 'CHA',
    category: 'Mental',
    text: 'What motivates your character in social situations?',
    answers: [
      { attribute: 'STR', text: 'To assert dominance or intimidate.' },
      { attribute: 'DEX', text: 'To outmaneuver or impress.' },
      { attribute: 'CON', text: 'To build long-lasting bonds.' },
      { attribute: 'INT', text: 'To share knowledge or ideas.' },
      { attribute: 'WIS', text: 'To bring understanding or harmony.' },
      { attribute: 'CHA', text: 'To inspire, lead, or charm others.' },
    ],
  },
];
