import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useDummyStore from '@/store/useDummyStore';
import useInputStore from '@/store/useInputStore';
import useSelectDayStore from '@/store/useSelectDayStore';
import useNewChallengeStore from '@/store/useNewChallengeStore';
import ChallengeBox from '@/shared/components/organisms/ChallengeBox';
import ChellengeAddBtn from '@/shared/components/atoms/ChallengeAddBtn';
import ChallengeAddForm from '@/shared/components/templates/ChallengeAddForm';
import Title from '@/shared/components/atoms/Title';

function Challenge() {
  const MySwal = withReactContent(Swal);
  const { dummy } = useDummyStore();
  const { resetInputs } = useInputStore();
  const { setSelect } = useSelectDayStore();
  const { setNewChallenge } = useNewChallengeStore();

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
        html: <ChallengeAddForm />,
        allowOutsideClick: () => {
          setSelect(null);
          setNewChallenge({ day: undefined });
          return true;
        },
        allowEscapeKey: () => {
          setSelect(null);
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
      <ChellengeAddBtn event={handleChallengeAddModal} />
    </div>
  );
}

export default Challenge;
