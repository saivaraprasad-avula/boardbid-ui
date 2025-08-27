import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import OpsLayout from '../layout/OpsLayout';
import OpsAssignMenu from '../components/OpsAssignMenu.jsx';

const API_URL = import.meta.env.VITE_API_URL;

export default function OpsInbox() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [opsUsers, setOpsUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ops-users`);
        if (!res.ok) setOpsUsers([]);
        else {
          const data = await res.json();
          setOpsUsers(Array.isArray(data?.ops_users) ? data.ops_users : []);
        }
      } catch (e) {
        console.error('Failed to fetch ops users', e);
        setOpsUsers([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ops-users/${user.id}/campaigns`);
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

  const handleAssign = async (campaignId, selected) => {
    try {
      const res = await fetch(`${API_URL}/ops-users/campaigns/${campaignId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user_id: selected.id }),
      });
      if (res.ok) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === campaignId ? { ...c, ops_user: selected } : c)),
        );
      }
    } catch (e) {
      console.error('Failed to assign ops user', e);
    }
  };

  const fmt = (val) => (Array.isArray(val) ? val.join(', ') : val || '-');

  return (
    <OpsLayout title="Inbox">
      {isLoading ? (
        <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
      ) : campaigns.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">No campaigns found.</div>
      ) : (
        <div className="mt-8 flow-root overflow-x-auto">
          <table className="w-full text-left">
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
                  Created By
                </th>
                <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                  Assigned To
                </th>
                <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/ops/campaigns/${c.id}`)}
                  className="cursor-pointer hover:bg-gray-50"
                >
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
                    {c.created_by ? (
                      <div className="flex items-center">
                        {c.created_by.image_url ? (
                          <img
                            src={c.created_by.image_url}
                            alt={c.created_by.email}
                            className="mr-2 h-6 w-6 rounded-full"
                          />
                        ) : null}
                        {c.created_by.email}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <OpsAssignMenu
                      current={c.ops_user}
                      opsUsers={opsUsers}
                      onSelect={(u) => handleAssign(c.id, u)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {c.status || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </OpsLayout>
  );
}
