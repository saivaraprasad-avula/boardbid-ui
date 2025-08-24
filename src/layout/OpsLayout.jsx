'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { UserButton } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';
import OpsToggle from '../components/OpsToggle.jsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV = [
  { key: 'campaigns', name: 'Campaigns' },
  { key: 'inbox', name: 'Inbox' },
];

function cls(...xs) {
  return xs.filter(Boolean).join(' ');
}

export default function OpsLayout({ children }) {
  // Track selected tab locally. If you wire real routes later,
  // you can derive this from location instead.
  const [active, setActive] = useState('campaigns');

  return (
    <div className="min-h-full">
      {/* Top shell */}
      <div className="bg-black pb-4">
        <Disclosure as="nav" className="border-b border-white/10 bg-black lg:border-none">
          <div className="px-2 sm:px-4 lg:px-6">
            {/* shorter, slicker bar */}
            <div className="relative flex h-14 items-center justify-between lg:border-b lg:border-white/10">
              {/* Left: logo */}
              <div className="flex items-center">
                <img
                  alt="BoardBid Logo"
                  src="https://ik.imagekit.io/boardbid/BoardBid%20logo-White.avif"
                  className="h-7 w-auto"
                />
              </div>

              {/* Center: nav (desktop) */}
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
                <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
                  {NAV.map((item) => {
                    const selected = active === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActive(item.key)}
                        className={cls(
                          'px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors',
                          selected
                            ? 'bg-white text-black shadow'
                            : 'text-white hover:bg-white/10'
                        )}
                        aria-current={selected ? 'page' : undefined}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: toggle + user (desktop) */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:space-x-4">
                {/* Toggle visible & enabled */}
                <OpsToggle defaultChecked />
                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/20" />
                <UserButton
                  afterSignOutUrl={withBase('/')}
                  userProfileMode="navigation"
                  userProfileUrl={withBase('/account')}
                />
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <DisclosureButton className="group inline-flex items-center justify-center rounded-md bg-black p-2 text-gray-300 hover:bg-white/10 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile panel */}
          <DisclosurePanel className="lg:hidden">
            <div className="px-3 pt-2 pb-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
                {NAV.map((item) => {
                  const selected = active === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActive(item.key)}
                      className={cls(
                        'flex-1 rounded-lg px-3 py-2 text-sm font-medium text-center transition-colors',
                        selected
                          ? 'bg-white text-black shadow'
                          : 'text-white hover:bg-white/10'
                      )}
                      aria-current={selected ? 'page' : undefined}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-white/10 py-3">
              <div className="flex items-center justify-between px-4">
                <OpsToggle defaultChecked />
                <UserButton
                  afterSignOutUrl={withBase('/')}
                  userProfileMode="navigation"
                  userProfileUrl={withBase('/account')}
                />
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* Dynamic page heading (shorter spacing) */}
        <header className="py-5">
          <div className="px-4 sm:px-6 lg:px-6">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {NAV.find((n) => n.key === active)?.name || 'Ops'}
            </h1>
          </div>
        </header>
      </div>

      {/* Page content */}
      <main className="py-4">
        <div className="px-4 sm:px-6 lg:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}