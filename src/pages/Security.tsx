
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecurityDashboard from '@/components/security/SecurityDashboard';

const Security = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-1 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p>Vous devez être connecté pour accéder aux paramètres de sécurité.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Sécurité</h1>
            <p className="text-muted-foreground">
              Gérez les paramètres de sécurité de votre compte VueCoin
            </p>
          </div>
          <SecurityDashboard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Security;
