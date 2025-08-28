import HeroHeader from '../components/HeroHeader';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <>
      <HeroHeader />
      <main className="bg-white">
        {/* spacing below header */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 12-col grid: copy 7, form 5 on desktop */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
              {/* LEFT (copy / details) */}
              <div className="lg:col-span-7">
                <div className="w-full overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src="https://ik.imagekit.io/boardbid/Contact-us.avif?updatedAt=1755015881242"
                    alt="Contact BoardBid.ai"
                    className="w-full h-44 sm:h-56 md:h-64 lg:h-80 object-cover"
                    loading="eager"
                  />
                </div>

                <h1 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
                  Get in touch
                </h1>

                <p className="mt-3 text-base sm:text-lg leading-7 text-gray-600">
                  We’re here to help you with any questions or concerns. Whether you need assistance with our
                  platform, have feedback to share, or just want to say hello, we’d love to hear from you!
                </p>

                <dl className="mt-6 space-y-5 text-base/7 text-gray-700">
                  <div className="flex items-start gap-x-3">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                    </dt>
                    <dd className="text-gray-800">
                      2261 Market Street STE 85992
                      <br />
                      San Francisco, CA 94114
                    </dd>
                  </div>

                  <div className="flex items-start gap-x-3">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <a
                        href="tel:+19805809992"
                        className="text-gray-800 hover:text-gray-900 underline decoration-gray-300 underline-offset-4"
                      >
                        +1 (980) 580-9992
                      </a>
                    </dd>
                  </div>

                  <div className="flex items-start gap-x-3">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <a
                        href="mailto:support@boardbid.ai"
                        className="text-gray-800 hover:text-gray-900 underline decoration-gray-300 underline-offset-4 break-all"
                      >
                        support@boardbid.ai
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* RIGHT (form) */}
              <div className="lg:col-span-5 lg:pl-4">
                <div className="mx-auto max-w-xl lg:max-w-none">
                  <Card title="Send us a message">
                    {/* fixed, sensible heights per breakpoint; scroll inside if needed */}
                    <div className="h-[520px] sm:h-[560px] md:h-[600px] lg:h-[620px] overflow-auto">
                      <iframe
                        title="Contact form"
                        src="https://boardbid.fillout.com/t/fhXH36jHYous?embed=true&transparentBackground=1&disableScroll=1"
                        className="h-full w-full border-0 rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with extra breathing room above */}
      <div className="pt-8 sm:pt-10 lg:pt-12 bg-white">
        <Footer />
      </div>
    </>
  );
}