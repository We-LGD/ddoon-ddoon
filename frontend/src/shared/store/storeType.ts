import { NewChallengeProps } from '@/pages/interface';

export interface InputStore {
  inputs: Record<string, string>;
  setInput: (name: string, value: string) => void;
  resetInputs: () => void;
}

export interface MobileState {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  checkMobile: () => void;
}

export interface NewChallengeStore {
  newChallenge: NewChallengeProps;
  setNewChallenge: (fields: Partial<NewChallengeProps>) => void;
}

export interface SelectDayProps {
  select: null | string;
  setSelect: (day: string | null) => void;
}
