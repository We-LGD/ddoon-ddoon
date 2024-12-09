export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isSelected: boolean;
}

export interface InputProps {
  name: string;
  title?: string;
  placeholder: string;
  description?: string;
  maxLength: number;
}
export interface FailProps {
  fail?: boolean;
  index: number;
}

export interface TitleProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  cancel?: boolean;
  event?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export interface ChallengeProps {
  title: string;
  memo: string;
  day: number;
  fail?: true;
  index: number;
}

export interface NewChallengeProps {
  title: string;
  memo: string;
  day: number;
}


//TODO - 서버 연결시 삭제하기
export interface DummyProps {
  dummy: Pick<ChallengeProps, "title" | "memo" | "day">[];
  setDummy: (challenge: Pick<ChallengeProps, "title" | "memo" | "day">) => void;
  deleteDummy: (index: number) => void;
}

export interface SlideProps {
  page: number;
}
