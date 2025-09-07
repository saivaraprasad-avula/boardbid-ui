import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { venueTypes } from '../../data/venueTypes.js';

export default function VenueTypeDetail() {
  const { slug } = useParams();
  const venue = venueTypes.find((v) => v.slug === slug);

  if (!venue) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24">
        <PageHeader title="Venue Not Found" align="center" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <PageHeader title={venue.name} align="center" />
      {venue.image && (
        <img src={venue.image} alt={venue.name} className="mb-10 w-full rounded-lg object-cover" />
      )}
      <div className="space-y-8">
        <p className="whitespace-pre-line">{venue.websiteCopy}</p>
        <div>
          <h2 className="text-xl font-semibold">Video Copy</h2>
          <p className="mt-2 whitespace-pre-line">{venue.videoCopy}</p>
        </div>
      </div>
    </div>
  );
}
