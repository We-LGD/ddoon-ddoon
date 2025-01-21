import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMobileStore } from '@store/useMobileStore';
import Layout from '@/shared/components/templates/Layout';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
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
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/nickname-setup" element={<NicknameSetup />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/ddoon-ddoon-gool" element={<Gool />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/ddoon-ddoon-trip" element={<Trip />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
