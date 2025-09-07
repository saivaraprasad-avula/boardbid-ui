import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { venueTypes } from '../../data/venueTypes.js';

export default function VenueTypes() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <PageHeader title="Venue Types" subtitle="Explore advertising environments" align="center" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {venueTypes.map((v) => (
          <Link
            key={v.slug}
            to={`/venue-types/${v.slug}`}
            className="block overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition-shadow"
          >
            {v.image && (
              <img src={v.image} alt={v.name} className="h-48 w-full object-cover" />
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
