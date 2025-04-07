import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChatbubble } from 'react-icons/io5';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { auth } from '@/shared/utils/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { useCheckUserNickname } from '@/shared/hook/useCheckUserNickname';

export default function KakaoLoginButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkUserNickname } = useCheckUserNickname();
  const searchParams = new URLSearchParams(location.search);
  const controller = new AbortController();
  const code = searchParams.get('code');

  const handleLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const sendCodeToBackend = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`,
        { code },
        { signal: controller.signal },
      );

      const customToken = response.data.firebaseToken; // 서버에서 받은 Custom Token

      // Firebase Custom Token으로 로그인
      const userCredential = await signInWithCustomToken(auth, customToken);
      const idToken = await userCredential.user.getIdToken();
      // Firebase Custom Token을 이용해 ID Token으로 교환 ID Token 저장
      Cookies.set('userToken', idToken, { expires: 1, secure: true, sameSite: 'Strict' });
      await checkUserNickname();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('카카오 로그인 에러:', axiosError.response?.data || axiosError.message);
      navigate('/');
    }
  };

  useEffect(() => {
    if (code) sendCodeToBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div
      className="flex-center w-full h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] cursor-pointer"
      onClick={handleLogin}
    >
      <IoChatbubble className="h-5 w-5 mr-1 mb-1" />
      <button>카카오로 시작하기</button>
    </div>
  );
}
