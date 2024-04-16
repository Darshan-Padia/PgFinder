import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import { roleState } from './components/Atom/RoleStateAtom';
import Login from './components/Login';

function App() {
  // const [role, setRole] = useRecoilState(roleState);
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
