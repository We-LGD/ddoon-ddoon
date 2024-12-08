import { ButtonProps } from '@/shared/interface/atomsType';

function Button({ children, cancel, event, type = 'button' }: ButtonProps) {
  return (
    <button
      onClick={event}
      type={type}
      className={`w-[10rem] h-[3.125rem] leading-[3.8] text-white rounded ${cancel ? 'bg-disabled hover:bg-disabledHover' : 'bg-main hover:bg-active'}`}
    >
      {children}
    </button>
  );
}

export default Button;
