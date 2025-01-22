import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMobileStore } from '@store/useMobileStore';
import PublicRoute from '@/shared/Route/PublicRoute';
import ProtectedRoute from '@/shared/Route/ProtectedRoute';
import Layout from '@/shared/components/templates/Layout';
import Login from '@pages/Login';
import SignUp from '@/pages/SignUp';
import NicknameSetup from '@pages/NicknameSetup';
import Tutorial from '@pages/Tutorial';
import Gool from '@/pages/Gool';
import Challenge from '@/pages/Challenge';
import Trip from '@/pages/Trip';
import NotFound from '@pages/NotFound';
import Loading from '@pages/Loading';

function App() {
  const checkMobile = useMobileStore((state) => state.checkMobile);

  useEffect(() => {
    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
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
    </Router>
  );
}

export default App;
