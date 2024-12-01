import CloseBtn from '@/shared/components/atoms/CloseBtn';
import { useState } from 'react';

function ChallengeBox() {
  const [fail, setFail] = useState(false);

  const failEvent = () => {
    setFail(!fail);
  };

  return (
    <>
      <div
        onClick={failEvent}
        className={`max-w-[28.75rem] h-[7rem] rounded-lg flex space-x-10 justify-between items-center p-4 relative ${fail ? 'bg-disabled text-gray-400' : 'hover:bg-active group bg-main text-white'}`}
      >
        <section className="flex flex-col space-y-2 overflow-hidden">
          <h1 className="text-[1.125rem] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            매일 책 10분 읽기 30일
          </h1>
          <h2 className="text-[0.875rem] overflow-hidden text-ellipsis whitespace-nowrap">화이팅!</h2>
        </section>
        <p
          className={`text-active text-[1.125rem] font-bold whitespace-nowrap ${fail ? 'text-gray-400' : 'group-hover:text-main'}`}
        >
          D-20
        </p>
        <CloseBtn isFail={fail} />
      </div>
    </>
  );
}

export default ChallengeBox;
