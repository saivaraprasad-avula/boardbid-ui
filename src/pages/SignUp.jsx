import { SignUp } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp routing="path" path="/sign-up" afterSignUpUrl={withBase('/dashboard')} />
    </div>
  );
}
