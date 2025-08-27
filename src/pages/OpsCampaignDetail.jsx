import OpsLayout from '../layout/OpsLayout';
import { NavLink, Routes, Route, Navigate, useParams } from 'react-router-dom';
import CampaignInfo from './CampaignInfo';
import CampaignQuotes from './CampaignQuotes';
import CampaignCreative from './CampaignCreative';
import CampaignProgress from './CampaignProgress';
import CampaignReports from './CampaignReports';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function OpsCampaignDetail() {
  const { id } = useParams();
  const navigation = [
    { name: 'Details', to: 'details' },
    { name: 'Quotes', to: 'quotes' },
    { name: 'Creative', to: 'creative' },
    { name: 'View Campaign Progress', short: 'Progress', to: 'progress' },
    { name: 'Reports', to: 'reports' },
  ];

  return (
    <OpsLayout title="Campaign">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav className="mt-6 rounded-xl border border-[#1f6fa5]/30 bg-[#288dcf] shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-2 px-2 py-2 sm:px-3">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={`/ops/campaigns/${id}/${item.to}`}
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
        <div className="py-5">
          <Routes>
            <Route path="details" element={<CampaignInfo ops />} />
            <Route path="quotes" element={<CampaignQuotes ops />} />
            <Route path="creative" element={<CampaignCreative ops />} />
            <Route path="progress" element={<CampaignProgress ops />} />
            <Route path="reports" element={<CampaignReports ops />} />
            <Route index element={<Navigate to={`/ops/campaigns/${id}/details`} replace />} />
          </Routes>
        </div>
      </div>
    </OpsLayout>
  );
}
