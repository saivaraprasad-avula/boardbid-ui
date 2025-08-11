import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogFlyer from '../components/BlogFlyer';
import { posts } from '../data/blogs';

export default function Blogs() {
  return (
    <>
      <Header staticHeader />
      <BlogFlyer posts={posts} />
      <Footer />
    </>
  );
}
