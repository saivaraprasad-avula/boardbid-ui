import { SignIn } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn routing="path" path="/login" afterSignInUrl={withBase('/dashboard')} />
    </div>
  );
}
