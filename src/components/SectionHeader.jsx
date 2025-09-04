export default function SectionHeader({ title, description }) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
