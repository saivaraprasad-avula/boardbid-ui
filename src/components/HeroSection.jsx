import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { SignUpButton } from '@clerk/clerk-react';

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <img
                  alt="BoardBid logo"
                  src="https://ik.imagekit.io/boardbid/logo-optimized.avif?updatedAt=1748049683476"
                  className="h-11"
                />
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <a href="#blog" className="inline-flex space-x-6">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-600/20 ring-inset">
                      What's new
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <span>Just shipped v1.0</span>
                      <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400" />
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                  Programmatic DOOH advertising for ambitious brands
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  From launch to IPO, plan and book impactful billboard campaigns with{' '}
                  <span className="font-semibold text-gray-700">AI-powered strategy</span>,{' '}
                  <span className="font-semibold text-gray-700">real-time pricing</span>, and{' '}
                  <span className="font-semibold text-gray-700">zero agency friction</span>.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <SignUpButton mode="modal">
                    <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Request access
                    </button>
                  </SignUpButton>
                  <a href="https://github.com" className="text-sm font-semibold text-gray-900">
                    View on GitHub <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 md:-mr-20 lg:-mr-36"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 inset-ring inset-ring-white md:ml-20 lg:ml-36"
                />
                <img
                  src="https://ik.imagekit.io/boardbid/Billboard%20Illustration%20Curve.avif?updatedAt=1754315644156"
                  alt="Billboard illustration"
                  className="relative w-full"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset md:rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}

