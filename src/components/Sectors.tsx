
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SectorCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const SectorCard = ({ title, description, imageUrl }: SectorCardProps) => {
  return (
    <Card className="overflow-hidden card-hover border-none">
      <div className="h-48 bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Sectors = () => {
  return (
    <section id="sectors" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nos Quatre Piliers Économiques</h2>
          <p className="text-muted-foreground text-lg">
            VueCoin s'appuie sur quatre secteurs économiques stratégiques pour assurer sa stabilité et son utilité.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <SectorCard 
            title="Publicité" 
            description="VueAd Network révolutionne l'écosystème publicitaire en créant une plateforme décentralisée qui relie annonceurs, éditeurs et consommateurs." 
            imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          />
          <SectorCard 
            title="Immobilier-BTP" 
            description="VueRealty Platform permet la tokenisation d'actifs immobiliers, le fractionnement de propriété accessible et des smart contracts pour transactions automatisées." 
            imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          />
          <SectorCard 
            title="Transport" 
            description="VueTransit System offre une plateforme unifiée pour le transport de personnes et marchandises, avec traçabilité logistique de bout en bout." 
            imageUrl="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d"
          />
          <SectorCard 
            title="E-Commerce" 
            description="VueMarket est une plateforme e-commerce décentralisée avec paiements sécurisés en VueCoin et système d'escrow automatisé." 
            imageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3"
          />
        </div>
      </div>
    </section>
  );
};

export default Sectors;
