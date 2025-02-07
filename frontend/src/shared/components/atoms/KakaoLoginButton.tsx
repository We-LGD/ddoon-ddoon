import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { IoChatbubble } from 'react-icons/io5';

export default function KakaoLoginButton() {
  // const navigate = useNavigate();
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const handleKakaoLoginClick = async () => {
    window.location.href = kakaoURL;
  };

  // const code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    // axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`).then((r) => {
    //   console.log(r.data); // 토큰과 함께 오는 정보들을 출력해보자
    //   navigate('/loginSuccess'); //
    // });
  }, []);
  return (
    <div
      className={`flex-center ${isMobile ? 'w-full' : 'w-[27.375rem]'} h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] cursor-pointer`}
      onClick={handleKakaoLoginClick}
    >
      <IoChatbubble className="h-5 w-5 mr-1 mb-1" />
      <button>카카오로 시작하기</button>
    </div>
  );
}
