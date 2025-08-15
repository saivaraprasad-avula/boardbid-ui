'use client'

import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react'
import { withBase } from '../utils/basePath.js'
import HeroHeader from './HeroHeader.jsx'

export default function Hero() {
  
  return (
    <div className="bg-white">
      <HeroHeader />

      {/* Hero Section */}
      {/* MOBILE-ONLY TWEAKS: smaller paddings & card width; DESKTOP remains as you had it */}
      <div className="relative isolate bg-white px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 lg:pt-36 lg:pb-52">
        <div className="mx-auto max-w-4xl">
          <div
            className="
              text-center rounded-3xl bg-[#bfcde0] shadow-md
              px-5 py-8
              sm:px-10 sm:py-12
              md:px-16 md:py-16
              lg:px-32 lg:py-24
            "
          >
            <h1
              className="
                text-[26px]
                sm:text-[32px]
                md:text-[36px]
                lg:text-[50px]
                tracking-[-0.4px] sm:tracking-[-0.6px] md:tracking-[-0.72px] lg:tracking-[-2px]
                font-sans leading-[1.2] md:leading-[1.15] lg:leading-none
                text-black font-normal text-center
                mb-4 md:mb-6 lg:mb-11
              "
            >
              We make Digital Out-of-Home (DOOH) advertising easy
            </h1>

            <p className="mx-auto max-w-2xl text-neutral-950 text-sm sm:text-base md:text-lg leading-relaxed">
              From launch to IPO, plan and book impactful Programmatic DOOH campaigns with{' '}
              <span className="font-semibold text-gray-900">AI-powered strategy</span> and{' '}
              <span className="font-semibold text-gray-900">zero agency friction</span>.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <SignedOut>
                <SignUpButton mode="modal" afterSignUpUrl={withBase('/dashboard')}>
                  <button className="w-full sm:w-auto rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800">
                    Get started
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Dashboard
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}