import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Images } from '@/shared/assets/images';
import ChallengesData from '@/shared/data/challenges';

function WoodSign({ setCurrentId }: { setCurrentId: React.Dispatch<React.SetStateAction<string>> }) {
  const woodSignRef = useRef<HTMLDivElement>(null);
  const [challengeSelectShow, setChallengeSelectShow] = useState(false);
  const [currentName, setCurrentName] = useState(ChallengesData[0].name);

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
  }, [setCurrentId]);

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
          <p className="wood-sign">{currentName}</p>
          <div className="absolute invisible top-[80%] horizontal-center opacity-0 group-hover:visible group-hover:opacity-80 transition text-[0.7rem] text-black bg-white rounded-md px-2 py-1 whitespace-nowrap">
            {currentName}
          </div>
        </div>

        {challengeSelectShow ? (
          <>
            <IoMdArrowDropup className="wood-sign text-3xl" />
            <div
              ref={woodSignRef}
              className="absolute top-[90%] horizontal-center bg-white w-[14rem] shadow-lg rounded-lg overflow-hidden"
            >
              {ChallengesData.filter((challenge) => challenge.result !== 'fail').map((challenge) => (
                <p
                  key={challenge.idx}
                  id={challenge.idx}
                  className="hover:bg-main hover:text-white transition-all  py-2 px-4"
                  onClick={() => {
                    setCurrentName(challenge.name);
                    setCurrentId(challenge.idx);
                  }}
                >
                  {challenge.name}
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

export default WoodSign;
