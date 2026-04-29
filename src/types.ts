export interface NumerologyInfo {
  title: string;
  mission: string;
  difficulties: string;
}

export type NumerologyData = Record<number, NumerologyInfo>;

export enum QuizStep {
  SPLASH = 'SPLASH',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
