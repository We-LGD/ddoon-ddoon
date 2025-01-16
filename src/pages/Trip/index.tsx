import React, { useEffect, useRef, useState } from 'react';
import { Images } from '@/shared/assets/images';
import CloudPosition from '@/pages/Trip/CloudPosition';
import ChallengesData from '@/shared/data/challenges';
import SuccessCheckModal from '@/shared/components/organisms/SuccessCheckModal';
import WoodSign from '@/pages/Trip/WoodSign';
import getTodayDate from '@/utils/getTodayDate';
import calculateButtonPosition from '@/utils/calculateButtonPosition';

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

        {CloudPosition.map((pos) => (
          <React.Fragment key={pos.id}>
            {pos.id === currentSuccessCount && (
              <>
                <img
                  key={pos.id}
                  src={Images.기본뚠뚠}
                  alt="기본뚠뚠"
                  className={`absolute w-[12%] object-contain ${pos.id === 0 && 'horizontal-center'}`}
                  style={{
                    right: pos.right !== undefined ? `${pos.right}%` : undefined,
                    left: pos.left !== undefined ? `${pos.left}%` : undefined,
                    bottom: `${pos.bottom}%`,
                  }}
                />

                {showMessage && pos.id !== 0 && (
                  <p
                    className="absolute text-white text-center "
                    style={{
                      right: pos.right !== undefined ? `${pos.right - 16}%` : undefined,
                      left: pos.left !== undefined ? `${pos.left - 16}%` : undefined,
                      bottom: `${pos.bottom + 2}%`,
                    }}
                  >
                    내일도 화이팅!
                  </p>
                )}
              </>
            )}

            {!showMessage && pos.id !== 0 && pos.id === currentSuccessCount + 1 && (
              <button
                onClick={handleCloudClick}
                className="absolute text-[100%] font-bold px-10 py-3"
                style={{
                  right: pos.right !== undefined ? `${pos.right - 4}%` : undefined,
                  left: pos.left !== undefined ? `${pos.left - 3}%` : undefined,
                  bottom: `${calculateButtonPosition(pos.id, pos.bottom)}%`,
                }}
              >
                CLICK
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Trip;
