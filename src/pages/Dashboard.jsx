import InternalLayout from '../layout/InternalLayout';
import WelcomeBack from '../components/WelcomeBack';

export default function Dashboard() {
  return (
    <InternalLayout>
      <div className="scale-50 origin-top-left w-fit">
        <WelcomeBack />
      </div>
    </InternalLayout>
  );
}
