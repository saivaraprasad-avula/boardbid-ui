import InternalLayout from '../layout/InternalLayout';
import { NavLink, Routes, Route, Navigate, useParams } from 'react-router-dom';
import CampaignCreative from './CampaignCreative';
import CampaignProgress from './CampaignProgress';
import CampaignReports from './CampaignReports';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CampaignDetail() {
  const { id } = useParams();
  const navigation = [
    { name: 'Creative', to: 'creative' },
    { name: 'View Campaign Progress', to: 'progress' },
    { name: 'Reports', to: 'reports' },
  ];

  return (
    <InternalLayout>
      <div className="min-h-full">
        <nav className="border-b border-indigo-300/25 bg-indigo-600">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 items-center space-x-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={`/campaigns/${id}/${item.to}`}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? 'bg-indigo-700 text-white'
                        : 'text-white hover:bg-indigo-500/75',
                      'rounded-md px-3 py-2 text-sm font-medium'
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
            <Route index element={<Navigate to={`/campaigns/${id}/creative`} replace />} />
          </Routes>
        </div>
      </div>
    </InternalLayout>
  );
}
