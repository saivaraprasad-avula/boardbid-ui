'use client';

export default function LandingSectionHeading({
  eyebrow = 'Follow Your Audience throughout the Day',
  title = 'Deliver Your Message Across Environments',
}) {
  return (
    <div className="flex justify-center">
      <div className="text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">{eyebrow}</h2>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h2>
      </div>
    </div>
  );
}