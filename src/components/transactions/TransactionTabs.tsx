
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionTable from './TransactionTable';
import EmptyTransactionState from './EmptyTransactionState';
import { Transaction } from '@/types/transaction';

interface TransactionTabsProps {
  transactions: Transaction[] | undefined;
  isLoading: boolean;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ transactions, isLoading }) => {
  return (
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
              <EmptyTransactionState />
            ) : (
              <TransactionTable transactions={transactions} isLoading={isLoading} />
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
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Chargement des transactions...
              </div>
            ) : !transactions || transactions.filter(t => t.type === 'deposit').length === 0 ? (
              <EmptyTransactionState />
            ) : (
              <TransactionTable 
                transactions={transactions.filter(t => t.type === 'deposit')} 
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="withdrawals">
        <Card>
          <CardHeader>
            <CardTitle>Retraits</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Chargement des transactions...
              </div>
            ) : !transactions || transactions.filter(t => t.type === 'withdrawal').length === 0 ? (
              <EmptyTransactionState />
            ) : (
              <TransactionTable 
                transactions={transactions.filter(t => t.type === 'withdrawal')} 
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="exchanges">
        <Card>
          <CardHeader>
            <CardTitle>Échanges</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Chargement des transactions...
              </div>
            ) : !transactions || transactions.filter(t => t.type === 'exchange').length === 0 ? (
              <EmptyTransactionState />
            ) : (
              <TransactionTable 
                transactions={transactions.filter(t => t.type === 'exchange')} 
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TransactionTabs;
