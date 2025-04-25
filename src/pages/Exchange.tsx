
import React from 'react';
import Logo from '@/components/Logo';

const Exchange = () => {
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="text-white" />
          <div className="flex items-center gap-4">
            <div className="bg-primary-dark px-3 py-1 rounded-md font-medium">
              VC: 2.45 $
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Plateforme d'échange VueCoin en développement
        </h1>
        <p className="text-center text-muted-foreground">
          Notre plateforme d'échange sera bientôt disponible.
        </p>
      </div>
    </div>
  );
};

export default Exchange;
