export default function CampaignsOpsStats({ campaigns = [] }) {
  const stats = [
    { name: 'Total Campaigns', stat: campaigns.length.toString() },
    { name: 'Avg. Open Rate', stat: '58.16%' },
    { name: 'Avg. Click Rate', stat: '24.57%' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
