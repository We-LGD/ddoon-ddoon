import { ButtonProps } from '@/shared/interface/atomsType';

function Button({ children, cancel, event, type = 'button', disabled }: ButtonProps) {
  return (
    <button
      onClick={event}
      type={type}
      disabled={disabled}
      className={`w-full max-w-[10rem] h-[3.125rem] leading-[3] text-white rounded ${cancel || disabled ? 'bg-disabled hover:bg-disabledHover' : 'bg-main hover:bg-active'}`}
    >
      {children}
    </button>
  );
}

export default Button;
