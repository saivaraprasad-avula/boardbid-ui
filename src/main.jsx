import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ClerkProvider } from '@clerk/clerk-react';
import { withBase } from './utils/basePath.js';
import './index.css';
import App from './App.jsx';

const hostname = window.location.hostname;
const isBoardBidDomain =
  hostname === 'boardbid.ai' || hostname.endsWith('.boardbid.ai');
const PUBLISHABLE_KEY = isBoardBidDomain
  ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY_PROD
  : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

function ClerkApp() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      signInUrl={withBase('/login')}
      signUpUrl={withBase('/sign-up')}
      userProfileUrl={withBase('/account')}
      afterSignOutUrl={withBase('/')}
    >
      <App />
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/">
        <ClerkApp />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
