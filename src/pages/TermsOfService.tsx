
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Conditions d'utilisation</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : 3 Mai 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
              <p>
                En accédant et en utilisant la plateforme VueCoin, vous acceptez d'être lié par les présentes conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
              <p>
                VueCoin est une plateforme de cryptomonnaie qui offre des services d'échange, d'achat, de vente et de stockage de cryptomonnaies.
                Nos services sont accessibles via notre site web et nos applications mobiles, sous réserve de disponibilité.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Inscription et comptes utilisateurs</h2>
              <p>
                Pour utiliser certaines fonctionnalités de notre plateforme, vous devez créer un compte. 
                Vous êtes responsable de maintenir la confidentialité de vos identifiants et de toutes les activités qui se 
                produisent sous votre compte.
              </p>
              <p className="mt-4">
                Vous devez nous fournir des informations exactes et complètes lors de l'inscription et vous engagez à 
                les mettre à jour si nécessaire.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Transactions et frais</h2>
              <p>
                Toutes les transactions effectuées sur notre plateforme sont soumises à des frais, clairement indiqués 
                avant la confirmation de chaque transaction. Nous nous réservons le droit de modifier ces frais à tout moment.
              </p>
              <p className="mt-4">
                Les transactions de cryptomonnaies sont irréversibles par nature. Vous êtes responsable de vérifier toutes les 
                informations avant de confirmer une transaction.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Risques liés aux cryptomonnaies</h2>
              <p>
                Les investissements en cryptomonnaies comportent des risques significatifs, y compris mais sans s'y limiter :
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Volatilité des prix</li>
                <li>Risques réglementaires</li>
                <li>Risques techniques et de sécurité</li>
                <li>Risques de liquidité</li>
              </ul>
              <p className="mt-4">
                Vous reconnaissez comprendre ces risques et acceptez d'en assumer l'entière responsabilité.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Propriété intellectuelle</h2>
              <p>
                Tous les contenus présents sur notre plateforme, y compris les textes, graphiques, logos, icônes, images, 
                clips audio, téléchargements numériques et compilations de données, sont la propriété de VueCoin ou de ses fournisseurs 
                de contenu et sont protégés par les lois internationales sur le droit d'auteur.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation de responsabilité</h2>
              <p>
                VueCoin ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux, consécutifs ou exemplaires, 
                y compris mais sans s'y limiter, la perte de profits, de revenus, de données ou d'utilisation, encourus par vous 
                ou par un tiers, résultant de votre utilisation de notre service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Modification des conditions</h2>
              <p>
                Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces conditions à tout moment. 
                Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant que les nouvelles conditions 
                ne prennent effet.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Droit applicable</h2>
              <p>
                Ces conditions sont régies et interprétées conformément aux lois françaises, sans égard aux principes de conflit de lois.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p>
                Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à :
                <br />
                <a href="mailto:contact@vuecoin.fr" className="text-primary hover:underline">contact@vuecoin.fr</a>
              </p>
            </section>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button onClick={() => window.history.back()} variant="outline" size="lg">
              Retour
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
