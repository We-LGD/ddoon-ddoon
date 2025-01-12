import { useEffect, useRef, useState } from 'react';
import { Images } from '@/shared/assets/images';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import SuccessCheckModal from '@/shared/components/organisms/SuccessCheckModal';
import { challenges } from '@/shared/data/challenges';

function Trip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [initialLoad, setInitialLoad] = useState(true);
  const [challengeSelectShow, setChallengeSelectShow] = useState(false);
  const [CurrentName, setCurrentCallenge] = useState(challenges[0].name);
  const [CurrentId, setCurrentId] = useState(challenges[0].idx);

  const handleResize = () => {
    if (containerRef.current) {
      const aspectRatio = imageDimensions.height / imageDimensions.width;
      const containerWidth = containerRef.current.offsetWidth;
      const adjustedHeight = containerWidth * aspectRatio;
      setImageDimensions({ width: containerWidth, height: adjustedHeight });
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = Images.구름맵30일;
    img.onload = () => {
      if (containerRef.current) {
        const aspectRatio = img.height / img.width;
        const containerWidth = containerRef.current.offsetWidth;
        const adjustedHeight = containerWidth * aspectRatio;
        setImageDimensions({ width: containerWidth, height: adjustedHeight });

        if (initialLoad) {
          setInitialLoad(false);
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
          }, 0);
        }
      }
    };
  }, [initialLoad]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageDimensions]);

  useEffect(() => {
    const lastVisitedDate = localStorage.getItem(`challenge_${CurrentId}_lastVisitedDate`);
    const today = new Date().toISOString().split('T')[0];

    if (!lastVisitedDate || lastVisitedDate !== today) {
      SuccessCheckModal();
      localStorage.setItem(`challenge_${CurrentId}_lastVisitedDate`, today);
    }
  }, [CurrentId]);

  return (
    <div ref={containerRef} className="w-fill h-[calc(100vh-54px)] overflow-y-auto">
      <div
        className="relative w-full"
        style={{
          height: `${imageDimensions.height}px`,
          backgroundImage: `url(${Images.구름맵30일})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          zIndex: 10,
        }}
      >
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
          className="fixed top-[1%] left-1/2 transform -translate-x-1/2 w-[14rem] h-[4rem] z-30 flex items-center justify-center cursor-pointer"
          style={{
            backgroundImage: `url(${Images.통나무})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
          onClick={() => setChallengeSelectShow(!challengeSelectShow)}
        >
          <p className="wood-sign">{CurrentName}</p>
          {challengeSelectShow ? (
            <>
              <IoMdArrowDropup className="wood-sign" />
              <div className="absolute top-[105%] left-1/2 transform -translate-x-1/2 bg-white w-[14rem] shadow-lg rounded-lg overflow-hidden">
                {challenges.map((challenge) => (
                  <p
                    id={challenge.idx}
                    className="hover:bg-main hover:text-white transition-all  py-2 px-4"
                    onClick={() => {
                      setCurrentCallenge(challenge.name);
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

        <img
          src={Images.기본뚠뚠}
          alt="기본뚠뚠"
          className="absolute bottom-[3%] left-1/2 transform -translate-x-1/2 w-[12%] object-contain"
        />
      </div>
    </div>
  );
}

export default Trip;
