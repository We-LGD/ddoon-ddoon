import { MouseEventHandler } from 'react';

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
  isFail?: boolean;
}

export interface TitleProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  cancel?: boolean;
  event?: MouseEventHandler<HTMLButtonElement>;
}

export interface ChallengeProps {
  title: string;
  memo: string;
  day: number;
  fail?: true;
}

export interface SlideProps {
  page: number;
  setPage: (page: number) => void;
}
