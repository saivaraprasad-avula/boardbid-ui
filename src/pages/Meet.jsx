import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroHeader from '../components/HeroHeader';
import PricingCTA from '../components/PricingCTA';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';

const FILLOUT_SHARE_URL = 'https://boardbid.fillout.com/book-a-meeting';
const FILLOUT_SCRIPT_SRC = 'https://server.fillout.com/embed.js';
const FILLOUT_SCRIPT_ID = 'fillout-embed-js';

export default function Meet() {
  const embedRef = useRef(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [showLoader, setShowLoader] = useState(true); // for iframe fallback only

  useEffect(() => {
    let failGuard;
    const ensureScript = () => {
      if (document.getElementById(FILLOUT_SCRIPT_ID)) {
        // @ts-ignore
        window.FilloutEmbed?.refresh?.();
        return;
      }
      const s = document.createElement('script');
      s.id = FILLOUT_SCRIPT_ID;
      s.async = true;
      s.src = FILLOUT_SCRIPT_SRC;
      s.onload = () => {
        // @ts-ignore
        window.FilloutEmbed?.refresh?.();
      };
      s.onerror = () => setUseIframeFallback(true);
      document.body.appendChild(s);
    };

    ensureScript();

    // Fallback if embed doesn't initialize
    failGuard = window.setTimeout(() => {
      if (!embedRef.current) return;
      if (embedRef.current.childNodes.length === 0) {
        setUseIframeFallback(true);
      }
    }, 2500);

    return () => window.clearTimeout(failGuard);
  }, []);

  return (
    <div className="bg-gray-100">
      <HeroHeader />

      {/* Tight heading block */}
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-4 sm:pt-12 sm:pb-2">
        <SectionHeader
          title="Book a Meeting"
          description="Schedule a quick call with our team to explore billboard, airport, transit, and other DOOH ad opportunities. See how BoardBid.ai can help your brand go live in days."
          eyebrow="Meeting with BoardBid.ai"
          align="center"
          maxW="max-w-3xl"
        />
      </div>

      {/* Full-bleed-ish embed: minimal gutters, no card chrome */}
      <div className="w-full">
        <div className="mx-auto max-w-6xl px-2 sm:px-4 md:px-6">
          {!useIframeFallback && (
            <div
              ref={embedRef}
              data-fillout-embed="standard"   // closest to hosted look; use "inline" if not supported
              data-fillout-src={FILLOUT_SHARE_URL}
              style={{ width: '100%' }}
            />
          )}

          {useIframeFallback && (
            <div className="relative">
              {showLoader && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-gray-100/60">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                </div>
              )}
              <iframe
                src={FILLOUT_SHARE_URL}
                title="Book a meeting"
                loading="lazy"
                className="block h-[80vh] w-full border-0"
                onLoad={() => setShowLoader(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Small “learn more” link with tight spacing */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="text-center">
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 underline-offset-4 hover:text-indigo-500 hover:underline"
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