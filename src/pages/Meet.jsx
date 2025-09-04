import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroHeader from '../components/HeroHeader';
import PricingCTA from '../components/PricingCTA';
import Footer from '../components/Footer';

const FILLOUT_SHARE_URL =
  'https://boardbid.fillout.com/book-a-meeting?transparentBackground=1&hideTitle=1';

const FILLOUT_SCRIPT_SRC = 'https://server.fillout.com/embed.js';
const FILLOUT_SCRIPT_ID = 'fillout-embed-js';

export default function Meet() {
  const embedRef = useRef(null);
  const wrapperRef = useRef(null);

  const [scriptReady, setScriptReady] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [showLoader, setShowLoader] = useState(true); // used ONLY for iframe fallback

  // Tall, responsive height so the iframe never needs its own scrollbar
  const fallbackHeight = useMemo(() => {
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    return Math.max(1100, Math.round(vh * 1.6)); // 1.6× viewport, min 1100px
  }, []);

  // Load Fillout script once and (re)scan DOM on SPA route
  useEffect(() => {
    let failGuard;
    const ensureScript = () => {
      if (document.getElementById(FILLOUT_SCRIPT_ID)) {
        setScriptReady(true);
        // @ts-ignore
        window.FilloutEmbed?.refresh?.();
        return;
      }
      const s = document.createElement('script');
      s.id = FILLOUT_SCRIPT_ID;
      s.async = true;
      s.src = FILLOUT_SCRIPT_SRC;
      s.onload = () => {
        setScriptReady(true);
        // @ts-ignore
        window.FilloutEmbed?.refresh?.();
      };
      s.onerror = () => setUseIframeFallback(true);
      document.body.appendChild(s);
    };

    ensureScript();

    // If nothing appears after a few seconds, switch to iframe fallback
    failGuard = window.setTimeout(() => {
      if (!embedRef.current) return;
      if (embedRef.current.childNodes.length === 0) {
        setUseIframeFallback(true);
      }
    }, 3500);

    return () => window.clearTimeout(failGuard);
  }, []);

  // When the script injects its iframe, remove our skeleton spacer (but no overlay)
  const [showSpacer, setShowSpacer] = useState(true);
  useEffect(() => {
    if (!embedRef.current || useIframeFallback) return;
    const el = embedRef.current;
    const obs = new MutationObserver(() => {
      if (el.childNodes.length > 0) {
        setShowSpacer(false); // let Fillout's own "Loading..." be visible
      }
    });
    obs.observe(el, { childList: true });
    return () => obs.disconnect();
  }, [useIframeFallback, scriptReady]);

  // If the embed or iframe posts a height via postMessage, grow the wrapper
  useEffect(() => {
    const onMessage = (e) => {
      try {
        const d = e?.data;
        const h =
          (d && typeof d.height === 'number' && d.height) ||
          (typeof d === 'object' && typeof d.formHeight === 'number' && d.formHeight) ||
          null;
        if (h && wrapperRef.current) {
          const padded = Math.max(h + 80, fallbackHeight);
          wrapperRef.current.style.minHeight = `${padded}px`;
        }
      } catch { /* no-op */ }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [fallbackHeight]);

  return (
    <div className="relative bg-white">
      <HeroHeader />
<<<<<<< Updated upstream
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mx-auto mb-8 max-w-3xl text-center text-lg leading-8 text-gray-600">
          Schedule a quick call with our team to explore billboard, airport, transit and other DOOH ad opportunities
          for your brand.
        </p>
=======

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:px-8">
        <SectionHeader
          title="Book a Meeting"
          description="Schedule a quick call with our team to explore billboard, airport, transit, and other DOOH ad opportunities. See how BoardBid.ai can help your brand go live in days."
          eyebrow="Meeting with BoardBid.ai"
          align="center"
          maxW="max-w-3xl"
        />

        {/* Elegant card wrapper */}
>>>>>>> Stashed changes
        <div className="mx-auto w-full max-w-3xl">
          <div
            ref={wrapperRef}
            className="relative rounded-[22px] border border-gray-200 bg-white p-3 shadow-sm ring-1 ring-black/5"
            style={{ minHeight: useIframeFallback ? `${fallbackHeight}px` : undefined }}
          >
            {/* A) Preferred: Fillout script-embed (NO overlay; allow Fillout's own loader to show) */}
            {!useIframeFallback && (
              <>
                {/* lightweight spacer to avoid layout shift before the embed appears */}
                {showSpacer && (
                  <div className="h-[320px] w-full animate-pulse rounded-xl bg-gray-50" />
                )}
                <div
                  ref={embedRef}
                  data-fillout-embed="inline"
                  data-fillout-src={FILLOUT_SHARE_URL}
                  style={{ width: '100%' }}
                />
              </>
            )}

            {/* B) Guaranteed: tall iframe fallback (we use our overlay loader here only) */}
            {useIframeFallback && (
              <>
                {showLoader && (
                  <div className="absolute inset-0 z-10 grid place-items-center rounded-[18px] bg-white/70">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                  </div>
                )}
                <iframe
                  src={FILLOUT_SHARE_URL}
                  title="Book a meeting"
                  loading="lazy"
                  style={{ height: `${fallbackHeight}px` }}
                  className="block w-full rounded-xl border-0"
                  onLoad={() => setShowLoader(false)}
                />
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
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