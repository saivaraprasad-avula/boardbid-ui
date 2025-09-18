import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Intercom from './components/intercom-landing';
import Analytics from './components/Analytics.jsx';
import MaintenancePage from './components/MaintenancePage.jsx';
import { withBase } from './utils/basePath.js';
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

const APP_CONFIG_URL = withBase('/app-config.json');

const defaultMaintenanceCopy = {
  tag: '🚧 Upgrades Underway',
  heading: 'We’ll Be Right Back',
  body: [
    'The BoardBid.ai experience is getting a fresh upgrade to serve you better. During this short pause, the rest of the site is taking a break. Please stay tuned—we’ll be live again within a few days.',
  ],
  contactEmail: 'support@boardbid.ai',
  meta: {
    title: 'BoardBid.ai — Upgrades in Progress',
    description:
      'BoardBid.ai is temporarily offline while we roll out new upgrades. Please stay tuned for the relaunch.',
    image: 'https://ik.imagekit.io/boardbid/BoardBid-OG.jpg?updatedAt=1757489348517',
  },
};

function normalizeConfig(config) {
  if (!config || typeof config !== 'object') {
    return {};
  }

  const maintenanceModeRaw = config.maintenanceMode;
  let maintenanceMode = false;

  if (typeof maintenanceModeRaw === 'string') {
    maintenanceMode = maintenanceModeRaw.toLowerCase() === 'true';
  } else {
    maintenanceMode = Boolean(maintenanceModeRaw);
  }

  return {
    ...config,
    maintenanceMode,
  };
}

function AppRoutes() {
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

function App() {
  const [appConfig, setAppConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        const response = await fetch(APP_CONFIG_URL, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Failed to load application config (status: ${response.status})`);
        }

        const config = normalizeConfig(await response.json());

        if (isMounted) {
          setAppConfig(config);

          if (typeof window !== 'undefined') {
            window.__APP_CONFIG__ = config;
          }
        }
      } catch (error) {
        console.error('Unable to load application config. Defaulting to maintenance mode.', error);

        if (isMounted) {
          const fallbackConfig = normalizeConfig({ maintenanceMode: true });
          setAppConfig(fallbackConfig);

          if (typeof window !== 'undefined') {
            window.__APP_CONFIG__ = fallbackConfig;
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }

  const maintenanceCopy = {
    ...defaultMaintenanceCopy,
    ...appConfig?.maintenance,
    meta: {
      ...defaultMaintenanceCopy.meta,
      ...(appConfig?.maintenance?.meta ?? {}),
    },
  };

  if (appConfig?.maintenanceMode) {
    return <MaintenancePage {...maintenanceCopy} />;
  }

  return <AppRoutes />;
}

export default App;
