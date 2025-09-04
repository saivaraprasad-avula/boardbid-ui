export default function SectionHeader({
  title,
  description,
  eyebrow = 'Meeting with BoardBid.ai',
  align = 'center',
  maxW = 'max-w-2xl',
}) {
  const alignCls =
    align === 'left' ? 'text-left items-start' :
    align === 'right' ? 'text-right items-end' :
    'text-center items-center';

  return (
    <div className={`mx-auto mb-14 flex flex-col ${alignCls} ${maxW}`}>
      {/* Eyebrow label */}
      <span className="mb-2 text-xs font-semibold tracking-wider text-indigo-600/80 uppercase">
        {eyebrow}
      </span>

      {/* Title with subtle gradient accent */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
        Book a{' '}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Meeting
        </span>
      </h1>

      {/* Stylish, smaller description */}
      {description && (
        <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-gray-500 max-w-prose">
          {description}
        </p>
      )}

      {/* Underline accent */}
      <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto" />
    </div>
  );
}