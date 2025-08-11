import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NewCampaignPage from './pages/NewCampaignPage';
import UploadCreative from './pages/UploadCreative';
import Reports from './pages/Reports';
import Account from './pages/Account';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Press from './pages/Press';
import Support from './pages/Support';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/campaign/new" element={<ProtectedRoute><NewCampaignPage /></ProtectedRoute>} />
        <Route path="/upload-creative" element={<ProtectedRoute><UploadCreative /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} /> {/* ✅ Add this route */}
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/press" element={<Press />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
