import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { withBase } from './utils/basePath.js';
import './index.css';
import App from './App.jsx';

const hostname = window.location.hostname;
const isLocal = hostname === 'localhost';
const isGhPages = hostname === 'saivaraprasad-avula.github.io';
const PUBLISHABLE_KEY =
  isLocal || isGhPages
    ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
    : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY_PROD;

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
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ClerkApp />
    </BrowserRouter>
  </StrictMode>,
);
