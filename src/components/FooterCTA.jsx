import { SignUpButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { withBase } from '../utils/basePath.js'

export default function FooterCTA() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <hgroup>
            <h2 className="text-base/6 font-semibold font-sans text-indigo-400">Out-of-home, without the overwhelm</h2>
            <p className="mt-2 text-4xl font-semibold font-sans tracking-tight text-white sm:text-5xl">
              Turn Heads. Drive Growth.
            </p>
          </hgroup>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
            We plan and manage your billboard campaigns end-to-end from strategy to booking, built around your goals.
          </p>
          <div className="mt-8 flex justify-center">
            <SignedOut>
              <SignUpButton mode="modal" afterSignUpUrl={withBase('/dashboard')}>
                <button
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Get started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <button
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Dashboard
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  )
}
