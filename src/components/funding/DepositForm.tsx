
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Importation des images pour les méthodes de paiement
import paypalLogo from "../../assets/payment-icons/paypal.png";
import kkiapayLogo from "../../assets/payment-icons/kkiapay.png";
import fedapayLogo from "../../assets/payment-icons/fedapay.png";
import mobileMoneyLogo from "../../assets/payment-icons/mobile-money.png";
import moovMoneyLogo from "../../assets/payment-icons/moov-money.png";

// Mapping des codes de méthode de paiement vers les icônes
const paymentIcons: Record<string, string> = {
  paypal: paypalLogo,
  kkiapay: kkiapayLogo,
  fedapay: fedapayLogo,
  mobile_money: mobileMoneyLogo,
  moov_money: moovMoneyLogo,
};

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

  // Fonction pour obtenir l'icône appropriée pour une méthode de paiement
  const getPaymentMethodIcon = (method: any) => {
    if (method.code in paymentIcons) {
      return <img src={paymentIcons[method.code]} alt={method.name} className="h-6 w-auto" />;
    }
    return <CreditCard className="h-4 w-4" />;
  };

  return (
    <form onSubmit={handleDeposit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Montant</label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant à déposer"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Méthode de paiement</label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {paymentMethods?.map((method) => (
            <Button
              key={method.id}
              type="button"
              variant={selectedMethod === method.id ? "default" : "outline"}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "flex items-center gap-2 h-auto py-3",
                selectedMethod === method.id ? "border-2 border-primary" : ""
              )}
            >
              <span className="flex items-center justify-center w-6 h-6">
                {getPaymentMethodIcon(method)}
              </span>
              <span>{method.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!amount || !selectedMethod}>
        Déposer
      </Button>
    </form>
  );
};

export default DepositForm;
