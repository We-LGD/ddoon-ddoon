import { isMobile } from 'react-device-detect';
import { ButtonProps } from '@/shared/interface/atomsType';

export default function Button({ theme, children, cancel, event, type = 'button', disabled }: ButtonProps) {
  return (
    <button
      onClick={event}
      type={type}
      disabled={disabled}
      className={`
        ${theme === 'auth' ? 'w-[27.375rem]' : null}  
        ${theme === 'tutorial' || theme === 'challenge' || theme === 'modal' ? 'w-full max-w-[10rem]' : null}  
        ${isMobile ? 'w-full' : null}
        h-[3.125rem] leading-[3] text-white rounded 
        ${cancel || disabled ? 'bg-disabled hover:bg-disabledHover' : 'bg-main hover:bg-active'}`}
    >
      {children}
    </button>
  );
}
