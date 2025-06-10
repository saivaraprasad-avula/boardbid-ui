import { getLoggedInUser } from '../utils/auth';
import InternalLayout from '../layout/InternalLayout';

export default function Dashboard() {
  const userEmail = getLoggedInUser();

  return (
    <InternalLayout>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back 👋</h1>
        <p className="text-sm text-gray-600 mt-1">
          Logged in as: <span className="font-medium">{userEmail}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Active Campaigns</h3>
          <p className="text-3xl font-bold text-emerald-500 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Spend</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">$12,430</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Impressions</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">2.1M</p>
        </div>
      </div>
    </InternalLayout>
  );
}
