import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import axiosInstance from '@/shared/utils/axios';
import useChallengeStore from '@/shared/store/useChallengeStore';
import { Images } from '@/shared/assets/images';
import Modal from '@/shared/components/organisms/Modal';
import SuccessCheckModal from '@/pages/Trip/SuccessCheckModal';
import RetryCheckModal from '@/pages/Trip/RetryCheckModal';
import WoodSign from '@/pages/Trip/WoodSign';
import getTodayDate from '@/shared/utils/getTodayDate';
import { ChallengeData } from '@/pages/interface';

export default function Trip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { getChallengeList } = useChallengeStore();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [initialLoad, setInitialLoad] = useState(true);
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    successCount: 0,
    days: 30,
    title: '',
    lastSuccessDate: '',
  });

  const selectedChallengeIdx = location.state;
  const challengeList = useChallengeStore.getState().challengeList;
  const activeChallenges = challengeList.filter(
    (challenge) => challenge.result !== 'fail' && challenge.result !== 'success',
  );
  const firstActiveChallenge = activeChallenges[0]?.idx.toString();

  const handleResize = () => {
    if (containerRef.current) {
      const aspectRatio = imageDimensions.height / imageDimensions.width;
      const containerWidth = containerRef.current.offsetWidth;
      const adjustedHeight = containerWidth * aspectRatio;
      setImageDimensions({ width: containerWidth, height: adjustedHeight });
    }
  };

  const handleCloudClick = () => {
    const confirmMove = async () => {
      if (challengeData.successCount < challengeData.days) {
        try {
          await axiosInstance.patch(
            `http://localhost:3000/challenge/${selectedChallengeIdx ? selectedChallengeIdx : firstActiveChallenge}`,
            {
              successCount: challengeData.successCount + 1,
              lastSuccessDate: new Date().toISOString(),
            },
          );
          setChallengeData((prev) => ({
            ...prev,
            successCount: prev.successCount + 1,
            lastSuccessDate: new Date().toISOString(),
          }));
        } catch (error) {
          console.error('Error updating challenge:', error);
        }
      }
    };

    SuccessCheckModal().then((isConfirmed) => {
      if (isConfirmed) {
        RetryCheckModal({
          event: confirmMove,
        });
      }
    });
  };

  const getChallengeData = async (selectedChallengeIdx: string) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/challenge/${selectedChallengeIdx}`);
      const challenges = response.data;

      setChallengeData(challenges);
    } catch (error) {
      console.error('Error fetching challenge data:', error);
    }
  };

  const getBottomValue = (index: number) => {
    if (!challengeData.days) return '0%';

    if (challengeData) {
      if (isMobile) {
        if (challengeData.days === 30) {
          return `${index * 3}%`;
        } else if (challengeData.days === 50) {
          return `${index * 1.85}%`;
        } else {
          return `${index * 0.97}%`;
        }
      } else {
        if (challengeData.days === 30) {
          return `${1 + index * 3.1}%`;
        } else if (challengeData.days === 50) {
          return `${index * 1.9}%`;
        } else {
          return `${index * 0.98}%`;
        }
      }
    }
  };

  useEffect(() => {
    const img = new Image();
    if (challengeData) {
      if (challengeData.days === 30) img.src = Images.구름맵30일;
      if (challengeData.days === 50) img.src = Images.구름맵50일;
      if (challengeData.days === 100) img.src = Images.구름맵100일;

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
    }
  }, [initialLoad, selectedChallengeIdx, challengeData]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageDimensions]);

  useEffect(() => {
    if (selectedChallengeIdx) {
      getChallengeData(selectedChallengeIdx);
    } else {
      getChallengeList().then(() => {
        if (challengeList.length === 0) {
          Modal({
            title: '챌린지가 없습니다!',
            desc: '새로운 챌린지를 시작해보세요.',
            buttonTitle: '확인',
          }).then(() => {
            navigate('/challenge');
          });
          return;
        }

        if (activeChallenges.length === 0) {
          Modal({
            title: '진행중인 챌린지가 없습니다!',
            desc: '새로운 챌린지를 시작해보세요.',
            buttonTitle: '확인',
          }).then(() => {
            navigate('/challenge');
          });
          return;
        }

        getChallengeData(firstActiveChallenge);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChallengeList, selectedChallengeIdx]);

  useEffect(() => {
    if (challengeData) {
      setInitialLoad(false);
    }

    if (challengeData.successCount === challengeData.days) {
      Modal({ title: '챌린지 성공', desc: '개미굴이 오픈됩니다!', buttonTitle: '확인' }).then(() => {
        navigate('/ddoon-ddoon-gool');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeData]);

  return (
    <div ref={containerRef} className="w-fill h-[calc(100vh-54px)] overflow-y-auto">
      <div
        className="relative w-full"
        style={{
          height: `${imageDimensions.height}px`,
          backgroundImage:
            challengeData?.days === 30
              ? `url(${Images.구름맵30일})`
              : challengeData?.days === 50
                ? `url(${Images.구름맵50일})`
                : `url(${Images.구름맵100일})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          zIndex: 10,
        }}
      >
        <WoodSign title={challengeData.title} getChallengeData={getChallengeData} />

        {challengeData.successCount === 0 && (
          <img
            src={Images.기본뚠뚠}
            alt="기본뚠뚠"
            className={`absolute w-[12%] object-contain horizontal-center ${challengeData.days === 30 ? 'bottom-[3%]' : challengeData.days === 50 ? 'bottom-[2%]' : 'bottom-[1%]'}`}
          />
        )}

        <div
          className="relative"
          style={{
            height: isMobile ? 'calc(100% - 150px)' : 'calc(100% - 200px)',
          }}
        >
          {Array.from({ length: challengeData.days }, (_, index) => (
            <div
              key={index + 1}
              onClick={index === challengeData.successCount ? handleCloudClick : undefined}
              className={`absolute text-center flex-center font-sub font-bold cursor-pointer 
                ${isMobile ? (index % 2 !== 0 ? 'left-[15%]' : 'right-[15%]') : index % 2 !== 0 ? 'left-[20%]' : 'right-[20%]'}
                `}
              style={{ bottom: getBottomValue(index) }}
            >
              {index === challengeData.successCount - 1 && (
                <>
                  <img
                    src={Images.기본뚠뚠}
                    alt="기본뚠뚠"
                    className="absolute w-[50%] bottom-[75%] object-contain z-20"
                  />
                  {challengeData.successCount < challengeData.days &&
                    challengeData.lastSuccessDate.split('T')[0] === getTodayDate() && (
                      <p className="absolute bottom-[210%] right-[-30%] text-center z-20">내일도 화이팅!</p>
                    )}
                </>
              )}
              <img src={Images.cloud} alt="구름" />
              <p className="absolute horizontal-center">{index + 1} Day</p>
              {index === challengeData.successCount &&
                challengeData.lastSuccessDate.split('T')[0] !== getTodayDate() && (
                  <p className="absolute bottom-[100%] text-lg text-white animate-textGlow">Click!</p>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
