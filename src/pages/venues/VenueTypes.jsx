import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import Card from "../../components/Card.jsx";
import HeroHeader from "../../components/HeroHeader.jsx";
import HomeBanner from "../../components/HomeBanner.jsx";
import PricingCTA from "../../components/PricingCTA.jsx";
import Footer from "../../components/Footer.jsx";
import { venueTypes, VENUE_PLACEHOLDER_IMG } from "../../data/venueTypes.js";

// ✅ Only icons that exist in @heroicons/react/24/outline
import {
  PaperAirplaneIcon,      // airports
  BuildingStorefrontIcon, // retail-like, c-stores, liquor, street furniture
  BuildingOffice2Icon,    // offices, hotels
  AcademicCapIcon,        // colleges, schools
  IdentificationIcon,     // DMV
  HeartIcon,              // doctors, pharmacies, vets
  TruckIcon,              // gas stations, taxis/rideshares
  UserGroupIcon,          // bars, casual dining
  ShoppingBagIcon,        // malls, retail
  FilmIcon,               // movie theaters
  TrophyIcon,             // sports & rec
  RectangleStackIcon,     // billboards / urban panels
  MapIcon,                // transit stations
  RocketLaunchIcon,       // QSR (playful/fast)
  SparklesIcon,           // salons / dispensaries
  BoltIcon,               // gyms
  Squares2X2Icon,         // fallback
} from "@heroicons/react/24/outline";

// Map venue slugs to icons
const iconMap = {
  airports: PaperAirplaneIcon,
  bars: UserGroupIcon,
  billboards: RectangleStackIcon,
  "casual-dining": UserGroupIcon,
  "convenience-stores": BuildingStorefrontIcon,
  "colleges-universities": AcademicCapIcon,
  dispensaries: SparklesIcon,
  dmv: IdentificationIcon,
  "doctors-offices": HeartIcon,
  "gas-stations": TruckIcon,
  gyms: BoltIcon,
  hotels: BuildingOffice2Icon,
  "liquor-stores": BuildingStorefrontIcon,
  malls: ShoppingBagIcon,
  "movie-theaters": FilmIcon,
  "office-buildings": BuildingOffice2Icon,
  pharmacies: HeartIcon,
  qsr: RocketLaunchIcon,
  "recreational-locations": TrophyIcon,
  retail: BuildingStorefrontIcon,
  salons: SparklesIcon,
  schools: AcademicCapIcon,
  "sports-entertainment": TrophyIcon,
  "street-furniture": RectangleStackIcon,
  "taxis-rideshares": TruckIcon,
  "transit-stations": MapIcon,
  "urban-panels": RectangleStackIcon,
  "veterinary-offices": HeartIcon,
};

export default function VenueTypes() {
  return (
    <div className="bg-white pt-24 sm:pt-32">
      <HeroHeader />
      <HomeBanner />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <PageHeader
          title="Venue Types"
          subtitle="Explore advertising environments"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {venueTypes.map((v) => {
            const Icon = iconMap[v.slug] || Squares2X2Icon;
            const imgSrc =
              v.image && v.image.trim() !== "" ? v.image : VENUE_PLACEHOLDER_IMG;

            return (
              <Link
                key={v.slug}
                to={`/venue-types/${v.slug}`}
                className="group block"
              >
                <Card className="hover:shadow-xl hover:ring-gray-300 transition-all duration-300">
                  {/* Image (with placeholder) */}
                  <div className="relative h-48 w-full overflow-hidden rounded-md">
                    <img
                      src={imgSrc}
                      alt={v.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
                  </div>

                  {/* Title + Icon */}
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#288dcf] transition-colors">
                      {v.name}
                    </h3>
                    <span className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 ring-1 ring-gray-200 text-gray-600 group-hover:bg-[#288dcf] group-hover:text-white group-hover:ring-[#288dcf] transition-colors">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <PricingCTA />
      <Footer />
    </div>
  );
}

