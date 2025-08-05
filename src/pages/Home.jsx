// pages/Home.jsx
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Integrations from '../components/Integrations';
import DashboardPreview from '../components/DashboardPreview';
import WhyChoose from '../components/WhyChoose';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Integrations />
      <DashboardPreview />
      <WhyChoose />
      <Footer />
    </>
  );
}
