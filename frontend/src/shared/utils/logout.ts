import axios from 'axios';
import { auth } from '@/shared/utils/firebase';

const logout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    await auth.signOut();
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

export default logout;
