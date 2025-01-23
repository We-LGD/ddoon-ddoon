import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Images } from '@/shared/assets/images';
import ChallengesData from '@/shared/data/ChallengesData';
import Modal from '@/shared/components/organisms/Modal';
import SuccessCheckModal from '@/pages/Trip/SuccessCheckModal';
import RetryCheckModal from '@/pages/Trip/RetryCheckModal';
import WoodSign from '@/pages/Trip/WoodSign';
import getTodayDate from '@/utils/getTodayDate';

export default function Trip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentId, setCurrentId] = useState(location.state ? location.state.idx : ChallengesData[0].idx);
  const [currentSuccessCount, setCurrentSuccessCount] = useState(0);
  const [days, setDays] = useState(30);
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
      if (currentSuccessCount < days) {
        setCurrentSuccessCount(currentSuccessCount + 1);
        setShowMessage(true);
      }

      // TODO: 서버 데이터 업데이트
      console.log('SuccessCount : ', currentSuccessCount + 1);
      console.log('lastSuccessDate : ', getTodayDate());
    };

    SuccessCheckModal().then(() => {
      RetryCheckModal({
        event: confirmMove,
      });
    });
  };

  useEffect(() => {
    const img = new Image();
    if (days === 30) img.src = Images.구름맵30일;
    if (days === 50) img.src = Images.구름맵50일;
    if (days === 100) img.src = Images.구름맵100일;

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
  }, [initialLoad, days]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageDimensions]);

  useEffect(() => {
    const challengeData = ChallengesData.find((challenge) => challenge.idx === currentId);
    if (challengeData) {
      setDays(challengeData.days);
      setCurrentSuccessCount(challengeData.successCount);
    }
  }, [currentId]);

  useEffect(() => {
    if (currentSuccessCount === days) {
      Modal({ title: '챌린지 성공', desc: '개미굴이 오픈됩니다!', buttonTitle: '확인' }).then(() => {
        localStorage.setItem(`clickBtn${currentId}`, 'true');
        navigate('/ddoon-ddoon-gool');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSuccessCount, days]);

  return (
    <div ref={containerRef} className="w-fill h-[calc(100vh-54px)] overflow-y-auto">
      <div
        className="relative w-full"
        style={{
          height: `${imageDimensions.height}px`,
          backgroundImage:
            days === 30
              ? `url(${Images.구름맵30일})`
              : days === 50
                ? `url(${Images.구름맵50일})`
                : `url(${Images.구름맵100일})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          zIndex: 10,
        }}
      >
        <WoodSign currentId={currentId} setCurrentId={setCurrentId} />
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
          {Array.from({ length: days }, (_, index) => (
            <div
              key={index + 1}
              onClick={!showMessage && index === currentSuccessCount ? handleCloudClick : undefined}
              className="absolute text-center flex-center font-sub font-bold cursor-pointer"
              style={{
                bottom: days === 30 ? `${1 + index * 3.1}%` : days === 50 ? `${index * 1.9}%` : `${index * 0.98}%`,
                [index % 2 !== 0 ? 'left' : 'right']: '20%',
              }}
            >
              {index === currentSuccessCount - 1 && (
                <>
                  <img
                    src={Images.기본뚠뚠}
                    alt="기본뚠뚠"
                    className="absolute w-[50%] bottom-[75%] object-contain z-20"
                  />
                  {showMessage && currentSuccessCount < days && (
                    <p className="absolute bottom-[210%] right-[-30%] text-center z-20">내일도 화이팅!</p>
                  )}
                </>
              )}
              <img src={Images.cloud} alt="구름" />
              <p className="absolute horizontal-center">{index + 1} Day</p>
              {!showMessage && index === currentSuccessCount && (
                <p className="absolute bottom-[100%] text-lg text-white animate-textGlow">Click!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
