
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types/transaction';
import { 
  CreditCard, 
  RefreshCw,
  ArrowDownCircle, 
  ArrowUpCircle 
} from 'lucide-react';
import { paymentIcons } from '@/utils/paymentIcons';

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

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return <ArrowDownCircle className="h-4 w-4 text-green-600" />;
    case 'withdrawal':
      return <ArrowUpCircle className="h-4 w-4 text-red-600" />;
    case 'exchange':
      return <RefreshCw className="h-4 w-4 text-blue-600" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, isLoading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Montant</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Méthode</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Statut</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors duration-200">
              <td className="py-4 px-4">
                <div>
                  {new Date(transaction.created_at).toLocaleDateString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Il y a {formatDistanceToNow(new Date(transaction.created_at), { locale: fr })}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(transaction.type)}
                  <span className="capitalize">
                    {transaction.type === 'deposit' ? 'Dépôt' : 
                     transaction.type === 'withdrawal' ? 'Retrait' : 'Échange'}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4 font-medium">
                {transaction.amount} {transaction.currency}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-6 h-6">
                    {transaction.payment_methods?.code && 
                     transaction.payment_methods.code in paymentIcons && 
                     typeof paymentIcons[transaction.payment_methods.code] === 'string' ? (
                      <img 
                        src={paymentIcons[transaction.payment_methods.code] as string} 
                        alt={transaction.payment_methods.name || 'Méthode de paiement'} 
                        className="h-5 w-5 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Since we can't render React components here, we'll just hide the broken image
                        }}
                      />
                    ) : (
                      <CreditCard className="h-5 w-5 text-primary" />
                    )}
                  </span>
                  {transaction.payment_methods?.name || '-'}
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge className={`${getStatusColor(transaction.status)} transition-colors duration-200 hover:bg-accent hover:text-accent-foreground`}>
                  {transaction.status === 'completed' ? 'Terminé' : 
                   transaction.status === 'pending' ? 'En attente' :
                   transaction.status === 'failed' ? 'Échoué' : 'Annulé'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
