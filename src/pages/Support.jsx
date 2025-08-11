import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Support() {
  return (
    <>
      <Header staticHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-4">Support</h1>
        <p className="text-gray-600">Submit a ticket and we'll get back to you shortly.</p>
      </main>
      <Footer />
    </>
  );
}
