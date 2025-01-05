import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Images } from '@/shared/assets/images';
import Title from '@/shared/components/atoms/Title';
import Slide from '@/shared/components/atoms/Slide';
import Button from '@/shared/components/atoms/Button';

function Tutorial() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [startTouch, setStartTouch] = useState(0);

  const handleNextPage = () => {
    if (page < 7) {
      setPage(page + 1);
    }
  };

  const handleFinishTutorial = () => {
    localStorage.setItem('tutorialModal', 'true');
    navigate('/ddoon-ddoon-gool');
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setStartTouch(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const touchDiff = startTouch - e.changedTouches[0].clientX;

      if (touchDiff > 50 && page < 7) {
        setPage((prevPage) => prevPage + 1);
      } else if (touchDiff < -50 && page > 1) {
        setPage((prevPage) => prevPage - 1);
      }
    },
    [startTouch, page],
  );

  useEffect(() => {
    const touchArea = document.getElementById('slider-area');

    if (touchArea) {
      touchArea.addEventListener('touchstart', handleTouchStart, { capture: true });
      touchArea.addEventListener('touchend', handleTouchEnd, { capture: true });
    }

    return () => {
      if (touchArea) {
        touchArea.removeEventListener('touchstart', handleTouchStart, { capture: true });
        touchArea.removeEventListener('touchend', handleTouchEnd, { capture: true });
      }
    };
  }, [handleTouchStart, handleTouchEnd]);

  return (
    <div className="text-center h-full">
      <div id="slider-area" className="h-full">
        {page === 1 && (
          <div className="flex flex-col justify-center items-center h-full">
            <img src={Images.기본뚠뚠} className="w-36 mb-4" />
            <p>
              안녕! 난 뚠뚠이라고해 <br />
              지금부터 (사용자가 지정한 굴이름)을 어떻게 하면 완성할 수 있는지 알려줄께
              <br /> 따라와
            </p>
          </div>
        )}
        {page === 2 && (
          <div>
            <div className="w-full h-[50vh] bg-disabled"></div>
            <Title>챌린지 소개</Title>
            <p>
              챌린지 추가 버튼을 누르면 <br />
              나만의 챌린지 이름과 도전 일수를 정하고
              <br /> 다짐을 적을 수 있어!
            </p>
          </div>
        )}
        {page === 3 && (
          <div>
            <div className="w-full h-[50vh] bg-disabled"></div>
            <Title>챌린지 소개</Title>
            <p>
              일수에 따라서 성공 시 보상되는 굴이 달라져! <br />
              어떻게 달라지냐고?
              <br /> 그건 뚠뚠굴 소개때 알려줄께!
            </p>
          </div>
        )}
        {page === 4 && (
          <div>
            <div className="w-full h-[50vh] bg-disabled"></div>
            <Title>뚠뚠여행 소개</Title>
            <p>
              챌린지를 시작하면 볼 수 있는 화면이야!
              <br /> 도전 일수에 따라 뚠뚠이가 산 {'>'} 하늘 {'>'} 우주로 더더 멀리 올라갈 수 있다구!
              <br /> 매일매일 성공해야 한 칸씩 올라갈 수 있어
              <br /> 단, 하루라도 실패하면 챌린지는 그 즉시 종료되니 주의하라구!
            </p>
          </div>
        )}
        {page === 5 && (
          <div>
            <div className="w-full h-[50vh] bg-disabled"></div>
            <Title>뚠뚠굴 소개</Title>
            <p>
              모든 일수를 성공하면 챌린지는 성공이야!
              <br /> 보상으로 굴이 하나씩 열려 <br />
              도전 일수에 따라 열리는 굴도 달라져
              <br />
              어떻게 달라지냐고?
            </p>
          </div>
        )}
        {page === 6 && (
          <div>
            <div className="w-full h-[50vh] bg-disabled"></div>
            <Title>뚠뚠굴 소개</Title>
            <p>
              위에 예시를 참고해줘! <br />
              정확한건 성공하면 볼 수 있어
              <br /> 챌린지가 실패하면 먼지만 쌓일지도... <br />
              어때, (사용자가 지정한 굴 이름)굴이 더 멋있어지려면 <br />
              열심히 해야겠지?
            </p>
          </div>
        )}
        {page === 7 && (
          <div className="flex justify-center items-center h-full">
            <div>
              <Title>자, 이제 우리 같이 갓생살이 도전해볼까?</Title>
              <Button event={handleFinishTutorial}>도전!</Button>
            </div>
          </div>
        )}
      </div>

      {page < 7 && (
        <>
          {isMobile ? (
            <Slide page={page} />
          ) : (
            <div className="absolute bottom-0 left-0 w-full mb-10 flex justify-center items-center">
              <Button event={handleNextPage}>다음</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tutorial;
