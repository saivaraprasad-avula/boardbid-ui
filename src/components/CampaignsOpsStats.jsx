export default function CampaignsOpsStats({ campaigns = [] }) {
  const stats = [
    { name: 'Total', stat: campaigns.length.toString() },
    { name: 'Unassigned', stat: '-' },
    { name: 'In Progress', stat: '-' },
    { name: 'Closed', stat: '-' },
  ];

  return (
    <div className="mt-8 mb-8">

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-gray-200 sm:p-6 dark:bg-gray-900 dark:ring-white/10"
          >
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
