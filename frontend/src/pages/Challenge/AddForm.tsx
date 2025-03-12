import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFirebaseToken from '@/shared/hook/useFirebaseToken';
import useInputStore from '@/shared/store/useInputStore';
import useSelectDayStore from '@/shared/store/useSelectDayStore';
import Button from '@/shared/components/atoms/Button';
import Input from '@/shared/components/atoms/Input';
import SelectDay from '@/pages/Challenge/SelectDay';

export default function AddForm() {
  const MySwal = withReactContent(Swal);
  const userToken = useFirebaseToken();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { inputs, resetInputs } = useInputStore();
  const { select, setSelect } = useSelectDayStore();
  const { title, memo } = inputs;

  const handleFormSubmit = () => {
    const addChallenge = async () => {
      try {
        await axios.post(
          'http://localhost:3000/challenge',
          {
            title: title,
            memo: memo,
            days: select,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    addChallenge();
    setDisabledBtn(true);
    setSelect(null);
    resetInputs();
    MySwal.close();
  };

  useEffect(() => {
    if (title && memo && select) {
      setDisabledBtn(false);
    }
  }, [title, memo, select]);

  return (
    <form className="w-full flex flex-col items-center py-10">
      <fieldset className="w-full flex flex-col justify-center items-center">
        <Input
          theme="challenge"
          title="챌린지 제목을 작성해주세요"
          placeholder="매일 책 10분 읽기"
          name="title"
          maxLength={20}
        />
        <Input
          theme="challenge"
          title="다짐을 작성해주세요"
          placeholder="한 달에 한 권은 끝내보자"
          name="memo"
          maxLength={20}
        />
      </fieldset>
      <fieldset className="w-full max-w-[20rem] flex flex-col justify-center items-center relative">
        <legend className="mb-[0.75rem] text-center">도전 일수를 선택해주세요</legend>
        <SelectDay />
      </fieldset>
      <fieldset className="w-full max-w-[20rem] flex justify-between items-center gap-3 mt-5">
        <Button
          theme="challenge"
          cancel={true}
          event={() => {
            MySwal.close();
            setSelect(null);
          }}
        >
          취소
        </Button>
        <Button theme="challenge" disabled={disabledBtn} event={handleFormSubmit}>
          도전 시작
        </Button>
      </fieldset>
    </form>
  );
}
