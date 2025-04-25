
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Documentation et Aide</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Comment déposer des fonds ?</AccordionTrigger>
              <AccordionContent>
                Pour déposer des fonds, rendez-vous dans la section "Dépôt/Retrait" et suivez les instructions pour le mode de paiement de votre choix.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Comment vérifier mon compte (KYC) ?</AccordionTrigger>
              <AccordionContent>
                La vérification KYC s'effectue dans votre profil. Vous devrez fournir une pièce d'identité valide et un justificatif de domicile récent.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Comment effectuer un retrait ?</AccordionTrigger>
              <AccordionContent>
                Les retraits sont possibles une fois votre compte vérifié (KYC). Rendez-vous dans la section "Dépôt/Retrait" et sélectionnez "Retrait".
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Quels sont les frais de transaction ?</AccordionTrigger>
              <AccordionContent>
                Les frais varient selon le type de transaction. Consultez notre grille tarifaire pour plus de détails.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
