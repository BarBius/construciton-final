import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HeaderPage from './Page/HeaderPage';
import IntroPage from './Page/IntroPage';
import AdminRoute from './Components/AdminRoute';
import CarouselPage from './Page/CarouselPage';
import FormPage from './Page/FormPage';
import FooterPage from './Page/FooterPage';
import NosTravauxFaitPage from './Page/WorkPage';
import LoginFormPage from './Page/LoginFormPage';
import Dashboard from './Components/Dashboard';
import ExpertisePage from './Page/ExpertisePage';
import ProfilePage from './Page/ProfilePage';
import RegisterPage from './Page/RegisterPage';
import ProtectedRoute from './Components/ProtectedRoute';

import './App.css';

function AppLayout() {
  const location = useLocation();
  const path = location.pathname;

  const noLayoutRoutes = ['/profile', '/dashboard'];
  const showLayout = !noLayoutRoutes.includes(path);

  return (
    <div className="app-container">
      
        {showLayout && <HeaderPage />}
        <main className="main-content">
          <Routes>
            {/*open path*/}
            <Route path="/" element={
              <>
                <CarouselPage />
                <IntroPage />
              </>
            } />
            <Route path="/work" element={<NosTravauxFaitPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/contact" element={<FormPage />} />
            <Route path="/login" element={<LoginFormPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/*secure path*/}
            <Route path="/dashboard" element={
              <AdminRoute><Dashboard /></AdminRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><ProfilePage /></ProtectedRoute>
            } />
          </Routes>
        </main>
        {showLayout && <FooterPage />}
      
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
