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
      {/* Shared wrapper so tabs + children align perfectly */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header / Tabs */}
        <nav className="mt-6 rounded-xl border border-[#1f6fa5]/30 bg-[#288dcf] shadow-sm">
          <div className="flex h-12 items-center justify-center gap-2 overflow-x-auto px-2 sm:px-3 font-semibold">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={`/campaigns/${id}/${item.to}`}
                className={({ isActive }) =>
                  classNames(
                    'whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors duration-200',
                    isActive
                      ? 'bg-[#1f6fa5] text-white shadow-sm'
                      : 'text-white/95 hover:bg-[#2f9ff0] hover:text-white'
                  )
                }
                end
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Child routes render their own Card — don’t wrap in another card here */}
        <div className="py-5">
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