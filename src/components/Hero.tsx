
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-[url('/placeholder.svg')] bg-cover bg-center bg-no-repeat relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-primary/80" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            VueCoin - La Cryptomonnaie Multi-Sectorielle
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Une innovation blockchain qui tire sa force de la publicité, l'immobilier-BTP, 
            le transport et l'e-commerce pour une stabilité renforcée.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="#whitepaper" className="primary-btn">
              Télécharger le Livre Blanc
            </a>
            <a href="#about" className="outline-btn">
              En Savoir Plus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
