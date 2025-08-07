export default function TargetLocations() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center">
            <div className="text-center">
                <h2 className="text-base/7 font-semibold text-indigo-600">Follow Your Audience throughout the Day</h2>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Deliver Your Message Across Environments
                </h2>
            </div>
        </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <img
                  alt=""
                  src=""
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">6am</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Gym</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                   Fitness Activities are a great way to start the day, and our billboards are there to catch audiences' attention.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                <img
                  alt=""
                  src="https://ik.imagekit.io/boardbid/trainstation.webp?updatedAt=1754571176795"
                  className="h-80 object-cover object-left lg:object-right"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">7:30am</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Train Station</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Catch commuters on their way to work with strategic placements at train stations.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                <img
                  alt=""
                  src=""
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">9am</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Office</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Engage professionals at work with targeted ads.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <img
                  alt=""
                  src=""
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">5:30pm</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Bar</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Unwind after work with engaging ads at local bars and restaurants.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <img
                  alt=""
                  src=""
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">8pm</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Taxis and Rideshares</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Reach audiences on the move with ads in taxis and rideshares, ensuring your message travels with them.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  