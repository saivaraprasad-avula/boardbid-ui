import React from 'react';
import HeroHeader from '../components/HeroHeader';
import Footer from '../components/Footer';
import BlogFlyer from '../components/BlogFlyer';
import { posts } from '../data/blogs';
import PricingCTA from '../components/PricingCTA';

export default function Blogs() {
  return (
    <>
      <HeroHeader />
      <BlogFlyer posts={posts} />
      <PricingCTA />
      <Footer />
    </>
  );
}
