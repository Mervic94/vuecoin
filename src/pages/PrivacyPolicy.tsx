
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Politique de confidentialité</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : 3 Mai 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Chez VueCoin, nous prenons très au sérieux la protection de vos données personnelles. 
                Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, 
                les partageons et les protégeons.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Informations que nous collectons</h2>
              <p>
                Nous pouvons collecter les types d'informations suivants :
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Informations d'identification :</strong> nom, adresse email, numéro de téléphone, date de naissance, 
                  nationalité, pièces d'identité officielles.
                </li>
                <li>
                  <strong>Informations financières :</strong> coordonnées bancaires, historique des transactions, solde des comptes.
                </li>
                <li>
                  <strong>Informations techniques :</strong> adresse IP, type et version du navigateur, paramètres de fuseau horaire, 
                  types et versions des plugins, système d'exploitation et plateforme.
                </li>
                <li>
                  <strong>Informations d'utilisation :</strong> informations sur votre utilisation de notre site, produits et services.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Comment nous utilisons vos informations</h2>
              <p>
                Nous utilisons vos informations personnelles pour :
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Fournir, exploiter et maintenir nos services</li>
                <li>Améliorer, personnaliser et développer nos services</li>
                <li>Comprendre et analyser comment vous utilisez nos services</li>
                <li>Développer de nouveaux produits, services et fonctionnalités</li>
                <li>Communiquer avec vous, directement ou par l'intermédiaire de nos partenaires</li>
                <li>Prévenir la fraude, résoudre les litiges et résoudre les problèmes</li>
                <li>À des fins de sécurité et de vérification d'identité</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Partage de vos informations</h2>
              <p>
                Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos informations dans les situations suivantes :
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Avec des prestataires de services qui nous aident à exploiter notre plateforme</li>
                <li>Pour se conformer à des obligations légales</li>
                <li>Pour protéger et défendre nos droits et propriétés</li>
                <li>Avec votre consentement ou selon vos instructions</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour vous fournir nos services 
                et pour respecter nos obligations légales. Lorsque nous n'avons plus besoin de vos données personnelles, 
                nous les supprimons ou les anonymisons.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Sécurité des données</h2>
              <p>
                Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles 
                soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou divulguées.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
              <p>
                Selon les lois sur la protection des données, vous pouvez avoir le droit :
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>D'accéder à vos données personnelles</li>
                <li>De corriger les données inexactes</li>
                <li>De demander l'effacement de vos données</li>
                <li>De vous opposer au traitement de vos données</li>
                <li>De demander la limitation du traitement de vos données</li>
                <li>De demander le transfert de vos données</li>
                <li>De retirer votre consentement</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Cookies et technologies similaires</h2>
              <p>
                Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, 
                analyser le trafic et personnaliser le contenu. Pour plus d'informations, veuillez consulter notre 
                <a href="/cookies" className="text-primary hover:underline"> Politique en matière de cookies</a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Modifications de cette politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
                La version la plus récente sera toujours disponible sur notre site web.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p>
                Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :
                <br />
                <a href="mailto:privacy@vuecoin.fr" className="text-primary hover:underline">privacy@vuecoin.fr</a>
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

export default PrivacyPolicy;
