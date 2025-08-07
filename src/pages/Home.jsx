// pages/Home.jsx
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Integrations from '../components/Integrations';
import TargetLocations from '../components/TargetLocations';
import WhyChoose from '../components/WhyChoose';
import BlogFlyer from '../components/BlogFlyer';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Integrations />
      <TargetLocations />
      <WhyChoose />
      <BlogFlyer />
      <Footer />
    </>
  );
}
