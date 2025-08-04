'use client';
// src/components/HeroSection.jsx

import { useEffect, useRef } from 'react';
import { SignUpButton } from '@clerk/clerk-react';

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
    <section id="hero" className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      >
        <defs>
          <pattern id="hero-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" />
        </svg>
        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
      </svg>
      <div className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48">
        <div
          className="aspect-[801/1036] w-[50.03125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex lg:items-center lg:gap-x-14">
          <div className="w-full lg:max-w-xl lg:flex-shrink-0 xl:max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Programmatic DOOH advertising for ambitious brands
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              From launch to IPO, plan and book impactful billboard campaigns with{' '}
              <span className="font-semibold text-gray-700">AI-powered strategy</span>,{' '}
              <span className="font-semibold text-gray-700">real-time pricing</span>, and{' '}
              <span className="font-semibold text-gray-700">zero agency friction</span>.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <SignUpButton mode="modal">
                <button className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                  Get started
                </button>
              </SignUpButton>
              <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
                Live demo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-14 flex justify-end gap-8 sm:mt-20 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
            <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                  alt=""
                  className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            </div>
            <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                  alt=""
                  className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                  alt=""
                  className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            </div>
            <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                  alt=""
                  className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                  alt=""
                  className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="scroll-down-placeholder"
        ref={placeholderRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-100 hover:opacity-80 transition duration-700"
        style={{ height: '80px', width: '80px', margin: '0 auto', overflow: 'hidden' }}
      />
    </section>
  );
}
