
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Sectors from '@/components/Sectors';
import Tokenomics from '@/components/Tokenomics';
import Team from '@/components/Team';
import Roadmap from '@/components/Roadmap';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si l'utilisateur est connecté, afficher le dashboard
  if (user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    );
  }

  // Sinon, afficher la page d'accueil traditionnelle
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <About />
        <Sectors />
        <Tokenomics />
        <Team />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
