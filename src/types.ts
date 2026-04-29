export interface NumerologyInfo {
  title: string;
  mission: string;
  difficulties: string;
}

export type NumerologyData = Record<number, NumerologyInfo>;

export enum QuizStep {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
