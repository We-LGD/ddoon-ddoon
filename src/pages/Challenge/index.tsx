import useDummyStore from '@/store/useDummyStore';
import useInputStore from '@/store/useInputStore';
import useSelectDayStore from '@/store/useSelectDayStore';
import useNewChallengeStore from '@/store/useNewChallengeStore';
import Title from '@/shared/components/atoms/Title';
import ChallengeBox from '@/pages/Challenge/ChallengeBox';
import AddBtn from '@/pages/Challenge/AddBtn';
import LimitModal from '@/pages/Challenge/LimitModal';
import AddModal from '@/pages/Challenge/AddModal';

function Challenge() {
  const { dummy } = useDummyStore();
  const { resetInputs } = useInputStore();
  const { setSelect } = useSelectDayStore();
  const { setNewChallenge } = useNewChallengeStore();

  const handleChallengeAddModal = () => {
    if (dummy.length >= 10) {
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

  return (
    <div className="flex flex-col items-center relative pb-[4.375rem] px-5 max-h-screen">
      <Title>뚠뚠 챌린지</Title>

      <p className="max-w-[28.75rem] w-full mb-2 text-right text-base">{dummy.length} / 10</p>
      <section className="flex flex-col gap-4 max-w-[28.75rem] w-full max-h-screen overflow-y-auto">
        {dummy.map((v, i) => {
          return (
            <ChallengeBox
              key={i}
              title={v.title}
              memo={v.memo}
              day={v.day}
              index={v.idx}
              result={v.result}
              successCheck={v.successCheck}
            />
          );
        })}
      </section>
      <AddBtn event={handleChallengeAddModal} />
    </div>
  );
}

export default Challenge;
