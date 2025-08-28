'use client';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';
import HeroHeader from './HeroHeader.jsx';
import ConversationStarter from './ConversationStarter.jsx';

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
            "
          >
            {/* Heading */}
            <h1
              ref={headlineRef}
              className="
                text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px]
                font-sans font-medium leading-tight tracking-tight
                text-black text-center
              "
            >
              We make Digital Out-of-Home (DOOH){' '}
              <span className="md:hidden">advertising easy</span>
              <span className="hidden md:inline">
                <br />
                advertising easy
              </span>
            </h1>

            {/* Sub-heading — lighter and smaller */}
            <p
              className="
                mx-auto mt-3 max-w-2xl
                text-neutral-800 text-xs sm:text-sm md:text-base
                leading-relaxed font-normal opacity-85
              "
            >
              From launch to IPO, plan and book impactful Programmatic DOOH campaigns with{' '}
              <span className="font-semibold text-gray-900">AI-powered strategy</span> and{' '}
              <span className="font-semibold text-gray-900">zero agency friction</span>.
            </p>
            <br></br>
            {/* Input */}
            <div className="mt-5 md:mt-7">
              <ConversationStarter headlineRef={headlineRef} />
            </div>

            {/* CTA Buttons - REMOVED */}
            {/* The previous code for the buttons has been removed here. */}
            
          </div>
        </div>
      </div>
    </div>
  );
}