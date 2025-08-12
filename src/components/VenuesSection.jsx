'use client';

import React, { useState } from 'react';
import Drawer from './Drawer';
import VenueList from './VenueList';
import LandingSectionHeading from './LandingSectionHeading';  

export default function VenuesSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // All Venues
  const allVenues = [
    { name: 'Airports' },
    { name: 'Bars' },
    { name: 'Billboards' },
    { name: 'Casual Dining' },
    { name: 'Convenience Stores' },
    { name: 'Colleges & Universities' },
    { name: 'Dispensaries' },
    { name: 'DMVs' },
    { name: "Doctor’s Offices" },
    { name: 'Gas Stations' },
    { name: 'Gyms' },
    { name: 'Hotels' },
    { name: 'Liquor Stores' },
    { name: 'Malls' },
    { name: 'Movie Theaters' },
    { name: 'Office Buildings' },
    { name: 'Pharmacies' },
    { name: 'QSR' },
    { name: 'Recreational Locations' },
    { name: 'Retail' },
    { name: 'Salons' },
    { name: 'Schools' },
    { name: 'Sports Entertainment' },
    { name: 'Street Furniture' },
    { name: 'Taxis & Rideshares' },
    { name: 'Transit Stations' },
    { name: 'Urban Panels' },
    { name: 'Veterinary Offices' },
  ];

  // Top 4 Venues
  const topVenues = [
    {
      key: 'spectaculars',
      title: 'Spectaculars',
      tag: 'Big Splashy Moments',
      copy:
        'Iconic, large-format displays in the most visible locations—built for fame, launches, and mass awareness.',
      img:
        'https://ik.imagekit.io/boardbid/spec2.webp?updatedAt=1755008461126',
      span: 'lg:col-span-4',
    },
    {
      key: 'place-based',
      title: 'Place-Based Screens',
      tag: 'Essential Activities',
      copy:
        'Gyms, malls, offices, and more—context-rich screens close to purchase and moments that matter.',
      img:
        'https://ik.imagekit.io/boardbid/mall.webp',
      span: 'lg:col-span-2',
    },

    {
      key: 'transit',
      title: 'Transit',
      tag: 'Daily Routines',
      copy:
        'Buses, shelters, subways, and stations—high frequency with commuters throughout the day.',
      img:
        'https://ik.imagekit.io/boardbid/transit1.webp?updatedAt=1755008159597',
      span: 'lg:col-span-2',
    },
    {
      key: 'billboards',
      title: 'Billboards',
      tag: 'Local & National',
      copy:
        'High-reach roadside coverage for consistent presence across cities, corridors, and regions.',
      img:
        'https://ik.imagekit.io/boardbid/billboards.webp?updatedAt=1755008473002',
      span: 'lg:col-span-4',
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <LandingSectionHeading
          eyebrow="Venue Types"
          title="Where you can advertise with us"
        />

        {/* Top 4 Bento Grid */}
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
                <img src={v.img} alt={v.title} className="h-80 w-full object-cover" />
                <div className="p-8 sm:p-10">
                  <h3 className="text-xs uppercase tracking-wide text-gray-500">{v.tag}</h3>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{v.title}</p>
                  <p className="mt-2 max-w-xl text-sm text-gray-600">{v.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

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