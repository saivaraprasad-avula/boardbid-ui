'use client';

import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { UserButton } from '@clerk/clerk-react';
import { withBase } from '../utils/basePath.js';
import OpsToggle from '../components/OpsToggle.jsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Campaigns', href: '#', current: true },
  { name: 'Inbox', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function OpsLayout({ children }) {
  return (
    <div className="min-h-full">
      <div className="bg-black pb-6">
        <Disclosure as="nav" className="border-b border-white/10 bg-black lg:border-none">
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
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-white text-black'
                            : 'text-white hover:bg-white hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:space-x-4">
                <OpsToggle defaultChecked />
                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/20" />
                <UserButton
                  afterSignOutUrl={withBase('/')}
                  userProfileMode="navigation"
                  userProfileUrl={withBase('/account')}
                />
              </div>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white hover:text-black',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-white/10 py-4">
              <div className="flex items-center justify-between px-5">
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
        <header className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Ops Home</h1>
          </div>
        </header>
      </div>

      <main className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
