import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Intercom from './components/intercom-landing';
import Analytics from './components/Analytics.jsx';
import Home from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NewCampaignPage from './pages/NewCampaignPage';
import UploadCreative from './pages/UploadCreative';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Account from './pages/Account';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Press from './pages/Press';
import Support from './pages/Support';
import Contact from './pages/Contact';
import OpsHome from './pages/OpsHome';
import OpsInbox from './pages/OpsInbox.jsx';
import OpsCampaignDetail from './pages/OpsCampaignDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import OpsProtectedRoute from './components/OpsProtectedRoute.jsx';
import Pricing from './pages/Pricing';
import Meet from './pages/Meet';
import VenueTypes from './pages/venues/VenueTypes.jsx';
import VenueTypeDetail from './pages/venues/VenueTypeDetail.jsx';

function App() {
  return (
    <>
      <Analytics />
      <Intercom />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/campaign/new" element={<ProtectedRoute><NewCampaignPage /></ProtectedRoute>} />
        <Route path="/manage-creatives" element={<ProtectedRoute><UploadCreative /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/campaigns/:id/*" element={<ProtectedRoute><CampaignDetail /></ProtectedRoute>} />
        <Route path="/account/*" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/press" element={<Press />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/venue-types" element={<VenueTypes />} />
        <Route path="/venue-types/:slug" element={<VenueTypeDetail />} />
        <Route path="/ops" element={<OpsProtectedRoute><OpsHome /></OpsProtectedRoute>} />
        <Route path="/ops/inbox" element={<OpsProtectedRoute><OpsInbox /></OpsProtectedRoute>} />
        <Route path="/ops/campaigns/:id/*" element={<OpsProtectedRoute><OpsCampaignDetail /></OpsProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
