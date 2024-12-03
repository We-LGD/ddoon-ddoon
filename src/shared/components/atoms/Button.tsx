import { ButtonProps } from '@/shared/interface/atomsType';

function Button({ children, cancel, event }: ButtonProps) {
  return (
    <button
      onClick={event}
      className={`w-[10rem] h-[3.125rem] leading-[3.8] text-white rounded hover:bg-active ${cancel ? 'bg-disabled' : 'bg-main'}`}
    >
      {children}
    </button>
  );
}

export default Button;
