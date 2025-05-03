
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
      answer: "VueCoin est une cryptomonnaie unique dont la valeur est soutenue par des investissements réels dans quatre secteurs stratégiques : l'immobilier, les énergies renouvelables, l'agriculture durable et les technologies de santé. Contrairement à la plupart des cryptomonnaies qui n'ont pas d'ancrage tangible, VueCoin combine les avantages de la blockchain avec des investissements dans l'économie réelle, offrant ainsi une proposition de valeur plus stable et plus robuste."
    },
    {
      question: "Comment fonctionne la stabilité de valeur de VueCoin ?",
      answer: "La stabilité de VueCoin vient de son ancrage dans l'économie réelle à travers nos investissements dans quatre secteurs stratégiques. Ces investissements génèrent des revenus réguliers (comme les loyers immobiliers ou la vente d'énergie renouvelable) qui alimentent notre trésorerie et soutiennent la valeur du token. De plus, notre mécanisme de gouvernance et notre politique de rachat contribuent à maintenir un équilibre entre l'offre et la demande."
    },
    {
      question: "Où puis-je acheter des VueCoins ?",
      answer: "Vous pouvez acheter des VueCoins directement sur notre plateforme d'échange officielle après avoir créé un compte et complété le processus de vérification KYC. VueCoin est également disponible sur plusieurs bourses d'échange tierces. Pour obtenir la liste complète des plateformes supportées, veuillez consulter la section 'Échanges' de notre site web."
    },
    {
      question: "Quelles sont les perspectives d'avenir pour VueCoin ?",
      answer: "Notre vision à long terme est de développer un écosystème complet autour de VueCoin, avec des applications décentralisées permettant d'interagir directement avec nos investissements dans l'économie réelle. Nous prévoyons également d'étendre notre présence géographique et d'élargir notre portefeuille d'investissements dans nos quatre secteurs stratégiques. Notre feuille de route détaillée est disponible dans notre livre blanc."
    },
  ];

  const investingFaqs = [
    {
      question: "Comment puis-je commencer à investir dans VueCoin ?",
      answer: "Pour investir dans VueCoin, vous devez d'abord créer un compte sur notre plateforme, compléter le processus de vérification KYC, puis déposer des fonds via l'une de nos méthodes de paiement acceptées. Une fois ces étapes terminées, vous pourrez acheter des VueCoins directement depuis votre tableau de bord."
    },
    {
      question: "Y a-t-il un investissement minimum requis ?",
      answer: "Il n'y a pas d'investissement minimum requis pour acheter des VueCoins. Vous pouvez commencer avec le montant qui vous convient, ce qui rend VueCoin accessible à un large éventail d'investisseurs. Cependant, certaines fonctionnalités comme le staking peuvent avoir des seuils minimums spécifiques."
    },
    {
      question: "Quels sont les frais associés à l'achat et à la vente de VueCoin ?",
      answer: "Les frais de transaction sur notre plateforme sont de 0,5% pour les achats et de 0,5% pour les ventes. Les dépôts sont généralement gratuits, tandis que les frais de retrait varient en fonction de la méthode de paiement choisie. Pour les détails complets, veuillez consulter notre page de frais."
    },
    {
      question: "Comment puis-je suivre la performance de mes investissements en VueCoin ?",
      answer: "Votre tableau de bord personnel sur la plateforme VueCoin vous permet de suivre en temps réel la valeur de vos investissements, l'historique de vos transactions et vos rendements de staking. Nous fournissons également des rapports trimestriels détaillant la performance des investissements sous-jacents dans les quatre secteurs stratégiques."
    },
  ];

  const technicalFaqs = [
    {
      question: "Sur quelle blockchain VueCoin est-il basé ?",
      answer: "VueCoin est basé sur la blockchain Ethereum et utilise le standard ERC-20, ce qui assure une large compatibilité avec les portefeuilles et les échanges existants. Nous explorons également des solutions de couche 2 pour améliorer l'évolutivité et réduire les frais de transaction."
    },
    {
      question: "Comment fonctionne le staking de VueCoin ?",
      answer: "Le staking de VueCoin vous permet de verrouiller vos tokens pendant une période déterminée en échange de récompenses. Ces récompenses proviennent des revenus générés par nos investissements dans l'économie réelle. Plus vous bloquez vos tokens longtemps, plus le taux de rendement est élevé. Le staking vous donne également des droits de vote dans notre système de gouvernance."
    },
    {
      question: "VueCoin utilise-t-il le Proof of Stake ou le Proof of Work ?",
      answer: "VueCoin utilise un mécanisme de consensus Proof of Stake (PoS), qui est beaucoup plus économe en énergie que le Proof of Work. Notre implémentation spécifique du PoS est conçue pour favoriser la participation à long terme et la gouvernance décentralisée de l'écosystème."
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
      question: "Quels sont mes recours en cas de litige ?",
      answer: "En cas de litige, notre équipe de support client est disponible pour vous aider à résoudre le problème. Si nécessaire, nous disposons également d'une procédure formelle de résolution des litiges. Les détails complets sont disponibles dans nos conditions d'utilisation. Pour les utilisateurs européens, des mécanismes de résolution des litiges supplémentaires peuvent être disponibles conformément aux réglementations de l'UE."
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
