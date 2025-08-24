import OpsLayout from '../layout/OpsLayout';
import Card from '../components/Card';
import CampaignsOpsStats from '../components/CampaignsOpsStats';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function OpsHome() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/campaigns`);
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
  }, []);

  const fmt = (val) => (Array.isArray(val) ? val.join(', ') : val || '-');

  return (
    <OpsLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CampaignsOpsStats />
        <Card title="Campaigns">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
          ) : campaigns.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">No campaigns found.</div>
          ) : (
            <div className="flow-root overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                      Company
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 md:table-cell"
                    >
                      Budget
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((c) => (
                    <tr key={c.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {c.company_name || '-'}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {fmt(c.campaign_type)}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:table-cell">
                        {c.ooh_budget_range || '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {c.status || '-'}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/campaigns/${c.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View<span className="sr-only">, {c.company_name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </OpsLayout>
  );
}

