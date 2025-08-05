import { UserProfile } from '@clerk/clerk-react';
import InternalLayout from '../layout/InternalLayout';

export default function Account() {
  return (
    <InternalLayout>
      <UserProfile />
    </InternalLayout>
  );
}
