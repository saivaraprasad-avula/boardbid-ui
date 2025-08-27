'use client';

<<<<<<< HEAD
import { useState } from 'react';
import { Link } from 'react-router-dom';
=======
import { Link, useLocation } from 'react-router-dom';
>>>>>>> origin/ops
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { UserButton } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';
import OpsToggle from '../components/OpsToggle.jsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

<<<<<<< HEAD
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
=======
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function OpsLayout({ children, title = 'Ops Home' }) {
  const location = useLocation();
  const navigation = [
    { name: 'Campaigns', href: withBase('/ops') },
    { name: 'Inbox', href: withBase('/ops/inbox') },
  ];
>>>>>>> origin/ops

  return (
    <div className="min-h-full">
      {/* Top shell */}
      <div className="bg-black pb-4">
        <Disclosure as="nav" className="border-b border-white/10 bg-black lg:border-none">
<<<<<<< HEAD
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
=======
          <div className="px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-white/10">
              <div className="flex items-center px-2 lg:px-0">
                <div className="shrink-0">
                  <img
                    alt="BoardBid Logo"
                    src="https://ik.imagekit.io/boardbid/BoardBid%20logo-White.avif"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'bg-white text-black'
                            : 'text-white hover:bg-white hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium',
>>>>>>> origin/ops
                        )}
                        aria-current={selected ? 'page' : undefined}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
<<<<<<< HEAD

              {/* Right: toggle + user (desktop) */}
=======
              <div className="flex lg:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
>>>>>>> origin/ops
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
<<<<<<< HEAD
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
=======
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white hover:text-black',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
>>>>>>> origin/ops
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
<<<<<<< HEAD

        {/* Dynamic page heading (shorter spacing) */}
        <header className="py-5">
          <div className="px-4 sm:px-6 lg:px-6">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {NAV.find((n) => n.key === active)?.name || 'Ops'}
            </h1>
=======
        <header className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
>>>>>>> origin/ops
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