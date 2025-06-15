
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { RefreshCw, Search, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { paymentIcons } from '@/utils/paymentIcons';

// Helper to render the payment icon as JSX (never as image src if not a string!)
const getPaymentIcon = (code: string) => {
  const icon = paymentIcons[code];
  if (!icon) return <CreditCard className="h-5 w-5 text-primary" />;
  // If string: it's an image path. If function/component: JSX.
  if (typeof icon === "string") {
    return (
      <img
        src={icon}
        alt={code}
        className="h-5 w-5 object-contain"
        style={{ display: 'inline-block' }}
      />
    );
  }
  // Else it's a Lucide icon
  const LucideIcon = icon as React.FC<{ className?: string }>;
  return <LucideIcon className="h-5 w-5 text-primary" />;
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Terminé';
    case 'pending':
      return 'En attente';
    case 'failed':
      return 'Échoué';
    case 'cancelled':
      return 'Annulé';
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DepositHistoryTable: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [localRefreshIndex, setLocalRefreshIndex] = useState(0);

  const { data: deposits, isLoading, refetch } = useQuery({
    queryKey: ['depositHistory', user?.id, localRefreshIndex],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id, amount, currency, status, created_at, payment_methods:payment_method_id (name, code)
        `)
        .eq('user_id', user.id)
        .eq('type', 'deposit')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const filtered = deposits?.filter((d) => {
    return (
      d.payment_methods?.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.status.toLowerCase().includes(search.toLowerCase()) ||
      d.amount.toString().includes(search) ||
      d.currency?.toLowerCase().includes(search.toLowerCase()) ||
      new Date(d.created_at).toLocaleDateString('fr-FR').includes(search)
    );
  }) ?? [];

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="relative w-full md:w-1/3">
          <Input
            placeholder="Rechercher dans les dépôts..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
        </div>
        <Button
          onClick={() => {
            setLocalRefreshIndex((i) => i + 1);
            refetch();
          }}
          variant="outline"
          className="transition-colors duration-200 hover:bg-accent md:w-auto w-full"
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          Rafraîchir
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Méthode</th>
              <th className="py-3 px-4 text-left">Montant</th>
              <th className="py-3 px-4 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center">Chargement...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-muted-foreground">Aucun dépôt trouvé</td>
              </tr>
            ) : (
              filtered.map((deposit) => (
                <tr key={deposit.id} className="border-b hover:bg-muted/50 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div>{new Date(deposit.created_at).toLocaleDateString('fr-FR')}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(deposit.created_at).toLocaleTimeString('fr-FR')}
                    </div>
                  </td>
                  <td className="py-4 px-4 flex items-center gap-2">
                    <span className="w-6 h-6 inline-block">
                      {getPaymentIcon(deposit.payment_methods?.code)}
                    </span>
                    {deposit.payment_methods?.name || "-"}
                  </td>
                  <td className="py-4 px-4 font-medium">
                    {deposit.amount} {deposit.currency}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(deposit.status)}>{getStatusLabel(deposit.status)}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepositHistoryTable;
