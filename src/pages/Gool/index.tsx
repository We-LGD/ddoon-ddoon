import { useEffect, useState } from 'react';
import { Images } from '@/shared/assets/images';
import ChallengesData from '@/shared/data/ChallengesData';
import TutorialRewardModal from '@/pages/Gool/TutorialRewardModal';
import SuccessModal from '@/pages/Gool/SuccessModal';
import { getClickButtonPosition } from '@/pages/Gool/ButtonPositions';
import { successImagesData } from '@/pages/Gool/SuccessImages';
import { getFailureImagePosition } from '@/pages/Gool/FailurePositions';

export default function Gool() {
  const [width, setWidth] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [successModal, setSuccessModal] = useState(false);
  const [title, setTitle] = useState<string>('');

  const handleSuccessImgClick = ({
    imgSrc,
    idx,
    title,
  }: {
    imgSrc: keyof typeof Images;
    idx: number;
    title?: string | undefined;
  }) => {
    setSelectedImage(Images[imgSrc]);
    if (title) setTitle(title);
    console.log(title);
    setSuccessModal(true);
    localStorage.setItem(`clickBtn${idx}`, 'false');
  };

  useEffect(() => {
    if (successModal) {
      SuccessModal({
        title: title,
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
    <div className="relative h-[calc(100vh-54px)] flex-center">
      <div
        className="absolute top-0 horizontal-center w-[16.5625rem] h-[6rem] z-30 flex-center"
        style={{
          backgroundImage: `url(${Images.뚠뚠굴_팻말})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <p className="wood-sign">갓생뚠뚠굴</p>
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

        <div
          className="absolute"
          style={{
            width: '38%',
            top: '20%',
            left: '31%',
          }}
        >
          <button
            className={`absolute z-30 text-center ${localStorage.getItem(`clickBtn0`) === 'false' ? 'opacity-0 w-full h-full top-0 left-0' : 'opacity-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white animate-pulse'}`}
            style={{
              textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
              fontSize: `${window.innerHeight * 0.03}px`,
            }}
            onClick={() => handleSuccessImgClick({ imgSrc: '튜토리얼오픈', idx: 0 })}
          >
            Click
          </button>
          <img src={Images.튜토리얼오픈} alt="튜토리얼 오픈방" className="w-full h-auto object-contain" />
        </div>

        {successImagesData.map((item) => {
          const buttonStyle = getClickButtonPosition(item.idx);
          const failureStyle = getFailureImagePosition(item.idx, item.style);
          const successIdx = localStorage.getItem(`clickBtn${item.idx}`);
          const isClickBtnTrue = localStorage.getItem(`clickBtn${item.idx}`) === 'true';
          const challengesData = ChallengesData.find((challenge) => challenge.idx === item.idx);

          return (
            <div key={item.idx} className="absolute" style={successIdx ? { ...item.style } : { ...failureStyle }}>
              {challengesData?.result === 'success' && localStorage.getItem(`clickBtn${item.idx}`) ? (
                <button
                  className={`absolute z-30 ${isClickBtnTrue ? 'opacity-1 font-bold text-white animate-pulse' : 'opacity-0 w-full h-full top-0 left-0'}`}
                  style={{
                    ...(isClickBtnTrue ? buttonStyle : {}),
                    textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
                    fontSize: `${window.innerHeight * 0.03}px`,
                  }}
                  onClick={() =>
                    handleSuccessImgClick({
                      imgSrc: `${item.imgSrc}${challengesData?.days}일` as keyof typeof Images,
                      idx: item.idx,
                      title: challengesData?.title,
                    })
                  }
                >
                  Click
                </button>
              ) : null}

              {successIdx ? (
                <img
                  src={
                    challengesData?.result === 'success'
                      ? Images[`${item.imgSrc}${challengesData.days}일` as keyof typeof Images]
                      : Images.실패방
                  }
                  alt={`${item.idx}번째 방 ${challengesData?.result === 'success' ? '성공' : '실패'} 이미지`}
                  className="w-full h-auto object-contain"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
