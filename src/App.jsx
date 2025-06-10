import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewCampaignPage from './pages/NewCampaignPage';
import UploadCreative from './pages/UploadCreative';
import Admin from './pages/Admin';
import Reports from './pages/Reports'; // ✅ Add this line

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/campaign/new" element={<NewCampaignPage />} />
      <Route path="/upload-creative" element={<UploadCreative />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/reports" element={<Reports />} /> {/* ✅ Add this route */}
    </Routes>
  );
}

export default App;
