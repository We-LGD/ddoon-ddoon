import axios from 'axios';
import { auth } from '@/shared/utils/firebase';

const logout = async () => {
  try {
    // 카카오 로그아웃
    await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
    localStorage.removeItem('isKaKaoLoggedIn');

    // 이메일 로그아웃
    await auth.signOut();

    // 게스트 로그아웃
    localStorage.removeItem('isLoggedIn');
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

export default logout;
