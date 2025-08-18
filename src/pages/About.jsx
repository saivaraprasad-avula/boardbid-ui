'use client'

import React from 'react'
import {
  AcademicCapIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import HeroHeader from '../components/HeroHeader'
import Footer from '../components/Footer'
import OurLeadershipTeam from '../components/OurLeadershipTeam.jsx'

// Stats
const stats = [
  { label: 'Founded', value: '2025' },
  { label: 'Screens reachable', value: '100k+' },
  { label: 'Countries', value: '22' },
  { label: 'Avg setup time', value: 'Hours, not weeks' },
]

// Values
const values = [
  {
    name: 'Be world-class.',
    description:
      'We obsess over planning quality, UX, and outcomes—so you can launch with confidence, even on your first OOH buy.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Take responsibility.',
    description:
      'Transparent pricing, clear deliverables, and proactive support. No hidden markups or vendor runaround.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Be supportive.',
    description:
      'From SMBs to growth teams, we meet you where you are with templates, guides, and human help when you need it.',
    icon: UserGroupIcon,
  },
  {
    name: 'Always learning.',
    description:
      'AI that keeps improving—location suggestions, audience optimization, and budget routing tuned to your goals.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Share what we know.',
    description:
      'We publish playbooks and benchmarks so advertisers can plan smarter and waste less.',
    icon: SparklesIcon,
  },
  {
    name: 'Enjoy the win.',
    description:
      'Great campaigns should feel great to run—fewer clicks, faster proposals, and better visibility end-to-end.',
    icon: SunIcon,
  },
]

// Benefits
const aboutBenefits = [
  'Direct access to premium inventory without going through agencies or juggling multiple vendors.',
  "Transparent CPM-based pricing so you know exactly what you're paying for.",
  'AI-assisted planning and targeting to stretch your budget further.',
  'Real-time bidding and instant proposals so you can go from idea to live campaign in hours, not weeks.',
  'Nationwide and hyperlocal reach to match your growth strategy.',
]

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <HeroHeader />

      <main className="relative isolate">
        {/* Background blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="hidden sm:block aspect-[1108/632] sm:w-[277px] flex-none bg-gradient-to-r from-[#80caff] to-[#288dcf] opacity-25"
          />
        </div>

        {/* About BoardBid.ai (Hero) */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-3xl pt-24 text-center sm:pt-32">
            <p className="text-sm font-semibold tracking-widest text-[#288dcf] uppercase">
              About BoardBid.ai
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI-Powered OOH Advertising for Businesses That Want to Scale
            </h1>
            <p className="mt-6 text-lg text-pretty text-gray-600 sm:text-xl/8">
              BoardBid.ai is the AI-powered demand-side platform built to put premium out-of-home advertising directly into
              the hands of SMBs, startups, and growth-stage brands.
            </p>
          </div>
        </div>

        {/* About copy + Stats */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2">
              <div>
                <p className="leading-8">
                  We believe buying outdoor media should be as easy as booking a hotel room—no endless vendor calls, no
                  hidden markups, no complicated contracts. That’s why we’ve combined Vistar Media’s world-class
                  programmatic technology with our own AI-driven planning tools, giving advertisers the ability to search,
                  target, bid, and launch campaigns across billboards, transit media, place-based screens, airport displays,
                  mall signage, gas station TV, rideshare ads, point-of-purchase networks, sports venues, street furniture,
                  and more—all from one streamlined platform.
                </p>
              </div>
              <div>
                <p className="leading-8">
                  Our AI works in the background to help you plan smarter: suggesting high-performing locations, optimizing
                  audience targeting, and recommending budget allocations based on your goals. Whether you’re building brand
                  awareness in a single neighborhood or scaling across multiple cities, BoardBid.ai makes it possible to
                  launch with confidence—even if it’s your first time buying OOH.
                </p>
              </div>
            </div>

            {/* Stats */}
            <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
              {stats.map((stat, statIdx) => (
                <div key={statIdx} className="flex flex-col-reverse gap-y-3 border-l border-gray-200 pl-6">
                  <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Our values */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Our values</h2>
            <p className="mt-6 text-lg/8 text-gray-700">
              Principles that shape how we build, support, and scale out-of-home campaigns for modern brands.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
            {values.map((value) => (
              <div key={value.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <value.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-[#288dcf]" />
                  {value.name}
                </dt>{' '}
                <dd className="inline">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team */}
        <OurLeadershipTeam />

        {/* CTA */}
        <div className="relative isolate -z-10 mt-32 sm:mt-40">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white/75 px-6 py-16 shadow-lg ring-1 ring-gray-900/5 sm:p-12 lg:p-16">
              <div className="flex items-start gap-4">
                <CheckCircleIcon aria-hidden="true" className="h-10 w-10 flex-none text-[#288dcf]" />
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-4xl">
                    Why advertisers choose BoardBid.ai
                  </h2>
                  <ul role="list" className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7 text-gray-950 sm:grid-cols-2">
                    {aboutBenefits.map((benefit) => (
                      <li key={benefit} className="flex gap-x-3">
                        <CheckCircleIcon aria-hidden="true" className="h-6 w-6 flex-none text-[#288dcf]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary background blob */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            className="hidden sm:block aspect-[1318/752] sm:w-[329.5px] flex-none bg-gradient-to-r from-[#9fd6fc] to-[#288dcf] opacity-40"
          />
        </div>
      </div>
      </main>

      {/* Footer */}
      <div className="mt-24 border-t border-gray-200">
        <Footer />
      </div>
    </div>
  )
}