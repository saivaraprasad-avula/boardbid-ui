import InternalLayout from '../layout/InternalLayout';
import WelcomeBack from '../components/WelcomeBack';
import GetStartedCard from '../components/GetStartedCard';

export default function Dashboard() {
  return (
    <InternalLayout>
      <div className="space-y-6">
        <WelcomeBack />
        <GetStartedCard />
      </div>
    </InternalLayout>
  );
}

