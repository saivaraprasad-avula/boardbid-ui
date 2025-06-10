// src/components/Integrations.jsx
export default function Integrations() {
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
      <section className="py-20 px-6 text-center bg-white animate-fadeIn mb-24">
        <h2 className="text-3xl font-bold mb-6 animate-slideUp">
          Planned SSP Integrations
        </h2>
        <p className="text-gray-600 mb-10">
          We're preparing direct integrations with leading Supply-Side Platforms (SSPs):
        </p>
        <div className="flex justify-center items-center gap-10 flex-wrap">
          {partners.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={p.name}
              className="h-12 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition hover:scale-105"
            />
          ))}
        </div>
      </section>
    );
  }
  