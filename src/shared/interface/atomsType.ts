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

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ButtonProps extends themeProps {
  children: React.ReactNode;
  disabled?: boolean;
  cancel?: boolean;
  event?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export interface SlideProps {
  page: number;
}
