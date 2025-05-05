
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Mail, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const generalFaqs = [
    {
      question: "Qu'est-ce que VueCoin et en quoi est-ce différent des autres cryptomonnaies ?",
      answer: "VueCoin est une cryptomonnaie unique dont la valeur est soutenue par des investissements réels dans quatre secteurs stratégiques : l'immobilier, les énergies renouvelables, l'agriculture durable et les technologies de santé. Contrairement à la plupart des cryptomonnaies qui manquent d'ancrage tangible, VueCoin combine les avantages de la blockchain (sécurité, transparence, décentralisation) avec une stratégie d'investissement dans des actifs tangibles, créant ainsi une proposition de valeur plus stable et plus robuste."
    },
    {
      question: "Comment fonctionne la stabilité de valeur de VueCoin ?",
      answer: "La stabilité de VueCoin provient de son ancrage dans l'économie réelle via nos investissements dans quatre secteurs stratégiques. Ces investissements génèrent des revenus réguliers (comme les loyers immobiliers, la vente d'énergie renouvelable, les rendements agricoles) qui soutiennent la valeur du token. Notre approche innovante vise à réduire la volatilité excessive typique des cryptomonnaies en créant un lien direct avec des actifs tangibles ayant une valeur intrinsèque."
    },
    {
      question: "Quand a été lancé VueCoin et quelle est sa vision ?",
      answer: "VueCoin a été lancée en 2025 avec la vision de devenir la première cryptomonnaie mondiale dont la valeur est soutenue par des investissements stratégiques dans l'économie réelle. Notre mission est de créer un écosystème financier décentralisé qui offre stabilité, croissance et utilité, en combinant l'innovation blockchain avec des investissements tangibles dans des secteurs d'avenir."
    },
    {
      question: "Quelles sont les perspectives d'avenir pour VueCoin ?",
      answer: "Notre vision à long terme est de développer un écosystème complet autour de VueCoin, avec des applications décentralisées permettant d'interagir directement avec nos investissements dans l'économie réelle. Notre feuille de route prévoit une expansion des investissements dans nos quatre secteurs stratégiques, le développement de nouveaux partenariats, et un renforcement de notre gouvernance décentralisée pour impliquer davantage la communauté dans les décisions d'investissement."
    },
  ];

  const investingFaqs = [
    {
      question: "Comment puis-je commencer à investir dans VueCoin ?",
      answer: "Pour investir dans VueCoin, vous devez d'abord créer un compte sur notre plateforme, compléter le processus de vérification KYC, puis déposer des fonds via l'une de nos méthodes de paiement acceptées. Une fois ces étapes terminées, vous pourrez acheter des VueCoins directement depuis votre tableau de bord."
    },
    {
      question: "Dans quels secteurs VueCoin investit-il précisément ?",
      answer: "VueCoin investit dans quatre secteurs économiques clés qui forment le socle de sa valeur : 1) L'immobilier : actifs sélectionnés pour leur potentiel de rendement locatif et de plus-value. 2) Les énergies renouvelables : projets d'énergie solaire, éolienne et autres technologies durables. 3) L'agriculture durable : investissements dans la production alimentaire moderne et responsable. 4) Les technologies de santé : entreprises développant des technologies médicales d'avenir avec un potentiel de croissance important."
    },
    {
      question: "Comment ces investissements soutiennent-ils la valeur de VueCoin ?",
      answer: "Les investissements dans nos quatre secteurs stratégiques génèrent des revenus réguliers (loyers, vente d'énergie, production agricole, licences technologiques) qui alimentent notre trésorerie. Une partie de ces revenus est utilisée pour soutenir le cours de VueCoin via des mécanismes de rachat sur le marché, tandis qu'une autre partie est réinvestie pour faire croître notre portefeuille d'actifs, renforçant ainsi la valeur sous-jacente à long terme."
    },
    {
      question: "Comment puis-je suivre la performance de mes investissements en VueCoin ?",
      answer: "Votre tableau de bord personnel sur la plateforme VueCoin vous permet de suivre en temps réel la valeur de vos investissements, l'historique de vos transactions et vos rendements de staking. Nous fournissons également des rapports trimestriels détaillant la performance des investissements sous-jacents dans les quatre secteurs stratégiques, offrant ainsi une transparence totale sur la gestion des fonds."
    },
  ];

  const technicalFaqs = [
    {
      question: "Sur quelle blockchain VueCoin est-il basé ?",
      answer: "VueCoin est basé sur la blockchain Ethereum et utilise le standard ERC-20, ce qui assure une large compatibilité avec les portefeuilles et les échanges existants. Notre architecture technique combine la sécurité et la décentralisation d'Ethereum avec des solutions de couche 2 pour améliorer l'évolutivité et réduire les frais de transaction."
    },
    {
      question: "Comment fonctionne le staking de VueCoin ?",
      answer: "Le staking de VueCoin vous permet de verrouiller vos tokens pendant une période déterminée en échange de récompenses provenant des revenus générés par nos investissements dans l'économie réelle. Plus vous bloquez vos tokens longtemps, plus le taux de rendement est élevé. Le staking vous donne également des droits de vote dans notre système de gouvernance décentralisée."
    },
    {
      question: "Comment VueCoin assure-t-il la gouvernance et la décentralisation ?",
      answer: "VueCoin utilise un système de gouvernance décentralisée où les détenteurs de tokens peuvent voter sur les décisions importantes concernant les investissements et la direction stratégique du projet. Le poids du vote est déterminé par la quantité de tokens possédés et la durée de staking. Ce mécanisme assure que le pouvoir de décision reste distribué parmi la communauté tout en privilégiant les investisseurs à long terme."
    },
    {
      question: "Comment puis-je sécuriser mes VueCoins ?",
      answer: "Vous pouvez sécuriser vos VueCoins en les stockant dans notre portefeuille officiel qui offre des fonctionnalités avancées de sécurité, ou en les transférant vers un portefeuille matériel compatible (comme Ledger ou Trezor). Nous recommandons également d'activer l'authentification à deux facteurs sur votre compte et de suivre les bonnes pratiques de sécurité en matière de cryptomonnaies."
    },
  ];

  const legalFaqs = [
    {
      question: "Quelles sont les obligations fiscales liées à l'investissement en VueCoin ?",
      answer: "Les obligations fiscales varient selon votre pays de résidence. Généralement, les profits réalisés lors de la vente de VueCoin peuvent être soumis à l'impôt sur les plus-values, et les revenus de staking peuvent être considérés comme des revenus imposables. Nous vous recommandons de consulter un conseiller fiscal pour obtenir des conseils adaptés à votre situation personnelle."
    },
    {
      question: "VueCoin est-il conforme aux réglementations ?",
      answer: "Oui, VueCoin s'engage à respecter toutes les réglementations applicables. Nous sommes enregistrés auprès des autorités compétentes et appliquons des procédures strictes de KYC (Know Your Customer) et d'AML (Anti-Money Laundering). Notre équipe juridique surveille en permanence l'évolution des réglementations pour assurer notre conformité continue."
    },
    {
      question: "Comment VueCoin protège-t-il mes données personnelles ?",
      answer: "VueCoin respecte rigoureusement le RGPD et d'autres réglementations sur la protection des données. Nous utilisons des technologies de pointe pour crypter et sécuriser vos informations personnelles. Notre politique de confidentialité détaillée explique comment nous collectons, utilisons et protégeons vos données."
    },
    {
      question: "Comment les actifs réels sont-ils juridiquement liés à VueCoin ?",
      answer: "Les investissements dans l'économie réelle sont détenus par une entité juridique spécifique dont la propriété est tokenisée via VueCoin. Cette structure juridique innovante assure que les détenteurs de VueCoin bénéficient indirectement de la propriété des actifs sous-jacents, tout en respectant les cadres réglementaires locaux dans chaque juridiction où les investissements sont réalisés."
    },
  ];

  const allFaqs = [...generalFaqs, ...investingFaqs, ...technicalFaqs, ...legalFaqs];
  
  const filteredFaqs = searchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-primary">Questions fréquemment posées</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Trouvez des réponses à vos questions sur VueCoin et son écosystème
            </p>
            
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Rechercher une question..." 
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {searchQuery ? (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Résultats de recherche pour "{searchQuery}"</h2>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`search-item-${index}`}>
                      <AccordionTrigger className="text-lg font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground mb-4">Aucun résultat trouvé pour votre recherche.</p>
                  <p>Essayez avec des termes différents ou parcourez les catégories ci-dessous.</p>
                </div>
              )}
            </div>
          ) : (
            <Tabs defaultValue="general" className="mb-12">
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="general">Général</TabsTrigger>
                  <TabsTrigger value="investing">Investissement</TabsTrigger>
                  <TabsTrigger value="technical">Technique</TabsTrigger>
                  <TabsTrigger value="legal">Juridique</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="general">
                <Accordion type="single" collapsible className="w-full">
                  {generalFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`general-item-${index}`}>
                      <AccordionTrigger className="text-lg font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="investing">
                <Accordion type="single" collapsible className="w-full">
                  {investingFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`investing-item-${index}`}>
                      <AccordionTrigger className="text-lg font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="technical">
                <Accordion type="single" collapsible className="w-full">
                  {technicalFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`technical-item-${index}`}>
                      <AccordionTrigger className="text-lg font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="legal">
                <Accordion type="single" collapsible className="w-full">
                  {legalFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`legal-item-${index}`}>
                      <AccordionTrigger className="text-lg font-medium text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          )}
          
          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider avec toutes vos questions. N'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Nous contacter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Centre d'aide
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
