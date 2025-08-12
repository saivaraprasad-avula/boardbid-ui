export default function CardHeader({ children }) {
  return (
    <div className="border-b border-[#288dcf]/20 bg-[#288dcf]/10 px-4 py-5 sm:px-6 rounded-t-lg">
      <h3 className="text-base font-semibold text-gray-900">{children}</h3>
    </div>
  );
}