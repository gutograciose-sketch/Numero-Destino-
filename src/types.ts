export interface NumerologyInfo {
  title: string;
  mission: string;
  difficulties: string;
}

export type NumerologyData = Record<number, NumerologyInfo>;

export enum QuizStep {
  WELCOME = 'WELCOME',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
