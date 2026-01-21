export type View = 'home' | 'diagnosis' | 'result' | 'policy' | 'disclaimer' | 'concept';

export interface Option {
  label: string;
  value: number;
  // Scores: [Logic, Creativity, Empathy, Autonomy, Risk]
  scores: [number, number, number, number, number];
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export type ResultType = 'ARCHITECT' | 'REVOLUTIONARY' | 'GUARDIAN' | 'STRATEGIST' | 'NOMAD';

export interface DiagnosticResult {
  type: ResultType;
  characterName: string;
  catchphrase: string;
  description: string;
  toxicEnvironment: string;
  fateWarning: string;
  imagePath: string;
  radarData: { subject: string; A: number; fullMark: number }[];
  recommendedActions: { label: string; description: string; url: string }[];
  
  combatPower: number;
  rank: string;
  colorTheme: string;
  shareText: string;
}

export interface Answers {
  [questionId: number]: Option;
}