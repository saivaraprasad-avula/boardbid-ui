import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

const API_URL = import.meta.env.VITE_API_URL;

function fmtDate(d) {
  if (!d) return '-';
  const t = new Date(d);
  return isNaN(t.valueOf())
    ? d
    : t.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
function fmtDateTime(d) {
  if (!d) return '-';
  const t = new Date(d);
  return isNaN(t.valueOf())
    ? d
    : t.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
}
function humanFileSize(bytes) {
  if (!bytes || isNaN(bytes)) return '';
  const units = ['B','KB','MB','GB','TB']; let i = 0, v = Number(bytes);
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
function parseTargetLocationAttachment(value) {
  let v = value;
  if (typeof v === 'string' && (v.trim().startsWith('[') || v.trim().startsWith('{'))) {
    try { v = JSON.parse(v); } catch {}
  }
  if (!v) return [];
  const arr = Array.isArray(v) ? v : [v];
  return arr.map((e) => {
    if (!e) return null;
    const url = e.url || e.href || e.link || '';
    const name = e.filename || e.name || (typeof e === 'string' ? e : 'attachment');
    const size = e.size || e.filesize || e.bytes;
    return { url, name, size };
  }).filter(Boolean);
}
function StatusPill({ value }) {
  if (!value) return null;
  const v = String(value).toLowerCase();
  const map = {
    active: 'bg-green-100 text-green-700 ring-green-200',
    paused: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
    draft: 'bg-gray-100 text-gray-700 ring-gray-200',
    completed: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
    cancelled: 'bg-rose-100 text-rose-700 ring-rose-200',
  };
  const cls = map[v] || 'bg-gray-100 text-gray-700 ring-gray-200';
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${cls}`}>{value}</span>;
}

export default function CampaignInfo() {
  const { id } = useParams();
  const { user } = useUser();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/users/${user.id}/campaigns`);
        if (res.ok) {
          const data = await res.json();
          const found = (data.campaigns || []).find((c) => c.id === id);
          setCampaign(found || null);
        } else {
          setCampaign(null);
        }
      } catch (err) {
        console.error('Failed to load campaign', err);
        setCampaign(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user, id]);

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-24 w-24">
          <Lottie animationData={loadingAnim} loop autoplay />
        </div>
      </div>
    );
  }
  if (!campaign) return <p className="text-gray-500">No details available.</p>;

  // Header badges
  const createdAt =
    campaign.created_at || campaign.createdAt || campaign.created ||
    campaign.submitted_at || campaign.submittedAt || null;
  const status = campaign.status || campaign.campaign_status || null;

  // Parse Target Location Attachment (render only if present & non-empty)
  const tlaRaw =
    campaign['Target Location Attachment'] ??
    campaign['target_location_attachment'] ??
    campaign['targetLocationAttachment'] ?? null;
  const tlaFiles = parseTargetLocationAttachment(tlaRaw);

  const labelMap = {
    company_name: 'Company Name',
    campaign_type: 'Campaign Type',
    industry: 'Industry',
    campaign_goals: 'Goals',
    ooh_budget_range: 'Budget',
    campaign_start_date: 'Start Date',
    campaign_end_date: 'End Date',
    // status & created_* are handled in header; don’t include them in fields
  };

  const hiddenKeys = [
    // handled elsewhere
    'status', 'campaign_status',
    'created_at','createdAt','created',
    'submitted_at','submittedAt',
    // raw/unwanted
    'attachments',
    'Target Location Attachment','target_location_attachment','targetLocationAttachment',
    'id','user_id','userId','source','submission_id','submissionId','raw',
  ];

  const fields = Object.entries(campaign)
    .filter(([key, value]) =>
      !hiddenKeys.includes(key) &&
      value !== null && value !== undefined && value !== '' &&
      (!Array.isArray(value) || value.length > 0)
    )
    .map(([key, value]) => {
      const isDateField = key.toLowerCase().includes('date');
      const formattedValue = Array.isArray(value)
        ? value.join(', ')
        : isDateField ? fmtDate(value)
        : typeof value === 'object' ? JSON.stringify(value) : value;
      return {
        label: labelMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        value: formattedValue,
      };
    });

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      {/* Header with badges */}
      <div className="px-4 py-6 sm:px-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">Campaign Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Basic details about your campaign.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Status badge (only if available) */}
          {status && <StatusPill value={status} />}

          {/* Created badge (only if available) */}
          {createdAt && (
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-white/80" />
              <span>Created {fmtDateTime(createdAt)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {fields.map((field) => (
            <div key={field.label} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">{field.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {field.value || ''}
              </dd>
            </div>
          ))}

          {/* Target Location Attachment — render only if available */}
          {tlaFiles.length > 0 && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Target Location Attachment</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {tlaFiles.map((file, idx) => (
                    <li key={`${file.name}-${idx}`} className="flex items-center justify-between py-4 pr-5 pl-4 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium text-gray-900">{file.name || 'attachment'}</span>
                          {file.size ? <span className="shrink-0 text-gray-400">{humanFileSize(file.size)}</span> : null}
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        {file.url ? (
                          <a
                            href={file.url}
                            download={file.name || true}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Download
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}