import { useState } from 'react';
import CloseBtn from '@/shared/components/atoms/CloseBtn';
import { ChallengeProps } from '@/shared/interface/atomsType';

function ChallengeBox({ title, memo, day, fail }: ChallengeProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className={`w-[28.75rem] h-[7rem] rounded-lg flex space-x-10 justify-between items-center p-4 relative ${fail ? 'bg-disabled text-gray-400' : 'hover:bg-active group bg-main text-white'}`}
      >
        <section className="flex flex-col space-y-2 overflow-hidden w-full">
          <h1 className="text-[1.125rem] font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {title}
          </h1>
          <h2 className="text-[0.875rem] overflow-hidden text-ellipsis whitespace-nowrap w-full">{memo}</h2>
        </section>
        <p
          className={`text-active text-[1.125rem] font-bold whitespace-nowrap ${fail ? 'text-gray-400' : 'group-hover:text-main'}`}
        >
          D-{day}
        </p>
        <CloseBtn isFail={fail} />
      </div>
    </>
  );
}

export default ChallengeBox;
