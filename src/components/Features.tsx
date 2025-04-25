
import React from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="bg-white rounded-lg p-6 text-center shadow-md card-hover">
      <div className="text-4xl mb-4 text-secondary">{icon}</div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Caractéristiques Uniques</h2>
          <p className="text-muted-foreground text-lg">
            VueCoin combine innovation technologique et intégration économique pour offrir une expérience blockchain sans précédent.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature 
            icon="🔄" 
            title="VueConsensus" 
            description="Mécanisme de consensus hybride combinant Proof-of-Stake et Proof-of-Business-Activity pour une validation optimale." 
          />
          <Feature 
            icon="🛡️" 
            title="Stabilité Multi-Sectorielle" 
            description="Pool de Stabilité qui utilise les revenus des quatre secteurs pour maintenir une stabilité relative du token." 
          />
          <Feature 
            icon="📊" 
            title="Algorithme Adaptatif" 
            description="Algorithme de Stabilité Adaptative qui ajuste automatiquement les allocations selon les conditions de marché." 
          />
          <Feature 
            icon="🔗" 
            title="Smart Contracts Sectoriels" 
            description="Contrats intelligents spécialisés pour chaque secteur: AdSmart, BuildSmart, TransSmart et ComSmart." 
          />
          <Feature 
            icon="🌐" 
            title="Interopérabilité" 
            description="Intégration avec principales blockchains et systèmes de paiement traditionnels via passerelles API sécurisées." 
          />
          <Feature 
            icon="👥" 
            title="Gouvernance DAO" 
            description="Organisation autonome décentralisée avec représentation sectorielle pour une prise de décision équilibrée." 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
