import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <>
      <Header staticHeader />
      <main className="bg-white">
        {/* Outer spacing so it's not too close to the header */}
        <section className="pt-10 sm:pt-14 lg:pt-16 pb-12">
          {/* Center the grid vertically within the viewport minus header padding */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-6rem)] flex items-center">
            <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* LEFT */}
              <div className="flex flex-col">
                <div className="w-full overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src="https://ik.imagekit.io/boardbid/Contact-us.avif?updatedAt=1755015881242"
                    alt="Contact BoardBid.ai"
                    className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover"
                    loading="eager"
                  />
                </div>

                <h2 className="mt-8 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  Get in touch
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-8 text-gray-600">
                  We’re here to help you with any questions or concerns you may have. Whether you need assistance with our
                  platform, have feedback to share, or just want to say hello, we’d love to hear from you!
                </p>

                <dl className="mt-8 space-y-4 text-base/7 text-gray-700">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      131 Continental Dr, Suite 305
                      <br />
                      Newark, Delaware 19713
                    </dd>
                  </div>

                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <a href="tel:+19805809992" className="hover:text-gray-900">
                        +1 (980) 580-9992
                      </a>
                    </dd>
                  </div>

                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <a href="mailto:support@boardbid.ai" className="hover:text-gray-900">
                        support@boardbid.ai
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* RIGHT (slight nudge on large screens) */}
              <div className="lg:pl-10">
                <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                  <Card title="Send us a message">
                    <div className="h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px]">
                      <iframe
                        title="Contact form"
                        src="https://boardbid.fillout.com/t/fhXH36jHYous"
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

      {/* Footer stays below; user scrolls to see it */}
      <Footer />
    </>
  );
}