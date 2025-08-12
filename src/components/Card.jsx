import CardHeader from './CardHeader';

export default function Card({ title, children }) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      {title && <CardHeader>{title}</CardHeader>}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
