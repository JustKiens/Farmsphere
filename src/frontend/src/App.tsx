import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/landing/LoginPage';
import PublicRoute from './pages/utils/PublicRoute';
import PrivateRoute from './pages/utils/PrivateRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminRequestPage from './pages/admin/AdminRequestPage';
import AdminProviderPage from './pages/admin/AdminProviderPage';
import ProviderHomePage from './pages/provider/ProviderHomePage';
import AdminAccountPage from './pages/admin/AdminAccountPage';
import ProtectedRoute from './pages/utils/ProtectedRoute';
import VerificationPage from './pages/landing/VerificationPage';
import ProviderSettingsPage from './pages/provider/ProviderSettingsPage';
import StocksPage from './pages/landing/StocksPage';


const App = () => {
  return (
    <Routes>
      {/* Public Routes */}

      
      <Route element={<PublicRoute />} >
        <Route path="/" element={<LandingPage />} index  />
        <Route path="/login" element={<LoginPage />}  />
        <Route path="/stocks" element={<StocksPage />}  />
        <Route path="*" element={<Navigate to="/" />} /> 
        
        <Route element={<ProtectedRoute />} >
          <Route path="/verification" element={<VerificationPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute role="admin" />} >
        <Route path="/dashboard" element={<AdminDashboardPage />}  />
        <Route path="/requests" element={<AdminRequestPage />}  />
        <Route path="/providers" element={<AdminProviderPage />}  />
        <Route path="/account" element={<AdminAccountPage />}  />
      </Route>

      <Route element={<PrivateRoute role="provider" />} >
        <Route path="/home" element={<ProviderHomePage />}  />
        <Route path="/settings" element={<ProviderSettingsPage />}  />
      </Route>

    </Routes>
  );
}

export default App;


