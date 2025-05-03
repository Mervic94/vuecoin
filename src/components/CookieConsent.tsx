
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté ou refusé les cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // Si aucune préférence n'est stockée, afficher la bannière
    if (cookieConsent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', 'refused');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 md:p-6 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 pr-8">
          <h3 className="text-lg font-semibold mb-2">Utilisation des cookies</h3>
          <p className="text-sm md:text-base opacity-90">
            Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme, personnaliser le contenu et les publicités, 
            analyser notre trafic et partager des informations avec nos partenaires. En acceptant, vous consentez à notre utilisation des cookies.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
          <Button 
            onClick={handleAccept}
            className="bg-accent hover:bg-accent/80 text-primary-foreground"
          >
            Accepter
          </Button>
          <Button 
            onClick={handleRefuse}
            variant="outline"
            className="border-white text-white hover:bg-white/20"
          >
            Refuser
          </Button>
        </div>
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-white/80 hover:text-white"
        >
          <X size={20} />
          <span className="sr-only">Fermer</span>
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
