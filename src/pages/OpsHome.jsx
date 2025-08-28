import OpsLayout from '../layout/OpsLayout';
import CampaignsOpsStats from '../components/CampaignsOpsStats';
import OpsAssignMenu from '../components/OpsAssignMenu.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function OpsHome() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [opsUsers, setOpsUsers] = useState([]);

  // Load campaigns
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/campaigns`, { credentials: 'include' });
        if (!res.ok) {
          setCampaigns([]);
        } else {
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

  // Load ops users
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ops-users`, { credentials: 'include' });
        if (!res.ok) {
          setOpsUsers([]);
        } else {
          const data = await res.json();
          setOpsUsers(Array.isArray(data?.ops_users) ? data.ops_users : []);
        }
      } catch (e) {
        console.error('Failed to fetch ops users', e);
        setOpsUsers([]);
      }
    })();
  }, []);

  // Assign handler -> NEW route + correct body key `ops_user_id`
  const handleAssign = async (campaignId, user) => {
    try {
      // Normalize id shape: prefer Clerk id in `user_id`, fallback to `id`
      const clerkId = user?.user_id ?? user?.id;
      if (!clerkId) {
        console.error('No Clerk user_id on selected ops user:', user);
        return;
      }

      const res = await fetch(`${API_URL}/ops-users/campaigns/${campaignId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ops_user_id: clerkId }),
      });

      if (!res.ok) {
        console.error('Assign failed', res.status, await res.text());
        return;
      }

      // Prefer backend response if it returns the updated campaign
      const maybeUpdated = await res.json().catch(() => null);
      if (maybeUpdated && maybeUpdated.id) {
        setCampaigns(prev => prev.map(c => (c.id === campaignId ? maybeUpdated : c)));
      } else {
        // Optimistic patch (keeps both `assigned_to` and legacy `ops_user`)
        const assigned = {
          user_id: clerkId,
          full_name: user.full_name ?? null,
          email: user.email ?? null,
          image_url: user.image_url ?? null,
        };
        setCampaigns(prev =>
          prev.map(c =>
            c.id === campaignId
              ? {
                  ...c,
                  assigned_to: assigned,
                  ops_user: assigned,
                }
              : c
          )
        );
      }
    } catch (e) {
      console.error('Failed to assign ops user', e);
    }
  };

  const fmt = (val) => (Array.isArray(val) ? val.join(', ') : val || '-');

  return (
    <OpsLayout title="Campaigns">
      <CampaignsOpsStats campaigns={campaigns} />

      {isLoading ? (
        <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
      ) : campaigns.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">No campaigns found.</div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Company</th>
                <th className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 sm:table-cell">
                  Type
                </th>
                <th className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 md:table-cell">
                  Budget
                </th>
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Created By</th>
                {/* Sticky on wide screens so you don’t have to scroll to assign */}
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900 lg:sticky lg:right-24 lg:bg-white">
                  Assigned To
                </th>
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900 lg:sticky lg:right-0 lg:bg-white">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {campaigns.map((c) => {
                const assigned = c.assigned_to ?? c.ops_user ?? null;
                return (
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
                              alt={c.created_by.email ?? 'avatar'}
                              className="mr-2 h-6 w-6 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : null}
                          <span onClick={(e) => e.stopPropagation()}>
                            {c.created_by.email ?? c.created_by.full_name ?? c.created_by.user_id}
                          </span>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>

                    {/* Sticky assign column; stop row click when interacting */}
                    <td
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:sticky lg:right-24 lg:bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <OpsAssignMenu
                        current={assigned}
                        opsUsers={opsUsers}
                        onSelect={(u) => handleAssign(c.id, u)}
                      />
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:sticky lg:right-0 lg:bg-white">
                      {c.status || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </OpsLayout>
  );
}