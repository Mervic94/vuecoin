
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Politique en matière de cookies</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : 3 Mai 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte qui est placé et stocké sur votre navigateur ou sur le disque dur de votre ordinateur 
                lorsque vous visitez un site web. Les cookies permettent au site web de reconnaître votre appareil et de mémoriser des 
                informations sur votre visite (par exemple, votre langue préférée, la taille de la police, etc.).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Les cookies que nous utilisons</h2>
              <p>
                Nous utilisons différents types de cookies sur notre site web :
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Cookies nécessaires</h3>
              <p>
                Ces cookies sont essentiels au bon fonctionnement de notre site web. Ils vous permettent de naviguer sur notre site 
                et d'utiliser ses fonctionnalités. Sans ces cookies, certains services que vous avez demandés ne pourraient pas être fournis.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Cookies de performance</h3>
              <p>
                Ces cookies collectent des informations sur la façon dont les visiteurs utilisent notre site web, par exemple quelles 
                pages ils visitent le plus souvent et s'ils reçoivent des messages d'erreur. Ces cookies ne collectent pas d'informations 
                permettant d'identifier un visiteur. Toutes les informations collectées par ces cookies sont agrégées et donc anonymisées.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Cookies de fonctionnalité</h3>
              <p>
                Ces cookies permettent à notre site web de se souvenir des choix que vous faites (comme votre nom d'utilisateur, votre 
                langue ou la région dans laquelle vous vous trouvez) et fournissent des fonctionnalités améliorées et plus personnalisées.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Cookies de ciblage ou publicitaires</h3>
              <p>
                Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts. 
                Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité et pour aider 
                à mesurer l'efficacité des campagnes publicitaires.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Cookies tiers</h2>
              <p>
                Nous permettons à des tiers de placer des cookies sur votre appareil lorsque vous visitez notre site web. 
                Ces tiers collectent des informations sur votre utilisation en ligne sur notre site et d'autres sites web. 
                Ces informations peuvent être utilisées pour fournir des publicités sur des produits et services susceptibles de vous intéresser.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Comment gérer les cookies</h2>
              <p>
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies 
                déjà présents sur votre appareil et vous pouvez configurer la plupart des navigateurs pour qu'ils n'en placent plus.
              </p>
              <p className="mt-4">
                Pour gérer les cookies, la plupart des navigateurs vous permettent de refuser ou d'accepter tous les cookies, 
                ou de n'accepter que certains types de cookies. Vous pouvez également supprimer les cookies déjà stockés sur votre appareil.
              </p>
              <p className="mt-4">
                Les procédures pour gérer et supprimer les cookies varient d'un navigateur à l'autre. 
                Pour savoir comment procéder avec un navigateur spécifique, vous pouvez utiliser la fonction d'aide de votre navigateur.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Conséquences de la désactivation des cookies</h2>
              <p>
                Si vous choisissez de désactiver certains cookies, vous pourriez ne pas être en mesure d'utiliser pleinement 
                toutes les fonctionnalités de notre site web. Par exemple, vous pourriez ne pas être en mesure de vous connecter 
                à votre compte ou d'utiliser des fonctions personnalisées.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Modifications de notre politique en matière de cookies</h2>
              <p>
                Nous pouvons mettre à jour notre politique en matière de cookies de temps à autre. Toute modification sera 
                publiée sur cette page et, si les modifications sont importantes, nous vous en informerons par un avis plus visible.
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

export default CookiesPolicy;
