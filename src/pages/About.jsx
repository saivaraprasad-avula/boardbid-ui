import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingSectionHeading from '../components/LandingSectionHeading.jsx';

export default function About() {
  const benefits = [
    'Direct access to premium inventory without going through agencies or juggling multiple vendors.',
    'Transparent CPM-based pricing so you know exactly what you\'re paying for.',
    'AI-assisted planning and targeting to stretch your budget further.',
    'Real-time bidding and instant proposals so you can go from idea to live campaign in hours, not weeks.',
    'Nationwide and hyperlocal reach to match your growth strategy.',
  ];

  return (
    <>
      <Header staticHeader />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="px-6 py-24 sm:py-32">
          <LandingSectionHeading
            eyebrow="About BoardBid.ai"
            title="AI-Powered OOH Advertising for Businesses That Want to Scale"
          />
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600">
            BoardBid.ai is the AI-powered demand-side platform built to put premium out-of-home advertising directly into
            the hands of SMBs, startups, and growth-stage brands.
          </p>
        </section>

        {/* About copy */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-6 text-gray-700 text-lg leading-8">
            <p>
              We believe buying outdoor media should be as easy as booking a hotel room — no endless vendor calls, no
              hidden markups, no complicated contracts. That’s why we’ve combined Vistar Media’s world-class programmatic
              technology with our own AI-driven planning tools, giving advertisers the ability to search, target, bid, and
              launch campaigns across billboards, transit media, place-based screens, airport displays, mall signage, gas
              station TV, rideshare ads, point-of-purchase networks, sports venues, street furniture, and more — all from
              one streamlined platform.
            </p>
            <p>
              Our AI works in the background to help you plan smarter: suggesting high-performing locations, optimizing
              audience targeting, and recommending budget allocations based on your goals. Whether you’re building brand
              awareness in a single neighborhood or scaling a campaign across multiple cities, BoardBid.ai makes it
              possible to launch with confidence — even if it’s your first time buying OOH.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-50 px-6 py-24">
          <LandingSectionHeading
            eyebrow="How we help growth-minded brands"
            title="Why advertisers choose BoardBid.ai"
          />
          <ul className="mx-auto mt-10 max-w-3xl list-disc space-y-4 pl-5 text-left text-gray-700">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-6 py-24">
          <LandingSectionHeading eyebrow="Our mission" title="To democratize premium OOH media" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-700">
            Helping ambitious businesses turn big ideas into campaigns that get noticed.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
