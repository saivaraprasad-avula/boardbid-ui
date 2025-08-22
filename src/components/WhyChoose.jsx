// src/components/WhyChooseUs.jsx
export default function WhyChoose() {
  return (
    <section className="py-20 px-6 text-center bg-white animate-fadeIn">
      <div className="mb-6 flex justify-center">
        <lottie-player
          src={`${import.meta.env.BASE_URL}assets/why-choose.json`}
          background="transparent"
          speed="1"
          style={{ width: 200, height: 200 }}
          autoPlay
          loop
        />
      </div>

      <h2 className="text-3xl font-bold font-sans mb-6 animate-slideUp">Why Choose BoardBid.ai?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: 'Built for Advertisers',
            desc: 'Everything is tailored for campaign creators — not publishers.',
          },
          {
            title: 'Transparent Booking',
            desc: 'Know where your ads run and how your money is spent.',
          },
          {
            title: 'Fast Creative Approvals',
            desc: 'Upload today, go live tomorrow — thanks to automated workflows.',
          },
          {
            title: 'Startup-First Platform',
            desc: 'Built for SMB’s, start-ups and growth companies — launch fast and scale smart.',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transform transition-transform hover:-translate-y-2"
          >
            <h3 className="text-xl font-semibold font-sans mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
