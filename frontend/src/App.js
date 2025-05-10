import React from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';

const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/signin", "/signup"];
  return (
    <div>
    {/* Render Navbar only if the current path is not in the hideNavbarRoutes */}
    {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </div>
  );
};

export default App;
