import { Navigate } from 'react-router-dom';
import Modal from '@/shared/components/organisms/Modal';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    Modal({ icon: 'error', title: '로그인이 필요합니다.', buttonTitle: '확인' });
    return <Navigate to="/" replace />;
  }

  return children;
}
