
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Whitepaper = () => {
  return (
    <section id="whitepaper" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Livre Blanc</h2>
          <p className="text-muted-foreground text-lg">
            Découvrez en détail notre vision, technologie et modèle économique.
          </p>
        </div>

        <Card className="max-w-md mx-auto border-none shadow-xl">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="w-40 h-56 bg-muted rounded-md mb-6 overflow-hidden relative">
              <img 
                src="/lovable-uploads/f14ac3df-4827-42eb-8071-0f5d18bbee9d.png"
                alt="VueCoin Logo"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20" />
            </div>
            
            <h3 className="text-2xl font-bold text-primary mb-4">Livre Blanc VueCoin</h3>
            <p className="text-center mb-6">
              Notre document complet qui présente en détail le concept, la technologie, 
              le modèle économique et la feuille de route de VueCoin.
            </p>
            
            <Button className="primary-btn bg-accent text-primary hover:bg-accent/80" size="lg">
              <Download className="mr-2 h-4 w-4" /> Télécharger le PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Whitepaper;
