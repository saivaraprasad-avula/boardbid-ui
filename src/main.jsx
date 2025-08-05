import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import App from './App.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

function ClerkApp() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      signInUrl="/login"
      signUpUrl="/sign-up"
      userProfileUrl="/account"
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/boardbid-ui">
      <ClerkApp />
    </BrowserRouter>
  </StrictMode>,
);
