import { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import useChallengeStore from '@/shared/store/useChallengeStore';
import { Images } from '@/shared/assets/images';
import ToolTip from '@/shared/components/atoms/ToolTip';

export default function WoodSign({
  title,
  getChallengeData,
}: {
  title: string;
  getChallengeData: (selectedChallengeIdx: string) => Promise<void>;
}) {
  const woodSignRef = useRef<HTMLDivElement>(null);
  const [challengeSelectShow, setChallengeSelectShow] = useState(false);
  const { challengeList, getChallengeList } = useChallengeStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (woodSignRef.current && !woodSignRef.current.contains(event.target as Node)) {
        setChallengeSelectShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [challengeSelectShow]);

  useEffect(() => {
    getChallengeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChallenge = (idx: string) => {
    getChallengeData(idx);
    setChallengeSelectShow(false);
  };

  return (
    <>
      <div
        className="relative w-full"
        style={{
          backgroundImage: `url(${Images.통나무})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          zIndex: 10,
        }}
      ></div>

      <div
        className="fixed top-[1%] horizontal-center w-[19rem] h-[5rem] z-30 flex-center cursor-pointer"
        style={{
          backgroundImage: `url(${Images.통나무})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
        onClick={() => setChallengeSelectShow(!challengeSelectShow)}
      >
        <div className="w-[60%] group">
          <p className="wood-sign">{title}</p>
          <ToolTip>{title}</ToolTip>
        </div>

        {challengeSelectShow ? (
          <>
            <IoMdArrowDropup className="wood-sign text-3xl" />
            <div
              ref={woodSignRef}
              className="absolute top-[90%] horizontal-center bg-white w-[14rem] shadow-lg rounded-lg overflow-hidden"
            >
              {challengeList
                .filter((challenge) => challenge.result !== 'fail' && challenge.result !== 'success')
                .map((challenge) => (
                  <p
                    key={challenge.idx}
                    className="hover:bg-main hover:text-white transition-all  py-2 px-4"
                    onClick={() => handleSelectChallenge(challenge.idx.toString())}
                  >
                    {challenge.title}
                  </p>
                ))}
            </div>
          </>
        ) : (
          <IoMdArrowDropdown className="wood-sign" />
        )}
      </div>
    </>
  );
}
