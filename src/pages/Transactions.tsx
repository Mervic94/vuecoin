
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransactionFilter from '@/components/transactions/TransactionFilter';
import TransactionTabs from '@/components/transactions/TransactionTabs';
import { Transaction } from '@/types/transaction';

const Transactions = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const filteredTransactions = searchQuery && transactions
    ? transactions.filter(transaction => 
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.amount.toString().includes(searchQuery) ||
        transaction.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.payment_methods?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
        
        <TransactionFilter onSearch={handleSearch} />
        <TransactionTabs 
          transactions={filteredTransactions} 
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Transactions;
