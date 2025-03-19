import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInputStore from '@/shared/store/useInputStore';
import useChallengeStore from '@/shared/store/useChallengeStore';
import useSelectDayStore from '@/shared/store/useSelectDayStore';
import Modal from '@/shared/components/organisms/Modal';
import Title from '@/shared/components/atoms/Title';
import ChallengeBox from '@/pages/Challenge/ChallengeBox';
import AddBtn from '@/pages/Challenge/AddBtn';
import AddModal from '@/pages/Challenge/AddModal';
import logout from '@/shared/utils/logout';

export default function Challenge() {
  const navigate = useNavigate();
  const { resetInputs } = useInputStore();
  const { setSelect } = useSelectDayStore();
  const { challengeList, getChallengeList } = useChallengeStore();

  const handleChallengeAddModal = () => {
    if (challengeList.length >= 10) {
      Modal({ icon: 'info', title: '챌린지는 10개까지만 가능합니다.', buttonTitle: '확인' });
    } else {
      AddModal({
        outsideClick: () => {
          setSelect(null);
          return true;
        },
        allowEscapKey: () => {
          setSelect(null);
          return true;
        },
      });
      resetInputs();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    resetInputs();
  };

  useEffect(() => {
    getChallengeList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center relative pb-[4.375rem] px-10 max-h-screen">
      <div className="relative w-full text-center">
        <Title>뚠뚠 챌린지</Title>
        <button onClick={handleLogout} className="absolute top-5 right-0 text-disabledHover">
          로그아웃
        </button>
      </div>
      <p className="w-full mb-2 text-right text-base">{challengeList.length} / 10</p>
      <section className="flex flex-col gap-4 w-full max-h-screen overflow-y-auto">
        {challengeList.map((challenge) => {
          return (
            <ChallengeBox
              key={challenge.idx}
              idx={challenge.idx}
              title={challenge.title}
              memo={challenge.memo}
              days={challenge.days}
              result={challenge.result}
            />
          );
        })}
      </section>
      <AddBtn event={handleChallengeAddModal} />
    </div>
  );
}
