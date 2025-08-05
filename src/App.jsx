import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NewCampaignPage from './pages/NewCampaignPage';
import UploadCreative from './pages/UploadCreative';
import Admin from './pages/Admin';
import Reports from './pages/Reports';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import BlogView from './pages/BlogView';
import Blogs from './pages/Blogs';
import Account from './pages/Account';
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
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} /> {/* ✅ Add this route */}
        <Route path="/admin/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
        <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
        <Route path="/admin/blogs/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/blog/:id" element={<BlogView />} />
        <Route path="/blogs" element={<Blogs />} />
    </Routes>
  );
}

export default App;
