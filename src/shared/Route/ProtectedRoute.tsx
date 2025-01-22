import { Navigate } from 'react-router-dom';
import LoginAlertModal from '@/pages/Login/LoginAlertModal';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    LoginAlertModal();
    return <Navigate to="/" replace />;
  }

  return children;
}
