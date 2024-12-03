export interface InputProps {
  name: string;
  title?: string;
  placeholder: string;
  description?: string;
  maxLength: number;
}

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isSelected: boolean;
}

export interface TitleProps {
  children: React.ReactNode;
};

export interface ButtonProps {
  name: string;
  cancel?: true;
}
