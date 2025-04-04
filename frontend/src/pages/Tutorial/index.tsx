import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/utils/firebase';
import { Images } from '@/shared/assets/images';
import Title from '@/shared/components/atoms/Title';
import Slide from '@/shared/components/atoms/Slide';
import Button from '@/shared/components/atoms/Button';

export default function Tutorial() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [startTouch, setStartTouch] = useState(0);
  const [nickname, setNickname] = useState<string>('');

  const handleNextPage = () => {
    if (page < 7) {
      setPage(page + 1);
    }
  };

  const handleFinishTutorial = () => {
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

  useEffect(() => {
    const getNickname = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setNickname(userSnap.data().nickname || '갓생뚠뚠');
        }
      }
    };

    getNickname();
  }, []);

  const tutorialContent = [
    {
      page: 2,
      title: '챌린지 페이지',
      image: Images.튜토리얼2,
      description: ['챌린지 추가 버튼을 누르면', '나만의 챌린지 이름과 도전 일수를 정하고', ' 다짐을 적을 수 있어!'],
    },
    {
      page: 3,
      title: '뚠뚠여행 페이지',
      image: Images.튜토리얼3,
      description: [
        '챌린지를 누르면 나오는 화면이야!',
        '매일 매일 도전을 성공하고 구름을 클릭하면 뚠뚠이가 구름을 타고 한 칸씩 올라갈 수 있어',
        <span className="text-red-500">* 단, 하루라도 실패하면 챌린지는 그 즉시 종료되니 주의하라구!</span>,
      ],
    },
    {
      page: 4,
      title: '뚠뚠여행 페이지',
      image: Images.튜토리얼4,
      description: ['모든 일수를 성공하면 챌린지는 성공이야!', '마지막 구름을 클릭하면 뚠뚠굴 페이지로 이동해'],
    },
    {
      page: 5,
      title: '뚠뚠굴 페이지',
      image: Images.튜토리얼5,
      description: [
        '보상으로 굴이 하나씩 열려',
        '도전 일수에 따라서 성공 시 보상되는 굴이 달라져.',
        '(우리의 뚠뚠이가 조금 더 고급진 생활을 할 수 있다구)',
        '10개의 챌린지를 모두 성공해서 뚠뚠굴을 완성해보자!',
      ],
    },
    {
      page: 6,
      title: '뚠뚠굴 페이지',
      image: Images.튜토리얼6,
      description: [
        '만약 챌린지가 실패한다면 굴은 영영 볼 수 없어...',
        ` 어때, ${nickname}굴이 더 멋있어지려면 열심히 해야겠지?`,
      ],
    },
  ];

  return (
    <div className="text-center h-full">
      <div id="slider-area" className="h-full">
        {page === 1 && (
          <div className="flex flex-col justify-center items-center h-full">
            <img src={Images.기본뚠뚠} className="w-36 mb-4" />
            <p>
              안녕! 난 뚠뚠이라고해 <br />
              지금부터 <b>{nickname}굴</b>을 어떻게 하면 완성할 수 있는지 알려줄께
              <br /> 따라와
            </p>
          </div>
        )}
        {tutorialContent.map((content) => (
          <>
            {page === content.page ? (
              <div key={content.page}>
                <div className="w-full h-[70vh] bg-disabled flex justify-center items-center">
                  <img
                    src={content.image}
                    alt="튜토리얼 이미지"
                    className={`w-auto ${page === 5 ? 'p-3 h-[50%]' : 'h-[90%] shadow-lg rounded-lg'}`}
                  />
                </div>
                <Title>{content.title}</Title>
                {content.description.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            ) : null}
          </>
        ))}
        {page === 7 && (
          <div className="flex-center h-full">
            <div>
              <Title>자, 이제 우리 같이 갓생살이 도전해볼까?</Title>
              <Button theme="tutorial" event={handleFinishTutorial}>
                도전!
              </Button>
            </div>
          </div>
        )}
      </div>
      {page < 7 && (
        <>
          {isMobile ? (
            <Slide page={page} />
          ) : (
            <div className="absolute bottom-0 left-0 w-full mb-10 flex-center">
              <Button theme="tutorial" event={handleNextPage}>
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
