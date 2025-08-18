import React from 'react';
import HeroHeader from '../components/HeroHeader';
import Footer from '../components/Footer';
import BlogFlyer from '../components/BlogFlyer';
import { posts } from '../data/blogs';

export default function Blogs() {
  return (
    <>
      <HeroHeader />
      <BlogFlyer posts={posts} />
      <Footer />
    </>
  );
}
