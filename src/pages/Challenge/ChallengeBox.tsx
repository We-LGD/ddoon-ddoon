import useDummyStore from '@/store/useDummyStore';
import DeleteBtn from '@/pages/Challenge/DeleteBtn';
import { ChallengeProps } from '@/pages/interface';
import SuccessImg from '@/shared/assets/images/성공도장.png';
import FailImg from '@/shared/assets/images/실패도장.png';

function ChallengeBox({ title, memo, day, result, index, successCheck }: ChallengeProps) {
  const { updateDummy } = useDummyStore();

  //TODO: 모든 페이지 완성 시 링크 연결
  const handleOpen = (
    i: ChallengeProps['index'],
    result: ChallengeProps['result'],
    successCheck: ChallengeProps['successCheck'],
  ) => {
    if (result === 'progress') {
      alert('챌린지이동');
    } else if (result === 'success' && !successCheck && i) {
      updateDummy(i, undefined, true);
      alert('챌린지이동 및 애니메이션 중지');
    } else {
      alert('굴로 이동');
    }
  };

  return (
    <>
      <div
        onClick={() => handleOpen(index, result, successCheck)}
        className={`w-full h-[7rem] rounded-lg flex space-x-10 justify-between items-center p-4 relative ${result === 'success' && !successCheck ? 'bg-disabled text-gray-400 border shadow-light animate-successLight cursor-pointer' : result === 'fail' || successCheck ? 'bg-disabled text-gray-400' : 'hover:bg-active group bg-main text-white cursor-pointer'}`}
      >
        <section className="flex flex-col space-y-2 overflow-hidden w-full">
          <h1 className="text-[1.125rem] font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {title}
          </h1>
          <h2 className="text-[0.875rem] overflow-hidden text-ellipsis whitespace-nowrap w-full">{memo}</h2>
        </section>
        <p
          className={`text-active text-[1.125rem] font-bold whitespace-nowrap ${result !== 'progress' ? 'text-gray-400' : 'group-hover:text-main'}`}
        >
          D-{day}
        </p>
        <DeleteBtn result={result} index={index} />
        {result === 'success' && (
          <img className="absolute top-1 right-1 w-[5.875rem] h-[6.25rem]" src={SuccessImg} alt="챌린지성공" />
        )}
        {result === 'fail' && (
          <img className="absolute top-1 right-1 w-[5.875rem] h-[6.25rem]" src={FailImg} alt="챌린지실패" />
        )}
      </div>
    </>
  );
}

export default ChallengeBox;
