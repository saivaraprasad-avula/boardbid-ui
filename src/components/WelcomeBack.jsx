import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const stats = [
];

export default function WelcomeBack() {
  const { user } = useUser();

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      <h2 id="profile-overview-title" className="sr-only">
        Profile Overview
      </h2>
      <div className="bg-white p-6 dark:bg-gray-800/75">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="shrink-0">
              <img
                alt=""
                src={user?.imageUrl}
                className="mx-auto size-20 rounded-full dark:outline dark:-outline-offset-1 dark:outline-white/10"
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">{user?.fullName}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <Link
              to="/account"
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10 dark:border-white/10 dark:bg-gray-800/50">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-gray-900 dark:text-white">{stat.value}</span>{' '}
            <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
