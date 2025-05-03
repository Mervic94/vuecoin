
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, FileText, Book, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <section className="mb-12">
          <h1 className="text-3xl font-bold text-primary mb-6">Centre d'aide VueCoin</h1>
          
          <div className="relative mb-8">
            <Input 
              type="text" 
              placeholder="Rechercher une question ou un sujet..." 
              className="pl-10 py-6" 
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
              Rechercher
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Accédez à notre documentation complète sur l'utilisation de la plateforme VueCoin.</p>
                <Button variant="outline" className="w-full">Consulter</Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center gap-2">
                <Book className="h-6 w-6 text-primary" />
                <CardTitle>Tutoriels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Découvrez nos guides étape par étape pour bien démarrer avec VueCoin.</p>
                <Button variant="outline" className="w-full">Voir les tutoriels</Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Besoin d'aide personnalisée? Notre équipe de support est là pour vous aider.</p>
                <Button variant="outline" className="w-full">Contacter</Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Questions fréquentes</h2>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4">Qu'est-ce que VueCoin?</AccordionTrigger>
              <AccordionContent className="px-4">
                <p>
                  VueCoin est une cryptomonnaie multi-sectorielle qui tire sa force de quatre secteurs économiques fondamentaux : 
                  la publicité, l'immobilier-BTP, le transport et l'e-commerce. Notre approche unique établit un pont entre 
                  l'économie traditionnelle et la technologie blockchain pour offrir une stabilité accrue tout en conservant 
                  le potentiel de croissance des actifs numériques.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4">Comment acheter des VueCoins?</AccordionTrigger>
              <AccordionContent className="px-4">
                <p>
                  Vous pouvez acquérir des VueCoins directement sur notre plateforme d'échange en utilisant diverses méthodes 
                  de paiement (carte bancaire, virement, ou autres cryptomonnaies). Créez simplement un compte, complétez 
                  votre vérification KYC, puis rendez-vous dans la section "Exchange" pour effectuer votre achat.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4">Comment fonctionne le mécanisme de stabilité?</AccordionTrigger>
              <AccordionContent className="px-4">
                <p>
                  Le Pool de Stabilité Multi-Sectorielle (PSMS) est au cœur de notre mécanisme de stabilité. 
                  Il prélève un pourcentage des transactions dans chacun de nos quatre secteurs économiques pour 
                  constituer une réserve utilisée pour maintenir une stabilité relative du token face aux 
                  fluctuations du marché. Notre algorithme de stabilité adaptative ajuste automatiquement les 
                  allocations selon les conditions de marché.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4">Comment participer à la gouvernance VueCoin?</AccordionTrigger>
              <AccordionContent className="px-4">
                <p>
                  VueCoin utilise un modèle de gouvernance DAO (Organisation Autonome Décentralisée) avec 
                  représentation sectorielle. Pour participer, vous devez détenir des tokens VUE et les 
                  bloquer dans notre contrat de gouvernance. Vous pourrez alors voter sur les propositions 
                  et même soumettre vos propres idées pour l'évolution de l'écosystème.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-4">Comment sécuriser mon portefeuille VueCoin?</AccordionTrigger>
              <AccordionContent className="px-4">
                <p>
                  Pour sécuriser votre portefeuille VueCoin, nous recommandons : d'activer l'authentification 
                  à deux facteurs (2FA), d'utiliser un mot de passe fort et unique, de ne jamais partager vos 
                  clés privées, et de considérer l'utilisation d'un portefeuille hardware pour les montants 
                  importants. Consultez notre guide complet de sécurité pour plus d'informations.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">Nous contacter</h2>
          
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom</label>
                    <Input id="name" placeholder="Votre nom" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="votre@email.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                  <Input id="subject" placeholder="Sujet de votre message" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                    placeholder="Détaillez votre question ou problème..." 
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Envoyer
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
