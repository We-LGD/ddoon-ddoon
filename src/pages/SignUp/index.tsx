import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import useInputStore from '@/store/useInputStore';
import Modal from '@/shared/components/organisms/Modal';
import Button from '@/shared/components/atoms/Button';
import Input from '@/shared/components/atoms/Input';
import Title from '@/shared/components/atoms/Title';
import { isValidId, isValidPassword } from '@/utils/validation';

export default function SignUp() {
  const navigate = useNavigate();
  const { inputs, resetInputs } = useInputStore();
  const { id, password, passwordCheck } = inputs;
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = () => {
    if (id && password && passwordCheck) {
      console.log(id, password, passwordCheck); //TODO: 데이터 확인 용, 백엔드 작업 후 삭제 예정
      Modal({ icon: 'success', title: '회원가입이 완료되었습니다.', desc: '로그인을 해주세요.', buttonTitle: '확인' });
      resetInputs();
      navigate('/');
    }
  };

  useEffect(() => {
    if (id && password && passwordCheck && isValidId(id) && isValidPassword(password) && password === passwordCheck) {
      setDisabledBtn(false);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setDisabledBtn(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, password, passwordCheck]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Title>회원가입</Title>

      <div className={`flex flex-col gap-3 ${isMobile ? 'w-full p-5' : null}`}>
        <div>
          <Input theme="auth" name="id" placeholder="아이디 입력" maxLength={20} />
          {id && !isValidId(id) && (
            <p className="mt-1 text-[#ff4949]">4-20자, 최소 하나의 영문자가 포함되도록 작성해주세요.</p>
          )}
        </div>
        <div>
          <Input theme="auth" type="password" name="password" placeholder="비밀번호 입력" maxLength={20} />
          {password && !isValidPassword(password) && (
            <p className="mt-1 text-[#ff4949]">최소 8자, 하나 이상의 영문(대소문자), 숫자, 특수 문자를 포함해주세요.</p>
          )}
        </div>
        <div>
          <Input theme="auth" type="password" name="passwordCheck" placeholder="비밀번호 확인" maxLength={20} />
          {password !== passwordCheck && <p className="mt-1 text-[#ff4949]">비밀번호가 일치하지 않습니다.</p>}
        </div>
        <Button event={handleClick} theme="auth" disabled={disabledBtn}>
          가입하기
        </Button>
      </div>
    </div>
  );
}
