
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WhitepaperPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Livre Blanc VueCoin</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="w-48 h-64 bg-muted rounded-md shadow-lg overflow-hidden flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/f14ac3df-4827-42eb-8071-0f5d18bbee9d.png"
                  alt="VueCoin Logo"
                  className="w-36 h-36"
                />
              </div>
              
              <div className="space-y-4 w-full">
                <Button className="w-full bg-accent text-primary hover:bg-accent/80" size="lg">
                  <Download className="mr-2 h-4 w-4" /> Télécharger le PDF
                </Button>
                
                <Button
                  className="w-full"
                  variant="outline"
                  size="lg"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Version imprimable
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-lg mb-6">
                Le livre blanc VueCoin présente notre vision d'une cryptomonnaie ancrée dans l'économie réelle 
                à travers quatre secteurs stratégiques. Ce document détaille notre technologie, notre modèle économique
                et notre feuille de route.
              </p>
              
              <div className="prose max-w-none">
                <h2>Table des matières</h2>
                <ol className="list-decimal pl-5">
                  <li>Introduction à VueCoin</li>
                  <li>Vision et mission</li>
                  <li>Les quatre secteurs stratégiques</li>
                  <li>Technologie et architecture technique</li>
                  <li>Tokenomics et modèle économique</li>
                  <li>Gouvernance et décentralisation</li>
                  <li>Feuille de route et objectifs</li>
                  <li>L'équipe et les partenaires</li>
                  <li>Glossaire</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction à VueCoin</h2>
              <p>
                VueCoin est née d'une observation simple : la plupart des cryptomonnaies manquent d'ancrage dans 
                l'économie réelle, ce qui contribue à leur volatilité excessive et limite leur adoption. 
                Notre approche innovante vise à combler cette lacune en créant une monnaie numérique 
                qui tire sa valeur de quatre secteurs économiques stratégiques et essentiels.
              </p>
              <p className="mt-4">
                Lancée en 2025, VueCoin combine les avantages de la blockchain (sécurité, transparence, décentralisation) 
                avec une stratégie d'investissement dans des actifs tangibles, créant ainsi une proposition de valeur unique 
                dans l'écosystème des cryptomonnaies.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Vision et mission</h2>
              <p>
                <strong>Vision :</strong> Devenir la première cryptomonnaie mondiale dont la valeur 
                est soutenue par des investissements stratégiques dans l'économie réelle.
              </p>
              <p className="mt-4">
                <strong>Mission :</strong> Créer un écosystème financier décentralisé qui offre stabilité, 
                croissance et utilité, en combinant l'innovation blockchain avec des investissements tangibles 
                dans des secteurs d'avenir.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">3. Les quatre secteurs stratégiques</h2>
              <p>
                VueCoin s'appuie sur quatre secteurs économiques clés qui forment le socle de sa valeur :
              </p>
              
              <div className="mt-6 space-y-6">
                <div className="p-5 border rounded-lg">
                  <h3 className="text-xl font-medium mb-2">L'immobilier</h3>
                  <p>
                    Un pourcentage des fonds levés est investi dans des actifs immobiliers sélectionnés pour 
                    leur potentiel de rendement locatif et de plus-value. Ces investissements génèrent des revenus 
                    réguliers qui soutiennent la valeur de VueCoin.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg">
                  <h3 className="text-xl font-medium mb-2">Les énergies renouvelables</h3>
                  <p>
                    VueCoin investit dans des projets d'énergie solaire, éolienne et autres technologies durables, 
                    contribuant à la transition écologique tout en générant des revenus à long terme et stables.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg">
                  <h3 className="text-xl font-medium mb-2">L'agriculture durable</h3>
                  <p>
                    Des investissements dans l'agriculture moderne et durable assurent un ancrage dans la production 
                    alimentaire, secteur fondamental de l'économie avec une demande constante et croissante.
                  </p>
                </div>
                
                <div className="p-5 border rounded-lg">
                  <h3 className="text-xl font-medium mb-2">Les technologies de santé</h3>
                  <p>
                    Le secteur de la santé offre des opportunités d'innovation et de croissance. 
                    VueCoin investit dans des entreprises développant des technologies médicales d'avenir, 
                    offrant un potentiel de plus-value important.
                  </p>
                </div>
              </div>
            </section>
            
            <div className="text-center mb-12">
              <p className="text-muted-foreground">
                Téléchargez le livre blanc complet pour découvrir en détail notre technologie, 
                notre modèle économique et notre feuille de route.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="bg-accent text-primary hover:bg-accent/80 px-8" size="lg">
              <Download className="mr-2 h-4 w-4" /> Télécharger le Livre Blanc
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhitepaperPage;
