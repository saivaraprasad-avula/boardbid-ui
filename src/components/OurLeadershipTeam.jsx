'use client'

import React from 'react'

// Helper: safely append ImageKit transforms
const ik = (url, tr) => (url.includes('?') ? `${url}&tr=${tr}` : `${url}?tr=${tr}`);

const people = [
  {
    name: 'Sai Vara Prasad Avula',
    role: 'Chief Technology Officer',
    imageUrl: 'https://ik.imagekit.io/boardbid/Sai%20headshot.avif',
    fit: 'cover',
    objectPosition: '50% 40%', // add headroom
  },
  {
    name: 'Kavya Mohana Adusumilli',
    role: 'Chief Operating Officer',
    imageUrl: 'https://ik.imagekit.io/boardbid/Kavya%20Linlkdin.avif',
    fit: 'cover',
    objectPosition: '50% 15%', // slight downward shift for extra headroom
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading + one-line subheading */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-lg text-gray-600 whitespace-nowrap">
            We unite expertise, passion, and a results-first mindset to help clients achieve more.
          </p>
        </div>

        {/* Cards */}
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {people.map((p) => (
            <li
              key={p.name}
              className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Image: slightly taller box (4/3), no inner ring */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                <img
                  alt={p.name}
                  /* ask ImageKit for correct widths (adjust if your card is wider) */
                  src={ik(p.imageUrl, 'w-384,q-85,f-avif,fo-auto')}
                  srcSet={[
                    `${ik(p.imageUrl, 'w-384,q-85,f-avif,fo-auto')} 1x`,
                    `${ik(p.imageUrl, 'w-768,q-85,f-avif,dpr-2,fo-auto')} 2x`,
                    `${ik(p.imageUrl, 'w-1152,q-80,f-avif,dpr-3,fo-auto')} 3x`,
                  ].join(', ')}
                  sizes="(min-width:1024px) 384px, (min-width:640px) 45vw, 92vw"
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full ${p.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  style={{ objectPosition: p.objectPosition || '50% 50%' }}
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">
                {p.name}
              </h3>
              <p className="text-sm text-gray-500">{p.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}