import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Images } from '@/shared/assets/images';
import useInputStore from '@/store/useInputStore';
import Modal from '@/shared/components/organisms/Modal';
import Input from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import GithubLoginButton from '@/shared/components/atoms/GithubLoginButton';
import KakaoLoginButton from '@/shared/components/atoms/KakaoLoginButton';
import { auth } from '@/utils/firebase';

export default function Login() {
  const navigate = useNavigate();
  const { inputs, resetInputs } = useInputStore();
  const { email, password } = inputs;

  const handleLoginBtnClick = async () => {
    // TODO: 튜토리얼 완료 여부 저장
    // - 튜토리얼 미 완료 시 navigate('/tutorial')
    // - 튜토리얼 완료 시 navigate('/challenge')

    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/challenge');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          Modal({ icon: 'info', title: '아이디와 비밀번호를 확인해주세요.', buttonTitle: '확인' });
        }
      }
    } else {
      Modal({ icon: 'info', title: '아이디와 비밀번호를 확인해주세요.', buttonTitle: '확인' });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLoginBtnClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Images.뚠뚠로고} alt="뚠뚠로고" className=" w-48 mb-[1rem]" />

      <section className={`flex flex-col items-center justify-center gap-3 mb-8 ${isMobile ? 'w-full' : null}`}>
        <Input theme="auth" placeholder="이메일 입력" name="email" maxLength={20} />
        <Input theme="auth" type="password" placeholder="비밀번호 입력" name="password" maxLength={64} />
        <Button theme="auth" event={handleLoginBtnClick}>
          로그인
        </Button>

        <div>
          <Link to="/signup" onClick={resetInputs} className="text-[0.75rem] text-disabledHover">
            회원가입
          </Link>
          <span className="text-[0.75rem] text-disabledHover"> | </span>
          <Link
            to="/nickname-setup"
            onClick={() => localStorage.setItem('isLoggedIn', 'true')}
            className="text-[0.75rem] text-disabledHover"
          >
            게스트로 입장하기 {'>'}
          </Link>
        </div>
      </section>

      <section className={`flex flex-col gap-3 ${isMobile ? 'w-full' : null}`}>
        <div className={`flex items-center justify-between ${isMobile ? 'w-full' : 'w-[27.375rem]'}`}>
          <hr className="border-t-2 flex-grow border-gray-300" />
          <span className="whitespace-nowrap mx-2 text-[0.75rem] text-center text-disabledHover">SNS로 시작하기</span>
          <hr className="border-t-2 flex-grow border-gray-300" />
        </div>
        <KakaoLoginButton />
        <GithubLoginButton />
      </section>
    </div>
  );
}
