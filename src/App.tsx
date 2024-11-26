import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/shared/components/templates/Layout';
import Main from '@pages/Main';
import Login from '@pages/Login';
import NicknameSetup from '@pages/NicknameSetup';
import Tutorial from '@pages/Tutorial';
import Gool from '@pages/Gool';
import Challenge from '@pages/Challenge';
import Trip from '@pages/Trip';
import NotFound from '@pages/NotFound';
import Loading from '@pages/Loading';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
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
