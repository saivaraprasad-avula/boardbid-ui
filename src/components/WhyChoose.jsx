// src/components/WhyChooseUs.jsx
export default function WhyChoose() {
  return (
    <section className="py-20 px-6 text-center bg-white animate-fadeIn mb-12">
      <div className="mb-6 flex justify-center">
        <lottie-player
          src="./assets/why-choose.json"
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
            desc: 'Built for emerging brands and high-growth startups — launch fast and scale smart.',
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

      {/* Philosophy block */}
      <div className="mt-20 max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-10 shadow-md">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex justify-center lg:w-1/3">
            <lottie-player
              src="./assets/about-us.json"
              background="transparent"
              speed="1"
              style={{ width: 200, height: 200 }}
              autoPlay
              loop
            />
          </div>
          <div className="text-left lg:w-2/3">
            <h3 className="text-2xl font-bold font-sans mb-4 text-gray-800">Our Philosophy</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              <strong>BoardBid.ai</strong> is a modern DSP purpose-built for high-growth startups and emerging brands — from launch to IPO — to plan and book out-of-home media without bloated agency fees or delays.
              <br /><br />
              We make it radically easy to advertise on billboards, transit, and digital displays with transparent pricing, real-time inventory, and startup-first strategy baked in.
              <br /><br />
              You get real-time billboard access and a built-in AI strategist, so you can plan campaigns with the clarity and speed of a top-tier media team — without needing to hire one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
