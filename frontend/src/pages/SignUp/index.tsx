import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useInputStore from '@/shared/store/useInputStore';
import Modal from '@/shared/components/organisms/Modal';
import Button from '@/shared/components/atoms/Button';
import Input from '@/shared/components/atoms/Input';
import Title from '@/shared/components/atoms/Title';
import { auth } from '@/shared/utils/firebase';
import { isValidPassword } from '@/shared/utils/validation';

export default function SignUp() {
  const navigate = useNavigate();
  const { inputs, resetInputs } = useInputStore();
  const { email, password, passwordCheck } = inputs;
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = async () => {
    if (email && password && passwordCheck) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // 자동 로그아웃 방지
        await auth.signOut();

        Modal({
          icon: 'success',
          title: '회원가입이 완료되었습니다.',
          desc: '로그인을 해주세요.',
          buttonTitle: '확인',
        });
        resetInputs();
        navigate('/');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = '이미 사용 중인 이메일입니다.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = '유효하지 않은 이메일 형식입니다.';
          }

          Modal({
            icon: 'error',
            title: '회원가입 실패',
            desc: errorMessage,
            buttonTitle: '확인',
          });
        }
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (email && password && passwordCheck && isValidPassword(password) && password === passwordCheck) {
      setDisabledBtn(false);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setDisabledBtn(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, passwordCheck]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Title>회원가입</Title>

      <div className={`flex flex-col gap-3 ${isMobile ? 'w-full p-5' : null}`}>
        <div>
          <Input theme="auth" name="email" placeholder="이메일 입력" maxLength={20} />
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
