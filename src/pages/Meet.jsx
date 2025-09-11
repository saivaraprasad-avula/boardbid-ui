// src/pages/Meet.jsx
import HeroHeader from '../components/HeroHeader';
import Footer from '../components/Footer';
import PricingCTA from '../components/PricingCTA';

// --- Local banner just under the header ---
const TopBanner = () => {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="my-4 flex items-center justify-between gap-x-6 rounded-xl bg-gray-900 px-6 py-2.5 shadow-lg sm:pr-3.5">
        <p className="text-sm leading-6 text-white">
          <a href="https://boardbid.ai" target="_blank" rel="noopener noreferrer">
            <strong className="font-semibold">Learn More About Us : </strong>
            How we can help to advertise on billboards, airports, transit, and other DOOH opportunities&nbsp;
            <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
        <button type="button" className="-m-3 flex-none p-3 focus-visible:-outline-offset-4" aria-label="Dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               strokeWidth={1.5} stroke="currentColor" className="size-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, description, eyebrow, align = 'center', maxW = 'max-w-3xl' }) => {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  return (
    <div className={`${alignClass} ${maxW} mx-auto`}>
      <p className="font-semibold text-indigo-600 uppercase tracking-wide">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-7 text-gray-500">{description}</p>
    </div>
  );
};

export default function Meet() {
  const FORM_URL = 'https://boardbid.fillout.com/book-a-meeting';
  const IFRAME_TITLE = 'Book a meeting with BoardBid.ai';

  return (
    <div className="bg-white font-[Inter] flex flex-col min-h-screen">
      <HeroHeader />

      {/* ======= STATIC SPACER to clear fixed header + global pill ======= */}
      {/* Adjust these values if you still see overlap (bump by 8–16px). */}
      <div className="pt-[78px] sm:pt-[78px] lg:pt-[78px]" aria-hidden="true" />

      <TopBanner />

      <main className="relative z-0 flex-1 flex flex-col">
        {/* Heading */}
        <div className="mx-auto max-w-3xl px-4 pt-4 pb-4 sm:pt-6 sm:pb-3">
          <SectionHeader
            title="Book a Meeting"
            description="Schedule a quick call with our team to explore billboard, airport, transit, and other DOOH ad opportunities. See how BoardBid.ai can help your brand go live in days."
            eyebrow="Meeting with BoardBid.ai"
            align="center"
            maxW="max-w-3xl"
          />
        </div>

        {/* Form */}
        <div className="w-full flex-1">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
            <div className="w-full">
              <iframe
                title={IFRAME_TITLE}
                src={FORM_URL}
                className="mx-auto block w-full rounded-2xl bg-white shadow-xl"
                style={{ width: '100%', border: 0, height: '760px' }}
                allow="clipboard-write; fullscreen"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </main>

      <div>
        <PricingCTA />
        <Footer />
      </div>
    </div>
  );
}