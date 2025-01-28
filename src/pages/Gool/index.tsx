import { useEffect, useState } from 'react';
import { Images } from '@/shared/assets/images';
import ChallengesData from '@/shared/data/ChallengesData';
import ToolTip from '@/shared/components/atoms/ToolTip';
import Background from '@/pages/Gool/Background';
import ClickButton from '@/pages/Gool/ClickButton';
import SuccessModal from '@/pages/Gool/SuccessModal';
import { getClickButtonPosition } from '@/pages/Gool/ButtonPositions';
import { successImagesData } from '@/pages/Gool/SuccessImages';
import { getFailureImagePosition } from '@/pages/Gool/FailurePositions';

export default function Gool() {
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

  return (
    <Background>
      <ClickButton onClick={handleSuccessImgClick} />

      {successImagesData.map((item) => {
        const buttonStyle = getClickButtonPosition(item.idx);
        const failureStyle = getFailureImagePosition(item.idx, item.style);
        const successIdx = localStorage.getItem(`clickBtn${item.idx}`);
        const isClickBtnTrue = localStorage.getItem(`clickBtn${item.idx}`) === 'true';
        const challengesData = ChallengesData.find((challenge) => challenge.idx === item.idx);
        const successChallenge = challengesData?.result === 'success';
        const failChallenge = challengesData?.result === 'fail';

        return (
          <div
            key={item.idx}
            className="absolute"
            style={successIdx && successChallenge ? { ...item.style } : { ...failureStyle }}
          >
            {successIdx && successChallenge ? (
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

            {successIdx && successChallenge ? (
              <img
                src={
                  successChallenge ? Images[`${item.imgSrc}${challengesData.days}일` as keyof typeof Images] : undefined
                }
                alt={`${item.idx}번째 방 성공 이미지`}
                className="w-full h-auto object-contain pointer-events-auto"
              />
            ) : null}

            {failChallenge ? (
              <div className="relative group">
                <div className="absolute w-full h-full opacity-0 z-50">Invisible Button</div>
                <ToolTip>{challengesData?.title} 실패!</ToolTip>
                <img
                  src={failChallenge ? Images.실패방 : undefined}
                  alt={`${item.idx}번째 방 실패 이미지`}
                  className="w-full h-auto object-contain pointer-events-auto"
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </Background>
  );
}
