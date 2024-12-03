import { ButtonProps } from '@/shared/interface/atomsType';

function Button({ name, cancel }: ButtonProps) {
  return (
    <button
      // onClick={setClick}
      className={`w-[10rem] h-[3.125rem] text-white rounded hover:bg-active ${cancel ? 'bg-disabled' : ''} ${click ? 'bg-active' : 'bg-main'}`}
    >
      {name}
    </button>
  );
}

export default Button;
