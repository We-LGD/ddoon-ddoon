import { useEffect, useState } from 'react';
import { Images } from '@/shared/assets/images';
import TutorialRewardModal from '@/shared/components/templates/TutorialRewardModal';
import { successImagesData } from '@/utils/constants/successImages';
import { getClickButtonPosition } from '@/utils/constants/buttonPositions';
import { getFailureImagePosition } from '@/utils/constants/failurePositions';

function Gool() {
  const [width, setWidth] = useState(0);
  const [challengeResults, setChallengeResults] = useState<{ success: boolean; number: number }[]>([]);

  const handleChallenge = (success: boolean) => {
    const nextChallengeNumber = challengeResults.length + 1;
    if (nextChallengeNumber <= successImagesData.length) {
      setChallengeResults([...challengeResults, { success, number: nextChallengeNumber }]);
    }
  };

  useEffect(() => {
    const tutorialModal = localStorage.getItem('tutorialModal');
    if (tutorialModal === 'true') {
      TutorialRewardModal();
    }

    const aspectRatio = 640 / 1283;

    const calculateWidth = () => {
      const parentHeight = window.innerHeight - 54;
      setWidth(parentHeight * aspectRatio);
    };

    calculateWidth();

    window.addEventListener('resize', calculateWidth);

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-54px)] flex justify-center items-center">
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[16.5625rem] h-[6rem] z-30 flex items-center justify-center"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴_팻말})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <p className="text-center font-woodSign text-[#b89d80] text-3xl font-bold">갓생뚠뚠굴</p>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴_배경})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
        }}
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></div>

      <div
        className={`relative h-full`}
        style={{
          width: `${width}px`,
          position: 'relative',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${Images.뚠뚠굴_빈굴})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex: 10,
          }}
        ></div>

        {successImagesData.map((style, index) => {
          const result = challengeResults.find((res) => res.number === index + 1);
          const buttonStyle = getClickButtonPosition(index + 1);
          const failureStyle = getFailureImagePosition(index + 1, style);

          return (
            <div key={index} className="absolute" style={result && result.success ? { ...style } : { ...failureStyle }}>
              {result && result.success ? (
                <button
                  className="absolute z-30 font-bold text-white animate-pulse"
                  style={{
                    ...buttonStyle,
                    textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
                    fontSize: `${window.innerHeight * 0.03}px`,
                  }}
                >
                  Click
                </button>
              ) : null}

              {result ? (
                <img
                  src={result.success ? Images.첫번째굴30일 : Images.실패방}
                  alt={`방 ${index + 1} ${result.success ? '성공' : '실패'}`}
                  className="w-full h-auto object-contain"
                />
              ) : null}
            </div>
          );
        })}

        {/* TODO: 이미지 확인을 위한 임시 버튼 - 작업 후 삭제 예정 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000]">
          <button
            className="px-6 py-2 bg-green-500 text-white font-bold rounded shadow mr-4"
            onClick={() => handleChallenge(true)}
          >
            챌린지 성공
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white font-bold rounded shadow"
            onClick={() => handleChallenge(false)}
          >
            챌린지 실패
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gool;
