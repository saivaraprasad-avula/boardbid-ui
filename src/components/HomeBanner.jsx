import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

export default function Banner() {
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)

  // load Fillout script
  useEffect(() => {
    if (open && !document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
      const script = document.createElement('script')
      script.src = 'https://server.fillout.com/embed/v1/'
      script.async = true
      document.body.appendChild(script)
    }
  }, [open])

  // lock background scroll when popup is open + close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!show) return null

  return (
    <>
      {/* Bottom banner */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 isolate bg-gray-50 shadow"
        style={{
          // add safe-area padding on iOS
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.625rem)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            {/* Text */}
            <p className="text-sm text-gray-900 text-center sm:text-left">
              <strong className="font-semibold">Schedule a short call with us — </strong>
              we’ll dive into your campaign objectives and tailor the right strategy.
            </p>

            {/* CTA + Dismiss in a row on mobile */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="min-w-[10rem] rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Book a Call <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                onClick={() => setShow(false)}
                className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Dismiss banner"
              >
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Sheet */}
      <div
        className={
          open
            ? 'fixed inset-0 z-50 bg-black/50'
            : 'hidden'
        }
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full w-full items-end sm:items-center justify-center p-0 sm:p-4">
          {/* On mobile: full-screen sheet; on desktop: centered dialog */}
          <div
            className="
              relative w-full bg-white shadow-xl overflow-y-auto
              h-[90dvh] rounded-none
              sm:h-[700px] sm:max-w-3xl sm:rounded-lg sm:p-4
            "
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                absolute right-3 top-3 z-10 rounded-full p-2
                text-gray-500 hover:text-gray-700 focus:outline-none
              "
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Content container (Fillout) */}
            <div className="w-full h-full sm:h-auto sm:min-h-[500px] p-0 sm:p-1">
              <div
                className="w-full h-full"
                data-fillout-id="kee9zs7Rc3us"
                data-fillout-embed-type="standard"
                data-fillout-inherit-parameters
                data-fillout-dynamic-resize
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}