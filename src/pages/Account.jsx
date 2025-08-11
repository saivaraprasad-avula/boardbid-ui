import { UserProfile } from '@clerk/clerk-react';
import InternalLayout from '../layout/InternalLayout';

export default function Account() {
  return (
    <InternalLayout>
      <UserProfile routing="path" path={`${import.meta.env.BASE_URL}account`} />
    </InternalLayout>
  );
}
