import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function CampaignInfo() {
  const { id } = useParams();
  const { user } = useUser();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchCampaign = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${user.id}/campaigns`);
        if (!res.ok) return;
        const data = await res.json();
        const found = (data.campaigns || []).find((c) => c.id === id);
        setCampaign(found);
      } catch (err) {
        console.error('Failed to load campaign', err);
      }
    };

    fetchCampaign();
  }, [user, id]);

  if (!campaign) {
    return <p className="text-gray-500">No details available.</p>;
  }

  const fields = [
    { label: 'Company Name', value: campaign.company_name },
    { label: 'Campaign Type', value: campaign.campaign_type?.join(', ') },
    { label: 'Industry', value: campaign.industry },
    { label: 'Goals', value: campaign.campaign_goals?.join(', ') },
    { label: 'Budget', value: campaign.ooh_budget_range },
    { label: 'Start Date', value: campaign.campaign_start_date },
    { label: 'End Date', value: campaign.campaign_end_date },
    { label: 'Status', value: campaign.status },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800 dark:text-white">
      <dl className="divide-y divide-gray-100 dark:divide-gray-700">
        {fields.map((field) => (
          <div key={field.label} className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500 dark:text-gray-400">{field.label}</dt>
            <dd className="text-gray-900 dark:text-gray-100">{field.value || '-'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
