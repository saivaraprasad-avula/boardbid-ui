'use client'

// src/components/Philosophy.jsx
// Extracted "Our Philosophy" block to be shared across pages

export default function Philosophy() {
  return (
    <section className="mt-32 max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-10 shadow-md">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex justify-center lg:w-1/3">
          <lottie-player
            src={`${import.meta.env.BASE_URL}assets/about-us.json`}
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
            <strong>BoardBid.ai</strong> is an AI DSP, purpose-built for SMB’s, start-ups and growth companies — from launch to IPO — to plan and book DOOH media without bloated agency fees or delays.
            <br />
            <br />
            We make it radically easy to advertise on every format of DOOH displays through nearly every vendor globally, with transparent pricing and real-time inventory.
            <br />
            <br />
            You get real-time DOOH inventory access through a built-in AI strategist, so you can plan campaigns with the clarity and speed of a top-tier media team — without needing to hire one.
          </p>
        </div>
      </div>
    </section>
  )
}

