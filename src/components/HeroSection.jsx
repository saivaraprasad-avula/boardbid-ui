'use client';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';
import HeroHeader from './HeroHeader.jsx';
import Highlight from './Highlight.jsx';

export default function Hero() {
  const headlineRef = useRef(null);

  return (
    <div className="bg-white">
      <HeroHeader />

      {/* Hero Section */}
      <div className="relative isolate bg-white px-4 pt-20 pb-14 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div
            className="
              text-center rounded-[28px] bg-[#bfcde0] shadow-md
              px-5 py-8
              sm:px-10 sm:py-12
              md:px-16 md:py-16
              lg:px-28 lg:py-20
              h-[500px] flex flex-col justify-center
            "
          >
            {/* Stack content; nudge headline/subheading down & keep CTAs a bit closer */}
            <div className="mx-auto w-full max-w-3xl pt-4">
              {/* Heading (moved down slightly) */}
              <h1
                ref={headlineRef}
                className="
                  text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px]
                  font-sans font-medium leading-tight tracking-tight
                  text-black text-center
                "
              >
                We make Digital Out-of-Home (DOOH){' '}
                <span className="md:hidden">
                  advertising <Highlight animate>easy!</Highlight>
                </span>
                <span className="hidden md:inline">
                  <br />
                  advertising <Highlight animate>easy!</Highlight>
                </span>
              </h1>

              {/* Sub-heading (also nudged down) */}
              <p
                className="
                  mx-auto max-w-2xl
                  text-neutral-800 text-xs sm:text-sm md:text-base
                  leading-relaxed font-normal opacity-85
                  mt-4 md:mt-5
                "
              >
                From launch to IPO, plan and book impactful Programmatic DOOH campaigns with{' '}
                <span className="font-semibold text-gray-900">AI-powered strategy</span> and{' '}
                <span className="font-semibold text-gray-900">zero agency friction</span>.
              </p>

              {/* CTAs (slightly closer to subheading) */}
              <div className="mt-4 md:mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <SignedOut>
                  <SignUpButton mode="modal" afterSignUpUrl={withBase('/dashboard')}>
                    <button
                      className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
                    >
                      Get started
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    to="/dashboard"
                    className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
                  >
                    Dashboard <span aria-hidden="true"></span>
                  </Link>
                </SignedIn>

                <button
                  onClick={() => window.Intercom && window.Intercom('show')}
                  className="text-sm font-semibold text-gray-900 hover:text-gray-700"
                >
                  Talk to us live <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            {/* End stack */}
          </div>
        </div>
      </div>
    </div>
  );
}