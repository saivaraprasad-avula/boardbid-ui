import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import Card from "../../components/Card.jsx";
import YouTubePlayer from "../../components/YouTubePlayer.jsx";
import {
  PlayIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  RectangleGroupIcon,
  SparklesIcon,
  TrophyIcon,
  ShareIcon,
  BuildingOffice2Icon,
  ArrowsRightLeftIcon,
  StarIcon,
  PresentationChartBarIcon,
  GlobeAmericasIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  HandThumbUpIcon,
  DevicePhoneMobileIcon,
  MegaphoneIcon,
  CalendarIcon,
  CursorArrowRaysIcon,
  TagIcon,
  TruckIcon,
  SunIcon,
  AcademicCapIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  HeartIcon,
  BriefcaseIcon,
  GiftTopIcon,
  ShoppingBagIcon,
  FilmIcon,
  BellAlertIcon,
  BoltIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import {
  venueTypes,
  VENUE_PLACEHOLDER_IMG,
  VENUE_VIDEO_PLACEHOLDER_THUMB,
} from "../../data/venueTypes.js";

const iconMap = {
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  RectangleGroupIcon,
  SparklesIcon,
  TrophyIcon,
  ShareIcon,
  BuildingOffice2Icon,
  ArrowsRightLeftIcon,
  StarIcon,
  PresentationChartBarIcon,
  GlobeAmericasIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  HandThumbUpIcon,
  DevicePhoneMobileIcon,
  MegaphoneIcon,
  CalendarIcon,
  CursorArrowRaysIcon,
  TagIcon,
  TruckIcon,
  SunIcon,
  AcademicCapIcon,
  BanknotesIcon,
  DocumentCheckIcon,
  HeartIcon,
  BriefcaseIcon,
  GiftTopIcon,
  ShoppingBagIcon,
  FilmIcon,
  BellAlertIcon,
  BoltIcon,
  MusicalNoteIcon,
};

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
    venue.image && venue.image.trim() !== "" ? venue.image : VENUE_PLACEHOLDER_IMG;

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <PageHeader
        title={venue.name}
        subtitle="Format overview, highlights & strategy"
        align="center"
      />

      {/* Hero Image */}
      <Card className="mt-10">
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <img src={imgSrc} alt={venue.name} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </div>
      </Card>

      {/* Highlights */}
      {venue.highlights?.length > 0 && (
        <Card className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Highlights</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {venue.highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || SparklesIcon;
              return (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 text-[#288dcf]" />
                  <p className="text-sm text-gray-700">{h.text}</p>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      {/* Strategy Playbook */}
      {venue.strategy?.length > 0 && (
        <Card className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Strategy Playbook</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {venue.strategy.map((s, i) => {
              const Icon = iconMap[s.icon] || PresentationChartBarIcon;
              return (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 text-[#288dcf]" />
                  <p className="text-sm text-gray-700">{s.text}</p>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      {/* Overview */}
      <Card className="mt-8">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Overview</h2>
        <p className="whitespace-pre-line leading-7 text-gray-700">{venue.websiteCopy}</p>
      </Card>

      {/* Video Section */}
      <Card className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Video</h2>
        {venue.youtubeId ? (
          <div className="mb-6">
            <YouTubePlayer videoId={venue.youtubeId} title={`${venue.name} — Video`} />
          </div>
        ) : (
          <div className="mb-6 relative overflow-hidden rounded-lg ring-1 ring-gray-200/60">
            <img
              src={VENUE_VIDEO_PLACEHOLDER_THUMB}
              alt="Video placeholder"
              className="h-56 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow">
                <PlayIcon className="h-5 w-5 text-[#288dcf]" />
                <span className="text-sm font-medium text-gray-800">Video coming soon</span>
              </div>
            </div>
          </div>
        )}
        <p className="mt-2 whitespace-pre-line leading-7 text-gray-700">{venue.videoCopy}</p>
      </Card>
    </div>
  );
}