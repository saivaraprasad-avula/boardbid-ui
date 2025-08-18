import { Link } from 'react-router-dom'

export default function PricingCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* match widths: max-w-4xl then lg:max-w-6xl like the section above */}
        <div className="mx-auto mt-16 mb-16 w-full max-w-4xl lg:max-w-6xl">
          <div
            className="
              rounded-2xl bg-indigo-100 shadow-sm
              px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-16 lg:py-16
              flex flex-col items-center justify-center gap-6
              md:flex-row md:items-center md:justify-between
              min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[250px]
            "
          >
            {/* Headline — ~20% smaller than previous large version */}
            <h2
              className="
                text-center md:text-left
                text-xl sm:text-2xl md:text-2xl lg:text-3xl
                font-semibold tracking-tight text-gray-900 leading-snug
              "
            >
              Outdoor ads, minus the overload.
              <br className="hidden sm:block" />
              <span className="sm:whitespace-nowrap">Catch eyes while we handle the rest.</span>
            </h2>

            {/* CTAs */}
            <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-end">
              <Link
                to="/sign-up"
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link to="/about" className="text-sm font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}