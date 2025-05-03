
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Book, Code, FileText, HelpCircle, Link } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">Documentation VueCoin</h1>
            <p className="text-xl text-muted-foreground">
              Tout ce que vous devez savoir pour comprendre et utiliser VueCoin
            </p>
          </div>
          
          <Tabs defaultValue="getting-started" className="mb-12">
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="getting-started">Pour débuter</TabsTrigger>
                <TabsTrigger value="user-guides">Guides utilisateur</TabsTrigger>
                <TabsTrigger value="api">API & Développeurs</TabsTrigger>
                <TabsTrigger value="governance">Gouvernance</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="getting-started" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Book className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="text-xl font-medium">Qu'est-ce que VueCoin ?</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Découvrez les principes fondamentaux de VueCoin et ce qui la distingue des autres cryptomonnaies.
                    </p>
                    <Button variant="link" className="p-0 flex items-center">
                      Lire plus <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="text-xl font-medium">Les 4 secteurs</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Explorez en détail les quatre secteurs stratégiques qui constituent le socle de valeur de VueCoin.
                    </p>
                    <Button variant="link" className="p-0 flex items-center">
                      Lire plus <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="text-xl font-medium">Questions fréquentes</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Trouvez des réponses aux questions les plus courantes sur VueCoin et son fonctionnement.
                    </p>
                    <Button variant="link" className="p-0 flex items-center">
                      Lire plus <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Premiers pas avec VueCoin</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <ol className="list-decimal list-inside space-y-3">
                      <li className="text-primary font-medium">
                        <span className="text-foreground">Créez votre compte sur la plateforme VueCoin</span>
                      </li>
                      <li className="text-primary font-medium">
                        <span className="text-foreground">Vérifiez votre identité pour débloquer toutes les fonctionnalités</span>
                      </li>
                      <li className="text-primary font-medium">
                        <span className="text-foreground">Ajoutez des fonds à votre portefeuille via notre page de dépôt</span>
                      </li>
                      <li className="text-primary font-medium">
                        <span className="text-foreground">Commencez à acheter et échanger des VueCoins</span>
                      </li>
                      <li className="text-primary font-medium">
                        <span className="text-foreground">Explorez les options de staking pour générer des revenus passifs</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Button size="lg" className="w-full md:w-auto">
                      Créer un compte
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="user-guides" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium">Guides utilisateur</h3>
                  <p className="text-muted-foreground">
                    Guides détaillés pour vous aider à naviguer et utiliser efficacement la plateforme VueCoin.
                  </p>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Comment créer et sécuriser votre compte</a>
                    </div>
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Guide complet du processus KYC</a>
                    </div>
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Effectuer votre premier achat de VueCoin</a>
                    </div>
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Guide du staking et des récompenses</a>
                    </div>
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Comprendre les frais et les limites</a>
                    </div>
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Comment effectuer des retraits</a>
                    </div>
                    <div className="flex items-center border-b pb-3">
                      <Link className="h-4 w-4 mr-2 text-primary" />
                      <a href="#" className="hover:text-primary">Sécuriser son portefeuille VueCoin</a>
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Guide vidéo</h3>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <Button variant="outline">Regarder le tutoriel</Button>
                    </div>
                    <p className="text-muted-foreground mt-4">
                      Notre guide vidéo complet vous guide à travers toutes les fonctionnalités 
                      de la plateforme VueCoin, du processus d'inscription à l'achat de vos premières cryptomonnaies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <h3 className="text-2xl font-medium">API & Ressources</h3>
                  <p className="text-muted-foreground">
                    Accédez à nos outils de développement et à notre API pour intégrer VueCoin dans vos applications.
                  </p>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Code className="mr-2 h-4 w-4" />
                      Documentation API
                    </Button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-4">Exemple d'intégration</h3>
                      <div className="bg-zinc-900 text-zinc-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>
{`// Exemple d'appel à l'API VueCoin
const response = await fetch('https://api.vuecoin.fr/v1/market/prices', {
  method: 'GET',
  headers: {
    'X-API-KEY': 'votre_clé_api',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`}
                        </pre>
                      </div>
                      <p className="text-muted-foreground mt-4">
                        Explorez notre documentation complète pour accéder à tous les endpoints disponibles 
                        et à des exemples d'implémentation dans différents langages de programmation.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="governance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Modèle de gouvernance</h3>
                    <p className="text-muted-foreground">
                      VueCoin utilise un modèle de gouvernance décentralisé où les détenteurs de tokens peuvent 
                      voter sur les propositions importantes concernant l'évolution du projet, les allocations 
                      de fonds et les décisions stratégiques.
                    </p>
                    <p className="text-muted-foreground mt-4">
                      Notre système de gouvernance repose sur un mécanisme de vote pondéré en fonction du nombre 
                      de tokens détenus et de la durée de détention, encourageant ainsi l'engagement à long terme.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Propositions actives</h3>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium">VIP-23: Allocation budgétaire Q3 2025</h4>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 rounded-full">Vote en cours</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Date de fin: 15 juin 2025
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium">VIP-24: Nouveau partenariat agricole</h4>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 rounded-full">Vote en cours</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Date de fin: 22 juin 2025
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium">VIP-22: Mise à jour protocole consensus</h4>
                          <span className="text-sm bg-green-100 text-green-800 px-2 rounded-full">Approuvée</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Terminé le: 1 mai 2025
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      Voir toutes les propositions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Notre équipe de support est disponible 24/7 pour vous aider avec toutes vos questions concernant VueCoin.
            </p>
            <Button>Contacter le support</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
