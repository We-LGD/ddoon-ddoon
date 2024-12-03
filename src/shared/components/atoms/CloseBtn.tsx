import { SlClose } from 'react-icons/sl';
import { FailProps } from '@/shared/interface/atomsType';

function CloseBtn({ isFail }: FailProps) {
  return (
    <button
      onClick={() => alert('클릭!')}
      className={`w-{1rem} h-{1rem} flex justify-center items-center absolute right-2 top-2 ${isFail ? 'hidden' : ''}`}
    >
      <SlClose />
    </button>
  );
}

export default CloseBtn;
