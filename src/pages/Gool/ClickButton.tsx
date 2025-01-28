import { Images } from '@/shared/assets/images';

export default function ClickButton({
  onClick,
}: {
  onClick: ({ imgSrc, idx, title }: { imgSrc: keyof typeof Images; idx: number; title?: string | undefined }) => void;
}) {
  return (
    <div className="absolute w-[38%] top-[20%] left-[31%]">
      <button
        className={`absolute z-30 text-center ${localStorage.getItem(`clickBtn0`) === 'false' ? 'opacity-0 w-full h-full top-0 left-0' : 'opacity-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white animate-pulse'}`}
        style={{
          textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
          fontSize: `${window.innerHeight * 0.03}px`,
        }}
        onClick={() => onClick({ imgSrc: '튜토리얼오픈', idx: 0 })}
      >
        Click
      </button>
      <img src={Images.튜토리얼오픈} alt="튜토리얼 오픈방" className="w-full h-auto object-contain" />
    </div>
  );
}
