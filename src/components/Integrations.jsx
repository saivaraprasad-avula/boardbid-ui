
export default function Integrations() {
  const stats = [
    { id: 1, name: 'Venues', value: '800K+' },
    { id: 2, name: 'Media Owners', value: '245+' },
    { id: 3, name: 'Video Friendly Screens', value: '80%' },
    { id: 4, name: 'US DMAs', value: '210' },
    { id: 5, name: 'Countries', value: '22' },
  ];

  const partners = [
    {
      name: 'Vistar Media',
      src:'https://ik.imagekit.io/boardbid/vistar-media-logo.svg?updatedAt=1754582368549'
    }
  ];

  return (
    <section className="py-12 px-6 text-center bg-white mb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="flex justify-center">
            <div className="text-center">
                <h2 className="text-base/7 font-semibold text-indigo-600">Access billboards across the Globe thorugh</h2>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Our unparalleled reach
                </h2>
            </div>
        </div>

          {/* Stats Grid */}
     
         <div className="mt-16 mx-auto max-w-7xl px-6 lg:px-8">

         <div className="relative isolate overflow-hidden bg-white px-6 py-16 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
                </dd>
              </div>
               ))}
            </dl>
          </div>
          </div>
      </div> 
      </div>

      {/* Powered by */}
      <div className="mt-10 text-center">
        <p className="text-gray-600 text-sm mb-3">Powered by</p>
        <div className="flex justify-center items-center">
          {partners.map((p, i) => (
            <img key={i} src={p.src} alt={p.name} className="h-8 transform transition duration-300 hover:scale-105" />
          ))}
        </div>
      </div>
    </section>
  );
}