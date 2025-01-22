import { useNavigate } from 'react-router-dom';
import { Images } from '@/shared/assets/images';
import DeleteBtn from '@/pages/Challenge/DeleteBtn';
import { ChallengeProps } from '@/pages/interface';

export default function ChallengeBox({ idx, title, memo, day, result }: ChallengeProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (result === 'progress') {
      navigate('/ddoon-ddoon-trip', { state: { idx } });
    } else if (result === 'success') {
      navigate('/ddoon-ddoon-gool', { state: { idx } });
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className={`w-full h-[7rem] rounded-lg flex space-x-10 justify-between items-center p-4 relative 
          ${result === 'success' && ' text-white border shadow-light animate-successLight bg-main  hover:bg-active group cursor-pointer'} 
          ${result === 'progress' && 'text-white bg-main hover:bg-active group cursor-pointer'} 
          ${result === 'fail' && 'bg-disabled text-gray-400'}`}
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
        <DeleteBtn result={result} />
        {result === 'success' && (
          <img className="absolute top-1 right-1 w-[5.875rem] h-[6.25rem]" src={Images.성공도장} alt="챌린지성공" />
        )}
        {result === 'fail' && (
          <img className="absolute top-1 right-1 w-[5.875rem] h-[6.25rem]" src={Images.실패도장} alt="챌린지실패" />
        )}
      </div>
    </>
  );
}
