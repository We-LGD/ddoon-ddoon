import { FiPlus } from 'react-icons/fi';

function ChallengeAddBtn() {
  return (
    <button
      onClick={() => alert('추가!')}
      className="w-[28.75rem] h-[3.438rem] rounded-lg bg-gray-200 text-active flex justify-center items-center mt-4"
    >
      <FiPlus size={24} />
    </button>
  );
}

export default ChallengeAddBtn;
