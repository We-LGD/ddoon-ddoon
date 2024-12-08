import { useState } from 'react';
import useDummyStore from '@/store/useDummyStore';
import ChellengeAddBtn from '@/shared/components/atoms/ChallengeAddBtn';
import useInputStore from '@/store/useInputStore';
import ChallengeAddModal from '@/shared/components/organisms/ChallengeAddModal';
import ChallengeBox from '@/shared/components/organisms/ChallengeBox';

function Challenge() {
  const { dummy } = useDummyStore();
  const { resetInputs } = useInputStore();
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
    resetInputs();
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <h1 className="text-lg font-bold my-7">뚠뚠 챌린지</h1>
        <section className="flex flex-col gap-3 mb-1">
          <p className="text-right text-base">{dummy.length} / 10</p>
          {dummy.map((v, i) => {
            return <ChallengeBox key={i} title={v.title} memo={v.memo} day={v.day} index={i} />;
          })}
        </section>
        <ChellengeAddBtn event={handleModalOpen} />
      </div>
      <ChallengeAddModal open={open} event={handleModalOpen} />
    </>
  );
}

export default Challenge;
