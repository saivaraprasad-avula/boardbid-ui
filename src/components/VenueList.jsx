'use client';

import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { VENUE_PLACEHOLDER_IMG } from '../data/venueTypes.js';

export default function VenueList({ items }) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs outline-1 outline-gray-900/5 sm:rounded-xl"
    >
      {items.map((v) => {
        const imgSrc = v.image && v.image.trim() !== '' ? v.image : VENUE_PLACEHOLDER_IMG;
        return (
          <li key={v.name}>
            <Link
              to={`/venue-types/${v.slug}`}
              className="flex items-center justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
            >
              <div className="flex items-center gap-x-4">
                <img
                  src={imgSrc}
                  alt={v.name}
                  className="h-10 w-10 flex-none rounded object-cover"
                />
                <p className="text-sm font-semibold text-gray-900">{v.name}</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}