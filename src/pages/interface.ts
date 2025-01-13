export interface PositionProps {
  top: string;
  left: string;
  width?: string;
}

export interface ResultProps {
  result: 'success' | 'fail' | 'progress';
  index?: number;
}

export interface ChallengeProps {
  idx?: number;
  title: string;
  memo: string;
  day: number;
  result: 'success' | 'fail' | 'progress';
  index?: number;
  successCheck: boolean;
}

export interface NewChallengeProps {
  title: string;
  memo: string;
  day: number;
  result: 'progress';
  successCheck: boolean;
}

//TODO - 서버 연결시 삭제하기
export interface DummyProps {
  dummy: ChallengeProps[];
  setDummy: (challenge: ChallengeProps) => void;
  deleteDummy: (index: number) => void;
  updateDummy: (index: number, result?: 'progress' | 'success' | 'fail', successCheck?: boolean) => void;
}
