// pages/Home.jsx
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Integrations from '../components/Integrations';
import TargetLocations from '../components/TargetLocations';
import WhyChoose from '../components/WhyChoose';
import BlogFlyer from '../components/BlogFlyer';
import Footer from '../components/Footer';
import FooterCTA from '../components/FooterCTA';
import MediaFormatsBento from "../components/VenuesSection";
import { posts } from '../data/blogs';
import Intercom from '../components/intercom-landing';
import HomeBanner from '../components/HomeBanner';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HeroSection />
      <HowItWorks />
      <Integrations />
      <MediaFormatsBento/>
      <TargetLocations />
      <WhyChoose />
      <BlogFlyer posts={posts} />
      <FooterCTA />
      <Footer />
      <Intercom />
    </>
  );
}
