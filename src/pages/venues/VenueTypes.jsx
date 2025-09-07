import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { venueTypes } from '../../data/venueTypes.js';

export default function VenueTypes() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <PageHeader
        title="Venue Types"
        subtitle="Explore available formats"
        align="center"
      />
      <ul className="mt-10 divide-y divide-gray-200 rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60">
        {venueTypes.map((v) => (
          <li key={v.slug} className="flex justify-between items-center px-4 py-5 sm:px-6">
            <span className="text-sm font-medium text-gray-900">{v.name}</span>
            <Link
              to={`/venue-types/${v.slug}`}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Learn more &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
