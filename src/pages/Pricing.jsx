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


export default function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <HeroHeader />
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Headline */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Transparent, Competitive Digital Out-of-Home Pricing
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Get access to premium billboards, transit, place-based, and digital signage — at rates that flex with demand and fit your budget.
          </p>
        </div>

        {/* Main content */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-2">
          {/* Left card */}
          <div className="rounded-2xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-900">Custom Pricing — No Packages (for now)</h3>
            <p className="mt-4 text-sm text-gray-600">
              Since our inventory is biddable via Vistar’s DSP, your actual cost is the CPM (cost per thousand impressions),
              which varies based on targeting, formats, and demand. Instead of locking you into rigid packages, we’re quoting
              initial deals custom — so you only pay for what’s right for your campaign.
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
                  <CheckIcon className="h-5 w-5 text-indigo-600" /> Targeting options by audience, location, or event
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

            {/* Table-like layout with icons */}
            <dl className="mt-6 space-y-4 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-x-2">
                  <RectangleStackIcon className="h-5 w-5 text-indigo-600" />
                  Digital Billboards
                </dt>
                <dd className="font-medium">$6 – $12 CPM</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-x-2">
                  <TruckIcon className="h-5 w-5 text-indigo-600" />
                  Transit Screens
                </dt>
                <dd className="font-medium">$5 – $9 CPM</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-x-2">
                  <BuildingStorefrontIcon className="h-5 w-5 text-indigo-600" />
                  Place-Based (Gyms, Bars, Malls)
                </dt>
                <dd className="font-medium">$4 – $8 CPM</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-x-2">
                  <MapPinIcon className="h-5 w-5 text-indigo-600" />
                  Event Proximity
                </dt>
                <dd className="font-medium">$8 – $15 CPM</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-gray-500">
              CPM = cost per thousand impressions. Pricing varies by city, targeting, and seasonality.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#"
                className="w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow hover:bg-indigo-500"
              >
                Signup
              </a>
              <a
                href="#"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Book a Meeting
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}