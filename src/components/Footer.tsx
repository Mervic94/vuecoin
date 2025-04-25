
import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo className="text-white mb-4" />
            <p className="opacity-80">La cryptomonnaie qui tire sa force de l'économie réelle à travers quatre secteurs stratégiques.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">À Propos</a></li>
              <li><a href="#sectors" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Secteurs</a></li>
              <li><a href="#features" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Caractéristiques</a></li>
              <li><a href="#tokenomics" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Tokenomics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li><a href="#whitepaper" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Livre Blanc</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Mentions légales</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-white/10">
          <p className="opacity-60">© 2025 VueCoin Foundation. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
