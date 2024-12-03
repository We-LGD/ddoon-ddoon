import { ButtonProps } from '@/shared/interface/atomsType';

function Button({ name, cancel, event }: ButtonProps) {
  return (
    <button
      onClick={event}
      className={`w-[10rem] h-[3.125rem] text-white rounded hover:bg-active ${cancel ? 'bg-disabled' : 'bg-main'}`}
    >
      {name}
    </button>
  );
}

export default Button;
