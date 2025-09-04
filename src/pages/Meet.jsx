import { Link } from 'react-router-dom';
import HeroHeader from '../components/HeroHeader';
import PricingCTA from '../components/PricingCTA';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';

export default function Meet() {
  return (
    <div className="bg-white pt-24 sm:pt-32">
      <HeroHeader />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          title="Book a Meeting"
          description={
            'Schedule a quick call with our team to explore billboard, airport, transit, and other DOOH ad opportunities. '
            + 'See how BoardBid.ai can help your brand go live in days.'
          }
        />
        <div className="mx-auto w-full max-w-3xl">
          <iframe
            src="https://boardbid.fillout.com/book-a-meeting"
            className="w-full rounded-lg border-0 h-[800px] sm:h-[900px]"
            title="Book a meeting"
            loading="lazy"
          />
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Learn more about BoardBid.ai
          </Link>
        </div>
      </div>
      <PricingCTA />
      <Footer />
    </div>
  );
}
