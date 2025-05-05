
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQAccordion from './FAQAccordion';
import { generalFaqs, investingFaqs, technicalFaqs, legalFaqs } from './FAQData';

const FAQTabs = () => {
  return (
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
        <FAQAccordion faqs={generalFaqs} category="general" />
      </TabsContent>
      
      <TabsContent value="investing">
        <FAQAccordion faqs={investingFaqs} category="investing" />
      </TabsContent>
      
      <TabsContent value="technical">
        <FAQAccordion faqs={technicalFaqs} category="technical" />
      </TabsContent>
      
      <TabsContent value="legal">
        <FAQAccordion faqs={legalFaqs} category="legal" />
      </TabsContent>
    </Tabs>
  );
};

export default FAQTabs;
