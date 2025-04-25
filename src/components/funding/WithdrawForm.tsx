
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const WithdrawForm = () => {
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

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour effectuer un retrait",
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
          type: 'withdrawal',
          currency: 'EUR',
          payment_method_id: selectedMethod,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Votre demande de retrait a été enregistrée",
      });

      setAmount('');
      setSelectedMethod('');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du retrait",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleWithdraw} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Montant</label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant à retirer"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Méthode de retrait</label>
        <div className="grid grid-cols-2 gap-2">
          {paymentMethods?.map((method) => (
            <Button
              key={method.id}
              type="button"
              variant={selectedMethod === method.id ? "default" : "outline"}
              onClick={() => setSelectedMethod(method.id)}
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              {method.name}
            </Button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!amount || !selectedMethod}>
        Retirer
      </Button>
    </form>
  );
};

export default WithdrawForm;
