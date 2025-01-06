import { MouseEventHandler } from 'react';

export interface themeProps {
  theme: 'auth' | 'tutorial' | 'challenge' | 'modal';
}

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isSelected: boolean;
}

export interface InputProps extends themeProps {
  name: string;
  type?: string;
  title?: string;
  placeholder: string;
  description?: string;
  maxLength: number;
}
export interface ResultProps {
  result: 'success' | 'fail' | 'progress';
  index?: number;
}

export interface TitleProps {
  children: React.ReactNode;
}

export interface ButtonProps extends themeProps {
  children: React.ReactNode;
  disabled?: boolean;
  cancel?: boolean;
  event?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
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

export interface SlideProps {
  page: number;
}
