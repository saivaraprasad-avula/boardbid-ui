import InternalLayout from '../layout/InternalLayout';
import { NavLink, Routes, Route, Navigate, useParams } from 'react-router-dom';
import CampaignCreative from './CampaignCreative';
import CampaignProgress from './CampaignProgress';
import CampaignReports from './CampaignReports';
import CampaignInfo from './CampaignInfo';
import CampaignQuotes from './CampaignQuotes';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CampaignDetail() {
  const { id } = useParams();

  // Provide a short mobile label for long items
  const navigation = [
    { name: 'Details', to: 'details' },
    { name: 'Quotes', to: 'quotes' },
    { name: 'Creative', to: 'creative' },
    { name: 'View Campaign Progress', short: 'Progress', to: 'progress' },
    { name: 'Reports', to: 'reports' },
  ];

  return (
    <InternalLayout>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <nav className="mt-6 rounded-xl border border-[#1f6fa5]/30 bg-[#288dcf] shadow-sm">
          {/* Allow wrapping; remove fixed height and horizontal scroll */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-2 py-2 sm:px-3">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={`/campaigns/${id}/${item.to}`}
                className={({ isActive }) =>
                  classNames(
                    'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-[#1f6fa5] text-white shadow-sm'
                      : 'text-white/95 hover:bg-[#2f9ff0] hover:text-white'
                  )
                }
                end
              >
                {/* Short label on mobile, full on sm+ */}
                {item.short ? (
                  <>
                    <span className="sm:hidden">{item.short}</span>
                    <span className="hidden sm:inline">{item.name}</span>
                  </>
                ) : (
                  item.name
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="py-5">
          <Routes>
            <Route path="details" element={<CampaignInfo />} />
            <Route path="quotes" element={<CampaignQuotes />} />
            <Route path="creative" element={<CampaignCreative />} />
            <Route path="progress" element={<CampaignProgress />} />
            <Route path="reports" element={<CampaignReports />} />
            <Route index element={<Navigate to={`/campaigns/${id}/details`} replace />} />
          </Routes>
        </div>
      </div>
    </InternalLayout>
  );
}