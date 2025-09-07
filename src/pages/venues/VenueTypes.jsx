// src/pages/venue-types/VenueTypeDetail.jsx
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import Card from "../../components/Card.jsx";
import {
  venueTypes,
  VENUE_PLACEHOLDER_IMG,
  VENUE_VIDEO_PLACEHOLDER_THUMB,
} from "../../data/venueTypes.js";
import { PlayIcon } from "@heroicons/react/24/solid";

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

  const imgSrc =
    venue.image && venue.image.trim() !== ""
      ? venue.image
      : VENUE_PLACEHOLDER_IMG;

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <PageHeader title={venue.name} subtitle="Format overview & examples" align="center" />

      {/* Hero Image */}
      <Card className="mt-10">
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <img
            src={imgSrc}
            alt={venue.name}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </div>
      </Card>

      {/* Website Copy */}
      <Card className="mt-8">
        <div className="prose prose-gray max-w-none">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Overview</h2>
          <p className="whitespace-pre-line leading-7 text-gray-700">
            {venue.websiteCopy}
          </p>
        </div>
      </Card>

      {/* Video Section */}
      <Card className="mt-8">
        <div className="prose prose-gray max-w-none">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Video</h2>

          {venue.youtubeId ? (
            // Responsive YouTube embed (16:9)
            <div className="relative mb-6 aspect-video overflow-hidden rounded-lg ring-1 ring-gray-200/60">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${venue.youtubeId}`}
                title={`${venue.name} — Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            // Video placeholder card
            <div className="mb-6 relative overflow-hidden rounded-lg ring-1 ring-gray-200/60">
              <img
                src={VENUE_VIDEO_PLACEHOLDER_THUMB}
                alt="Video placeholder"
                className="h-56 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow">
                  <PlayIcon className="h-5 w-5 text-[#288dcf]" />
                  <span className="text-sm font-medium text-gray-800">
                    Video coming soon
                  </span>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900">Narration</h3>
          <p className="mt-2 whitespace-pre-line leading-7 text-gray-700">
            {venue.videoCopy}
          </p>
        </div>
      </Card>
    </div>
  );
}