
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollAnimation from '@/components/home/ScrollAnimation';
import ImpactMetrics from '@/components/home/sections/ImpactMetrics';
import HiringProcess from '@/components/home/sections/HiringProcess';
import Testimonials from '@/components/home/sections/Testimonials';
import Integrations from '@/components/home/sections/Integrations';
import KeyBenefits from '@/components/home/sections/KeyBenefits';
import CallToAction from '@/components/home/sections/CallToAction';
import TrustedCompanies from '@/components/home/sections/TrustedCompanies';
import AiTechnology from '@/components/home/sections/AiTechnology';
import RoiCalculator from '@/components/home/sections/RoiCalculator';
import Resources from '@/components/home/sections/Resources';
import Faq from '@/components/home/sections/Faq';

const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ImpactMetrics />
        <HiringProcess />
        <Testimonials />
        <Integrations />
        <KeyBenefits />
        <CallToAction />
        <TrustedCompanies />
        <AiTechnology />
        <RoiCalculator />
        <Resources />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
