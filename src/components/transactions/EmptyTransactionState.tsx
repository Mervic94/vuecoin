
import React from 'react';
import { ArrowDownUp } from 'lucide-react';

const EmptyTransactionState = () => {
  return (
    <div className="py-12 text-center">
      <ArrowDownUp className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
      <h3 className="text-xl font-medium mb-2">Aucune transaction</h3>
      <p className="text-muted-foreground">
        Vous n'avez pas encore effectué de transaction sur la plateforme.
      </p>
    </div>
  );
};

export default EmptyTransactionState;
