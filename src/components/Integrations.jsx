// src/components/Integrations.jsx
export default function Integrations() {
  const stats = [
    { id: 1, name: 'Creators on the platform', value: '8,000+' },
    { id: 2, name: 'Flat platform fee', value: '3%' },
    { id: 3, name: 'Uptime guarantee', value: '99.9%' },
    { id: 4, name: 'Paid out to creators', value: '$70M' },
  ];

  const partners = [
    {
      name: 'Hivestack',
      src: 'https://ik.imagekit.io/boardbid/hivestack.avif?updatedAt=1748069727754',
    },
    {
      name: 'Vistar Media',
      src: 'https://ik.imagekit.io/boardbid/vistar-media.avif?updatedAt=1748069728193',
    },
    {
      name: 'Place Exchange',
      src: 'https://ik.imagekit.io/boardbid/place-exchange.avif?updatedAt=1748069728074',
    },
  ];

  return (
    <section className="py-20 px-6 text-center bg-white mb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Trusted by creators worldwide
            </h2>
            <p className="mt-4 text-lg/8 text-gray-600">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm/6 font-semibold text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="mt-16 text-gray-600">Powered by</p>
      <div className="mt-6 flex justify-center items-center gap-10 flex-wrap">
        {partners.map((p, i) => (
          <img key={i} src={p.src} alt={p.name} className="h-8" />
        ))}
      </div>
    </section>
  );
}
  