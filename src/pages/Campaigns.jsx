import InternalLayout from '../layout/InternalLayout';
import PageHeader from '../components/PageHeader';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

const API_URL = import.meta.env.VITE_API_URL;

function StatusPill({ value }) {
  const v = (value || '').toLowerCase();
  const cls =
    v === 'active' ? 'bg-green-100 text-green-700 ring-green-200' :
    v === 'paused' ? 'bg-yellow-100 text-yellow-800 ring-yellow-200' :
    v === 'draft' ? 'bg-gray-100 text-gray-700 ring-gray-200' :
    v === 'completed' ? 'bg-indigo-100 text-indigo-700 ring-indigo-200' :
    v === 'cancelled' ? 'bg-rose-100 text-rose-700 ring-rose-200' :
    'bg-gray-100 text-gray-700 ring-gray-200';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${cls}`}>
      {value || '—'}
    </span>
  );
}

function fmtDate(d) {
  if (!d) return '—';
  const t = new Date(d);
  return isNaN(t.valueOf())
    ? d
    : t.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Campaigns() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const loadCampaigns = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/users/${user.id}/campaigns`);
        if (!res.ok) {
          setCampaigns([]);
        } else {
          const data = await res.json();
          setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
        }
      } catch (err) {
        console.error('Failed to fetch campaigns', err);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadCampaigns();
  }, [user]);

  return (
    <InternalLayout>
      <PageHeader title="My Campaigns" />

      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-24 w-24">
            <Lottie animationData={loadingAnim} loop autoplay />
          </div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-gray-300 p-10 text-center dark:border-white/10">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10">
            <span className="text-base">📣</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No campaigns yet</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your first campaign to start planning inventory and tracking status.
          </p>
          <button
            onClick={() => navigate('/new-campaign')}
            className="mt-5 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Campaign
          </button>
        </div>
      ) : (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, i) => (
            <li
              key={campaign.id}
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
              className="
                group cursor-pointer overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition
                hover:shadow-md hover:ring-indigo-200 dark:bg-gray-900 dark:ring-white/10
              "
            >
              {/* Header */}
              <div className="flex items-center gap-x-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
                {/* Numbered badge */}
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full
                                bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-semibold
                                ring-2 ring-white/80 dark:ring-gray-900/60">
                  {i + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {campaign.company_name || 'Untitled'}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                    Campaign ID: {campaign.id}
                  </div>
                </div>

                <Menu as="div" className="relative" onClick={(e) => e.stopPropagation()}>
                  <MenuButton className="rounded-md p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-white/5 dark:text-gray-300">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-1 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5
                               transition data-closed:scale-95 data-closed:opacity-0 dark:bg-gray-800 dark:ring-white/10"
                  >
                    <MenuItem>
                      <button
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
                      >
                        View
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
                        className="block w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
                      >
                        Edit
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>

              {/* Body */}
              <dl className="grid gap-4 px-5 py-4 text-sm sm:grid-cols-2">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-gray-500 dark:text-gray-400">Start</dt>
                  <dd className="text-gray-900 dark:text-gray-200">{fmtDate(campaign.campaign_start_date)}</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-gray-500 dark:text-gray-400">End</dt>
                  <dd className="text-gray-900 dark:text-gray-200">{fmtDate(campaign.campaign_end_date)}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 sm:col-span-2">
                  <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                  <dd><StatusPill value={campaign.status} /></dd>
                </div>
              </dl>

              {/* Hover accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-indigo-200 via-violet-200 to-indigo-200 opacity-0 transition group-hover:opacity-100" />
            </li>
          ))}
        </ul>
      )}
    </InternalLayout>
  );
}