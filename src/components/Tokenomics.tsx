
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tokenomics</h2>
          <p className="text-muted-foreground text-lg">
            Un modèle économique équilibré pour assurer la croissance et la stabilité de VueCoin.
          </p>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="w-full max-w-md mb-8">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                alt="VueCoin Distribution" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <Card className="w-full max-w-2xl">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Distribution des Tokens</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">🔹</span>
                  <span><strong>30%</strong> - Vente publique et privée</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">🔹</span>
                  <span><strong>20%</strong> - Réserve d'écosystème (allocation sectorielle)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">🔹</span>
                  <span><strong>15%</strong> - Équipe fondatrice et développeurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">🔹</span>
                  <span><strong>15%</strong> - Partenaires stratégiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">🔹</span>
                  <span><strong>10%</strong> - Marketing et développement communautaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">🔹</span>
                  <span><strong>10%</strong> - Réserve de stabilité multisectorielle</span>
                </li>
              </ul>
              <p className="font-bold mb-4">Offre totale: <span className="font-bold">2 milliards</span> de VUE</p>
              <p>VueCoin intègre des mécanismes innovants comme le Pool de Stabilité Multi-Sectorielle (PSMS) qui prélève un pourcentage des transactions dans chaque secteur pour maintenir une stabilité relative.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
