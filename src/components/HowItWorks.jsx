// src/components/HowItWorks.jsx
export default function HowItWorks() {
  const steps = [
    {
      title: 'Browse Inventory',
      description: 'Explore premium billboard Ad spaces across USA via leading SSPs.',
      iconColor: 'text-emerald-500',
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      ),
    },
    {
      title: 'Upload Creatives',
      description: 'Upload your ad creatives in supported formats, hassle-free.',
      iconColor: 'text-blue-500',
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      ),
    },
    {
      title: 'Allocate Budget',
      description: 'Choose campaign spend, regions, and timeframe.',
      iconColor: 'text-yellow-500',
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      ),
    },
    {
      title: 'Launch Campaign',
      description: 'Book instantly, or schedule delivery with confidence.',
      iconColor: 'text-purple-500',
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 3l14 9-14 9V3z"
        />
      ),
    },
    {
      title: 'Track Performance',
      description: 'Monitor impressions, screen delivery, and engagement — in real-time.',
      iconColor: 'text-indigo-500',
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3v18h18M9 17V9m4 8V5m4 12v-4"
        />
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-32 py-20 px-6 text-center bg-gray-50 animate-fadeIn mb-24"
    >
      <h2 className="text-3xl font-bold mb-12 animate-slideUp">How It Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="transform transition-transform hover:scale-105 hover:-translate-y-1.5 hover:shadow-lg rounded-xl bg-white p-6 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-full h-full ${step.iconColor}`}
              >
                {step.svg}
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 border-t border-gray-200 mt-4 pt-3">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
