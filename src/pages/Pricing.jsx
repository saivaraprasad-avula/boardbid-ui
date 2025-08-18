'use client'

import { CheckIcon } from '@heroicons/react/20/solid'
import {
  RectangleStackIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import HeroHeader from '../components/HeroHeader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PricingCTA from '../components/PricingCTA'

export default function Pricing() {
  return (
    <div className="bg-white pt-24 sm:pt-32">
      <HeroHeader />
      <Header />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Headline */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Transparent, Competitive Digital Out-of-Home Pricing
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Get access to premium billboards, transit, place-based, and digital signage — at rates that flex with demand
            and fit your budget.
          </p>
        </div>

        {/* Main content */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-2">
          {/* Left card */}
          <div className="rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-900">Pricing That Fits Your Campaign</h3>
            <p className="mt-4 text-sm text-gray-600">
              Since our inventory is biddable via Vistar’s DSP, your actual cost is the CPM (cost per thousand
              impressions), which varies by targeting, formats, and demand. Rather than forcing fixed bundles, we tailor
              pricing to each campaign — so you only pay for what delivers the most value to your goals.
            </p>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-indigo-600">What affects pricing</h4>
              <ul role="list" className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex gap-x-2">
                  <CheckIcon className="h-5 w-5 text-indigo-600" /> Transparent CPM ranges across formats
                </li>
                <li className="flex gap-x-2">
                  <CheckIcon className="h-5 w-5 text-indigo-600" /> Budgets starting as low as $1,000
                </li>
                <li className="flex gap-x-2">
                  <CheckIcon className="h-5 w-5 text-indigo-600" /> Flexible targeting by audience, location, or event
                </li>
                <li className="flex gap-x-2">
                  <CheckIcon className="h-5 w-5 text-indigo-600" /> Powered by Vistar Media’s premium DSP network
                </li>
              </ul>
            </div>
          </div>

          {/* Right card */}
          <div className="rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-900">Quick CPM Snapshot</h3>

            {/* Desktop/Tablet (unchanged) + Mobile-only stacked duplicate */}
            <dl className="mt-6 space-y-4 text-sm text-gray-700">
              {/* Digital Billboards */}
              <div className="hidden sm:flex sm:items-center sm:justify-between">
                <dt className="flex items-center gap-x-2">
                  <RectangleStackIcon className="h-5 w-5 text-indigo-600" />
                  Digital Billboards
                </dt>
                <dd className="font-medium">$6 – $12 CPM</dd>
              </div>
              <div className="sm:hidden">
                <dt className="flex items-center gap-x-2">
                  <RectangleStackIcon className="h-5 w-5 text-indigo-600" />
                  <span>Digital Billboards</span>
                </dt>
                <dd className="mt-1 font-medium">$6 – $12 CPM</dd>
              </div>

              {/* Transit Screens */}
              <div className="hidden sm:flex sm:items-center sm:justify-between">
                <dt className="flex items-center gap-x-2">
                  <TruckIcon className="h-5 w-5 text-indigo-600" />
                  Transit Screens
                </dt>
                <dd className="font-medium">$5 – $9 CPM</dd>
              </div>
              <div className="sm:hidden">
                <dt className="flex items-center gap-x-2">
                  <TruckIcon className="h-5 w-5 text-indigo-600" />
                  <span>Transit Screens</span>
                </dt>
                <dd className="mt-1 font-medium">$5 – $9 CPM</dd>
              </div>

              {/* Place-Based */}
              <div className="hidden sm:flex sm:items-center sm:justify-between">
                <dt className="flex items-center gap-x-2">
                  <BuildingStorefrontIcon className="h-5 w-5 text-indigo-600" />
                  Place-Based (Gyms, Bars, Malls)
                </dt>
                <dd className="font-medium">$4 – $8 CPM</dd>
              </div>
              <div className="sm:hidden">
                <dt className="flex items-center gap-x-2">
                  <BuildingStorefrontIcon className="h-5 w-5 text-indigo-600" />
                  <span className="break-words">Place-Based (Gyms, Bars, Malls)</span>
                </dt>
                <dd className="mt-1 font-medium">$4 – $8 CPM</dd>
              </div>

              {/* Event Proximity */}
              <div className="hidden sm:flex sm:items-center sm:justify-between">
                <dt className="flex items-center gap-x-2">
                  <MapPinIcon className="h-5 w-5 text-indigo-600" />
                  Event Proximity
                </dt>
                <dd className="font-medium">$8 – $15 CPM</dd>
              </div>
              <div className="sm:hidden">
                <dt className="flex items-center gap-x-2">
                  <MapPinIcon className="h-5 w-5 text-indigo-600" />
                  <span>Event Proximity</span>
                </dt>
                <dd className="mt-1 font-medium">$8 – $15 CPM</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-gray-500">
              CPM = cost per thousand impressions. Pricing varies by city, targeting, and seasonality.
            </p>

            {/* Single CTA */}
            <div className="mt-6 flex justify-center">
            <a
              href="#"
              className="
                w-full sm:w-auto
                rounded-md border border-gray-300 px-5 py-2
                text-center text-sm font-semibold text-gray-700
                hover:bg-gray-50
              "
            >
              Book a Meeting
            </a>
          </div>
          </div>
        </div>
      </div>

      <PricingCTA />
      <Footer />
    </div>
  )
}