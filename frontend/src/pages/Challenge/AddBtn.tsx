import { MouseEventHandler } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function AddBtn({ event }: { event: MouseEventHandler }) {
  return (
    <button onClick={event} className="w-full min-h-[3rem] rounded-lg bg-gray-200 text-active flex-center mt-4">
      <FiPlus size={24} />
    </button>
  );
}
