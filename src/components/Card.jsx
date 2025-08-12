import CardHeader from './CardHeader';

export default function Card({ title, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60 ${className}`}>
      {title && <CardHeader>{title}</CardHeader>}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}