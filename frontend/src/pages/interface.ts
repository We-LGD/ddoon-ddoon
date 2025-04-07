export interface PositionProps {
  top: string;
  left: string;
  width?: string;
}

export interface ResultProps {
  idx: number;
  result: string;
}

export interface ChallengeBoxProps {
  idx: number;
  title: string;
  memo: string;
  days: number;
  result: 'success' | 'progress' | 'fail';
}

export interface ChallengeProps extends ChallengeBoxProps {
  successCount: number;
  lastSuccessDate: string;
}

export interface NewChallengeProps {
  title: string;
  memo: string;
  day: number;
  result: 'progress';
  successCheck: boolean;
}

export interface ChallengeData {
  successCount: number;
  days: 30 | 50 | 100;
  title: string;
  lastSuccessDate: string;
}
