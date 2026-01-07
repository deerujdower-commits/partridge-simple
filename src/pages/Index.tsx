import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CompactAboutSection from '@/components/CompactAboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import SoftCTA from '@/components/SoftCTA';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="about">
        <CompactAboutSection />
      </div>
      <StatsSection />
      <SoftCTA />
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
