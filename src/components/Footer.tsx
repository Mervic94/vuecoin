
import React from 'react';
import { Link } from 'react-router-dom';
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
              <li><Link to="/#about" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">À Propos</Link></li>
              <li><Link to="/#sectors" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Secteurs</Link></li>
              <li><Link to="/#features" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Caractéristiques</Link></li>
              <li><Link to="/#tokenomics" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Tokenomics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li><Link to="/whitepaper" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Livre Blanc</Link></li>
              <li><Link to="/documentation" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Documentation</Link></li>
              <li><Link to="/blog" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy-policy" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/legal-notice" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Mentions légales</Link></li>
              <li><Link to="/cookies" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Cookies</Link></li>
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
