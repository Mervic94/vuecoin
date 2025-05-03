
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowDownUp, Filter, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Type pour les transactions
interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  type: 'deposit' | 'withdrawal' | 'exchange';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_method: {
    name: string;
    code: string;
  };
}

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
      return '↓';
    case 'withdrawal':
      return '↑';
    case 'exchange':
      return '↔';
    default:
      return '•';
  }
};

const Transactions = () => {
  const { user } = useAuth();
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          created_at,
          amount,
          currency,
          type,
          status,
          payment_methods:payment_method_id (
            name,
            code
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data as Transaction[];
    },
    enabled: !!user
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Historique des Transactions</h1>
          <p className="text-muted-foreground">
            Consultez l'historique détaillé de toutes vos transactions sur la plateforme VueCoin.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
          <div className="relative w-full md:w-auto flex-1 md:max-w-md">
            <Input 
              placeholder="Rechercher une transaction..." 
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="deposits">Dépôts</TabsTrigger>
            <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
            <TabsTrigger value="exchanges">Échanges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="py-8 text-center text-muted-foreground">
                    Chargement des transactions...
                  </div>
                ) : !transactions || transactions.length === 0 ? (
                  <div className="py-12 text-center">
                    <ArrowDownUp className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucune transaction</h3>
                    <p className="text-muted-foreground">
                      Vous n'avez pas encore effectué de transaction sur la plateforme.
                    </p>
                  </div>
                ) : (
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
                          <tr key={transaction.id} className="border-b hover:bg-muted/50">
                            <td className="py-4 px-4">
                              <div>
                                {new Date(transaction.created_at).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Il y a {formatDistanceToNow(new Date(transaction.created_at), { locale: fr })}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1">
                                <span className="text-lg">{getTypeIcon(transaction.type)}</span>
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
                              {transaction.payment_method?.name || '-'}
                            </td>
                            <td className="py-4 px-4">
                              <Badge className={getStatusColor(transaction.status)}>
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
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deposits">
            <Card>
              <CardHeader>
                <CardTitle>Dépôts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">Contenu de l'onglet Dépôts</h3>
                  <p className="text-muted-foreground">
                    Cette section affichera uniquement vos transactions de dépôt.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Retraits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">Contenu de l'onglet Retraits</h3>
                  <p className="text-muted-foreground">
                    Cette section affichera uniquement vos transactions de retrait.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exchanges">
            <Card>
              <CardHeader>
                <CardTitle>Échanges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">Contenu de l'onglet Échanges</h3>
                  <p className="text-muted-foreground">
                    Cette section affichera uniquement vos transactions d'échange.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Transactions;
