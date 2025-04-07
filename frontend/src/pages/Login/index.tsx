import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import Cookies from 'js-cookie';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import useCheckUserNickname from '@/shared/hook/useCheckUserNickname';
import { auth } from '@/shared/utils/firebase';
import saveUserToFirestore from '@/shared/utils/saveUserToFirestore';
import { Images } from '@/shared/assets/images';
import useInputStore from '@/shared/store/useInputStore';
import Modal from '@/shared/components/organisms/Modal';
import Input from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import GithubLoginButton from '@/pages/Login/GithubLoginButton';
import KakaoLoginButton from '@/pages/Login/KakaoLoginButton';
import GuestLoginButton from '@/pages/Login/GuestLoginButton';

export default function Login() {
  const { inputs, resetInputs } = useInputStore();
  const { checkUserNickname } = useCheckUserNickname();
  const { email, password } = inputs;

  const handleLoginBtnClick = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
          const idToken = await user.getIdToken();

          Cookies.set('userToken', idToken, { expires: 1, secure: true, sameSite: 'Strict' });

          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
              withCredentials: true,
            },
          );

          await saveUserToFirestore();
          await checkUserNickname();
        }
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
    <div className="flex flex-col items-center justify-center w-full h-full px-7">
      <img src={Images.뚠뚠로고} alt="뚠뚠로고" className=" w-48 mb-[1rem]" />

      <section className="w-full flex flex-col items-center justify-center gap-3  mb-8 box-border">
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
          <GuestLoginButton />
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
