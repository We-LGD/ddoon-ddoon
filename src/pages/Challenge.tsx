import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useDummyStore from '@/store/useDummyStore';
import useInputStore from '@/store/useInputStore';
import useSelectDayStore from '@/store/useSelectDayStore';
import Button from '@/shared/components/atoms/Button';
import Input from '@/shared/components/atoms/Input';
import SelectDay from '@/shared/components/atoms/SelectDay';
import ChellengeAddBtn from '@/shared/components/atoms/ChallengeAddBtn';
import ChallengeBox from '@/shared/components/organisms/ChallengeBox';
import useNewChallengeStore from '@/store/useNewChallengeStore';
import useToolTipStore from '@/store/useTooltipStore';

function Challenge() {
  const MySwal = withReactContent(Swal);
  const { dummy, setDummy } = useDummyStore();
  const { resetInputs } = useInputStore();
  const { setNewChallenge } = useNewChallengeStore();
  const { setSelect } = useSelectDayStore();
  const { toolTip, setToolTip } = useToolTipStore();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentInputs = useInputStore.getState().inputs;
    const currentSelect = useSelectDayStore.getState().select;

    setNewChallenge({ ...currentInputs });

    if (!currentSelect) {
      setToolTip(true);
    } else {
      setDummy(useNewChallengeStore.getState().newChallenge);
      setSelect(null);
      resetInputs();
      MySwal.close();
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const handleChallengeAddModal = () => {
    if (dummy.length >= 10) {
      Swal.fire({
        title: '챌린지는 10개까지만 가능합니다.',
        icon: 'info',
        confirmButtonText: '확인',
        confirmButtonColor: '#748D70',
        customClass: {
          title: 'text-lg',
          popup: 'w-[25.375rem] h-[15.625rem] font-default text-sm',
          confirmButton: 'w-[10rem] h-[3.125rem] text-white rounded hover:bg-active',
        },
      });
    } else {
      MySwal.fire({
        title: '',
        html: (
          <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center py-10">
            <fieldset className="w-full flex flex-col justify-center items-center">
              <Input title="챌린지 제목을 작성해주세요" placeholder="매일 책 10분 읽기" name="title" maxLength={20} />
              <Input title="다짐을 작성해주세요" placeholder="한 달에 한 권은 끝내보자" name="memo" maxLength={20} />
            </fieldset>
            <fieldset className="w-full max-w-[20rem] flex flex-col justify-center items-center relative">
              <legend className="mb-[0.75rem] text-center">도전 일수를 선택해주세요</legend>
              <span
                className={`absolute w-[13.75rem] bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 bg-zinc-800 text-white py-1 rounded-md ${toolTip ? 'animate-tooltip' : 'opacity-0'}`}
              >
                도전 일수를 선택해주세요.
              </span>
              <SelectDay />
            </fieldset>
            <fieldset className="w-full max-w-[20rem] flex justify-between items-center gap-3 mt-5">
              <Button
                cancel={true}
                event={() => {
                  Swal.close();
                  setSelect(null);
                  setNewChallenge({ day: undefined });
                }}
              >
                취소
              </Button>
              <Button type="submit">도전 시작</Button>
            </fieldset>
          </form>
        ),
        allowOutsideClick: () => {
          setSelect(null);
          setToolTip(false);
          setNewChallenge({ day: undefined });
          return true;
        },
        allowEscapeKey: () => {
          setSelect(null);
          setToolTip(false);
          setNewChallenge({ day: undefined });
          return true;
        },
        showConfirmButton: false,
        customClass: {
          popup: 'w-full max-w-[31.125rem] h-auto px-2 font-default text-sm flex justify-center',
        },
      });
      resetInputs();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center relative pb-[4.375rem] px-5">
        <h1 className="text-lg font-bold my-7">뚠뚠 챌린지</h1>
        <section className="flex flex-col gap-4 max-w-[28.75rem] w-full">
          <p className="text-right text-base">{dummy.length} / 10</p>
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
        <ChellengeAddBtn event={handleChallengeAddModal} />
      </div>
    </>
  );
}

export default Challenge;
