import { useEffect, useState } from 'react';
import axiosInstance from '@/shared/utils/axios';
import { getImageSrc, Images } from '@/shared/assets/images';
import ToolTip from '@/shared/components/atoms/ToolTip';
import Background from '@/pages/Gool/Background';
import SuccessModal from '@/pages/Gool/SuccessModal';
import { successImagesData } from '@/pages/Gool/SuccessImages';
import { getFailureImagePosition } from '@/pages/Gool/FailurePositions';
import TutorialRewardModal from '@/pages/Gool/TutorialRewardModal';

export default function Gool() {
  const [goolList, setGoolList] = useState<
    { idx: number; result: string; days: number; title: string; isClicked: boolean }[]
  >([{ idx: -1, result: '', days: -1, title: '', isClicked: false }]);
  const [tutorialClear, setTutorialClear] = useState(false);

  const handleSuccessImgClick = async ({
    idx,
    imgSrc,
    title,
  }: {
    idx?: number;
    imgSrc: keyof typeof Images;
    title: string;
  }) => {
    if (idx) {
      await axiosInstance.patch(`http://localhost:3000/gool/${idx}`, {
        isClicked: true,
      });
    }

    SuccessModal({
      title: title,
      imageSrc: getImageSrc(imgSrc),
      onClose: () => {
        getGoolList();
      },
    });
  };

  const getGoolList = async () => {
    try {
      await axiosInstance.get('http://localhost:3000/gool-list').then((response) => {
        setGoolList(response.data);
      });
    } catch (error) {
      console.error('Error fetching gool list:', error);
    }
  };

  const tutorialState = async () => {
    try {
      await axiosInstance.get('http://localhost:3000/tutorial-status').then((response) => {
        setTutorialClear(response.data.tutorialCompleted);
        if (!response.data.tutorialCompleted) TutorialRewardModal();
      });
    } catch (error) {
      console.error('Error fetching tutorial status:', error);
    }
  };

  const tutorialOk = async () => {
    try {
      await axiosInstance
        .patch('http://localhost:3000/tutorial-status', { tutorialCompleted: true })
        .then(tutorialState);
    } catch (error) {
      console.error('Error fetching tutorial status:', error);
    }
  };

  useEffect(() => {
    tutorialState();
    getGoolList();
  }, []);

  return (
    <Background>
      <div className="absolute w-[38%] top-[20%] left-[31%]">
        <button
          className={`w-52 h-[10.5rem] absolute z-30 text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-white animate-pulse`}
          style={{
            textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
            fontSize: `${window.innerHeight * 0.03}px`,
          }}
          onClick={() => {
            handleSuccessImgClick({ imgSrc: '튜토리얼오픈', title: '튜토리얼 성공!' });
            if (!tutorialClear) tutorialOk();
          }}
        >
          {!tutorialClear && 'Click'}
        </button>
        <img src={Images.튜토리얼오픈} alt="튜토리얼 오픈방" className="w-full h-auto object-contain" />
      </div>
      {goolList.map((gool, index) => (
        <div
          key={gool.idx}
          className="absolute w-40 h-40"
          style={
            gool.result === 'success'
              ? { ...successImagesData[index].style }
              : { ...getFailureImagePosition(index + 1, successImagesData[index].style) }
          }
        >
          {gool.result === 'success' ? (
            <>
              {
                <button
                  className={`w-40 h-[10.5rem] absolute z-30 ${gool.isClicked === false ? 'opacity-1 font-bold text-white animate-pulse' : 'opacity-0 w-full h-full top-0 left-0'}`}
                  style={{
                    textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
                    fontSize: `${window.innerHeight * 0.03}px`,
                  }}
                  onClick={() =>
                    handleSuccessImgClick({
                      imgSrc: `${successImagesData[index].imgSrc}${gool.days}일` as keyof typeof Images,
                      title: gool.title,
                      idx: gool.idx,
                    })
                  }
                >
                  {!gool.isClicked && 'Click'}
                </button>
              }
              <img
                src={
                  gool.result === 'success'
                    ? getImageSrc(`${successImagesData[index].imgSrc}${gool.days}일` as keyof typeof Images)
                    : undefined
                }
                alt={`${successImagesData[index].idx}번째 방 성공 이미지`}
                className="w-full h-auto object-contain pointer-events-auto"
              />
            </>
          ) : null}
          {gool.result === 'fail' ? (
            <div className="relative group">
              <div className="absolute w-full h-full opacity-0 z-50">Invisible Button</div>
              <ToolTip>{gool.title} 실패!</ToolTip>
              <img
                src={
                  gool.result === 'fail'
                    ? successImagesData[index].idx === 3
                      ? Images.실패방3번
                      : Images.실패방
                    : undefined
                }
                alt={`${successImagesData[index].idx}번째 방 실패 이미지`}
                className="w-full h-auto object-contain pointer-events-auto"
              />
            </div>
          ) : null}
        </div>
      ))}
    </Background>
  );
}
