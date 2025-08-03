// src/components/HeroSection.jsx
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const placeholderRef = useRef(null);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    const scrollTarget = document.querySelector('#how-it-works');

    const indicator = document.createElement('div');
    indicator.id = 'scroll-indicator';
    indicator.style.opacity = 0;
    indicator.style.transition = 'opacity 0.6s ease';
    indicator.innerHTML = `
    <lottie-player
      src="./assets/scroll-down.json"
      background="transparent"
      speed="1"
      style="width:100px;height:100px;margin:0 auto;cursor:pointer;display:block;"
      autoplay loop
    ></lottie-player>
  `;
  

    setTimeout(() => {
      if (placeholder) {
        placeholder.appendChild(indicator);
        requestAnimationFrame(() => {
          indicator.style.opacity = 1;
          indicator.addEventListener('click', () => {
            scrollTarget?.scrollIntoView({ behavior: 'smooth' });
          });
        });
      }
    }, 2200);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center bg-white transition-colors duration-1000"
    >
      <div className="animate-fadeIn mt-20 mb-4 transition-opacity duration-1000">
        <img
          src="https://ik.imagekit.io/boardbid/logo-optimized.avif?updatedAt=1748049683476"
          alt="BoardBid Logo"
          width="648"
          height="432"
          className="h-[220px] md:h-[259px] mx-auto drop-shadow-sm object-contain"
          style={{ paddingBottom: 0, marginBottom: '-50px' }}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="animate-fadeIn mb-10 max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 leading-tight">
          Programmatic DOOH advertising <br className="hidden md:inline" /> for
          ambitious brands
        </h1>
        <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-10 max-w-2xl mx-auto">
          From launch to IPO, plan and book impactful billboard campaigns with{' '}
          <span className="text-gray-700 font-semibold">
            AI-powered strategy
          </span>
          ,{' '}
          <span className="text-gray-700 font-semibold">
            real-time pricing
          </span>
          , and{' '}
          <span className="text-gray-700 font-semibold">
            zero agency friction
          </span>
          .
        </p>
        <a
          href="/sign-up"
          className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition duration-300"
        >
          Get Started
        </a>
      </div>

      {/* Scroll Down Animation */}
      <div
        id="scroll-down-placeholder"
        ref={placeholderRef}
        className="mt-12 opacity-100 hover:opacity-80 transition duration-700 block"
        style={{
          height: '80px',
          width: '80px',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      />

    </section>
  );
}
