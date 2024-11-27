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
