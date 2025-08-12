'use client';

import React, { useState } from 'react';
import Drawer from './Drawer';
import VenueList from './VenueList';
import LandingSectionHeading from './LandingSectionHeading';

export default function VenuesSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // All Venues
  const allVenues = [
    { name: 'Airports' }, { name: 'Bars' }, { name: 'Billboards' }, { name: 'Casual Dining' },
    { name: 'Convenience Stores' }, { name: 'Colleges & Universities' }, { name: 'Dispensaries' },
    { name: 'DMVs' }, { name: "Doctor’s Offices" }, { name: 'Gas Stations' }, { name: 'Gyms' },
    { name: 'Hotels' }, { name: 'Liquor Stores' }, { name: 'Malls' }, { name: 'Movie Theaters' },
    { name: 'Office Buildings' }, { name: 'Pharmacies' }, { name: 'QSR' }, { name: 'Recreational Locations' },
    { name: 'Retail' }, { name: 'Salons' }, { name: 'Schools' }, { name: 'Sports Entertainment' },
    { name: 'Street Furniture' }, { name: 'Taxis & Rideshares' }, { name: 'Transit Stations' },
    { name: 'Urban Panels' }, { name: 'Veterinary Offices' },
  ];

  // Top Venues
  const topVenues = [
    {
      key: 'spectaculars',
      title: 'Spectaculars',
      tag: 'Big Splashy Moments',
      copy:
        'Iconic, large-format displays in the most visible locations—built for fame, launches, and mass awareness.',
      img: 'https://ik.imagekit.io/boardbid/spec2.webp?updatedAt=1755008461126',
      span: 'lg:col-span-4',
    },
    {
      key: 'place-based',
      title: 'Place-Based Screens',
      tag: 'Essential Activities',
      copy:
        'Gyms, malls, offices, and more—context-rich screens close to purchase and moments that matter.',
      img: 'https://ik.imagekit.io/boardbid/mall.webp',
      span: 'lg:col-span-2',
    },
    {
      key: 'airports',
      title: 'Airports',
      tag: 'Travel & Leisure',
      copy:
        'High dwell time and premium visibility in terminals, lounges, and concourses—ideal for brands with a global reach.',
      img: 'https://ik.imagekit.io/boardbid/transit1.webp?updatedAt=1755008159597',
      span: 'lg:col-span-2',
    },
    {
      key: 'billboards',
      title: 'Billboards',
      tag: 'Local & National',
      copy:
        'High-reach roadside coverage for consistent presence across cities, corridors, and regions.',
      img: 'https://ik.imagekit.io/boardbid/billboards.webp?updatedAt=1755008473002',
      span: 'lg:col-span-4',
    },
    {
      key: 'transit',
      title: 'Transit',
      tag: 'Daily Routines',
      copy:
        'Buses, shelters, subways, and stations—high frequency with commuters throughout the day.',
      images: [
        'https://ik.imagekit.io/boardbid/subway%20nyc.webp',
        'https://ik.imagekit.io/boardbid/station.avif',
        'https://ik.imagekit.io/boardbid/bus%20shelters%20screen.webp',
      ],
      span: 'lg:col-span-6',
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <LandingSectionHeading eyebrow="Venue Types" title="Where you can advertise with us" />

        {/* Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {topVenues.map((v, i) => (
            <div key={v.key} className={`flex p-px ${v.span}`}>
              <div
                className={`w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 ${
                  i === 0 ? 'max-lg:rounded-t-4xl lg:rounded-tl-4xl' : ''
                } ${i === 1 ? 'lg:rounded-tr-4xl' : ''} ${i === 2 ? 'lg:rounded-bl-4xl' : ''} ${
                  i === 3 ? 'max-lg:rounded-b-4xl lg:rounded-br-4xl' : ''
                }`}
              >
                {/* Image area */}
                {v.images ? (
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    {v.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`${v.title} ${idx + 1}`}
                        className="h-40 sm:h-56 md:h-72 lg:h-80 w-full object-cover"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    ))}
                  </div>
                ) : (
                  <img src={v.img} alt={v.title} className="h-80 w-full object-cover" />
                )}

                {/* Copy */}
                <div className="p-8 sm:p-10">
                  <h3 className="text-xs uppercase tracking-wide text-gray-500">{v.tag}</h3>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{v.title}</p>
                  <p className="mt-2 max-w-xl text-sm text-gray-600">{v.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-black text-lg font-sans">
          ...and many more high-impact venues tailored to your audience and campaign goals.
        </p>

        {/* Drawer trigger */}
        <div className="mt-6 flex justify-center items-center">

          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Browse all venue types
          </button>
        </div>

        {/* Drawer */}
        <Drawer open={drawerOpen} onClose={setDrawerOpen} title="All Venue Types">
          <VenueList items={allVenues} />
        </Drawer>
      </div>
    </div>
  );
}