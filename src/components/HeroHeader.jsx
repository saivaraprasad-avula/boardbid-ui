'use client'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react'
import { withBase } from '../utils/basePath.js'

const navigation = [
  { name: 'About', to: '/about' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Venue Types', to: '/venue-types' },
  { name: 'Contact', to: '/contact' },
]

const LOGO_DEFAULT =
  'https://ik.imagekit.io/boardbid/BoardBid%20final.avif?updatedAt=1755054268128'
const LOGO_WHITE =
  'https://ik.imagekit.io/boardbid/BoardBid%20logo-White.avif'

export default function HeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 z-50 flex justify-center ${compact ? 'top-3' : 'top-0'}`}>
      <nav
        aria-label="Global"
        className={[
          'flex items-center justify-between transition-all duration-300 will-change-transform',
          compact
            ? [
                'w-[80%] max-w-none',
                'rounded-2xl bg-black/90 text-white supports-[backdrop-filter]:backdrop-blur-md',
                'ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]',
                'px-4 py-3 sm:px-6 lg:px-8',
              ].join(' ')
            : [
                'w-full bg-transparent text-gray-900',
                'px-4 py-4 sm:px-6 lg:px-8',
              ].join(' '),
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BoardBid.ai</span>
            <img
              alt="BoardBid logo"
              src={compact ? LOGO_WHITE : LOGO_DEFAULT}
              className={`w-auto transition-all duration-300 ${compact ? 'h-8' : 'h-9'}`}
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${
              compact ? 'text-white' : 'text-gray-700'
            }`}
            aria-label="Open menu"
          >
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item.to.startsWith('#') ? (
              <a
                key={item.name}
                href={item.to}
                className={`text-sm font-semibold transition-colors ${
                  compact ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'
                }`}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.to}
                className={`text-sm font-semibold transition-colors ${
                  compact ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <SignedOut>
            {/* Display Log in and Get started buttons when signed out */}
            <SignInButton mode="modal" afterSignInUrl={withBase('/dashboard')}>
              <button
                className={`text-sm font-semibold transition-colors ${
                  compact ? 'text-white hover:text-indigo-300' : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                Log in
              </button>
            </SignInButton>
            <SignUpButton mode="modal" afterSignUpUrl={withBase('/dashboard')}>
              <button
                // Updated className for a black and white button with a hover effect and a perimeter
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all shadow-md ${
                  compact
                    ? 'bg-white text-gray-900 hover:bg-gray-200 hover:ring-2 hover:ring-white' // Adjusted for compact header
                    : 'bg-black text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black'
                }`}
              >
                Get started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            {/* Display only the Dashboard button when signed in */}
            <Link
              to="/dashboard"
              className={`text-sm font-semibold transition-colors ${
                compact ? 'text-white hover:text-indigo-300' : 'text-gray-900 hover:text-indigo-600'
              }`}
            >
              Dashboard <span aria-hidden="true">&rarr;</span>
            </Link>
          </SignedIn>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel
          className={[
            'fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm',
            compact
              ? 'bg-black text-white sm:ring-1 sm:ring-white/10'
              : 'bg-white text-gray-900 sm:ring-1 sm:ring-gray-900/10',
          ].join(' ')}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <img
                alt="BoardBid logo Mobile"
                src={compact ? LOGO_WHITE : LOGO_DEFAULT}
                className="h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className={`-m-2.5 rounded-md p-2.5 ${compact ? 'text-white' : 'text-gray-700'}`}
              aria-label="Close menu"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Links */}
              <div className="space-y-2 py-6">
                {navigation.map((item) =>
                  item.to.startsWith('#') ? (
                    <a
                      key={item.name}
                      href={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold ${
                        compact
                          ? 'text-white hover:bg-white/10'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold ${
                        compact
                          ? 'text-white hover:bg-white/10'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>

              {/* Auth */}
              <div className="py-6 flex flex-col gap-y-4">
                <SignedOut>
                  {/* Display Log in and Get started in mobile drawer when signed out */}
                  <SignInButton mode="modal" afterSignInUrl={withBase('/dashboard')}>
                    <button
                      className={`-mx-3 block w-full rounded-lg px-3 py-2.5 text-left text-base font-semibold ${
                        compact
                          ? 'text-white hover:bg-white/10'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Log in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal" afterSignUpUrl={withBase('/dashboard')}>
                    <button
                      className={`-mx-3 block w-full rounded-lg px-3 py-2.5 text-left text-base font-semibold ${
                        compact
                          ? 'bg-white text-gray-900 hover:bg-gray-200'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      Get started
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  {/* Display only the Dashboard button in mobile drawer when signed in */}
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold ${
                      compact
                        ? 'text-white hover:bg-white/10'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
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