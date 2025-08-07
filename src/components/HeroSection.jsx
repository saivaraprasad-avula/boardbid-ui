'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">BoardBid.ai</span>
              <img
                alt="BoardBid logo"
                src="https://ik.imagekit.io/boardbid/BB12.svg?updatedAt=1754544642236"
                className="h-32 w-auto"
              />
            </a>
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
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 hover:text-gray-700">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/dashboard">
                <button className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
                  Log in <span aria-hidden="true">&rarr;</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <a href="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
                Dashboard <span aria-hidden="true">&rarr;</span>
              </a>
            </SignedIn>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <img
                  alt=""
                  src="https://ik.imagekit.io/boardbid/BB12.svg?updatedAt=1754544642236"
                  className="h-16 w-auto"
                />
              </a>
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
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <SignedOut>
                    <SignInButton mode="modal" afterSignInUrl="/dashboard">
                      <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                        Log in
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <a
                      href="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </a>
                  </SignedIn>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-36 pb-52 sm:pt-48 sm:pb-64 bg-White">
        <div className="mx-auto max-w-4xl">
          <div className="text-center rounded-3xl bg-[#bfcde0] shadow-md px-32 py-24">
            <h1 className="text-[36px] lg:text-[50px] tracking-[-0.72px] lg:tracking-[-2px] font-sans leading-[1.15] lg:leading-none text-black font-normal text-center mb-6 lg:mb-11">
              We make billboard<br />advertising easy
            </h1>
            <p className="text-neutral-950 text-base font-normal">
              From launch to IPO, plan and book impactful billboard campaigns with{' '}
              <span className="font-semibold text-gray-900">AI-powered strategy</span> and{' '}
              <span className="font-semibold text-gray-900">zero agency friction</span>.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                  <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800">
                    Get started
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <a
                  href="/dashboard"
                  className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Dashboard
                </a>
              </SignedIn>
              <a href="#" className="text-sm font-semibold text-gray-900 hover:underline">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}