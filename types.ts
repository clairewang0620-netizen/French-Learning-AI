export enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1'
}

export interface Vocabulary {
  id: string;
  french: string;
  ipa?: string; // International Phonetic Alphabet
  english: string;
  context?: string; // Example usage
  gender?: 'm' | 'f' | 'pl';
}

export interface Phrase {
  id: string;
  french: string;
  english: string;
  formal: boolean; // Is it formal (vous) or informal (tu)?
}

export interface DialogueLine {
  speaker: string;
  french: string;
  english: string;
  avatar?: string;
}

export interface Scenario {
  title: string;
  description: string;
  lines: DialogueLine[];
}

export interface Lesson {
  id: string;
  level: Level;
  title: string;
  description: string;
  icon: string;
  isPremium?: boolean; // New field for paid content
  vocabulary: Vocabulary[];
  phrases: Phrase[];
  scenario: Scenario;
}

export interface CourseModule {
  level: Level;
  title: string;
  description: string;
  lessons: Lesson[];
}