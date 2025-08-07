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
      src: 'https://ik.imagekit.io/boardbid/vistar-media.avif?updatedAt=1748069728193',
    }
  ];

  return (
    <section className="py-12 px-6 text-center bg-white mb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold font-sans tracking-tight text-gray-900 sm:text-5xl">
              Our Unparalleled Reach
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              to billboards across the globe
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-gray-50 py-6 px-4 rounded-lg shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-md"
              >
                <dd className="text-2xl font-bold text-gray-900">{stat.value}</dd>
                <dt className="mt-1 text-sm text-gray-600">{stat.name}</dt>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Powered by */}
      <div className="mt-10 text-center">
        <p className="text-gray-600 text-sm mb-3">Powered by</p>
        <div className="flex justify-center items-center">
          {partners.map((p, i) => (
            <img key={i} src={p.src} alt={p.name} className="h-10 transform transition duration-300 hover:scale-105" />
          ))}
        </div>
      </div>
    </section>
  );
}