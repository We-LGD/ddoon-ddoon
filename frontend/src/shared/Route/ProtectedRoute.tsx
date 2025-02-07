import { Navigate } from 'react-router-dom';
import Modal from '@/shared/components/organisms/Modal';
import { auth } from '@/shared/utils/firebase';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isGuestLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isLoggedIn = auth.currentUser;

  if (!isLoggedIn && !isGuestLoggedIn) {
    Modal({ icon: 'error', title: '로그인이 필요합니다.', buttonTitle: '확인' });
    return <Navigate to="/" replace />;
  }

  return children;
}
