'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';

export default function VenueList({ items }) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs outline-1 outline-gray-900/5 sm:rounded-xl"
    >
      {items.map((v) => (
        <li key={v.name} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">{v.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}