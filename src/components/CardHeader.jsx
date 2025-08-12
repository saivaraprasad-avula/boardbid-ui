export default function CardHeader({ children }) {
  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-white/10">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{children}</h3>
    </div>
  );
}
