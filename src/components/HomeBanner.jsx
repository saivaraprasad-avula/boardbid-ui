import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

export default function Banner() {
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open && !document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
      const script = document.createElement('script')
      script.src = 'https://server.fillout.com/embed/v1/'
      script.async = true
      document.body.appendChild(script)
    }
  }, [open])

  if (!show) return null

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 isolate bg-gray-50 px-6 py-2.5 sm:px-3.5 shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6">

          {/* Text */}
          <p className="text-sm text-gray-900">
            <strong className="font-semibold">Schedule a short call with us —</strong>
            we’ll dive into your campaign objectives and tailor the right strategy.
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Book a Call <span aria-hidden="true">&rarr;</span>
          </button>

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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white p-4 shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div
              style={{ width: '100%', height: '500px' }}
              data-fillout-id="kee9zs7Rc3us"
              data-fillout-embed-type="standard"
              data-fillout-inherit-parameters
              data-fillout-dynamic-resize
            ></div>
          </div>
        </div>
      )}
    </>
  )
}
