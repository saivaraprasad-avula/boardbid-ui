import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

const API_URL = import.meta.env.VITE_API_URL;

export default function CampaignInfo() {
  const { id } = useParams();
  const { user } = useUser();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCampaign = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/users/${user.id}/campaigns`);
        if (res.ok) {
          const data = await res.json();
          const found = (data.campaigns || []).find((c) => c.id === id);
          setCampaign(found || null);
        }
      } catch (err) {
        console.error('Failed to load campaign', err);
        setCampaign(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
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

  if (!campaign) {
    return <p className="text-gray-500">No details available.</p>;
  }

  const labelMap = {
    company_name: 'Company Name',
    campaign_type: 'Campaign Type',
    industry: 'Industry',
    campaign_goals: 'Goals',
    ooh_budget_range: 'Budget',
    campaign_start_date: 'Start Date',
    campaign_end_date: 'End Date',
    status: 'Status',
  };

  const fields = Object.entries(campaign)
    .filter(
      ([key, value]) =>
        key !== 'attachments' &&
        value !== null &&
        value !== undefined &&
        value !== '' &&
        (!Array.isArray(value) || value.length > 0)
    )
    .map(([key, value]) => ({
      label:
        labelMap[key] ||
        key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      value: Array.isArray(value) ? value.join(', ') : value,
    }));

  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Campaign Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Basic details about your campaign.</p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {fields.map((field) => (
            <div key={field.label} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">{field.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {field.value || '-'}
              </dd>
            </div>
          ))}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {Array.isArray(campaign?.attachments) && campaign.attachments.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {campaign.attachments.map((file) => (
                    <li
                      key={file.name}
                      className="flex items-center justify-between py-4 pr-5 pl-4 text-sm leading-6"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium text-gray-900">{file.name}</span>
                          {file.size && <span className="shrink-0 text-gray-400">{file.size}</span>}
                        </div>
                      </div>
                      {file.url && (
                        <div className="ml-4 shrink-0">
                          <a
                            href={file.url}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No attachments</p>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
