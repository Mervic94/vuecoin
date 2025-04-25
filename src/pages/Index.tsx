
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Sectors from '@/components/Sectors';
import Features from '@/components/Features';
import Tokenomics from '@/components/Tokenomics';
import Roadmap from '@/components/Roadmap';
import Whitepaper from '@/components/Whitepaper';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <About />
      <Sectors />
      <Features />
      <Tokenomics />
      <Roadmap />
      <Whitepaper />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
