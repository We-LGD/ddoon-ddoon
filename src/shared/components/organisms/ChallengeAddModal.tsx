import Swal from 'sweetalert2';
import { MouseEventHandler, useState } from 'react';
import useDummyStore from '@/store/useDummyStore';
import useInputStore from '@/store/useInputStore';
import useNewChallengeStore from '@/store/useNewChallengeStore';
import Button from '@/shared/components/atoms/Button';
import Input from '@/shared/components/atoms/Input';

function ChallengeAddModal({ open, event }: { open: boolean; event: MouseEventHandler }) {
  const { setNewChallenge } = useNewChallengeStore();
  const { resetInputs } = useInputStore();
  const { setDummy } = useDummyStore();
  const [selectDay, setSelectDay] = useState<string | null>(null);

  const handleSelectDay = (v: string) => {
    setSelectDay(v);
    setNewChallenge({ day: Number(v.slice(0, -1)) });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentInputs = useInputStore.getState().inputs;

    setNewChallenge({ ...currentInputs });

    if (!selectDay) {
      Swal.fire({
        title: '도전 일수를 선택해주세요',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#748D70',
        customClass: {
          title: 'text-lg',
          popup: 'w-[25.375rem] h-[15.625rem] font-default text-sm',
          confirmButton: 'w-[10rem] h-[3.125rem] text-white rounded hover:bg-active',
        },
      });
    } else if (selectDay) {
      setDummy(useNewChallengeStore.getState().newChallenge);
      event(e as unknown as React.MouseEvent<HTMLButtonElement>);
      setSelectDay(null);
      resetInputs();
    }
  };

  return (
    <div
      className={`${open ? 'flex' : 'hidden'} bg-disabledHover bg-opacity-80 justify-center items-center absolute top-0 left-0 w-full h-screen z-10`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="w-[31.125rem] h-[32.625rem] bg-white flex flex-col justify-center items-center gap-3 rounded-lg"
      >
        <fieldset className="flex flex-col gap-4">
          <Input title="챌린지 제목을 작성해주세요" placeholder="매일 책 10분 읽기" name="title" maxLength={20} />
          <Input title="다짐을 작성해주세요" placeholder="한 달에 한 권은 끝내보자" name="memo" maxLength={20} />
        </fieldset>
        <fieldset className="flex flex-col justify-center items-center">
          <legend className="mb-[0.75rem] text-center">도전 일수를 선택해주세요</legend>
          <div className="flex gap-5">
            {['30일', '50일', '100일'].map((v, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectDay(v)}
                  className={`w-[5.75rem] h-[3.125rem] rounded-[0.25rem] ${selectDay === v ? 'bg-black text-white' : 'text-input border border-input'}`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="flex gap-2 mt-6">
          <Button cancel={true} event={event}>
            취소
          </Button>
          <Button type="submit">도전 시작</Button>
        </fieldset>
      </form>
    </div>
  );
}

export default ChallengeAddModal;
