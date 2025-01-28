import { useNavigate } from 'react-router-dom';
import { NavItemProps } from '@/shared/interface/atomsType';

export default function NavItem({ icon, label, path, isSelected }: NavItemProps) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(path)} className="flex flex-col items-center">
      <div className={`h-[1.375rem] text-[1.375rem] ${isSelected ? 'text-black' : 'text-disabledHover'}`}>{icon}</div>
      <span className={`text-[0.625rem] ${isSelected ? 'text-black' : 'text-disabledHover'}`}>{label}</span>
    </button>
  );
}
