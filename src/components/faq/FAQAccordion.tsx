
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  category: string;
}

const FAQAccordion = ({ faqs, category }: FAQAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`${category}-item-${index}`} className="border-b border-muted">
          <AccordionTrigger 
            className="text-lg font-medium text-left py-4 transition-colors hover:text-accent focus:text-accent"
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground animate-fade-in">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
