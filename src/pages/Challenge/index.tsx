import { useNavigate } from 'react-router-dom';
import useInputStore from '@/store/useInputStore';
import useSelectDayStore from '@/store/useSelectDayStore';
import useNewChallengeStore from '@/store/useNewChallengeStore';
import ChallengesData from '@/shared/data/ChallengesData';
import Title from '@/shared/components/atoms/Title';
import ChallengeBox from '@/pages/Challenge/ChallengeBox';
import AddBtn from '@/pages/Challenge/AddBtn';
import LimitModal from '@/pages/Challenge/LimitModal';
import AddModal from '@/pages/Challenge/AddModal';

export default function Challenge() {
  const navigate = useNavigate();
  const { resetInputs } = useInputStore();
  const { setSelect } = useSelectDayStore();
  const { setNewChallenge } = useNewChallengeStore();

  const handleChallengeAddModal = () => {
    if (ChallengesData.length >= 10) {
      LimitModal();
    } else {
      AddModal({
        outsideClick: () => {
          setSelect(null);
          setNewChallenge({ day: undefined });
          return true;
        },
        allowEscapKey: () => {
          setSelect(null);
          setNewChallenge({ day: undefined });
          return true;
        },
      });
      resetInputs();
    }
  };

  const handleLogout = () => {
    navigate('/');
    resetInputs();
  };

  return (
    <div className="flex flex-col items-center relative pb-[4.375rem] px-10 max-h-screen">
      <div className="relative w-full text-center">
        <Title>뚠뚠 챌린지</Title>
        <button onClick={handleLogout} className="absolute top-5 right-0 text-disabledHover">
          로그아웃
        </button>
      </div>

      <p className="w-full mb-2 text-right text-base">{ChallengesData.length} / 10</p>
      <section className="flex flex-col gap-4 w-full max-h-screen overflow-y-auto">
        {ChallengesData.map((challenge) => {
          return (
            <ChallengeBox
              key={challenge.idx}
              idx={challenge.idx}
              title={challenge.title}
              memo={challenge.memo}
              day={challenge.days}
              result={challenge.result}
            />
          );
        })}
      </section>
      <AddBtn event={handleChallengeAddModal} />
    </div>
  );
}
