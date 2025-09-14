'use client';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';
import HeroHeader from './HeroHeader.jsx';

// Palette from BoardBid.ai brand family
const CARD_BG = '#D6EAF8';   // soft background for hero card
const BAND_BG = '#4BA6DC';   // credibility band
const ACCENT = '#288DCF';    // accent separator

export default function Hero() {
  const headlineRef = useRef(null);

  return (
    <div className="bg-white">
      <HeroHeader />

      {/* Hero Section */}
      <div className="relative isolate bg-white px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8 lg:pt-28 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div
            className="relative text-center rounded-[28px] shadow-xl ring-1 ring-black/5 overflow-hidden flex flex-col justify-between"
            style={{ backgroundColor: CARD_BG }}
          >
            {/* Main content */}
            <div className="px-6 sm:px-12 lg:px-20 py-14 sm:py-20 lg:py-24 flex flex-col items-center">
              {/* Headline */}
              <h1
                ref={headlineRef}
                className="
                  text-balance
                  text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px]
                  font-extrabold tracking-tight leading-tight text-black
                  max-w-[860px]
                "
              >
                The Fast, Easy, AI-Powered Way to Buy Billboards&nbsp;&amp;&nbsp;Screens.
              </h1>

              {/* Subheadline */}
              <p
                className="
                  mt-6 text-gray-700
                  text-[14px] sm:text-[15px] md:text-[16px]
                  leading-relaxed font-normal max-w-[680px]
                "
              >
                Launch Programmatic, Guaranteed Programmatic, and Direct Buy DOOH campaigns — 
                built for startups, SMBs, and growth companies.
                <br className="hidden sm:block" />
                <span className="block mt-3">
                  <span className="font-semibold text-gray-900">No agencies.</span>{' '}
                  <span className="font-semibold text-gray-900">No friction.</span>{' '}
                  Just faster, smarter media buying.
                </span>
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <SignedOut>
                  <SignUpButton mode="modal" afterSignUpUrl={withBase('/dashboard')}>
                    <button
                      className="
                        rounded-full bg-black px-8 py-3 text-sm font-semibold text-white
                        shadow-md transition-all hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                      "
                    >
                      Get started
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    to="/dashboard"
                    className="
                      rounded-full bg-black px-8 py-3 text-sm font-semibold text-white
                      shadow-md transition-all hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                    "
                  >
                    Dashboard
                  </Link>
                </SignedIn>

                <button
                  onClick={() => window.Intercom && window.Intercom('show')}
                  className="text-sm font-semibold text-gray-900 hover:text-gray-700"
                >
                  Talk to us live →
                </button>
              </div>
            </div>

            {/* Credibility band */}
            <div
              className="px-6 sm:px-12 lg:px-20 py-6 sm:py-7"
              style={{ backgroundColor: BAND_BG }}
            >
              <p className="text-center text-xs sm:text-sm md:text-base font-medium text-white max-w-[960px] mx-auto leading-relaxed">
                Available across leading media owners worldwide, including major billboard and transit networks.
              </p>
            </div>

            {/* Accent separator line */}
            <div style={{ backgroundColor: ACCENT }} className="h-[3px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}