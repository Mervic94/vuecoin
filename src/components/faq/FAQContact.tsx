
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from 'lucide-react';

const FAQContact = () => {
  return (
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
  );
};

export default FAQContact;
