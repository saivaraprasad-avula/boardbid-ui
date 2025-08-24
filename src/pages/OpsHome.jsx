import OpsLayout from '../layout/OpsLayout';

export default function OpsHome() {
  return (
    <OpsLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome to Ops Home</h2>
        <p className="text-gray-600">This area is reserved for operational tools.</p>
      </div>
    </OpsLayout>
  );
}

