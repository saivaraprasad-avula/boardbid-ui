import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Banner() {
  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 isolate bg-gray-50 px-6 py-2.5 sm:px-3.5 shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6">
        
        {/* Text */}
        <p className="text-sm text-gray-900">
          <strong className="font-semibold">Schedule a short call with us —</strong>
          we’ll dive into your campaign objectives and tailor the right strategy.
        </p>

        {/* Button */}
        <a
          href="#"
          className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Book a Call <span aria-hidden="true">&rarr;</span>
        </a>

        {/* X button, spaced after button */}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="ml-6 inline-flex items-center justify-center rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}