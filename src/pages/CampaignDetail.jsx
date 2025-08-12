import InternalLayout from '../layout/InternalLayout';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import CampaignCreative from './CampaignCreative';
import CampaignProgress from './CampaignProgress';
import CampaignReports from './CampaignReports';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CampaignDetail() {
  const navigation = [
    { name: 'Creative', to: 'creative' },
    { name: 'View Campaign Progress', to: 'progress' },
    { name: 'Reports', to: 'reports' },
  ];

  return (
    <InternalLayout>
      <div className="min-h-full">
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 space-x-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'border-[#288dcf] text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="creative" element={<CampaignCreative />} />
            <Route path="progress" element={<CampaignProgress />} />
            <Route path="reports" element={<CampaignReports />} />
            <Route index element={<Navigate to="creative" replace />} />
          </Routes>
        </div>
      </div>
    </InternalLayout>
  );
}
