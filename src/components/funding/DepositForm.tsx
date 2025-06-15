
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DepositAmountInput from './DepositAmountInput';
import PaymentMethodSelector from './PaymentMethodSelector';
import DepositSubmitButton from './DepositSubmitButton';
import DepositHistoryTable from './DepositHistoryTable';

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: paymentMethods } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour effectuer un dépôt",
        variant: "destructive"
      });
      return;
    }

    const selectedPM = paymentMethods?.find((m) => m.id === selectedMethod);

    // === Stripe ===
    if (selectedPM?.code === "stripe") {
      try {
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: { amount: parseFloat(amount) },
        });
        if (error || !data?.url) {
          toast({
            title: "Erreur Stripe",
            description: "Impossible d'initier le paiement.",
            variant: "destructive"
          });
          return;
        }
        window.open(data.url, "_blank");
        toast({
          title: "Redirection Stripe",
          description: "Un nouvel onglet s'ouvre pour finaliser le paiement.",
        });
        setAmount('');
        setSelectedMethod('');
        return;
      } catch (err) {
        toast({
          title: "Erreur Stripe",
          description: "Échec de la communication avec Stripe.",
          variant: "destructive"
        });
        return;
      }
    }

    // === Kkiapay/Mobile Money & Fedapay/Mobile Money ===
    if (
      selectedPM?.code === "kkiapay" ||
      selectedPM?.code === "mobile_money" ||
      selectedPM?.code === "moov_money" ||
      selectedPM?.code === "fedapay"
    ) {
      try {
        // Enregistre la demande côté Supabase
        const { error } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            amount: parseFloat(amount),
            type: 'deposit',
            currency: 'XOF',
            payment_method_id: selectedPM.id,
            status: 'pending'
          });

        if (error) throw error;

        let infoTitle = "Demande envoyée";
        let infoDescription = "Votre demande de dépôt a été enregistrée. Un agent vous contactera pour le paiement Mobile Money.";
        if (selectedPM.code === "kkiapay") {
          infoTitle = "Dépôt Kkiapay";
          infoDescription = "Votre demande de dépôt via Kkiapay a été enregistrée. Vous recevrez les instructions dans votre espace utilisateur.";
        }
        if (selectedPM.code === "fedapay") {
          infoTitle = "Dépôt Fedapay";
          infoDescription = "Votre demande de dépôt via Fedapay a été enregistrée. Vous recevrez les instructions dans votre espace utilisateur.";
        }
        if (selectedPM.code === "moov_money" || selectedPM.code === "mobile_money") {
          infoTitle = "Dépôt Mobile Money";
          infoDescription = "Votre demande Mobile Money est en attente. Un opérateur validera le paiement manuellement.";
        }

        toast({
          title: infoTitle,
          description: infoDescription,
        });

        setAmount('');
        setSelectedMethod('');
        return;
      } catch (error) {
        toast({
          title: "Erreur du dépôt",
          description: "Une erreur est survenue avec le dépôt Mobile Money.",
          variant: "destructive"
        });
        return;
      }
    }

    // === Méthodes classiques autres : ajoute une transaction en pending ===
    try {
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: parseFloat(amount),
          type: 'deposit',
          currency: 'EUR',
          payment_method_id: selectedMethod,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Votre demande de dépôt a été enregistrée",
      });

      setAmount('');
      setSelectedMethod('');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du dépôt",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <form onSubmit={handleDeposit} className="space-y-4">
        <DepositAmountInput value={amount} onChange={setAmount} />
        <PaymentMethodSelector
          paymentMethods={paymentMethods || []}
          selectedMethod={selectedMethod}
          onSelect={setSelectedMethod}
        />
        <DepositSubmitButton disabled={!amount || !selectedMethod} />
      </form>
      <DepositHistoryTable />
    </>
  );
};

export default DepositForm;
