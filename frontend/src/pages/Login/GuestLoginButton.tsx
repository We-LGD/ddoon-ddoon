import Cookies from 'js-cookie';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '@shared/utils/firebase';
import useCheckUserNickname from '@/shared/hook/useCheckUserNickname';
import axiosInstance from '@/shared/utils/axios';

export default function GuestLoginButton() {
  const { checkUserNickname } = useCheckUserNickname();

  const handleGuestLoginClick = async () => {
    try {
      let user = auth.currentUser;

      if (!user) {
        // 익명 로그인 진행
        const userCredential = await signInAnonymously(auth);
        user = userCredential.user;
        if (!user) throw new Error('Firebase 익명 로그인 실패'); // 여기서 오류를 던져야 함
      }

      // 새로 로그인한 사용자의 토큰 가져오기
      const idToken = await user.getIdToken();
      Cookies.set('userToken', idToken, { expires: 1, secure: true, sameSite: 'Strict' });
      console.log('🍪 저장된 토큰:', Cookies.get('userToken'));

      // 백엔드에 토큰 검증 요청
      const response = await axiosInstance.post('/api/auth');

      if (response.data.success) {
        await checkUserNickname();
        return response.data.uid;
      } else {
        throw new Error('백엔드 인증 실패');
      }
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      return null;
    }
  };

  return (
    <button onClick={handleGuestLoginClick} className="text-[0.75rem] text-disabledHover">
      게스트로 입장하기 {'>'}
    </button>
  );
}
