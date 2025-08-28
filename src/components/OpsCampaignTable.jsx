import Card from './Card';
import OpsAssignMenu from './OpsAssignMenu.jsx';
import UserAvatarName from './UserAvatarName.jsx';

function cls(...xs) {
  return xs.filter(Boolean).join(' ');
}

export default function OpsCampaignTable({
  title,
  campaigns = [],
  opsUsers = [],
  onAssign,
  onRowClick,
  isLoading = false,
  sticky = false,
  className = '',
}) {
  const fmt = (val) => (Array.isArray(val) ? val.join(', ') : val || '-');

  if (isLoading) {
    return (
      <Card title={title} className={className}>
        <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
      </Card>
    );
  }

  if (!campaigns.length) {
    return (
      <Card title={title} className={className}>
        <div className="py-8 text-center text-sm text-gray-500">No campaigns found.</div>
      </Card>
    );
  }

  return (
    <Card title={title} className={className}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white">
            <tr>
              <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Company</th>
              <th className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 sm:table-cell">Type</th>
              <th className="hidden px-3 py-3.5 text-sm font-semibold text-gray-900 md:table-cell">Budget</th>
              <th className="px-3 py-3.5 text-sm font-semibold text-gray-900">Created By</th>
              <th
                className={cls(
                  'px-3 py-3.5 text-sm font-semibold text-gray-900',
                  sticky ? 'lg:sticky lg:right-24 lg:bg-white' : ''
                )}
              >
                Assigned To
              </th>
              <th
                className={cls(
                  'px-3 py-3.5 text-sm font-semibold text-gray-900',
                  sticky ? 'lg:sticky lg:right-0 lg:bg-white' : ''
                )}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((c) => (
              <tr
                key={c.id}
                onClick={() => onRowClick && onRowClick(c.id)}
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
                <td
                  className={cls(
                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                    sticky ? 'lg:sticky lg:right-24 lg:bg-white' : ''
                  )}
                >
                  <OpsAssignMenu
                    current={c.assigned_to ?? c.ops_user ?? null}
                    opsUsers={opsUsers}
                    onSelect={(u) => onAssign && onAssign(c.id, u)}
                  />
                </td>
                <td
                  className={cls(
                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                    sticky ? 'lg:sticky lg:right-0 lg:bg-white' : ''
                  )}
                >
                  {c.status || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

