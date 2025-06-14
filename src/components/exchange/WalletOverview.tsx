
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Mapping pour afficher les jolis noms de devises
const LABELS = {
  VC: "VueCoin",
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  ADA: "Cardano"
};

const WalletOverview = () => {
  const { user } = useAuth();
  const { data: wallets, isLoading } = useQuery({
    queryKey: ['wallets', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const totalWalletValue = wallets?.reduce((sum, w) => sum + (w.balance || 0), 0) ?? 0;

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Wallet className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-semibold">Mon Portefeuille</h2>
      </div>
      <div className="space-y-4">
        {isLoading && <div className="py-4 text-center text-muted-foreground">Chargement...</div>}
        {wallets?.map((item: any) => (
          <div key={item.currency} className="flex justify-between py-2 border-b border-gray-100">
            <div>
              <div>{LABELS[item.currency] ?? item.currency} <span className="text-xs text-gray-500">{item.currency}</span></div>
            </div>
            <div className="text-right">
              <div>
                {Number(item.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: item.balance < 1 ? 8 : 2, maximumFractionDigits: item.balance < 1 ? 8 : 2 })}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between pt-2 font-semibold">
          <span>Valeur totale estimée:</span>
          <span>{totalWalletValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </Card>
  );
};

export default WalletOverview;
