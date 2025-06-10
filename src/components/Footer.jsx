// src/components/Footer.jsx
export default function Footer() {
    return (
      <footer className="bg-[#e5e7eb] text-gray-800 animate-fadeIn">
        <div className="border-t-4 border-gray-400 my-6 w-full"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between pb-6">
          <div className="mb-4 md:mb-0">
            <img
              src="https://ik.imagekit.io/boardbid/logo-optimized.avif?updatedAt=1748049683476"
              alt="BoardBid Logo"
              className="h-[80px]"
            />
          </div>
          <div className="flex gap-6">
            <a href="https://linkedin.com/company/boardbid-ai" target="_blank" aria-label="LinkedIn" rel="noreferrer">
              <svg
                className="w-6 h-6 text-gray-600 hover:text-blue-800 transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.266c-.966 0-1.75-.786-1.75-1.754s.784-1.754 1.75-1.754c.965 0 1.75.786 1.75 1.754s-.785 1.754-1.75 1.754zm13.5 11.266h-3v-5.604c0-1.336-.026-3.054-1.861-3.054-1.862 0-2.147 1.454-2.147 2.958v5.7h-3v-10h2.882v1.364h.041c.402-.762 1.381-1.563 2.843-1.563 3.04 0 3.604 2.001 3.604 4.601v5.598z" />
              </svg>
            </a>
            <a href="mailto:founders@boardbid.ai" aria-label="Email">
              <svg
                className="w-6 h-6 text-gray-600 hover:text-emerald-600 transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 13.065L1.89 6.636C2.327 6.257 2.886 6 3.5 6h17c.614 0 1.173.257 1.61.636L12 13.065zM12 15L2 8.25V18a1 1 0 001 1h18a1 1 0 001-1V8.25L12 15z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  }
  