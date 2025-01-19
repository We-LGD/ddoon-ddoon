import { useEffect, useRef, useState } from 'react';
import { Images } from '@/shared/assets/images';
import ChallengesData from '@/shared/data/challenges';
import SuccessCheckModal from '@/pages/Trip/SuccessCheckModal';
import WoodSign from '@/pages/Trip/WoodSign';
import getTodayDate from '@/utils/getTodayDate';

function Trip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentId, setCurrentId] = useState(ChallengesData[0].idx);
  const [currentSuccessCount, setCurrentSuccessCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleResize = () => {
    if (containerRef.current) {
      const aspectRatio = imageDimensions.height / imageDimensions.width;
      const containerWidth = containerRef.current.offsetWidth;
      const adjustedHeight = containerWidth * aspectRatio;
      setImageDimensions({ width: containerWidth, height: adjustedHeight });
    }
  };

  const handleCloudClick = () => {
    const confirmMove = () => {
      setCurrentSuccessCount(currentSuccessCount + 1);
      setShowMessage(true);

      // TODO: 서버 데이터 업데이트
      console.log('SuccessCount : ', currentSuccessCount + 1);
      console.log('lastSuccessDate : ', getTodayDate());
    };

    SuccessCheckModal({
      event: confirmMove,
    });
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
    const successCount = ChallengesData.find((challenge) => challenge.idx === currentId);
    if (successCount) setCurrentSuccessCount(successCount.successCount);
  }, [currentId]);

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
        <WoodSign setCurrentId={setCurrentId} />
        {currentSuccessCount === 0 && (
          <img
            src={Images.기본뚠뚠}
            alt="기본뚠뚠"
            className={`absolute bottom-[3%] w-[12%] object-contain horizontal-center`}
          />
        )}
        <div
          className="relative"
          style={{
            height: `calc(100% - 200px)`,
          }}
        >
          {Array.from({ length: 30 }, (_, index) => (
            <div
              key={index + 1}
              onClick={!showMessage && index === currentSuccessCount ? handleCloudClick : undefined}
              className={`absolute text-white text-center flex-center font-bold ${!showMessage && index === currentSuccessCount && 'animate-successLight cursor-pointer'}`}
              style={{
                bottom: `${1 + index * 3.1}%`,
                [index % 2 !== 0 ? 'left' : 'right']: '20%',
                width: `160px`,
                height: `60px`,
                backgroundColor: 'blue',
              }}
            >
              {index + 1} Day
              {index === currentSuccessCount - 1 && (
                <>
                  <img
                    src={Images.기본뚠뚠}
                    alt="기본뚠뚠"
                    className={`absolute w-[50%] bottom-[75%] object-contain`}
                  />
                  {showMessage && (
                    <p className="absolute bottom-[210%] right-[-30%] text-white text-center">내일도 화이팅!</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trip;
