// pages/Home.jsx
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Integrations from '../components/Integrations';
import TargetLocations from '../components/TargetLocations';
import WhyChoose from '../components/WhyChoose';
import BlogFlyer from '../components/BlogFlyer';
import Footer from '../components/Footer';
import MediaFormatsBento from "../components/VenuesSection";
import { posts } from '../data/blogs';
import Intercom from '../components/intercom-landing';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Integrations />
      <MediaFormatsBento/>
      <TargetLocations />
      <WhyChoose />
      <BlogFlyer posts={posts} />
      <Footer />
      <Intercom />
    </>
  );
}
