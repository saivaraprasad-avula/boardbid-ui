import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import OpsLayout from '../layout/OpsLayout';
import OpsAssignMenu from '../components/OpsAssignMenu.jsx';
import UserAvatarName from '../components/UserAvatarName.jsx';

const API_URL = import.meta.env.VITE_API_URL;

/* ---------- helpers (same approach as OpsHome) ---------- */
function parseUserMaybe(input) {
  if (!input) return null;

  let u = input;

  // If it's a JSON string, try to parse
  if (typeof u === 'string') {
    const s = u.trim();
    if (s.startsWith('{') || s.startsWith('[')) {
      try { u = JSON.parse(s); } catch { /* ignore */ }
    }
  }

  // If still a string, assume it's a Clerk user id
  if (typeof u === 'string') return { user_id: u };

  // If array, use first usable element
  if (Array.isArray(u)) {
    const first = u.find(Boolean);
    return parseUserMaybe(first);
  }

  if (typeof u === 'object') {
    if (u && typeof u.user === 'object') return parseUserMaybe(u.user);

    const user_id =
      u.user_id || u.userId || u.id || u.clerk_id || u.clerkId || null;

    const full_name =
      u.full_name ||
      u.fullName ||
      u.name ||
      [u.first_name, u.last_name].filter(Boolean).join(' ') ||
      null;

    const email =
      u.email ||
      u.email_address ||
      u.emailAddress ||
      (u.primary_email_address && u.primary_email_address.email_address) ||
      null;

    const image_url =
      u.image_url || u.imageUrl || u.avatar_url || u.profile_image_url || null;

    return { user_id, full_name, email, image_url };
  }

  return null;
}

function normalizeCampaign(c) {
  if (!c) return c;

  // Prefer richer objects/JSON before plain IDs
  const assignedToRaw =
    c['Assigned To User'] ??
    c.assigned_to_user ??
    c.ops_user ??
    c.assignedTo ??
    c.assigned_to ??
    null;

  const createdByRaw = c.created_by ?? c.createdBy ?? null;

  const assigned_to = parseUserMaybe(assignedToRaw);
  const created_by = parseUserMaybe(createdByRaw);

  return { ...c, assigned_to, created_by };
}

/* ---------- component ---------- */
export default function OpsInbox() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [opsUsers, setOpsUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ops users for the assign menu
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ops-users`, { credentials: 'include' });
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

  // campaigns assigned to current ops user
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ops-users/${user.id}/campaigns`, {
          credentials: 'include',
        });
        if (!res.ok) setCampaigns([]);
        else {
          const data = await res.json();
          const raw = Array.isArray(data?.campaigns) ? data.campaigns : [];
          setCampaigns(raw.map(normalizeCampaign));
        }
      } catch (e) {
        console.error('Failed to fetch campaigns', e);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  // assign/reassign from the menu
  const handleAssign = async (campaignId, selected) => {
    try {
      const clerkId = selected?.user_id ?? selected?.id;
      if (!clerkId) return;

      const res = await fetch(`${API_URL}/ops-users/campaigns/${campaignId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ops_user_id: clerkId }), // ← correct key + id
      });

      if (res.ok) {
        const maybeUpdated = await res.json().catch(() => null);
        if (maybeUpdated && maybeUpdated.id) {
          setCampaigns(prev =>
            prev.map(c => (c.id === campaignId ? normalizeCampaign(maybeUpdated) : c))
          );
        } else {
          // optimistic patch
          const assigned = {
            user_id: clerkId,
            full_name: selected.full_name ?? null,
            email: selected.email ?? null,
            image_url: selected.image_url ?? null,
          };
          setCampaigns(prev =>
            prev.map(c =>
              c.id === campaignId ? { ...c, assigned_to: assigned, ops_user: assigned } : c
            )
          );
        }
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
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Company</th>
                <th className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 sm:table-cell">
                  Type
                </th>
                <th className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 md:table-cell">
                  Budget
                </th>
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Created By</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Assigned To</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Status</th>
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
                    {c.created_by ? <UserAvatarName user={c.created_by} size="md" /> : '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                    <OpsAssignMenu
                      current={c.assigned_to ?? c.ops_user ?? null}
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