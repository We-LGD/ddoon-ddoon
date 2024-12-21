import { useEffect, useState } from 'react';
import { Images } from '@/shared/assets/images';
import TutorialRewardModal from '@/shared/components/templates/TutorialRewardModal';
import SuccessModal from '@/shared/components/templates/SuccessModal';
import { getClickButtonPosition } from '@/utils/constants/buttonPositions';
import { successImagesData } from '@/utils/constants/successImages';
import { getFailureImagePosition } from '@/utils/constants/failurePositions';

function Gool() {
  const [width, setWidth] = useState(0);
  const [challengeResults, setChallengeResults] = useState<{ success: boolean; number: number }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [successModal, setSuccessModal] = useState(false);

  const handleChallenge = (success: boolean) => {
    const nextChallengeNumber = challengeResults.length + 1;
    if (nextChallengeNumber <= successImagesData.length) {
      setChallengeResults([...challengeResults, { success, number: nextChallengeNumber }]);
    }
  };

  const handleSuccessBtnClick = ({ imgSrc, idx }: { imgSrc: string; idx?: number }) => {
    setSelectedImage(Images[imgSrc]);
    console.log(idx); // TODO: 방 번호 저장 확인 - 작업 후 삭제 예정
    setSuccessModal(true);
  };

  useEffect(() => {
    if (successModal) {
      SuccessModal({
        title: '챌린지 이름',
        imageSrc: selectedImage,
        onClose: () => setSuccessModal(false),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successModal]);

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

        <button
          className="absolute z-30 text-center font-bold text-white animate-pulse"
          style={{
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
            fontSize: `${window.innerHeight * 0.03}px`,
          }}
          onClick={() => handleSuccessBtnClick({ imgSrc: '튜토리얼오픈' })}
        >
          Click
        </button>
        <div
          className="absolute"
          style={{
            width: '38%',
            top: '20%',
            left: '31%',
          }}
        >
          <img src={Images.튜토리얼오픈} alt="튜토리얼 오픈방" className="w-full h-auto object-contain" />
        </div>

        {successImagesData.map((item) => {
          const result = challengeResults.find((res) => res.number === item.idx);
          const buttonStyle = getClickButtonPosition(item.idx);
          const failureStyle = getFailureImagePosition(item.idx, item.style);

          return (
            <div
              key={item.idx}
              className="absolute"
              style={result && result.success ? { ...item.style } : { ...failureStyle }}
            >
              {result && result.success ? (
                <button
                  className="absolute z-30 font-bold text-white animate-pulse"
                  style={{
                    ...buttonStyle,
                    textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
                    fontSize: `${window.innerHeight * 0.03}px`,
                  }}
                  onClick={() => handleSuccessBtnClick({ imgSrc: item.imgSrc, idx: item.idx })}
                >
                  Click
                </button>
              ) : null}

              {result ? (
                <img
                  src={result.success ? Images[item.imgSrc] : Images.실패방}
                  alt={`방 ${item.idx} ${result.success ? '성공' : '실패'}`}
                  className="w-full h-auto object-contain"
                />
              ) : null}
            </div>
          );
        })}

        {/* TODO: 이미지 확인을 위한 임시 버튼 - 작업 후 삭제 예정 */}
        <div className="absolute bottom-10 left-10 transform -translate-x-1/2 z-[1000]">
          <button
            className="px-6 py-2 bg-green-500 text-white font-bold rounded mr-4"
            onClick={() => handleChallenge(true)}
          >
            챌린지 성공
          </button>
          <button className="px-6 py-2 bg-red-500 text-white font-bold rounded" onClick={() => handleChallenge(false)}>
            챌린지 실패
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gool;
