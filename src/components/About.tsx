
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">À Propos de VueCoin</h2>
          <p className="text-muted-foreground text-lg">
            VueCoin révolutionne le concept de cryptomonnaie en l'ancrant dans l'économie réelle 
            à travers quatre secteurs économiques fondamentaux.
          </p>
        </div>

        <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="grid gap-6 text-center md:text-left">
              <p className="text-lg">
                VueCoin représente une innovation majeure dans l'écosystème des cryptomonnaies 
                en établissant un modèle économique basé sur quatre piliers fondamentaux de l'économie 
                réelle : la publicité sous toutes ses formes, l'immobilier-BTP, le transport des 
                biens et personnes, et le e-commerce.
              </p>
              <p className="text-lg">
                Cette approche crée une symbiose unique entre des secteurs économiques traditionnels 
                et la technologie blockchain, offrant ainsi une stabilité accrue tout en maintenant 
                le potentiel de croissance inhérent aux actifs numériques fluctuants.
              </p>
              <p className="text-lg">
                Notre blockchain hybride combine les avantages des systèmes Proof-of-Stake (PoS) 
                et Proof-of-Business-Activity (PoBA), optimisée pour les transactions commerciales 
                multi-sectorielles à grande échelle.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
