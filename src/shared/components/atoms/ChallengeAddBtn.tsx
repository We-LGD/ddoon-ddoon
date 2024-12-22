import { MouseEventHandler } from 'react';
import { FiPlus } from 'react-icons/fi';

function ChallengeAddBtn({ event }: { event: MouseEventHandler }) {
  return (
    <button
      onClick={event}
      className="max-w-[28.75rem] w-full h-[3.438rem] rounded-lg bg-gray-200 text-active flex justify-center items-center mt-4"
    >
      <FiPlus size={24} />
    </button>
  );
}

export default ChallengeAddBtn;
