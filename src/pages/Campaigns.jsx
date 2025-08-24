import InternalLayout from '../layout/InternalLayout';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import CampaignStats from '../components/CampaignStats';

const API_URL = import.meta.env.VITE_API_URL;

/* ---------- UI helpers ---------- */
function StatusPill({ value }) {
  if (!value) return null;
  const v = String(value).toLowerCase();
  const cls =
    v === 'active' ? 'bg-green-100 text-green-700 ring-green-200' :
    v === 'paused' ? 'bg-yellow-100 text-yellow-800 ring-yellow-200' :
    v === 'draft' ? 'bg-gray-100 text-gray-700 ring-gray-200' :
    v === 'completed' ? 'bg-indigo-100 text-indigo-700 ring-indigo-200' :
    v === 'cancelled' ? 'bg-rose-100 text-rose-700 ring-rose-200' :
    'bg-gray-100 text-gray-700 ring-gray-200';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${cls}`}>
      {value}
    </span>
  );
}

function fmtDate(d) {
  if (!d) return '';
  const t = new Date(d);
  if (Number.isNaN(t.valueOf())) return String(d);
  return t.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
function fmtDateTimeLocal(d) {
  if (!d) return '';
  const t = new Date(d);
  if (Number.isNaN(t.valueOf())) return String(d);
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(t);
}
function isEmpty(val) {
  return val == null || val === '' || (Array.isArray(val) && val.length === 0);
}
function conciseList(arr, cap = 3) {
  const list = (arr || []).filter(Boolean).map(String);
  if (list.length <= cap) return list.join(', ');
  return `${list.slice(0, cap).join(', ')} +${list.length - cap} more`;
}

/* ---------- field logic tailored to your schema ---------- */
const LABELS = {
  campaign_goals: 'Goals',
  campaign_goals_other: 'Goals (Other)',
  campaign_type: 'Type',
  campaign_type_other: 'Type (Other)',
  ooh_budget_range: 'Budget',
  target_location: 'Target Location',
  venue_type: 'Venue Type',
  target_cities_states: 'Cities/States',
  city: 'Cities',
  state: 'States',
  dma_names: 'DMAs',
  zipcode: 'Zipcodes',
  campaign_timing_preference: 'Timing',
  campaign_start_date: 'Start',
  campaign_end_date: 'End',
  conferences: 'Conferences',
  creative_support_required: 'Creative Support',
  industry: 'Industry',
  industry_other: 'Industry (Other)',
};
const PRIORITY = [
  'campaign_goals','campaign_goals_other',
  'campaign_type','campaign_type_other',
  'ooh_budget_range',
  'target_location',
  'venue_type',
  'target_cities_states','city','state','dma_names','zipcode',
  'campaign_timing_preference',
  'campaign_start_date','campaign_end_date',
  'conferences',
  'creative_support_required',
  'industry','industry_other',
];
function normalizeValue(key, value) {
  if (isEmpty(value)) return '';
  if (Array.isArray(value)) return conciseList(value);
  if (key === 'zipcode' && typeof value === 'string') {
    return conciseList(value.split(';').map(s => s.trim()).filter(Boolean));
  }
  if (key.toLowerCase().includes('date')) return fmtDate(value);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}
function toLabel(key) {
  return LABELS[key] || key.replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
}
function topFiveDetails(c) {
  const candidates = PRIORITY
    .map((key) => ({ key, label: toLabel(key), norm: normalizeValue(key, c[key]) }))
    .filter(({ norm }) => norm && norm.trim().length > 0);

  const seen = new Set();
  const out = [];
  for (const item of candidates) {
    const sig = `${item.label}:${item.norm}`;
    if (seen.has(sig)) continue;
    seen.add(sig);
    out.push(item);
    if (out.length >= 5) break;
  }
  return out;
}

/* ---------- Component ---------- */
export default function Campaigns() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/users/${user.id}/campaigns`);
        if (!res.ok) setCampaigns([]);
        else {
          const data = await res.json();
          setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
        }
      } catch (e) {
        console.error('Failed to fetch campaigns', e);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  return (
    <InternalLayout>
      <PageHeader title="My Campaigns" />
      {!isLoading && <CampaignStats campaigns={campaigns} />}

      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-20 w-20">
            <Lottie animationData={loadingAnim} loop autoplay />
          </div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-white/10">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/10">
            <MegaphoneIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">No campaigns yet</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Create your first campaign to start planning.</p>
          <button
            onClick={() => navigate('/campaign/new')}
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Campaign
          </button>
        </div>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {campaigns.map((campaign, i) => {
            const details = topFiveDetails(campaign);
            const statusVal = campaign.status || campaign.campaign_status;
            const createdAt =
              campaign.created_at ||
              campaign.createdAt ||
              campaign.created ||
              campaign.submitted_at ||
              campaign.submittedAt ||
              null;

            return (
              <li
                key={campaign.id}
                className="
                  group overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm
                  transition-shadow hover:shadow-md
                  dark:bg-gray-900 dark:ring-white/10
                "
              >
                {/* Entire card is clickable */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/campaigns/${campaign.id}`)}
                  className="cursor-pointer focus-visible:outline-none"
                >
                  {/* Header — vertical layout with labels on top */}
                  <div className="flex flex-col gap-y-2 border-b border-gray-100 px-3 py-3 sm:px-5 sm:py-4 dark:border-white/10">
                    {/* Index bubble and text stack */}
                    <div className="flex items-start gap-3">
                      {/* Index bubble */}
                      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white ring-2 ring-white/80 dark:ring-gray-900/60">
                        {i + 1}
                      </div>
                      {/* Text stack */}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                          {campaign.company_name || 'Untitled'}
                        </div>
                        <div className="mt-0.5 truncate text-[11px] text-gray-500 dark:text-gray-400" title={campaign.id}>
                          Campaign ID: {campaign.id}
                        </div>
                      </div>
                    </div>
                    {/* Badges container - now a separate row below */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:gap-2">
                      {statusVal && <StatusPill value={statusVal} />}
                      {createdAt && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-800 ring-1 ring-gray-200">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-400" />
                          <span className="hidden sm:inline">Created {fmtDateTimeLocal(createdAt)}</span>
                          <span className="sm:hidden">Created {fmtDate(createdAt)}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <dl className="px-3 py-3 sm:px-5 sm:py-4">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {details.map((d) => (
                        <div
                          key={`${campaign.id}-${d.key}`}
                          className="rounded-lg bg-gray-50 p-3 text-sm dark:bg-white/5"
                        >
                          <dt className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{d.label}</dt>
                          <dd className="mt-0.5 text-gray-900 dark:text-gray-200 break-words">
                            {d.norm}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </InternalLayout>
  );
}