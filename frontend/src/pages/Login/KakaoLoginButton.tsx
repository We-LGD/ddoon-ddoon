import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { IoChatbubble } from 'react-icons/io5';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export default function KakaoLoginButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const controller = new AbortController();
  const code = searchParams.get('code');

  const handleLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const sendCodeToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/kakao', { code }, { signal: controller.signal });

      const auth = getAuth();
      const customToken = response.data.firebaseToken; // 서버에서 받은 Custom Token

      // Firebase Custom Token을 이용해 ID Token으로 교환
      signInWithCustomToken(auth, customToken).then((userCredential) => {
        userCredential.user.getIdToken().then((idToken) => {
          // ID Token을 이용해 인증 진행
          Cookies.set('userToken', idToken, { expires: 1, secure: true, sameSite: 'Strict' });
          localStorage.setItem('isKaKaoLoggedIn', 'true');
          navigate('/challenge');
        });
      });
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
      className={`flex-center ${isMobile ? 'w-full' : 'w-[27.375rem]'} h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] cursor-pointer`}
      onClick={handleLogin}
    >
      <IoChatbubble className="h-5 w-5 mr-1 mb-1" />
      <button>카카오로 시작하기</button>
    </div>
  );
}
