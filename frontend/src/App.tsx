import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMobileStore } from '@/shared/store/useMobileStore';
import ProtectedRoute from '@/shared/Route/ProtectedRoute';
import Layout from '@/shared/components/templates/Layout';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import NicknameSetup from '@/pages/NicknameSetup';
import Tutorial from '@/pages/Tutorial';
import Gool from '@/pages/Gool';
import Challenge from '@/pages/Challenge';
import Trip from '@/pages/Trip';
import NotFound from '@/pages/NotFound';
import Loading from '@/pages/Loading';
import { auth } from '@/shared/utils/firebase';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const checkMobile = useMobileStore((state) => state.checkMobile);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile]);

  return (
    <Router>
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/nickname-setup"
                element={
                  <ProtectedRoute>
                    <NicknameSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tutorial"
                element={
                  <ProtectedRoute>
                    <Tutorial />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ddoon-ddoon-gool"
                element={
                  <ProtectedRoute>
                    <Gool />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenge"
                element={
                  <ProtectedRoute>
                    <Challenge />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ddoon-ddoon-trip"
                element={
                  <ProtectedRoute>
                    <Trip />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
      )}
    </Router>
  );
}
