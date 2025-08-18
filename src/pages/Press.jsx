import React from 'react';
import HeroHeader from '../components/HeroHeader';
import Footer from '../components/Footer';

export default function Press() {
  return (
    <>
      <HeroHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-4">Press</h1>
        <p className="text-gray-600">Read the latest news about BoardBid.ai.</p>
      </main>
      <Footer />
    </>
  );
}
