'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { withBase } from '../utils/basePath.js'

const navigation = [
  { name: 'Product', to: '/#how-it-works' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Contact', to: '/contact' },
]

export default function HeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BoardBid.ai</span>
            <img
              alt="BoardBid logo"
              src="https://ik.imagekit.io/boardbid/BoardBid%20final.avif?updatedAt=1755054268128"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item.to.startsWith('#') ? (
              <a
                key={item.name}
                href={item.to}
                className="text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.to}
                className="text-sm font-semibold text-gray-900 hover:text-gray-700"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl={withBase('/dashboard')}>
              <button className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Dashboard <span aria-hidden="true">&rarr;</span>
            </Link>
          </SignedIn>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img
                alt="BoardBid logo Mobile"
                src="https://ik.imagekit.io/boardbid/BoardBid%20final.avif?updatedAt=1755054268128"
                className="h-16 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) =>
                  item.to.startsWith('#') ? (
                    <a
                      key={item.name}
                      href={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
              <div className="py-6">
                <SignedOut>
                  <SignInButton mode="modal" afterSignInUrl={withBase('/dashboard')}>
                    <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      Log in
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    to="/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

